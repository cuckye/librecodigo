/**
 * BlockCodigo - Visual Block Programming API v0.1.0-alpha
 * Real block system with IR conversion and rendering
 *
 * Usage:
 *   <script src="blockcodigo.js"></script>
 *   BlockCodigo.registerBlock({ ... });
 *   BlockCodigo.renderBlocks(container, nodes, edges);
 *
 * GitHub: https://github.com/LibreCodigo/LibreCodigo
 * License: MIT
 */
(function (global) {
  'use strict';

  var VERSION = '0.1.0-alpha';

  // ─── Internal State ───────────────────────────────────────────────
  var _blockDefs = new Map();
  var _categories = {};
  var _customIRNodes = {};
  var _idCounter = 0;

  // ─── Category Definitions ─────────────────────────────────────────

  var BUILTIN_CATEGORIES = {
    program:   { label: 'Programa',       color: '#D97B2E', icon: 'play' },
    variables: { label: 'Variables',      color: '#9A9088', icon: 'variable' },
    control:   { label: 'Control',        color: '#C96B4B', icon: 'git-branch' },
    io:        { label: 'Entrada/Salida', color: '#874418', icon: 'terminal' },
    math:      { label: 'Matemáticas',    color: '#B85C24', icon: 'calculator' },
    strings:   { label: 'Cadenas',        color: '#D97B2E', icon: 'type' },
    operators: { label: 'Operadores',     color: '#C96B4B', icon: 'compare' },
    arrays:    { label: 'Arreglos',       color: '#874418', icon: 'list' },
    functions: { label: 'Funciones',      color: '#D97B2E', icon: 'function-square' },
    classes:   { label: 'Clases',         color: '#C96B2C', icon: 'box' },
    datetime:  { label: 'Fecha/Hora',     color: '#B85C24', icon: 'clock' },
    custom:    { label: 'Personalizado',  color: '#7C7568', icon: 'puzzle' },
  };

  // ─── Built-in Block Definitions ───────────────────────────────────

  var BUILTIN_BLOCKS = [
    // Program
    {
      id: 'print', label: 'Imprimir', category: 'io', shape: 'stack',
      color: '#874418', description: 'Imprime un mensaje en la consola',
      ports: [{ id: 'message', label: 'mensaje', type: 'string', direction: 'input' }],
      toCode: function (fields) {
        return 'console.log(' + (fields.message || '""') + ');';
      },
      fromIR: function (node) {
        if (node.kind === 'print') {
          return { fields: { message: _exprToSource(node.args[0]) } };
        }
        return null;
      },
    },
    {
      id: 'input', label: 'Leer entrada', category: 'io', shape: 'reporter',
      color: '#874418', description: 'Lee una entrada del usuario',
      ports: [{ id: 'prompt', label: 'mensaje', type: 'string', direction: 'input' }],
      toCode: function (fields) {
        return 'prompt(' + (fields.prompt || '""') + ')';
      },
    },
    // Variables
    {
      id: 'set-variable', label: 'Establecer variable', category: 'variables', shape: 'stack',
      color: '#9A9088', description: 'Declara o actualiza una variable',
      ports: [
        { id: 'name', label: 'nombre', type: 'string', direction: 'input' },
        { id: 'value', label: 'valor', type: 'any', direction: 'input' },
      ],
      toCode: function (fields) {
        return 'var ' + (fields.name || 'x') + ' = ' + (fields.value || '0') + ';';
      },
      fromIR: function (node) {
        if (node.kind === 'varDecl') {
          return { fields: { name: node.name, value: _exprToSource(node.value) } };
        }
        return null;
      },
    },
    {
      id: 'get-variable', label: 'Obtener variable', category: 'variables', shape: 'reporter',
      color: '#9A9088', description: 'Obtiene el valor de una variable',
      ports: [{ id: 'name', label: 'nombre', type: 'string', direction: 'input' }],
      toCode: function (fields) { return fields.name || 'x'; },
      fromIR: function (node) {
        if (node.kind === 'identifier') {
          return { fields: { name: node.name } };
        }
        return null;
      },
    },
    {
      id: 'increment-variable', label: 'Incrementar variable', category: 'variables', shape: 'stack',
      color: '#9A9088', description: 'Incrementa el valor de una variable',
      ports: [
        { id: 'name', label: 'nombre', type: 'string', direction: 'input' },
        { id: 'amount', label: 'cantidad', type: 'number', direction: 'input' },
      ],
      toCode: function (fields) {
        return (fields.name || 'x') + ' += ' + (fields.amount || '1') + ';';
      },
    },
    // Control
    {
      id: 'if', label: 'Si', category: 'control', shape: 'c-block',
      color: '#C96B4B', description: 'Ejecuta código si la condición es verdadera',
      ports: [
        { id: 'condition', label: 'condición', type: 'boolean', direction: 'input' },
        { id: 'body', label: 'entonces', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode) {
        return 'if (' + (fields.condition || 'true') + ') {\n' + (bodyCode || '  // código') + '\n}';
      },
      fromIR: function (node) {
        if (node.kind === 'ifElse' && !node.elifs.length && !node.thenBody) {
          return { fields: { condition: _exprToSource(node.condition) } };
        }
        return null;
      },
    },
    {
      id: 'if-else', label: 'Si / Sino', category: 'control', shape: 'c-block',
      color: '#C96B4B', description: 'Ejecuta código basado en condición',
      ports: [
        { id: 'condition', label: 'condición', type: 'boolean', direction: 'input' },
        { id: 'body', label: 'entonces', type: 'statement', direction: 'input' },
        { id: 'elseBody', label: 'sino', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode, elseCode) {
        return 'if (' + (fields.condition || 'true') + ') {\n' + (bodyCode || '') + '\n} else {\n' + (elseCode || '') + '\n}';
      },
    },
    {
      id: 'while-loop', label: 'Mientras', category: 'control', shape: 'c-block',
      color: '#C96B4B', description: 'Repite mientras la condición sea verdadera',
      ports: [
        { id: 'condition', label: 'condición', type: 'boolean', direction: 'input' },
        { id: 'body', label: 'cuerpo', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode) {
        return 'while (' + (fields.condition || 'true') + ') {\n' + (bodyCode || '') + '\n}';
      },
      fromIR: function (node) {
        if (node.kind === 'whileLoop') {
          return { fields: { condition: _exprToSource(node.condition) } };
        }
        return null;
      },
    },
    {
      id: 'for-loop', label: 'Para', category: 'control', shape: 'c-block',
      color: '#C96B4B', description: 'Bucle con contador',
      ports: [
        { id: 'variable', label: 'variable', type: 'string', direction: 'input' },
        { id: 'from', label: 'desde', type: 'number', direction: 'input' },
        { id: 'to', label: 'hasta', type: 'number', direction: 'input' },
        { id: 'body', label: 'cuerpo', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode) {
        var v = fields.variable || 'i';
        return 'for (var ' + v + ' = ' + (fields.from || '0') + '; ' + v + ' < ' + (fields.to || '10') + '; ' + v + '++) {\n' + (bodyCode || '') + '\n}';
      },
      fromIR: function (node) {
        if (node.kind === 'forLoop' && node.init && node.init.kind === 'varDecl' && node.condition && node.update) {
          return {
            fields: {
              variable: node.init.name,
              from: _exprToSource(node.init.value),
              to: _exprToSource(node.condition.right),
            },
          };
        }
        return null;
      },
    },
    {
      id: 'for-each', label: 'Para cada', category: 'control', shape: 'c-block',
      color: '#C96B4B', description: 'Itera sobre un arreglo',
      ports: [
        { id: 'variable', label: 'elemento', type: 'string', direction: 'input' },
        { id: 'iterable', label: 'arreglo', type: 'any', direction: 'input' },
        { id: 'body', label: 'cuerpo', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode) {
        return 'for (var ' + (fields.variable || 'item') + ' of ' + (fields.iterable || '[]') + ') {\n' + (bodyCode || '') + '\n}';
      },
      fromIR: function (node) {
        if (node.kind === 'forEachLoop') {
          return { fields: { variable: node.variable, iterable: _exprToSource(node.iterable) } };
        }
        return null;
      },
    },
    {
      id: 'repeat-n', label: 'Repetir', category: 'control', shape: 'c-block',
      color: '#C96B4B', description: 'Repite N veces',
      ports: [
        { id: 'times', label: 'veces', type: 'number', direction: 'input' },
        { id: 'body', label: 'cuerpo', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode) {
        return 'for (var _i = 0; _i < ' + (fields.times || '10') + '; _i++) {\n' + (bodyCode || '') + '\n}';
      },
    },
    // Math
    { id: 'add', label: 'Sumar', category: 'math', shape: 'reporter', color: '#B85C24',
      ports: [{ id: 'a', label: 'a', type: 'number', direction: 'input' }, { id: 'b', label: 'b', type: 'number', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '0') + ' + ' + (f.b || '0') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '+' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'subtract', label: 'Restar', category: 'math', shape: 'reporter', color: '#B85C24',
      ports: [{ id: 'a', label: 'a', type: 'number', direction: 'input' }, { id: 'b', label: 'b', type: 'number', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '0') + ' - ' + (f.b || '0') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '-' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'multiply', label: 'Multiplicar', category: 'math', shape: 'reporter', color: '#B85C24',
      ports: [{ id: 'a', label: 'a', type: 'number', direction: 'input' }, { id: 'b', label: 'b', type: 'number', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '1') + ' * ' + (f.b || '1') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '*' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'divide', label: 'Dividir', category: 'math', shape: 'reporter', color: '#B85C24',
      ports: [{ id: 'a', label: 'a', type: 'number', direction: 'input' }, { id: 'b', label: 'b', type: 'number', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '1') + ' / ' + (f.b || '1') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '/' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'modulo', label: 'Módulo', category: 'math', shape: 'reporter', color: '#B85C24',
      ports: [{ id: 'a', label: 'a', type: 'number', direction: 'input' }, { id: 'b', label: 'b', type: 'number', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '1') + ' % ' + (f.b || '1') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '%' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'random', label: 'Aleatorio', category: 'math', shape: 'reporter', color: '#B85C24',
      ports: [{ id: 'min', label: 'mín', type: 'number', direction: 'input' }, { id: 'max', label: 'máx', type: 'number', direction: 'input' }],
      toCode: function (f) { return 'Math.floor(Math.random() * (' + (f.max || '100') + ' - ' + (f.min || '0') + ' + 1)) + ' + ' + (f.min || '0'); },
    },
    // Strings
    { id: 'concatenate', label: 'Concatenar', category: 'strings', shape: 'reporter', color: '#D97B2E',
      ports: [{ id: 'a', label: 'texto1', type: 'string', direction: 'input' }, { id: 'b', label: 'texto2', type: 'string', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '""') + ' + ' + (f.b || '""') + ')'; },
    },
    { id: 'length', label: 'Longitud', category: 'strings', shape: 'reporter', color: '#D97B2E',
      ports: [{ id: 'text', label: 'texto', type: 'string', direction: 'input' }],
      toCode: function (f) { return (f.text || '""') + '.length'; },
    },
    { id: 'substring', label: 'Subcadena', category: 'strings', shape: 'reporter', color: '#D97B2E',
      ports: [
        { id: 'text', label: 'texto', type: 'string', direction: 'input' },
        { id: 'start', label: 'inicio', type: 'number', direction: 'input' },
        { id: 'end', label: 'fin', type: 'number', direction: 'input' },
      ],
      toCode: function (f) { return (f.text || '""') + '.substring(' + (f.start || '0') + ', ' + (f.end || '0') + ')'; },
    },
    // Operators
    { id: 'equals', label: 'Igual a', category: 'operators', shape: 'boolean', color: '#C96B4B',
      ports: [{ id: 'a', label: 'a', type: 'any', direction: 'input' }, { id: 'b', label: 'b', type: 'any', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '0') + ' === ' + (f.b || '0') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '===' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'greater-than', label: 'Mayor que', category: 'operators', shape: 'boolean', color: '#C96B4B',
      ports: [{ id: 'a', label: 'a', type: 'number', direction: 'input' }, { id: 'b', label: 'b', type: 'number', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '0') + ' > ' + (f.b || '0') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '>' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'less-than', label: 'Menor que', category: 'operators', shape: 'boolean', color: '#C96B4B',
      ports: [{ id: 'a', label: 'a', type: 'number', direction: 'input' }, { id: 'b', label: 'b', type: 'number', direction: 'input' }],
      toCode: function (f) { return '(' + (f.a || '0') + ' < ' + (f.b || '0') + ')'; },
      fromIR: function (n) { return n.kind === 'binaryOp' && n.operator === '<' ? { fields: { a: _exprToSource(n.left), b: _exprToSource(n.right) } } : null; },
    },
    { id: 'and-or', label: 'Y / O', category: 'operators', shape: 'boolean', color: '#C96B4B',
      ports: [
        { id: 'a', label: 'a', type: 'boolean', direction: 'input' },
        { id: 'operator', label: 'op', type: 'string', direction: 'input' },
        { id: 'b', label: 'b', type: 'boolean', direction: 'input' },
      ],
      toCode: function (f) { return '(' + (f.a || 'true') + ' ' + (f.operator || '&&') + ' ' + (f.b || 'true') + ')'; },
    },
    // Arrays
    { id: 'create-array', label: 'Crear arreglo', category: 'arrays', shape: 'reporter', color: '#874418',
      ports: [{ id: 'values', label: 'valores', type: 'string', direction: 'input' }],
      toCode: function (f) { return '[' + (f.values || '') + ']'; },
    },
    { id: 'array-get', label: 'Obtener elemento', category: 'arrays', shape: 'reporter', color: '#874418',
      ports: [
        { id: 'array', label: 'arreglo', type: 'any', direction: 'input' },
        { id: 'index', label: 'índice', type: 'number', direction: 'input' },
      ],
      toCode: function (f) { return (f.array || '[]') + '[' + (f.index || '0') + ']'; },
    },
    { id: 'array-push', label: 'Agregar elemento', category: 'arrays', shape: 'stack', color: '#874418',
      ports: [
        { id: 'array', label: 'arreglo', type: 'any', direction: 'input' },
        { id: 'value', label: 'valor', type: 'any', direction: 'input' },
      ],
      toCode: function (f) { return (f.array || 'arr') + '.push(' + (f.value || '') + ');'; },
    },
    { id: 'array-length', label: 'Longitud del arreglo', category: 'arrays', shape: 'reporter', color: '#874418',
      ports: [{ id: 'array', label: 'arreglo', type: 'any', direction: 'input' }],
      toCode: function (f) { return (f.array || '[]') + '.length'; },
    },
    // Functions
    {
      id: 'define-function', label: 'Definir función', category: 'functions', shape: 'c-block',
      color: '#D97B2E', description: 'Define una nueva función',
      ports: [
        { id: 'name', label: 'nombre', type: 'string', direction: 'input' },
        { id: 'params', label: 'parámetros', type: 'string', direction: 'input' },
        { id: 'body', label: 'cuerpo', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode) {
        return 'function ' + (fields.name || 'miFuncion') + '(' + (fields.params || '') + ') {\n' + (bodyCode || '') + '\n}';
      },
      fromIR: function (node) {
        if (node.kind === 'funcDef') {
          return {
            fields: {
              name: node.name,
              params: node.params.map(function (p) { return p.name; }).join(', '),
            },
          };
        }
        return null;
      },
    },
    {
      id: 'call-function', label: 'Llamar función', category: 'functions', shape: 'stack',
      color: '#D97B2E', description: 'Llama a una función existente',
      ports: [
        { id: 'name', label: 'nombre', type: 'string', direction: 'input' },
        { id: 'args', label: 'argumentos', type: 'string', direction: 'input' },
      ],
      toCode: function (fields) {
        return (fields.name || 'miFuncion') + '(' + (fields.args || '') + ');';
      },
      fromIR: function (node) {
        if (node.kind === 'funcCall') {
          return { fields: { name: node.name, args: node.args.map(_exprToSource).join(', ') } };
        }
        return null;
      },
    },
    {
      id: 'return', label: 'Retornar', category: 'functions', shape: 'cap',
      color: '#D97B2E', description: 'Retorna un valor',
      ports: [{ id: 'value', label: 'valor', type: 'any', direction: 'input' }],
      toCode: function (fields) {
        return 'return ' + (fields.value || 'undefined') + ';';
      },
      fromIR: function (node) {
        if (node.kind === 'return') {
          return { fields: { value: node.value ? _exprToSource(node.value) : '' } };
        }
        return null;
      },
    },
    // Classes
    {
      id: 'define-class', label: 'Definir clase', category: 'classes', shape: 'c-block',
      color: '#C96B2C', description: 'Define una nueva clase',
      ports: [
        { id: 'name', label: 'nombre', type: 'string', direction: 'input' },
        { id: 'parent', label: 'hereda de', type: 'string', direction: 'input' },
        { id: 'body', label: 'cuerpo', type: 'statement', direction: 'input' },
      ],
      toCode: function (fields, bodyCode) {
        var ext = fields.parent ? ' extends ' + fields.parent : '';
        return 'class ' + (fields.name || 'MiClase') + ext + ' {\n' + (bodyCode || '') + '\n}';
      },
      fromIR: function (node) {
        if (node.kind === 'classDef') {
          return { fields: { name: node.name, parent: node.superClass || '' } };
        }
        return null;
      },
    },
    // DateTime
    { id: 'current-time', label: 'Hora actual', category: 'datetime', shape: 'reporter', color: '#B85C24',
      ports: [],
      toCode: function () { return 'new Date().toLocaleTimeString()'; },
    },
    { id: 'timestamp', label: 'Timestamp', category: 'datetime', shape: 'reporter', color: '#B85C24',
      ports: [],
      toCode: function () { return 'Date.now()'; },
    },
  ];

  // ─── IR Expression to Source ──────────────────────────────────────

  function _exprToSource(expr) {
    if (!expr) return '';
    switch (expr.kind) {
      case 'literal': return typeof expr.value === 'string' ? '"' + expr.value + '"' : String(expr.value);
      case 'identifier': return expr.name;
      case 'binaryOp': return '(' + _exprToSource(expr.left) + ' ' + expr.operator + ' ' + _exprToSource(expr.right) + ')';
      case 'unaryOp': return expr.prefix ? expr.operator + _exprToSource(expr.operand) : _exprToSource(expr.operand) + expr.operator;
      case 'funcCallExpr': return expr.name + '(' + expr.args.map(_exprToSource).join(', ') + ')';
      case 'methodCall': return _exprToSource(expr.object) + '.' + expr.method + '(' + expr.args.map(_exprToSource).join(', ') + ')';
      case 'propertyAccess': return _exprToSource(expr.object) + '.' + expr.property;
      case 'indexAccess': return _exprToSource(expr.object) + '[' + _exprToSource(expr.index) + ']';
      case 'arrayLiteral': return '[' + expr.elements.map(_exprToSource).join(', ') + ']';
      case 'ternary': return _exprToSource(expr.condition) + ' ? ' + _exprToSource(expr.thenExpr) + ' : ' + _exprToSource(expr.elseExpr);
      case 'nullLiteral': return 'null';
      case 'boolLiteral': return expr.value ? 'true' : 'false';
      default: return '/* unknown expr */';
    }
  }

  // ─── ID Generator ─────────────────────────────────────────────────

  function _genId(prefix) {
    _idCounter++;
    return (prefix || 'node') + '-' + _idCounter + '-' + Math.random().toString(36).substr(2, 4);
  }

  // ─── Block Registration ───────────────────────────────────────────

  function registerBlock(def) {
    if (!def || !def.id || !def.label) {
      throw new Error('[BlockCodigo] Block requires id and label');
    }
    var block = {
      id: def.id,
      label: def.label,
      category: def.category || 'custom',
      description: def.description || '',
      color: def.color || '#C96B4B',
      shape: def.shape || 'stack',
      ports: (def.ports || []).map(function (p) {
        return { id: p.id, label: p.label || p.id, type: p.type || 'any', direction: p.direction || 'input' };
      }),
      toCode: def.toCode || function () { return ''; },
      fromIR: def.fromIR || null,
      icon: def.icon || null,
    };
    _blockDefs.set(def.id, block);
    return block;
  }

  function unregisterBlock(id) {
    _blockDefs.delete(id);
  }

  function getBlock(id) { return _blockDefs.get(id) || null; }
  function getBlocks() { return Array.from(_blockDefs.values()); }

  function getBlocksByCategory(category) {
    return Array.from(_blockDefs.values()).filter(function (b) { return b.category === category; });
  }

  function searchBlocks(query) {
    if (!query) return getBlocks();
    var q = query.toLowerCase();
    return Array.from(_blockDefs.values()).filter(function (b) {
      return b.label.toLowerCase().indexOf(q) >= 0 || b.id.indexOf(q) >= 0;
    });
  }

  function getCategories() {
    var cats = {};
    Object.keys(BUILTIN_CATEGORIES).forEach(function (k) {
      cats[k] = Object.assign({}, BUILTIN_CATEGORIES[k], { blocks: getBlocksByCategory(k) });
    });
    return cats;
  }

  function registerCategory(id, def) {
    BUILTIN_CATEGORIES[id] = { label: def.label, color: def.color || '#888', icon: def.icon || 'folder' };
  }

  // ─── Block Instance Creation ──────────────────────────────────────

  function createBlockInstance(blockId, position) {
    var def = _blockDefs.get(blockId);
    if (!def) throw new Error('[BlockCodigo] Unknown block: ' + blockId);
    var data = { fields: {} };
    def.ports.forEach(function (p) {
      if (p.direction === 'input') {
        data.fields[p.id] = '';
      }
    });
    return {
      id: _genId(blockId),
      type: 'block',
      position: position || { x: 100, y: 100 },
      data: {
        blockType: def.id,
        label: def.label,
        color: def.color,
        shape: def.shape,
        fields: data.fields,
        category: def.category,
      },
    };
  }

  // ─── SVG Rendering ────────────────────────────────────────────────

  function _shapePath(shape, w, h) {
    var r = 8;
    switch (shape) {
      case 'hat':
        return 'M 0 ' + r + ' Q 0 0 ' + r + ' 0 L ' + (w - r) + ' 0 Q ' + w + ' 0 ' + w + ' ' + r +
               ' L ' + w + ' ' + (h - r) + ' Q ' + w + ' ' + h + ' ' + (w - r) + ' ' + h +
               ' L ' + r + ' ' + h + ' Q 0 ' + h + ' 0 ' + (h - r) + ' Z';
      case 'reporter':
        var rr = h / 2;
        return 'M ' + rr + ' 0 L ' + (w - rr) + ' 0 A ' + rr + ' ' + rr + ' 0 0 1 ' + (w - rr) + ' ' + h +
               ' L ' + rr + ' ' + h + ' A ' + rr + ' ' + rr + ' 0 0 1 ' + rr + ' 0 Z';
      case 'boolean':
        return 'M 12 0 L ' + (w - 12) + ' 0 L ' + w + ' ' + (h / 2) + ' L ' + (w - 12) + ' ' + h +
               ' L 12 ' + h + ' L 0 ' + (h / 2) + ' Z';
      case 'c-block':
        return 'M 0 ' + r + ' Q 0 0 ' + r + ' 0 L ' + (w - r) + ' 0 Q ' + w + ' 0 ' + w + ' ' + r +
               ' L ' + w + ' ' + (h - r) + ' Q ' + w + ' ' + h + ' ' + (w - r) + ' ' + h +
               ' L ' + r + ' ' + h + ' Q 0 ' + h + ' 0 ' + (h - r) + ' Z';
      case 'cap':
        return 'M 0 ' + r + ' Q 0 0 ' + r + ' 0 L ' + (w - r) + ' 0 Q ' + w + ' 0 ' + w + ' ' + r +
               ' L ' + w + ' ' + h + ' L 0 ' + h + ' Z';
      default: // stack
        return 'M 0 ' + r + ' Q 0 0 ' + r + ' 0 L ' + (w - r) + ' 0 Q ' + w + ' 0 ' + w + ' ' + r +
               ' L ' + w + ' ' + (h - r) + ' Q ' + w + ' ' + h + ' ' + (w - r) + ' ' + h +
               ' L ' + r + ' ' + h + ' Q 0 ' + h + ' 0 ' + (h - r) + ' Z';
    }
  }

  function renderBlockSVG(blockDef, options) {
    options = options || {};
    var w = options.width || 200;
    var h = options.height || 40;
    var x = options.x || 0;
    var y = options.y || 0;

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

    // Shadow
    var shadow = document.createElementNS(svgNS, 'path');
    shadow.setAttribute('d', _shapePath(blockDef.shape, w, h));
    shadow.setAttribute('fill', 'rgba(0,0,0,0.1)');
    shadow.setAttribute('transform', 'translate(2, 2)');
    svg.appendChild(shadow);

    // Block body
    var path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', _shapePath(blockDef.shape, w, h));
    path.setAttribute('fill', blockDef.color);
    path.setAttribute('stroke', '#fff');
    path.setAttribute('stroke-width', '1.5');
    svg.appendChild(path);

    // Label
    var text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', w / 2);
    text.setAttribute('y', h / 2 + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.setAttribute('font-size', '13');
    text.setAttribute('font-weight', '600');
    text.textContent = blockDef.label;
    svg.appendChild(text);

    // Port dots
    blockDef.ports.forEach(function (port, i) {
      if (port.direction === 'input') {
        var dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('cx', 8);
        dot.setAttribute('cy', 12 + i * 14);
        dot.setAttribute('r', 4);
        dot.setAttribute('fill', '#fff');
        dot.setAttribute('stroke', blockDef.color);
        dot.setAttribute('stroke-width', '1.5');
        svg.appendChild(dot);
      }
    });

    return svg;
  }

  function renderBlocks(container, nodes, edges) {
    if (!container) return;
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.background = '#FAF3E6';
    container.style.backgroundImage = 'radial-gradient(circle, #ddd 1px, transparent 1px)';
    container.style.backgroundSize = '20px 20px';
    container.style.minHeight = '400px';
    container.style.overflow = 'auto';

    // Group nodes by position to find max dimensions
    var maxX = 0, maxY = 0;
    nodes.forEach(function (n) {
      if (n.position.x + 220 > maxX) maxX = n.position.x + 220;
      if (n.position.y + 50 > maxY) maxY = n.position.y + 50;
    });

    var canvas = document.createElement('div');
    canvas.style.position = 'relative';
    canvas.style.width = (maxX + 100) + 'px';
    canvas.style.height = (maxY + 100) + 'px';

    // SVG layer for edges
    var svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgLayer.style.position = 'absolute';
    svgLayer.style.top = '0';
    svgLayer.style.left = '0';
    svgLayer.style.width = '100%';
    svgLayer.style.height = '100%';
    svgLayer.style.pointerEvents = 'none';

    // Render nodes
    nodes.forEach(function (node) {
      var def = _blockDefs.get(node.data ? node.data.blockType : node.type);
      if (!def) return;

      var wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.left = node.position.x + 'px';
      wrapper.style.top = node.position.y + 'px';
      wrapper.style.cursor = 'grab';
      wrapper.setAttribute('data-block-id', node.id);

      var svg = renderBlockSVG(def, { width: 200, height: 40 });
      wrapper.appendChild(svg);
      canvas.appendChild(wrapper);
    });

    // Render edges as SVG paths
    if (edges && edges.length) {
      var nodeMap = {};
      nodes.forEach(function (n) { nodeMap[n.id] = n; });

      edges.forEach(function (edge) {
        var src = nodeMap[edge.source];
        var tgt = nodeMap[edge.target];
        if (!src || !tgt) return;

        var x1 = src.position.x + 200;
        var y1 = src.position.y + 20;
        var x2 = tgt.position.x;
        var y2 = tgt.position.y + 20;

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var midX = (x1 + x2) / 2;
        path.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + midX + ' ' + y1 + ' ' + midX + ' ' + y2 + ' ' + x2 + ' ' + y2);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#999');
        path.setAttribute('stroke-width', '2');
        svgLayer.appendChild(path);
      });
    }

    canvas.appendChild(svgLayer);
    container.appendChild(canvas);

    // Make nodes draggable
    _makeDraggable(canvas);

    return { nodes: nodes, edges: edges || [] };
  }

  function _makeDraggable(canvas) {
    var children = canvas.querySelectorAll('[data-block-id]');
    children.forEach(function (el) {
      var startX, startY, origLeft, origTop;

      el.addEventListener('mousedown', function (e) {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        origLeft = parseInt(el.style.left) || 0;
        origTop = parseInt(el.style.top) || 0;
        el.style.cursor = 'grabbing';
        el.style.zIndex = '1000';

        function onMove(ev) {
          el.style.left = (origLeft + ev.clientX - startX) + 'px';
          el.style.top = (origTop + ev.clientY - startY) + 'px';
        }
        function onUp() {
          el.style.cursor = 'grab';
          el.style.zIndex = '';
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        }
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
    });
  }

  // ─── IR to Blocks Conversion ──────────────────────────────────────

  function _findBlockForNode(node) {
    // Try each registered block's fromIR
    var blocks = Array.from(_blockDefs.values());
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].fromIR) {
        var result = blocks[i].fromIR(node);
        if (result) return { blockDef: blocks[i], fields: result.fields || {} };
      }
    }
    return null;
  }

  function convertIRToBlocks(irModule) {
    if (!irModule || !irModule.stmts) return { nodes: [], edges: [] };

    var nodes = [];
    var edges = [];
    var yOffset = 20;

    irModule.stmts.forEach(function (stmt) {
      var matched = _findBlockForNode(stmt);
      if (matched) {
        var nodeId = _genId(matched.blockDef.id);
        nodes.push({
          id: nodeId,
          type: 'block',
          position: { x: 40, y: yOffset },
          data: {
            blockType: matched.blockDef.id,
            label: matched.blockDef.label,
            color: matched.blockDef.color,
            shape: matched.blockDef.shape,
            fields: matched.fields,
            category: matched.blockDef.category,
          },
        });

        // Connect to previous node
        if (nodes.length > 1) {
          edges.push({
            id: 'e-' + nodes[nodes.length - 2].id + '-' + nodeId,
            source: nodes[nodes.length - 2].id,
            target: nodeId,
            sourceHandle: 'next',
            targetHandle: 'prev',
          });
        }

        yOffset += 60;
      }
    });

    return { nodes: nodes, edges: edges };
  }

  // ─── Blocks to IR Conversion ──────────────────────────────────────

  function _sourceToExpr(source) {
    if (!source) return { kind: 'literal', value: '' };
    source = source.trim();
    // Number
    if (/^-?\d+(\.\d+)?$/.test(source)) return { kind: 'literal', value: parseFloat(source) };
    // Boolean
    if (source === 'true') return { kind: 'literal', value: true };
    if (source === 'false') return { kind: 'literal', value: false };
    // String in quotes
    if (/^["'].*["']$/.test(source)) return { kind: 'literal', value: source.slice(1, -1) };
    // Binary op
    var ops = ['===', '!==', '>=', '<=', '>', '<', '&&', '||', '+', '-', '*', '/', '%'];
    for (var i = 0; i < ops.length; i++) {
      var idx = source.indexOf(' ' + ops[i] + ' ');
      if (idx > 0) {
        return {
          kind: 'binaryOp',
          left: _sourceToExpr(source.substring(0, idx)),
          operator: ops[i],
          right: _sourceToExpr(source.substring(idx + ops[i].length + 2)),
        };
      }
    }
    // Function call
    var callMatch = source.match(/^(\w+)\((.*)\)$/);
    if (callMatch) {
      return {
        kind: 'funcCallExpr',
        name: callMatch[1],
        args: callMatch[2] ? callMatch[2].split(',').map(function (a) { return _sourceToExpr(a.trim()); }) : [],
      };
    }
    // Identifier
    if (/^[a-zA-Z_]\w*$/.test(source)) return { kind: 'identifier', name: source };
    // Default literal
    return { kind: 'literal', value: source };
  }

  function convertBlocksToIR(nodes, edges) {
    var stmts = [];

    nodes.forEach(function (node) {
      var blockDef = _blockDefs.get(node.data ? node.data.blockType : node.type);
      if (!blockDef) return;

      var fields = (node.data && node.data.fields) || {};
      var blockId = node.data ? node.data.blockType : node.type;

      switch (blockId) {
        case 'print':
          stmts.push({ kind: 'print', args: [_sourceToExpr(fields.message)], newline: true });
          break;
        case 'set-variable':
          stmts.push({
            kind: 'varDecl',
            name: fields.name || 'x',
            value: _sourceToExpr(fields.value),
            isConst: false,
          });
          break;
        case 'increment-variable':
          stmts.push({
            kind: 'assign',
            target: { kind: 'identifier', name: fields.name || 'x' },
            value: _sourceToExpr(fields.amount || '1'),
            operator: '+=',
          });
          break;
        case 'if':
          stmts.push({
            kind: 'ifElse',
            condition: _sourceToExpr(fields.condition),
            thenBody: [],
            elifs: [],
          });
          break;
        case 'if-else':
          stmts.push({
            kind: 'ifElse',
            condition: _sourceToExpr(fields.condition),
            thenBody: [],
            elifs: [],
            elseBody: [],
          });
          break;
        case 'while-loop':
          stmts.push({
            kind: 'whileLoop',
            condition: _sourceToExpr(fields.condition),
            body: [],
          });
          break;
        case 'for-loop':
          stmts.push({
            kind: 'forLoop',
            init: { kind: 'varDecl', name: fields.variable || 'i', value: _sourceToExpr(fields.from || '0'), isConst: false },
            condition: {
              kind: 'binaryOp',
              left: { kind: 'identifier', name: fields.variable || 'i' },
              operator: '<',
              right: _sourceToExpr(fields.to || '10'),
            },
            update: {
              kind: 'assign',
              target: { kind: 'identifier', name: fields.variable || 'i' },
              value: { kind: 'literal', value: 1 },
              operator: '+=',
            },
            body: [],
          });
          break;
        case 'for-each':
          stmts.push({
            kind: 'forEachLoop',
            variable: fields.variable || 'item',
            iterable: _sourceToExpr(fields.iterable),
            body: [],
          });
          break;
        case 'define-function':
          stmts.push({
            kind: 'funcDef',
            name: fields.name || 'miFuncion',
            params: (fields.params || '').split(',').filter(Boolean).map(function (p) {
              return { name: p.trim(), isSpread: false };
            }),
            body: [],
            isAsync: false,
            isStatic: false,
          });
          break;
        case 'call-function':
          stmts.push({
            kind: 'funcCall',
            name: fields.name || 'miFuncion',
            args: fields.args ? fields.args.split(',').map(function (a) { return _sourceToExpr(a.trim()); }) : [],
          });
          break;
        case 'return':
          stmts.push({
            kind: 'return',
            value: fields.value ? _sourceToExpr(fields.value) : undefined,
          });
          break;
        case 'define-class':
          stmts.push({
            kind: 'classDef',
            name: fields.name || 'MiClase',
            superClass: fields.parent || undefined,
            body: [],
          });
          break;
        case 'array-push':
          stmts.push({
            kind: 'methodCall',
            object: _sourceToExpr(fields.array),
            method: 'push',
            args: [_sourceToExpr(fields.value)],
          });
          break;
        default:
          // Try toCode for custom blocks
          if (blockDef.toCode) {
            var code = blockDef.toCode(fields);
            stmts.push({ kind: 'exprStmt', expr: { kind: 'literal', value: code } });
          }
          break;
      }
    });

    return { kind: 'module', stmts: stmts, sourceLanguage: 'javascript' };
  }

  // ─── Code to Blocks (simplified) ─────────────────────────────────

  function convertCodeToBlocks(code, language) {
    // Simple regex-based extraction for demo
    var nodes = [];
    var edges = [];
    var yOffset = 20;

    var lines = code.split('\n');
    lines.forEach(function (line) {
      line = line.trim();
      if (!line) return;

      // console.log(...)
      var printMatch = line.match(/^console\.log\((.+)\);?$/);
      if (printMatch) {
        var id = _genId('print');
        nodes.push({
          id: id, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'print', label: 'Imprimir', color: '#874418', shape: 'stack', fields: { message: printMatch[1] }, category: 'io' },
        });
        yOffset += 60;
      }

      // var x = ...
      var varMatch = line.match(/^(?:var|let|const)\s+(\w+)\s*=\s*(.+);?$/);
      if (varMatch) {
        var id2 = _genId('set-variable');
        nodes.push({
          id: id2, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'set-variable', label: 'Establecer variable', color: '#9A9088', shape: 'stack', fields: { name: varMatch[1], value: varMatch[2] }, category: 'variables' },
        });
        yOffset += 60;
      }

      // if (...)
      var ifMatch = line.match(/^if\s*\((.+)\)\s*\{?$/);
      if (ifMatch) {
        var id3 = _genId('if');
        nodes.push({
          id: id3, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'if', label: 'Si', color: '#C96B4B', shape: 'c-block', fields: { condition: ifMatch[1] }, category: 'control' },
        });
        yOffset += 60;
      }

      // for (var i = 0; i < N; i++)
      var forMatch = line.match(/^for\s*\(\s*(?:var|let|const)\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)/);
      if (forMatch) {
        var id4 = _genId('for-loop');
        nodes.push({
          id: id4, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'for-loop', label: 'Para', color: '#C96B4B', shape: 'c-block', fields: { variable: forMatch[1], from: forMatch[2], to: forMatch[3] }, category: 'control' },
        });
        yOffset += 60;
      }

      // while (...)
      var whileMatch = line.match(/^while\s*\((.+)\)\s*\{?$/);
      if (whileMatch) {
        var id5 = _genId('while-loop');
        nodes.push({
          id: id5, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'while-loop', label: 'Mientras', color: '#C96B4B', shape: 'c-block', fields: { condition: whileMatch[1] }, category: 'control' },
        });
        yOffset += 60;
      }

      // function name(params) {
      var funcMatch = line.match(/^function\s+(\w+)\s*\(([^)]*)\)\s*\{?$/);
      if (funcMatch) {
        var id6 = _genId('define-function');
        nodes.push({
          id: id6, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'define-function', label: 'Definir función', color: '#D97B2E', shape: 'c-block', fields: { name: funcMatch[1], params: funcMatch[2] }, category: 'functions' },
        });
        yOffset += 60;
      }

      // functionCall(args);
      var callMatch = line.match(/^(\w+)\(([^)]*)\);?$/);
      if (callMatch && !['if', 'for', 'while', 'function'].includes(callMatch[1])) {
        var id7 = _genId('call-function');
        nodes.push({
          id: id7, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'call-function', label: 'Llamar función', color: '#D97B2E', shape: 'stack', fields: { name: callMatch[1], args: callMatch[2] }, category: 'functions' },
        });
        yOffset += 60;
      }

      // return ...
      var retMatch = line.match(/^return\s+(.+);?$/);
      if (retMatch) {
        var id8 = _genId('return');
        nodes.push({
          id: id8, type: 'block', position: { x: 40, y: yOffset },
          data: { blockType: 'return', label: 'Retornar', color: '#D97B2E', shape: 'cap', fields: { value: retMatch[1] }, category: 'functions' },
        });
        yOffset += 60;
      }
    });

    // Connect sequentially
    for (var i = 1; i < nodes.length; i++) {
      edges.push({
        id: 'e-' + nodes[i - 1].id + '-' + nodes[i].id,
        source: nodes[i - 1].id,
        target: nodes[i].id,
        sourceHandle: 'next',
        targetHandle: 'prev',
      });
    }

    return { nodes: nodes, edges: edges };
  }

  // ─── Block Palette Rendering ──────────────────────────────────────

  function renderPalette(container, category) {
    if (!container) return;
    container.innerHTML = '';

    var blocks = category ? getBlocksByCategory(category) : getBlocks();
    var grouped = {};
    blocks.forEach(function (b) {
      if (!grouped[b.category]) grouped[b.category] = [];
      grouped[b.category].push(b);
    });

    Object.keys(grouped).forEach(function (cat) {
      var catInfo = BUILTIN_CATEGORIES[cat] || { label: cat, color: '#888' };
      var header = document.createElement('div');
      header.style.cssText = 'padding:8px 12px;font-weight:600;font-size:12px;color:' + catInfo.color + ';text-transform:uppercase;letter-spacing:0.5px;margin-top:8px';
      header.textContent = catInfo.label;
      container.appendChild(header);

      grouped[cat].forEach(function (blockDef) {
        var item = document.createElement('div');
        item.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 12px;cursor:grab;border-radius:6px;transition:background 0.15s';
        item.addEventListener('mouseenter', function () { item.style.background = '#F0E6D8'; });
        item.addEventListener('mouseleave', function () { item.style.background = 'transparent'; });

        var colorDot = document.createElement('div');
        colorDot.style.cssText = 'width:12px;height:12px;border-radius:3px;background:' + blockDef.color + ';flex-shrink:0';
        item.appendChild(colorDot);

        var label = document.createElement('span');
        label.style.cssText = 'font-size:13px;color:#1F2937';
        label.textContent = blockDef.label;
        item.appendChild(label);

        if (blockDef.description) {
          item.title = blockDef.description;
        }

        // Drag support
        item.draggable = true;
        item.addEventListener('dragstart', function (e) {
          e.dataTransfer.setData('text/plain', blockDef.id);
          e.dataTransfer.effectAllowed = 'copy';
        });

        container.appendChild(item);
      });
    });
  }

  // ─── Initialize Built-in Blocks ───────────────────────────────────

  function _init() {
    BUILTIN_BLOCKS.forEach(function (def) {
      registerBlock(def);
    });
  }

  _init();

  // ─── Public API ───────────────────────────────────────────────────

  global.BlockCodigo = {
    version: VERSION,

    // Blocks
    registerBlock: registerBlock,
    unregisterBlock: unregisterBlock,
    getBlock: getBlock,
    getBlocks: getBlocks,
    getBlocksByCategory: getBlocksByCategory,
    searchBlocks: searchBlocks,

    // Categories
    getCategories: getCategories,
    registerCategory: registerCategory,
    builtinCategories: BUILTIN_CATEGORIES,

    // Instances
    createBlockInstance: createBlockInstance,

    // Rendering
    renderBlockSVG: renderBlockSVG,
    renderBlocks: renderBlocks,
    renderPalette: renderPalette,

    // Conversion
    convertIRToBlocks: convertIRToBlocks,
    convertBlocksToIR: convertBlocksToIR,
    convertCodeToBlocks: convertCodeToBlocks,

    // Helpers
    generateId: _genId,
    exprToSource: _exprToSource,
  };

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
