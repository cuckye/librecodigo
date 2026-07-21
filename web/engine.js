"use strict";
var LibreCodigoEngine = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // src/web-engine.ts
  var web_engine_exports = {};
  __export(web_engine_exports, {
    BatchParser: () => BatchParser,
    BlockResolver: () => BlockResolver,
    IRToBlocksConverter: () => IRToBlocksConverter,
    JavaScriptParser: () => JavaScriptParser,
    MultiLanguageEmitter: () => MultiLanguageEmitter,
    PythonParser: () => PythonParser,
    blockDefs: () => blockDefs,
    blockLibrary: () => blockLibrary,
    createEventBus: () => createEventBus,
    getEventBus: () => getEventBus,
    ir: () => ir
  });

  // src/ir/types.ts
  function makeModule(stmts, sourceLanguage) {
    return { kind: "module", stmts, sourceLanguage };
  }
  function makeComment(text) {
    return { kind: "comment", text };
  }
  function makeLiteral(value, typeHint) {
    return { kind: "literal", value, typeHint };
  }
  function makeIdent(name) {
    return { kind: "identifier", name };
  }
  function makeBinOp(left, operator, right) {
    return { kind: "binaryOp", left, operator, right };
  }
  function makeUnaryOp(operator, operand, prefix = true) {
    return { kind: "unaryOp", operator, operand, prefix };
  }
  function makeFuncCall(name, args) {
    return { kind: "funcCall", name, args };
  }
  function makeFuncCallExpr(name, args) {
    return { kind: "funcCallExpr", name, args };
  }
  function makeMethodCall(object, method, args) {
    return { kind: "methodCall", object, method, args };
  }
  function makePropAccess(object, property) {
    return { kind: "propertyAccess", object, property };
  }
  function makeIndexAccess(object, index) {
    return { kind: "indexAccess", object, index };
  }
  function makeArrayLit(elements) {
    return { kind: "arrayLiteral", elements };
  }
  function makeDictLit(entries) {
    return { kind: "dictLiteral", entries };
  }
  function makeStringInterp(parts) {
    return { kind: "stringInterp", parts };
  }
  function makeTernary(condition, thenExpr, elseExpr) {
    return { kind: "ternary", condition, thenExpr, elseExpr };
  }
  function makeTypeCast(expr, targetType) {
    return { kind: "typeCast", expr, targetType };
  }
  function makeVarDecl(name, value, options) {
    return {
      kind: "varDecl",
      name,
      type: options?.type,
      value,
      isConst: options?.isConst ?? false
    };
  }
  function makeAssign(target, value, operator = "=") {
    return { kind: "assign", target, value, operator };
  }
  function makePrint(args, newline = true) {
    return { kind: "print", args, newline };
  }
  function makeReturn(value) {
    return { kind: "return", value };
  }
  function makeIfElse(condition, thenBody, elifs = [], elseBody) {
    return { kind: "ifElse", condition, thenBody, elifs, elseBody };
  }
  function makeWhileLoop(condition, body) {
    return { kind: "whileLoop", condition, body };
  }
  function makeForLoop(body, options) {
    return {
      kind: "forLoop",
      init: options?.init,
      condition: options?.condition,
      update: options?.update,
      body
    };
  }
  function makeForEach(variable, iterable, body) {
    return { kind: "forEachLoop", variable, iterable, body };
  }
  function makeFuncDef(name, params, body, options) {
    return {
      kind: "funcDef",
      name,
      params,
      returnType: options?.returnType,
      body,
      isAsync: options?.isAsync ?? false,
      isStatic: options?.isStatic ?? false,
      access: options?.access
    };
  }
  function makeClassDef(name, body, options) {
    return {
      kind: "classDef",
      name,
      super: options?.super,
      interfaces: options?.interfaces,
      body,
      access: options?.access
    };
  }
  function makeTryCatch(tryBody, options) {
    return {
      kind: "tryCatch",
      tryBody,
      catchVar: options?.catchVar,
      catchBody: options?.catchBody,
      finallyBody: options?.finallyBody
    };
  }
  function makeBlock(stmts) {
    return { kind: "block", stmts };
  }
  function makeExprStmt(expr) {
    return { kind: "exprStmt", expr };
  }
  function makeEmpty() {
    return { kind: "empty" };
  }
  function makeImport(module, options) {
    return { kind: "import", module, alias: options?.alias, items: options?.items };
  }
  function makeFileWrite(path, content, append = false) {
    return { kind: "fileWrite", path, content, append };
  }
  function makeWait(duration) {
    return { kind: "wait", duration };
  }
  function makeRange(start, end, options) {
    return {
      kind: "range",
      start,
      end,
      step: options?.step,
      inclusive: options?.inclusive ?? false
    };
  }
  function makeNew(className, args = []) {
    return { kind: "new", className, args };
  }
  var ir = {
    module: makeModule,
    comment: makeComment,
    literal: makeLiteral,
    ident: makeIdent,
    binop: makeBinOp,
    unaryop: makeUnaryOp,
    funcCall: makeFuncCall,
    funcCallExpr: makeFuncCallExpr,
    methodCall: makeMethodCall,
    propAccess: makePropAccess,
    indexAccess: makeIndexAccess,
    arrayLit: makeArrayLit,
    dictLit: makeDictLit,
    stringInterp: makeStringInterp,
    ternary: makeTernary,
    typeCast: makeTypeCast,
    varDecl: makeVarDecl,
    assign: makeAssign,
    print: makePrint,
    ret: makeReturn,
    ifElse: makeIfElse,
    whileLoop: makeWhileLoop,
    forLoop: makeForLoop,
    forEach: makeForEach,
    funcDef: makeFuncDef,
    classDef: makeClassDef,
    tryCatch: makeTryCatch,
    block: makeBlock,
    exprStmt: makeExprStmt,
    empty: makeEmpty,
    import: makeImport,
    fileWrite: makeFileWrite,
    wait: makeWait,
    range: makeRange,
    new: makeNew
  };

  // src/languages/python/parser.ts
  var KEYWORDS = /* @__PURE__ */ new Set([
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "nonlocal",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield",
    "match",
    "case"
  ]);
  var TWO_CHAR_OPS = /* @__PURE__ */ new Set([
    "**",
    "//",
    "==",
    "!=",
    "<=",
    ">=",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "->",
    ":=",
    "**=",
    "//=",
    ">>",
    "<<"
  ]);
  var Tokenizer = class {
    constructor(src) {
      __publicField(this, "src");
      __publicField(this, "pos", 0);
      __publicField(this, "line", 1);
      __publicField(this, "col", 1);
      __publicField(this, "indentStack", [0]);
      __publicField(this, "parenDepth", 0);
      __publicField(this, "pendingDedents", 0);
      __publicField(this, "tokens", []);
      this.src = src;
    }
    peek() {
      return this.pos < this.src.length ? this.src[this.pos] : "\0";
    }
    peek2() {
      return this.pos + 1 < this.src.length ? this.src[this.pos + 1] : "\0";
    }
    advance() {
      const ch = this.src[this.pos++];
      if (ch === "\n") {
        this.line++;
        this.col = 1;
      } else {
        this.col++;
      }
      return ch;
    }
    add(kind, value, line, col) {
      this.tokens.push({ kind, value, line, col });
    }
    skipSpacesAndTabs() {
      let count = 0;
      while (this.pos < this.src.length && (this.peek() === " " || this.peek() === "	")) {
        count += this.peek() === "	" ? 4 : 1;
        this.advance();
      }
      return count;
    }
    handleNewline() {
      if (this.parenDepth > 0) return;
      this.advance();
      while (this.pos < this.src.length && (this.peek() === "\r" || this.peek() === "\n")) {
        this.advance();
      }
      if (this.pos < this.src.length && (this.peek() === " " || this.peek() === "	" || this.peek() === "#")) {
        if (this.peek() === "#") {
          return;
        }
        const indent = this.skipSpacesAndTabs();
        const current = this.indentStack[this.indentStack.length - 1];
        if (indent > current) {
          this.indentStack.push(indent);
          this.add("INDENT", String(indent), this.line, this.col);
        } else if (indent < current) {
          while (this.indentStack.length > 1 && this.indentStack[this.indentStack.length - 1] > indent) {
            this.indentStack.pop();
            this.pendingDedents++;
          }
        }
      } else if (this.pos < this.src.length && this.peek() !== "\0") {
        if (this.indentStack.length > 1) {
          while (this.indentStack.length > 1) {
            this.indentStack.pop();
            this.pendingDedents++;
          }
        }
      }
    }
    tokenize() {
      while (this.pos < this.src.length) {
        if (this.pendingDedents > 0) {
          this.pendingDedents--;
          this.add("DEDENT", "", this.line, this.col);
          continue;
        }
        const ch = this.peek();
        if (ch === "\n") {
          this.add("NEWLINE", "\\n", this.line, this.col);
          this.handleNewline();
          continue;
        }
        if (ch === "\r") {
          this.advance();
          continue;
        }
        if (ch === " " || ch === "	") {
          this.advance();
          continue;
        }
        if (ch === "#") {
          this.advance();
          while (this.pos < this.src.length && this.peek() !== "\n") {
            this.advance();
          }
          continue;
        }
        if (ch === "\\") {
          if (this.peek2() === "\n") {
            this.advance();
            this.advance();
            continue;
          }
        }
        if (ch === '"' || ch === "'") {
          this.tokenizeString(ch);
          continue;
        }
        if (ch === "." && this.pos + 1 < this.src.length && this.src[this.pos + 1] >= "0" && this.src[this.pos + 1] <= "9") {
          this.tokenizeNumber();
          continue;
        }
        if (ch >= "0" && ch <= "9") {
          this.tokenizeNumber();
          continue;
        }
        if (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch === "_") {
          this.tokenizeIdent();
          continue;
        }
        if (ch === "(") {
          this.parenDepth++;
          this.add("LPAREN", "(", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === ")") {
          this.parenDepth = Math.max(0, this.parenDepth - 1);
          this.add("RPAREN", ")", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === "[") {
          this.parenDepth++;
          this.add("LBRACKET", "[", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === "]") {
          this.parenDepth = Math.max(0, this.parenDepth - 1);
          this.add("RBRACKET", "]", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === "{") {
          this.parenDepth++;
          this.add("LBRACE", "{", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === "}") {
          this.parenDepth = Math.max(0, this.parenDepth - 1);
          this.add("RBRACE", "}", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === ":") {
          this.add("COLON", ":", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === ",") {
          this.add("COMMA", ",", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === ".") {
          this.add("DOT", ".", this.line, this.col);
          this.advance();
          continue;
        }
        if (ch === "=") {
          if (this.peek2() === "=") {
            this.add("OP", "==", this.line, this.col);
            this.advance();
            this.advance();
          } else {
            this.add("EQUALS", "=", this.line, this.col);
            this.advance();
          }
          continue;
        }
        if (ch === "!" && this.peek2() === "=") {
          this.add("OP", "!=", this.line, this.col);
          this.advance();
          this.advance();
          continue;
        }
        const two = ch + this.peek2();
        if (TWO_CHAR_OPS.has(two)) {
          this.add("OP", two, this.line, this.col);
          this.advance();
          this.advance();
          continue;
        }
        if ("+-*/%<>~&|^@".includes(ch)) {
          this.add("OP", ch, this.line, this.col);
          this.advance();
          continue;
        }
        this.advance();
      }
      while (this.indentStack.length > 1) {
        this.indentStack.pop();
        this.add("DEDENT", "", this.line, this.col);
      }
      this.add("EOF", "", this.line, this.col);
      return this.tokens;
    }
    tokenizeString(quote) {
      const line = this.line;
      const col = this.col;
      this.advance();
      if (this.peek() === quote && this.peek2() === quote) {
        this.advance();
        this.advance();
        let value2 = "";
        while (this.pos < this.src.length) {
          if (this.peek() === quote && this.peek2() === quote && this.src[this.pos + 2] === quote) {
            this.advance();
            this.advance();
            this.advance();
            break;
          }
          if (this.peek() === "\\") {
            this.advance();
            if (this.pos < this.src.length) {
              value2 += this.advance();
            }
            continue;
          }
          value2 += this.advance();
        }
        this.add("STRING", value2, line, col);
        return;
      }
      let value = "";
      while (this.pos < this.src.length && this.peek() !== "\n") {
        if (this.peek() === "\\") {
          this.advance();
          if (this.pos < this.src.length) {
            const esc = this.advance();
            switch (esc) {
              case "n":
                value += "\n";
                break;
              case "t":
                value += "	";
                break;
              case "r":
                value += "\r";
                break;
              case "\\":
                value += "\\";
                break;
              case "'":
                value += "'";
                break;
              case '"':
                value += '"';
                break;
              case "0":
                value += "\0";
                break;
              default:
                value += esc;
            }
          }
          continue;
        }
        if (this.peek() === quote) {
          this.advance();
          break;
        }
        value += this.advance();
      }
      this.add("STRING", value, line, col);
    }
    tokenizeNumber() {
      const line = this.line;
      const col = this.col;
      let value = "";
      if (this.peek() === "0" && (this.peek2() === "x" || this.peek2() === "X")) {
        value += this.advance();
        value += this.advance();
        while (this.pos < this.src.length && /[0-9a-fA-F_]/.test(this.peek())) {
          value += this.advance();
        }
      } else if (this.peek() === "0" && (this.peek2() === "b" || this.peek2() === "B")) {
        value += this.advance();
        value += this.advance();
        while (this.pos < this.src.length && /[01_]/.test(this.peek())) {
          value += this.advance();
        }
      } else if (this.peek() === "0" && (this.peek2() === "o" || this.peek2() === "O")) {
        value += this.advance();
        value += this.advance();
        while (this.pos < this.src.length && /[0-7_]/.test(this.peek())) {
          value += this.advance();
        }
      } else {
        while (this.pos < this.src.length && /[0-9_]/.test(this.peek())) {
          value += this.advance();
        }
        if (this.peek() === "." && this.peek2() !== "." && !(this.pos + 2 < this.src.length && this.src[this.pos + 1] === "_" && this.src[this.pos + 2] === "_")) {
          value += this.advance();
          while (this.pos < this.src.length && /[0-9_]/.test(this.peek())) {
            value += this.advance();
          }
        }
        if (this.peek() === "e" || this.peek() === "E") {
          value += this.advance();
          if (this.peek() === "+" || this.peek() === "-") {
            value += this.advance();
          }
          while (this.pos < this.src.length && /[0-9_]/.test(this.peek())) {
            value += this.advance();
          }
        }
      }
      if (this.peek() === "j" || this.peek() === "J") {
        value += this.advance();
      }
      this.add("NUMBER", value, line, col);
    }
    tokenizeIdent() {
      const line = this.line;
      const col = this.col;
      let value = "";
      while (this.pos < this.src.length && (this.peek() >= "a" && this.peek() <= "z" || this.peek() >= "A" && this.peek() <= "Z" || this.peek() >= "0" && this.peek() <= "9" || this.peek() === "_")) {
        value += this.advance();
      }
      if (KEYWORDS.has(value)) {
        this.add("KEYWORD", value, line, col);
      } else {
        this.add("IDENT", value, line, col);
      }
    }
  };
  var Parser = class _Parser {
    constructor(tokens) {
      __publicField(this, "tokens");
      __publicField(this, "pos", 0);
      this.tokens = tokens;
    }
    peek() {
      return this.tokens[this.pos] || { kind: "EOF", value: "", line: 0, col: 0 };
    }
    peekAhead(offset) {
      const idx = this.pos + offset;
      return this.tokens[idx] || { kind: "EOF", value: "", line: 0, col: 0 };
    }
    advance() {
      const t = this.tokens[this.pos++];
      return t;
    }
    expect(kind) {
      const t = this.peek();
      if (t.kind !== kind) {
        throw new Error(`Expected ${kind} but got ${t.kind} '${t.value}' at line ${t.line}`);
      }
      return this.advance();
    }
    match(kind, value) {
      const t = this.peek();
      if (t.kind !== kind) return false;
      if (value !== void 0 && t.value !== value) return false;
      return true;
    }
    matchKeyword(kw) {
      return this.peek().kind === "KEYWORD" && this.peek().value === kw;
    }
    eatNewlines() {
      while (this.match("NEWLINE")) {
        this.advance();
      }
    }
    expectNewline() {
      const t = this.peek();
      if (t.kind === "EOF") return;
      if (t.kind === "NEWLINE") {
        this.advance();
      } else if (t.kind === "DEDENT" || t.kind === "RBRACE" || t.kind === "RBRACKET" || t.kind === "RPAREN") {
        return;
      } else {
        throw new Error(`Expected newline after statement, got ${t.kind} '${t.value}' at line ${t.line}`);
      }
    }
    parseStmtsUntilDedent() {
      const stmts = [];
      while (!this.match("DEDENT") && !this.match("EOF")) {
        const s = this.parseStatement();
        if (s) stmts.push(s);
        this.eatNewlines();
      }
      return stmts;
    }
    parseIndentedBlock() {
      this.expect("COLON");
      this.expectNewline();
      this.eatNewlines();
      this.expect("INDENT");
      const stmts = this.parseStmtsUntilDedent();
      this.expect("DEDENT");
      this.eatNewlines();
      return stmts;
    }
    parseStatement() {
      const t = this.peek();
      if (t.kind === "NEWLINE") {
        this.advance();
        return null;
      }
      if (t.kind === "DEDENT") return null;
      if (t.kind === "EOF") return null;
      if (t.kind === "IDENT" || t.kind === "KEYWORD") {
        if (t.kind === "KEYWORD") {
          switch (t.value) {
            case "import":
              return this.parseImport();
            case "from":
              return this.parseFromImport();
            case "def":
              return this.parseDef();
            case "class":
              return this.parseClass();
            case "if":
              return this.parseIf();
            case "while":
              return this.parseWhile();
            case "for":
              return this.parseFor();
            case "try":
              return this.parseTry();
            case "return":
              return this.parseReturn();
            case "break":
              return this.parseBreak();
            case "continue":
              return this.parseContinue();
            case "pass":
              return this.parsePass();
            case "raise":
              return this.parseRaise();
            case "del":
              return this.parseDel();
            case "print":
              return this.parsePrint();
            case "match":
              return this.parseMatch();
            case "global":
              return this.parseGlobal();
            case "nonlocal":
              return this.parseNonlocal();
            case "assert":
              return this.parseAssert();
            case "with":
              return this.parseWith();
            case "yield":
              return this.parseYieldStmt();
            case "async":
              return this.parseAsyncDef();
          }
        }
        return this.parseExprOrAssign();
      }
      return this.parseExprOrAssign();
    }
    parseImport() {
      this.advance();
      const modules = [];
      let alias;
      const name = this.parseDottedName();
      if (this.matchKeyword("as")) {
        this.advance();
        alias = this.expect("IDENT").value;
      }
      modules.push(name);
      while (this.match("COMMA")) {
        this.advance();
        const n = this.parseDottedName();
        this.advance();
        if (this.matchKeyword("as")) {
          this.advance();
          this.expect("IDENT");
        }
        modules.push(n);
      }
      this.expectNewline();
      if (modules.length === 1 && alias) {
        return ir.import(modules[0], { alias });
      }
      if (modules.length === 1) {
        return ir.import(modules[0]);
      }
      return ir.import(modules[0], { items: modules });
    }
    parseFromImport() {
      this.advance();
      const module = this.parseDottedName();
      this.expectKeyword("import");
      const items = [];
      if (this.match("OP") && this.peek().value === "*") {
        this.advance();
        this.expectNewline();
        return ir.import(module, { items: ["*"] });
      }
      items.push(this.expect("IDENT").value);
      while (this.match("COMMA")) {
        this.advance();
        items.push(this.expect("IDENT").value);
      }
      this.expectNewline();
      return ir.import(module, { items });
    }
    parseDottedName() {
      let name = this.expect("IDENT").value;
      while (this.match("DOT")) {
        this.advance();
        name += "." + this.expect("IDENT").value;
      }
      return name;
    }
    expectKeyword(kw) {
      const t = this.peek();
      if (t.kind !== "KEYWORD" || t.value !== kw) {
        throw new Error(`Expected keyword '${kw}' at line ${t.line}, got '${t.value}'`);
      }
      this.advance();
    }
    parseDef() {
      this.advance();
      const name = this.expect("IDENT").value;
      const params = this.parseParams();
      let returnType;
      if (this.match("OP") && this.peek().value === "->") {
        this.advance();
        returnType = this.parseTypeAnnotation();
      }
      const body = this.parseIndentedBlock();
      return ir.funcDef(name, params, body, { returnType });
    }
    parseAsyncDef() {
      this.advance();
      if (this.matchKeyword("def")) {
        this.advance();
        const name = this.expect("IDENT").value;
        const params = this.parseParams();
        let returnType;
        if (this.match("OP") && this.peek().value === "->") {
          this.advance();
          returnType = this.parseTypeAnnotation();
        }
        const body = this.parseIndentedBlock();
        return ir.funcDef(name, params, body, { returnType, isAsync: true });
      }
      throw new Error(`Expected 'def' after 'async' at line ${this.peek().line}`);
    }
    parseParams() {
      this.expect("LPAREN");
      const params = [];
      if (this.match("RPAREN")) {
        this.advance();
        return params;
      }
      params.push(this.parseParam());
      while (this.match("COMMA")) {
        this.advance();
        if (this.match("RPAREN")) break;
        params.push(this.parseParam());
      }
      this.expect("RPAREN");
      return params;
    }
    parseParam() {
      let isSpread = false;
      if (this.match("OP") && this.peek().value === "*") {
        this.advance();
        isSpread = true;
      } else if (this.match("OP") && this.peek().value === "**") {
        this.advance();
        isSpread = true;
      }
      const name = this.expect("IDENT").value;
      let type;
      if (this.match("COLON")) {
        this.advance();
        type = this.parseTypeAnnotation();
      }
      let def;
      if (this.match("EQUALS")) {
        this.advance();
        def = this.parseExpression();
      }
      return { name, type, default: def, isSpread };
    }
    parseTypeAnnotation() {
      let type = "";
      if (this.match("IDENT") || this.match("KEYWORD")) {
        type = this.advance().value;
      } else if (this.match("LBRACKET")) {
        type = this.parseComplexType();
      } else {
        type = this.expect("IDENT").value;
      }
      while (this.match("OP") && this.peek().value === "|") {
        this.advance();
        type += " | " + (this.match("IDENT") || this.match("KEYWORD") ? this.advance().value : this.expect("IDENT").value);
      }
      return type;
    }
    parseComplexType() {
      let result = this.expect("LBRACKET").value;
      result += this.parseTypeAnnotation();
      while (this.match("COMMA")) {
        this.advance();
        result += ", " + this.parseTypeAnnotation();
      }
      if (this.match("RBRACKET")) {
        result += this.advance().value;
      }
      return result;
    }
    parseClass() {
      this.advance();
      const name = this.expect("IDENT").value;
      let super_;
      if (this.match("LPAREN")) {
        this.advance();
        if (!this.match("RPAREN")) {
          super_ = this.expect("IDENT").value;
          while (this.match("COMMA")) {
            this.advance();
            if (!this.match("RPAREN")) {
              this.expect("IDENT");
            }
          }
        }
        this.expect("RPAREN");
      }
      const body = this.parseIndentedBlock();
      return ir.classDef(name, body, { super: super_ });
    }
    parseIf() {
      this.advance();
      const condition = this.parseExpression();
      const thenBody = this.parseIndentedBlock();
      const elifs = [];
      let elseBody;
      this.eatNewlines();
      while (this.matchKeyword("elif")) {
        this.advance();
        const elifCond = this.parseExpression();
        const elifBody = this.parseIndentedBlock();
        elifs.push({ condition: elifCond, body: elifBody });
        this.eatNewlines();
      }
      if (this.matchKeyword("else")) {
        this.advance();
        if (this.match("COLON")) {
          elseBody = this.parseIndentedBlock();
        } else if (this.matchKeyword("if")) {
          const innerIf = this.parseIf();
          elseBody = [innerIf];
        }
      }
      return ir.ifElse(condition, thenBody, elifs, elseBody);
    }
    parseWhile() {
      this.advance();
      const condition = this.parseExpression();
      const body = this.parseIndentedBlock();
      return ir.whileLoop(condition, body);
    }
    parseFor() {
      this.advance();
      const vars = [];
      vars.push(this.expect("IDENT").value);
      while (this.match("COMMA")) {
        this.advance();
        vars.push(this.expect("IDENT").value);
      }
      this.expectKeyword("in");
      const iterable = this.parseExpression();
      if (vars.length === 1 && this.peek().value === "=" && this.looksLikeCFor()) {
        return this.convertCStyleFor(vars[0], iterable);
      }
      const body = this.parseIndentedBlock();
      if (vars.length === 1) {
        return ir.forEach(vars[0], iterable, body);
      }
      const loopVar = "__destruct_" + vars.join("_");
      const stmts = [];
      stmts.push(ir.varDecl(loopVar, iterable));
      for (const v of vars) {
        stmts.push(ir.varDecl(v, ir.indexAccess(ir.ident(loopVar), ir.literal(vars.indexOf(v)))));
      }
      stmts.push(...body);
      return ir.forEach(loopVar, iterable, [ir.block(stmts)]);
    }
    looksLikeCFor() {
      const saved = this.pos;
      let found = false;
      if (this.match("IDENT")) {
        this.advance();
        if (this.match("OP") && this.peek().value === "=") {
          found = true;
        }
      }
      this.pos = saved;
      return found;
    }
    convertCStyleFor(varName, _iterable) {
      this.expect("EQUALS");
      const start = this.parseExpression();
      this.expectKeyword("to");
      const end = this.parseExpression();
      let step;
      if (this.matchKeyword("step")) {
        this.advance();
        step = this.parseExpression();
      }
      const body = this.parseIndentedBlock();
      const updateExpr = ir.assign(
        ir.ident(varName),
        step ? ir.binop(ir.ident(varName), "+", step) : ir.binop(ir.ident(varName), "+", ir.literal(1))
      );
      return ir.forLoop([...body, updateExpr], {
        init: ir.varDecl(varName, start),
        condition: step ? ir.binop(ir.ident(varName), "<=", end) : ir.binop(ir.ident(varName), "<", end)
      });
    }
    parseTry() {
      this.advance();
      const tryBody = this.parseIndentedBlock();
      let catchVar;
      let catchBody;
      let finallyBody;
      this.eatNewlines();
      while (this.matchKeyword("except")) {
        this.advance();
        if (this.match("IDENT") || this.match("KEYWORD")) {
          if (!this.matchKeyword("as")) {
            this.advance();
          }
        }
        if (this.matchKeyword("as")) {
          this.advance();
          catchVar = this.expect("IDENT").value;
        }
        catchBody = this.parseIndentedBlock();
        this.eatNewlines();
      }
      if (this.matchKeyword("finally")) {
        this.advance();
        finallyBody = this.parseIndentedBlock();
      }
      return ir.tryCatch(tryBody, { catchVar, catchBody, finallyBody });
    }
    parseReturn() {
      this.advance();
      if (this.match("NEWLINE") || this.match("DEDENT") || this.match("EOF")) {
        this.expectNewline();
        return ir.ret();
      }
      const value = this.parseExpression();
      this.expectNewline();
      return ir.ret(value);
    }
    parseBreak() {
      this.advance();
      this.expectNewline();
      return { kind: "break" };
    }
    parseContinue() {
      this.advance();
      this.expectNewline();
      return { kind: "continue" };
    }
    parsePass() {
      this.advance();
      this.expectNewline();
      return ir.empty();
    }
    parseRaise() {
      this.advance();
      const value = this.parseExpression();
      this.expectNewline();
      return { kind: "throw", value };
    }
    parseDel() {
      this.advance();
      const target = this.parsePrimary();
      this.expectNewline();
      return { kind: "delete", target };
    }
    parsePrint() {
      this.advance();
      this.expect("LPAREN");
      const args = [];
      if (!this.match("RPAREN")) {
        args.push(this.parseExpression());
        while (this.match("COMMA")) {
          this.advance();
          if (this.match("RPAREN")) break;
          args.push(this.parseExpression());
        }
      }
      this.expect("RPAREN");
      this.expectNewline();
      return ir.print(args);
    }
    parseMatch() {
      this.advance();
      const subject = this.parseExpression();
      this.expect("COLON");
      this.expectNewline();
      this.eatNewlines();
      this.expect("INDENT");
      const cases = [];
      let defaultBody;
      while (!this.match("DEDENT") && !this.match("EOF")) {
        if (this.matchKeyword("case")) {
          this.advance();
          const values = [this.parseExpression()];
          const body = this.parseIndentedBlock();
          cases.push({ value: values, body, fallthrough: false });
        } else if (this.matchKeyword("_")) {
          this.advance();
          defaultBody = this.parseIndentedBlock();
        } else {
          this.advance();
        }
      }
      this.expect("DEDENT");
      this.eatNewlines();
      return { kind: "switch", subject, cases, defaultBody };
    }
    parseGlobal() {
      this.advance();
      const name = this.expect("IDENT").value;
      this.expectNewline();
      return ir.varDecl(name, void 0, { isConst: false });
    }
    parseNonlocal() {
      this.advance();
      const name = this.expect("IDENT").value;
      this.expectNewline();
      return ir.varDecl(name, void 0, { isConst: false });
    }
    parseAssert() {
      this.advance();
      const expr = this.parseExpression();
      this.expectNewline();
      return ir.exprStmt(ir.funcCallExpr("assert", [expr]));
    }
    parseWith() {
      this.advance();
      const expr = this.parseExpression();
      let alias;
      if (this.matchKeyword("as")) {
        this.advance();
        alias = this.expect("IDENT").value;
      }
      const body = this.parseIndentedBlock();
      if (alias) {
        body.unshift(ir.varDecl(alias, expr));
      }
      return ir.block(body);
    }
    parseYieldStmt() {
      this.advance();
      if (this.match("NEWLINE") || this.match("DEDENT") || this.match("EOF")) {
        this.expectNewline();
        return ir.exprStmt(ir.funcCallExpr("yield", []));
      }
      const expr = this.parseExpression();
      this.expectNewline();
      return ir.exprStmt(ir.funcCallExpr("yield", [expr]));
    }
    parseExprOrAssign() {
      const expr = this.parseExpression();
      if (this.matchKeyword("as")) {
        throw new Error("'as' not valid in expression context");
      }
      if (this.match("COLON")) {
        this.advance();
        const typeAnn = this.parseTypeAnnotation();
        if (this.match("EQUALS")) {
          this.advance();
          const value = this.parseExpression();
          this.expectNewline();
          if (expr.kind === "identifier") {
            return ir.varDecl(expr.name, value, { type: typeAnn });
          }
          return ir.block([
            ir.varDecl("_", void 0, { type: typeAnn }),
            ir.assign(expr, value)
          ]);
        }
        if (expr.kind === "identifier") {
          this.expectNewline();
          return ir.varDecl(expr.name, void 0, { type: typeAnn });
        }
        this.expectNewline();
        return ir.empty();
      }
      if (this.match("EQUALS")) {
        this.advance();
        const value = this.parseExpression();
        this.expectNewline();
        return ir.assign(expr, value);
      }
      const augmentedOps = {
        "+=": "+=",
        "-=": "-=",
        "*=": "*=",
        "/=": "/=",
        "%=": "%=",
        "**=": "*=",
        "//=": "/="
      };
      const t = this.peek();
      if (t.kind === "OP" && augmentedOps[t.value]) {
        this.advance();
        const value = this.parseExpression();
        this.expectNewline();
        return ir.assign(expr, value, augmentedOps[t.value]);
      }
      if (expr.kind === "funcCallExpr") {
        this.expectNewline();
        return ir.funcCall(expr.name, expr.args);
      }
      this.expectNewline();
      return ir.exprStmt(expr);
    }
    parseExpression() {
      return this.parseTernary();
    }
    parseTernary() {
      const expr = this.parseOr();
      if (this.matchKeyword("if")) {
        this.advance();
        const condition = this.parseOr();
        this.expectKeyword("else");
        const elseExpr = this.parseExpression();
        return ir.ternary(condition, expr, elseExpr);
      }
      return expr;
    }
    parseOr() {
      let left = this.parseAnd();
      while (this.matchKeyword("or")) {
        this.advance();
        const right = this.parseAnd();
        left = ir.binop(left, "or", right);
      }
      return left;
    }
    parseAnd() {
      let left = this.parseNot();
      while (this.matchKeyword("and")) {
        this.advance();
        const right = this.parseNot();
        left = ir.binop(left, "and", right);
      }
      return left;
    }
    parseNot() {
      if (this.matchKeyword("not")) {
        this.advance();
        const expr = this.parseNot();
        return ir.unaryop("not", expr);
      }
      return this.parseComparison();
    }
    parseComparison() {
      let left = this.parseBitwiseOr();
      const ops = ["==", "!=", "<", ">", "<=", ">=", "is", "in"];
      while (this.peek().kind === "OP" && ops.includes(this.peek().value)) {
        const op = this.advance().value;
        if (op === "is" && this.matchKeyword("not")) {
          this.advance();
          const right = this.parseBitwiseOr();
          left = ir.binop(left, "is not", right);
        } else if (op === "in" && this.matchKeyword("not")) {
          this.advance();
          const right = this.parseBitwiseOr();
          left = ir.binop(left, "not in", right);
        } else if (op === "is") {
          const right = this.parseBitwiseOr();
          left = ir.binop(left, "is", right);
        } else if (op === "in") {
          const right = this.parseBitwiseOr();
          left = ir.binop(left, "in", right);
        } else {
          const right = this.parseBitwiseOr();
          left = ir.binop(left, op, right);
        }
      }
      return left;
    }
    parseBitwiseOr() {
      let left = this.parseBitwiseXor();
      while (this.match("OP") && this.peek().value === "|") {
        this.advance();
        const right = this.parseBitwiseXor();
        left = ir.binop(left, "|", right);
      }
      return left;
    }
    parseBitwiseXor() {
      let left = this.parseBitwiseAnd();
      while (this.match("OP") && this.peek().value === "^") {
        this.advance();
        const right = this.parseBitwiseAnd();
        left = ir.binop(left, "^", right);
      }
      return left;
    }
    parseBitwiseAnd() {
      let left = this.parseShift();
      while (this.match("OP") && this.peek().value === "&") {
        this.advance();
        const right = this.parseShift();
        left = ir.binop(left, "&", right);
      }
      return left;
    }
    parseShift() {
      let left = this.parseAddSub();
      while (this.match("OP") && (this.peek().value === "<<" || this.peek().value === ">>")) {
        const op = this.advance().value;
        const right = this.parseAddSub();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parseAddSub() {
      let left = this.parseMulDiv();
      while (this.match("OP") && (this.peek().value === "+" || this.peek().value === "-")) {
        const op = this.advance().value;
        const right = this.parseMulDiv();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parseMulDiv() {
      let left = this.parsePower();
      while (this.match("OP") && (this.peek().value === "*" || this.peek().value === "/" || this.peek().value === "//" || this.peek().value === "%")) {
        const op = this.advance().value;
        const right = this.parsePower();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parsePower() {
      let base = this.parseUnary();
      while (this.match("OP") && this.peek().value === "**") {
        this.advance();
        const exp = this.parseUnary();
        base = ir.binop(base, "**", exp);
      }
      return base;
    }
    parseUnary() {
      if (this.match("OP")) {
        if (this.peek().value === "-") {
          this.advance();
          const expr = this.parseUnary();
          return ir.unaryop("-", expr);
        }
        if (this.peek().value === "+") {
          this.advance();
          return this.parseUnary();
        }
        if (this.peek().value === "~") {
          this.advance();
          const expr = this.parseUnary();
          return ir.unaryop("~", expr);
        }
      }
      return this.parsePostfix();
    }
    parsePostfix() {
      let expr = this.parsePrimary();
      while (true) {
        if (this.match("DOT")) {
          this.advance();
          if (this.match("IDENT") || this.match("KEYWORD")) {
            const prop = this.advance().value;
            if (this.match("LPAREN")) {
              const args = this.parseArgList();
              expr = ir.methodCall(expr, prop, args);
            } else {
              expr = ir.propAccess(expr, prop);
            }
          }
        } else if (this.match("LPAREN")) {
          if (expr.kind === "identifier") {
            const args = this.parseArgList();
            expr = this.maybeTypeCast(expr.name, args);
          } else {
            const args = this.parseArgList();
            expr = ir.methodCall(expr, "__call__", args);
          }
        } else if (this.match("LBRACKET")) {
          this.advance();
          const index = this.parseExpression();
          if (this.match("COLON")) {
            this.advance();
            if (this.match("RBRACKET")) {
              this.advance();
              expr = ir.methodCall(expr, "slice", [index]);
            } else {
              const end = this.parseExpression();
              this.expect("RBRACKET");
              expr = ir.methodCall(expr, "slice", [index, end]);
            }
          } else {
            this.expect("RBRACKET");
            expr = ir.indexAccess(expr, index);
          }
        } else {
          break;
        }
      }
      return expr;
    }
    maybeTypeCast(name, args) {
      const typeCasts = /* @__PURE__ */ new Set(["int", "float", "str", "bool", "list", "dict", "tuple", "set", "bytes", "complex"]);
      if (typeCasts.has(name) && args.length === 1) {
        return ir.typeCast(args[0], name);
      }
      return ir.funcCallExpr(name, args);
    }
    parseArgList() {
      this.expect("LPAREN");
      const args = [];
      if (this.match("RPAREN")) {
        this.advance();
        return args;
      }
      args.push(this.parseArg());
      while (this.match("COMMA")) {
        this.advance();
        if (this.match("RPAREN")) break;
        args.push(this.parseArg());
      }
      this.expect("RPAREN");
      return args;
    }
    parseArg() {
      const expr = this.parseExpression();
      if (this.match("EQUALS") && expr.kind === "identifier") {
        this.advance();
        const value = this.parseExpression();
        return ir.funcCallExpr(expr.name + "=" + this.serializeExprShort(value), []);
      }
      return expr;
    }
    serializeExprShort(expr) {
      if (expr.kind === "literal") return String(expr.value);
      if (expr.kind === "identifier") return expr.name;
      return "expr";
    }
    parsePrimary() {
      const t = this.peek();
      if (t.kind === "LPAREN") {
        this.advance();
        if (this.match("RPAREN")) {
          this.advance();
          return ir.literal("()", "tuple");
        }
        const expr = this.parseExpression();
        if (this.match("COMMA")) {
          const elements = [expr];
          while (this.match("COMMA")) {
            this.advance();
            if (this.match("RPAREN")) break;
            elements.push(this.parseExpression());
          }
          this.expect("RPAREN");
          return ir.funcCallExpr("tuple", elements);
        }
        this.expect("RPAREN");
        return expr;
      }
      if (t.kind === "LBRACKET") {
        this.advance();
        const elements = [];
        if (this.match("RBRACKET")) {
          this.advance();
          return ir.arrayLit([]);
        }
        elements.push(this.parseExpression());
        while (this.match("COMMA")) {
          this.advance();
          if (this.match("RBRACKET")) break;
          elements.push(this.parseExpression());
        }
        this.expect("RBRACKET");
        return ir.arrayLit(elements);
      }
      if (t.kind === "LBRACE") {
        this.advance();
        const entries = [];
        if (this.match("RBRACE")) {
          this.advance();
          return ir.dictLit([]);
        }
        if (this.match("OP") && this.peek().value === "**") {
          entries.push({ key: ir.literal("__unpack__"), value: this.parseExpression() });
        } else if (this.matchKeyword("for")) {
          const body = this.parseDictComprehension();
          return ir.dictLit([{ key: ir.literal("__comprehension__"), value: body }]);
        } else {
          const key = this.parseExpression();
          if (this.match("COLON")) {
            this.advance();
            const value = this.parseExpression();
            entries.push({ key, value });
            while (this.match("COMMA")) {
              this.advance();
              if (this.match("RBRACE")) break;
              if (this.match("OP") && this.peek().value === "**") {
                this.advance();
                entries.push({ key: ir.literal("__unpack__"), value: this.parseExpression() });
              } else {
                const k = this.parseExpression();
                this.expect("COLON");
                const v = this.parseExpression();
                entries.push({ key: k, value: v });
              }
            }
          } else {
            return ir.funcCallExpr("set", [key]);
          }
        }
        this.expect("RBRACE");
        return ir.dictLit(entries);
      }
      if (t.kind === "STRING") {
        return this.parseStringLiteral();
      }
      if (t.kind === "NUMBER") {
        this.advance();
        const raw = t.value.replace(/_/g, "");
        if (raw.includes(".") || raw.includes("e") || raw.includes("E")) {
          return ir.literal(parseFloat(raw));
        }
        if (raw.startsWith("0x") || raw.startsWith("0X")) {
          return ir.literal(parseInt(raw, 16));
        }
        if (raw.startsWith("0b") || raw.startsWith("0B")) {
          return ir.literal(parseInt(raw, 2));
        }
        if (raw.startsWith("0o") || raw.startsWith("0O")) {
          return ir.literal(parseInt(raw, 8));
        }
        return ir.literal(parseInt(raw, 10));
      }
      if (t.kind === "KEYWORD") {
        if (t.value === "True") {
          this.advance();
          return ir.literal(true);
        }
        if (t.value === "False") {
          this.advance();
          return ir.literal(false);
        }
        if (t.value === "None") {
          this.advance();
          return ir.literal("None", "NoneType");
        }
        if (t.value === "lambda") {
          return this.parseLambda();
        }
        if (t.value === "not") {
          this.advance();
          return ir.unaryop("not", this.parseUnary());
        }
        if (t.value === "and" || t.value === "or") {
          return this.parseOr();
        }
        if (t.value === "print") {
          this.advance();
          this.expect("LPAREN");
          const args = [];
          if (!this.match("RPAREN")) {
            args.push(this.parseExpression());
            while (this.match("COMMA")) {
              this.advance();
              if (this.match("RPAREN")) break;
              args.push(this.parseExpression());
            }
          }
          this.expect("RPAREN");
          return ir.funcCallExpr("print", args);
        }
        if (t.value === "range") {
          this.advance();
          this.expect("LPAREN");
          const args = [];
          if (!this.match("RPAREN")) {
            args.push(this.parseExpression());
            while (this.match("COMMA")) {
              this.advance();
              if (this.match("RPAREN")) break;
              args.push(this.parseExpression());
            }
          }
          this.expect("RPAREN");
          if (args.length === 1) {
            return ir.range(ir.literal(0), args[0]);
          } else if (args.length === 2) {
            return ir.range(args[0], args[1]);
          } else if (args.length === 3) {
            return ir.range(args[0], args[1], { step: args[2] });
          }
          return ir.range(ir.literal(0), ir.literal(0));
        }
        if (t.value === "len" || t.value === "type" || t.value === "isinstance" || t.value === "input" || t.value === "enumerate" || t.value === "zip" || t.value === "map" || t.value === "filter" || t.value === "sorted" || t.value === "reversed" || t.value === "sum" || t.value === "min" || t.value === "max" || t.value === "abs" || t.value === "round" || t.value === "hash" || t.value === "id" || t.value === "hex" || t.value === "oct" || t.value === "bin" || t.value === "chr" || t.value === "ord" || t.value === "any" || t.value === "all") {
          const name = this.advance().value;
          const args = this.parseArgList();
          return ir.funcCallExpr(name, args);
        }
      }
      if (t.kind === "IDENT") {
        const name = this.advance().value;
        if (this.match("COLON") && this.looksLikeTypeHint()) {
          return this.parseTypedExpression(name);
        }
        return ir.ident(name);
      }
      throw new Error(`Unexpected token ${t.kind} '${t.value}' at line ${t.line}:${t.col}`);
    }
    parseDictComprehension() {
      this.expectKeyword("for");
      const varName = this.expect("IDENT").value;
      this.expectKeyword("in");
      const iterable = this.parseExpression();
      if (this.matchKeyword("if")) {
        this.advance();
        this.parseExpression();
      }
      this.expect("RBRACE");
      return ir.funcCallExpr("dict comprehension(" + varName + ", ...)", [iterable]);
    }
    looksLikeTypeHint() {
      const saved = this.pos;
      this.advance();
      const result = (this.match("IDENT") || this.match("LBRACKET")) && (this.peekAhead(1).kind === "EQUALS" || this.peekAhead(1).kind === "NEWLINE");
      this.pos = saved;
      return result;
    }
    parseTypedExpression(name) {
      this.advance();
      const typeAnn = this.parseTypeAnnotation();
      if (this.match("EQUALS")) {
        this.advance();
        const value = this.parseExpression();
        return ir.funcCallExpr(name + ":" + typeAnn, [value]);
      }
      return ir.funcCallExpr(name + ":" + typeAnn, []);
    }
    parseStringLiteral() {
      const t = this.peek();
      if (t.value.includes("{") && !t.value.startsWith("{")) {
        this.advance();
        return this.parseFString(t.value);
      }
      if (t.value.startsWith("f")) {
        this.advance();
        return this.parseFString(t.value.slice(1));
      }
      this.advance();
      let result = ir.literal(t.value);
      while (this.match("STRING")) {
        const next = this.peek();
        this.advance();
        result = ir.binop(result, "+", ir.literal(next.value));
      }
      return result;
    }
    parseFString(raw) {
      const parts = [];
      let current = "";
      let i = 0;
      while (i < raw.length) {
        if (raw[i] === "{") {
          if (raw[i + 1] === "{") {
            current += "{";
            i += 2;
            continue;
          }
          if (current) {
            parts.push(current);
            current = "";
          }
          let depth = 1;
          let expr = "";
          i++;
          while (i < raw.length && depth > 0) {
            if (raw[i] === "{") depth++;
            else if (raw[i] === "}") {
              depth--;
              if (depth === 0) break;
            }
            expr += raw[i];
            i++;
          }
          if (expr) {
            try {
              const innerTokens = new Tokenizer(expr).tokenize();
              const innerParser = new _Parser(innerTokens);
              parts.push(innerParser.parseExpression());
            } catch {
              parts.push(ir.ident(expr));
            }
          }
          i++;
        } else if (raw[i] === "}" && raw[i + 1] === "}") {
          current += "}";
          i += 2;
        } else {
          current += raw[i];
          i++;
        }
      }
      if (current) {
        parts.push(current);
      }
      if (parts.length === 0) return ir.literal("");
      if (parts.length === 1 && typeof parts[0] === "string") return ir.literal(parts[0]);
      return ir.stringInterp(parts);
    }
    parseLambda() {
      this.advance();
      const params = [];
      if (!this.matchKeyword("if") && !this.matchKeyword("and") && !this.matchKeyword("or") && !this.match("COLON")) {
        if (this.match("IDENT")) {
          params.push({ name: this.expect("IDENT").value, isSpread: false });
          while (this.match("COMMA")) {
            this.advance();
            params.push({ name: this.expect("IDENT").value, isSpread: false });
          }
        }
      }
      this.expect("COLON");
      const body = this.parseExpression();
      return ir.funcCallExpr(`lambda(${params.map((p) => p.name).join(", ")})`, [body]);
    }
    parse(code, _language) {
      const tokenizer = new Tokenizer(code);
      const tokens = tokenizer.tokenize();
      const parser = new _Parser(tokens);
      const stmts = [];
      parser.eatNewlines();
      while (!parser.match("EOF")) {
        const stmt = parser.parseStatement();
        if (stmt) stmts.push(stmt);
        parser.eatNewlines();
      }
      return ir.module(stmts, "python");
    }
  };
  var PythonParser = class {
    parse(code, _language) {
      const parser = new Parser([]);
      return parser.parse(code, _language);
    }
  };

  // src/languages/javascript/parser.ts
  var KEYWORDS2 = /* @__PURE__ */ new Set([
    "var",
    "let",
    "const",
    "function",
    "return",
    "if",
    "else",
    "while",
    "do",
    "for",
    "switch",
    "case",
    "default",
    "break",
    "continue",
    "new",
    "delete",
    "typeof",
    "instanceof",
    "void",
    "throw",
    "try",
    "catch",
    "finally",
    "class",
    "extends",
    "super",
    "this",
    "import",
    "export",
    "from",
    "as",
    "async",
    "await",
    "yield",
    "of",
    "in",
    "static",
    "get",
    "set",
    "constructor",
    "console",
    "null",
    "undefined",
    "true",
    "false"
  ]);
  var Tokenizer2 = class {
    constructor(src) {
      __publicField(this, "src");
      __publicField(this, "pos", 0);
      __publicField(this, "tokens", []);
      this.src = src;
    }
    peek() {
      return this.pos < this.src.length ? this.src[this.pos] : "\0";
    }
    advance() {
      const ch = this.src[this.pos];
      this.pos++;
      return ch;
    }
    add(type, value, start) {
      this.tokens.push({ type, value, pos: start });
    }
    tokenize() {
      while (this.pos < this.src.length) {
        const start = this.pos;
        const ch = this.peek();
        if (ch === " " || ch === "	" || ch === "\r") {
          this.advance();
          continue;
        }
        if (ch === "\n") {
          this.advance();
          continue;
        }
        if (ch === "/" && this.peekAt(1) === "/") {
          this.addLineComment(start);
          continue;
        }
        if (ch === "/" && this.peekAt(1) === "*") {
          this.addBlockComment(start);
          continue;
        }
        if (ch === '"' || ch === "'") {
          this.addString(start);
          continue;
        }
        if (ch === "`") {
          this.addTemplateLiteral(start);
          continue;
        }
        if (this.isDigit(ch) || ch === "." && this.isDigit(this.peekAt(1))) {
          this.addNumber(start);
          continue;
        }
        if (this.isIdentStart(ch)) {
          this.addIdent(start);
          continue;
        }
        this.addOperator(start);
      }
      this.add("EOF", "", this.pos);
      return this.tokens;
    }
    peekAt(offset) {
      const i = this.pos + offset;
      return i < this.src.length ? this.src[i] : "\0";
    }
    addLineComment(start) {
      let end = this.pos;
      while (end < this.src.length && this.src[end] !== "\n") end++;
      this.add("LINE_COMMENT", this.src.slice(this.pos, end), start);
      this.pos = end;
    }
    addBlockComment(start) {
      this.pos += 2;
      let end = this.src.indexOf("*/", this.pos);
      if (end === -1) end = this.src.length;
      this.add("BLOCK_COMMENT", this.src.slice(start + 2, end), start);
      this.pos = end + 2;
    }
    addString(start) {
      const quote = this.advance();
      let s = "";
      while (this.pos < this.src.length && this.peek() !== quote) {
        if (this.peek() === "\\") {
          this.advance();
          const esc = this.advance();
          switch (esc) {
            case "n":
              s += "\n";
              break;
            case "t":
              s += "	";
              break;
            case "r":
              s += "\r";
              break;
            case "\\":
              s += "\\";
              break;
            case "'":
              s += "'";
              break;
            case '"':
              s += '"';
              break;
            case "`":
              s += "`";
              break;
            case "0":
              s += "\0";
              break;
            case "u":
              s += this.readUnicodeEscape();
              break;
            default:
              s += esc;
              break;
          }
        } else {
          s += this.advance();
        }
      }
      if (this.pos < this.src.length) this.advance();
      this.add("STRING", s, start);
    }
    readUnicodeEscape() {
      if (this.peek() === "{") {
        this.advance();
        let hex2 = "";
        while (this.peek() !== "}" && this.pos < this.src.length) {
          hex2 += this.advance();
        }
        if (this.peek() === "}") this.advance();
        return String.fromCodePoint(parseInt(hex2, 16));
      }
      let hex = "";
      for (let i = 0; i < 4 && this.pos < this.src.length; i++) {
        hex += this.advance();
      }
      return String.fromCodePoint(parseInt(hex, 16));
    }
    addTemplateLiteral(start) {
      this.advance();
      let current = "";
      while (this.pos < this.src.length) {
        if (this.peek() === "\\") {
          this.advance();
          const esc = this.advance();
          switch (esc) {
            case "n":
              current += "\n";
              break;
            case "t":
              current += "	";
              break;
            case "`":
              current += "`";
              break;
            case "\\":
              current += "\\";
              break;
            case "$":
              current += "$";
              break;
            default:
              current += esc;
              break;
          }
        } else if (this.peek() === "$" && this.peekAt(1) === "{") {
          this.add("TEMPLATE_START", current, start);
          this.advance();
          this.advance();
          this.tokens.push({ type: "TEMPLATE_START", value: current, pos: start });
          this.tokens.pop();
          this.parseTemplateExpression(start);
          return;
        } else if (this.peek() === "`") {
          this.advance();
          this.add("TEMPLATE_END", current, start);
          return;
        } else {
          current += this.advance();
        }
      }
      this.add("TEMPLATE_END", current, start);
    }
    parseTemplateExpression(start) {
      let braceDepth = 1;
      let exprText = "";
      while (this.pos < this.src.length && braceDepth > 0) {
        const ch = this.peek();
        if (ch === "{") braceDepth++;
        else if (ch === "}") {
          braceDepth--;
          if (braceDepth === 0) {
            this.advance();
            this.add("TEMPLATE_MID", exprText, start);
            let rest = "";
            while (this.pos < this.src.length && this.peek() !== "`" && !(this.peek() === "$" && this.peekAt(1) === "{")) {
              if (this.peek() === "\\") {
                this.advance();
                const esc = this.advance();
                switch (esc) {
                  case "n":
                    rest += "\n";
                    break;
                  case "t":
                    rest += "	";
                    break;
                  case "`":
                    rest += "`";
                    break;
                  case "$":
                    rest += "$";
                    break;
                  default:
                    rest += esc;
                    break;
                }
              } else {
                rest += this.advance();
              }
            }
            if (this.peek() === "$" && this.peekAt(1) === "{") {
              this.add("TEMPLATE_START", rest, this.pos);
              this.advance();
              this.advance();
              this.parseTemplateExpression(this.pos);
              return;
            }
            if (this.peek() === "`") {
              this.advance();
              this.add("TEMPLATE_END", rest, this.pos);
            }
            return;
          }
        }
        if (ch === '"' || ch === "'") {
          const q = ch;
          this.advance();
          while (this.pos < this.src.length && this.peek() !== q) {
            if (this.peek() === "\\") this.advance();
            this.advance();
          }
          if (this.pos < this.src.length) this.advance();
        } else if (ch === "`") {
          this.advance();
          while (this.pos < this.src.length && this.peek() !== "`") {
            if (this.peek() === "\\") this.advance();
            this.advance();
          }
          if (this.pos < this.src.length) this.advance();
        } else {
          exprText += this.advance();
        }
      }
    }
    addNumber(start) {
      let s = "";
      if (this.peek() === "0" && (this.peekAt(1) === "x" || this.peekAt(1) === "X")) {
        s += this.advance() + this.advance();
        while (this.pos < this.src.length && this.isHexDigit(this.peek())) {
          s += this.advance();
        }
      } else if (this.peek() === "0" && (this.peekAt(1) === "b" || this.peekAt(1) === "B")) {
        s += this.advance() + this.advance();
        while (this.pos < this.src.length && (this.peek() === "0" || this.peek() === "1")) {
          s += this.advance();
        }
      } else if (this.peek() === "0" && (this.peekAt(1) === "o" || this.peekAt(1) === "O")) {
        s += this.advance() + this.advance();
        while (this.pos < this.src.length && this.peek() >= "0" && this.peek() <= "7") {
          s += this.advance();
        }
      } else {
        while (this.pos < this.src.length && this.isDigit(this.peek())) s += this.advance();
        if (this.peek() === ".") {
          s += this.advance();
          while (this.pos < this.src.length && this.isDigit(this.peek())) s += this.advance();
        }
        if (this.peek() === "e" || this.peek() === "E") {
          s += this.advance();
          if (this.peek() === "+" || this.peek() === "-") s += this.advance();
          while (this.pos < this.src.length && this.isDigit(this.peek())) s += this.advance();
        }
      }
      if (this.peek() === "n") this.advance();
      this.add("NUMBER", s, start);
    }
    addIdent(start) {
      let s = "";
      while (this.pos < this.src.length && this.isIdentPart(this.peek())) {
        s += this.advance();
      }
      if (KEYWORDS2.has(s)) {
        this.add(s.toUpperCase(), s, start);
      } else {
        this.add("IDENT", s, start);
      }
    }
    addOperator(start) {
      const c = this.advance();
      switch (c) {
        case "+":
          if (this.peek() === "+") {
            this.advance();
            this.add("++", "++", start);
          } else if (this.peek() === "=") {
            this.advance();
            this.add("+=", "+=", start);
          } else this.add("+", "+", start);
          break;
        case "-":
          if (this.peek() === "-") {
            this.advance();
            this.add("--", "--", start);
          } else if (this.peek() === "=") {
            this.advance();
            this.add("-=", "-=", start);
          } else this.add("-", "-", start);
          break;
        case "*":
          if (this.peek() === "*") {
            this.advance();
            if (this.peek() === "=") {
              this.advance();
              this.add("**=", "**=", start);
            } else this.add("**", "**", start);
          } else if (this.peek() === "=") {
            this.advance();
            this.add("*=", "*=", start);
          } else this.add("*", "*", start);
          break;
        case "/":
          if (this.peek() === "=") {
            this.advance();
            this.add("/=", "/=", start);
          } else this.add("/", "/", start);
          break;
        case "%":
          if (this.peek() === "=") {
            this.advance();
            this.add("%=", "%=", start);
          } else this.add("%", "%", start);
          break;
        case "=":
          if (this.peek() === "=") {
            this.advance();
            if (this.peek() === "=") {
              this.advance();
              this.add("===", "===", start);
            } else this.add("==", "==", start);
          } else if (this.peek() === ">") {
            this.advance();
            this.add("=>", "=>", start);
          } else this.add("=", "=", start);
          break;
        case "!":
          if (this.peek() === "=") {
            this.advance();
            if (this.peek() === "=") {
              this.advance();
              this.add("!==", "!==", start);
            } else this.add("!=", "!=", start);
          } else this.add("!", "!", start);
          break;
        case "<":
          if (this.peek() === "=") {
            this.advance();
            this.add("<=", "<=", start);
          } else if (this.peek() === "<") {
            this.advance();
            if (this.peek() === "=") {
              this.advance();
              this.add("<<=", "<<=", start);
            } else this.add("<<", "<<", start);
          } else this.add("<", "<", start);
          break;
        case ">":
          if (this.peek() === "=") {
            this.advance();
            this.add(">=", ">=", start);
          } else if (this.peek() === ">") {
            this.advance();
            if (this.peek() === ">") {
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                this.add(">>>=", ">>>=", start);
              } else this.add(">>>", ">>>", start);
            } else if (this.peek() === "=") {
              this.advance();
              this.add(">>=", ">>=", start);
            } else this.add(">>", ">>", start);
          } else this.add(">", ">", start);
          break;
        case "&":
          if (this.peek() === "&") {
            this.advance();
            this.add("&&", "&&", start);
          } else if (this.peek() === "=") {
            this.advance();
            this.add("&=", "&=", start);
          } else this.add("&", "&", start);
          break;
        case "|":
          if (this.peek() === "|") {
            this.advance();
            this.add("||", "||", start);
          } else if (this.peek() === "=") {
            this.advance();
            this.add("|=", "|=", start);
          } else this.add("|", "|", start);
          break;
        case "^":
          if (this.peek() === "=") {
            this.advance();
            this.add("^=", "^=", start);
          } else this.add("^", "^", start);
          break;
        case "~":
          this.add("~", "~", start);
          break;
        case "?":
          if (this.peek() === ".") {
            this.advance();
            this.add("?.", "?.", start);
          } else if (this.peek() === "?") {
            this.advance();
            if (this.peek() === "=") {
              this.advance();
              this.add("??=", "??=", start);
            } else this.add("??", "??", start);
          } else this.add("?", "?", start);
          break;
        case ".":
          this.add(".", ".", start);
          break;
        case "(":
          this.add("(", "(", start);
          break;
        case ")":
          this.add(")", ")", start);
          break;
        case "{":
          this.add("{", "{", start);
          break;
        case "}":
          this.add("}", "}", start);
          break;
        case "[":
          this.add("[", "[", start);
          break;
        case "]":
          this.add("]", "]", start);
          break;
        case ",":
          this.add(",", ",", start);
          break;
        case ";":
          this.add(";", ";", start);
          break;
        case ":":
          this.add(":", ":", start);
          break;
        case "...":
          this.add("...", "...", start);
          break;
      }
    }
    isDigit(ch) {
      return ch >= "0" && ch <= "9";
    }
    isHexDigit(ch) {
      return ch >= "0" && ch <= "9" || ch >= "a" && ch <= "f" || ch >= "A" && ch <= "F";
    }
    isIdentStart(ch) {
      return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch === "_" || ch === "$";
    }
    isIdentPart(ch) {
      return this.isIdentStart(ch) || this.isDigit(ch);
    }
  };
  var Parser2 = class _Parser {
    constructor(tokens) {
      __publicField(this, "tokens");
      __publicField(this, "pos", 0);
      this.tokens = tokens;
    }
    peek() {
      return this.tokens[this.pos];
    }
    advance() {
      const t = this.tokens[this.pos];
      this.pos++;
      return t;
    }
    expect(type) {
      const t = this.peek();
      if (t.type !== type) {
        throw new Error(`Expected ${type} but got ${t.type} (${t.value}) at position ${t.pos}`);
      }
      return this.advance();
    }
    match(type) {
      if (this.peek().type === type) return this.advance();
      return void 0;
    }
    check(type) {
      return this.peek().type === type;
    }
    skipComments() {
      while (this.peek().type === "LINE_COMMENT" || this.peek().type === "BLOCK_COMMENT") {
        this.advance();
      }
    }
    expectSemicolon() {
      if (this.match(";")) return;
      if (this.check("EOF") || this.check("}") || this.peek().value === "\n") return;
    }
    parseModule(_code, sourceLanguage) {
      const stmts = [];
      while (!this.check("EOF")) {
        this.skipComments();
        if (this.check("EOF")) break;
        const stmt = this.parseStatement();
        if (stmt) stmts.push(stmt);
      }
      return ir.module(stmts, sourceLanguage);
    }
    parseStatement() {
      this.skipComments();
      const t = this.peek();
      if (t.type === "VAR" || t.type === "LET" || t.type === "CONST") return this.parseVarDecl();
      if (t.type === "FUNCTION") return this.parseFunctionDecl();
      if (t.type === "CLASS") return this.parseClassDecl();
      if (t.type === "IF") return this.parseIfElse();
      if (t.type === "WHILE") return this.parseWhile();
      if (t.type === "DO") return this.parseDoWhile();
      if (t.type === "FOR") return this.parseFor();
      if (t.type === "SWITCH") return this.parseSwitch();
      if (t.type === "TRY") return this.parseTryCatch();
      if (t.type === "RETURN") return this.parseReturn();
      if (t.type === "BREAK") {
        this.advance();
        this.expectSemicolon();
        return { kind: "break" };
      }
      if (t.type === "CONTINUE") {
        this.advance();
        this.expectSemicolon();
        return { kind: "continue" };
      }
      if (t.type === "THROW") return this.parseThrow();
      if (t.type === "DELETE") return this.parseDelete();
      if (t.type === "IMPORT") return this.parseImport();
      if (t.type === "EXPORT") return this.parseExport();
      if (t.type === "LINE_COMMENT") {
        const c = this.advance();
        return ir.comment(c.value);
      }
      if (t.type === "BLOCK_COMMENT") {
        const c = this.advance();
        return ir.comment(c.value);
      }
      if (t.type === "{") return this.parseBlock();
      return this.parseExprOrAssign();
    }
    parseVarDecl() {
      const kw = this.advance();
      const isConst = kw.type === "CONST";
      const name = this.expect("IDENT").value;
      let ty;
      if (this.match(":")) {
        ty = this.parseTypeAnnotation();
      }
      let value;
      if (this.match("=")) {
        value = this.parseExpression();
      }
      this.expectSemicolon();
      return ir.varDecl(name, value, { type: ty, isConst });
    }
    parseTypeAnnotation() {
      let type = this.advance().value;
      if (this.match("[")) {
        this.expect("]");
        type += "[]";
      }
      while (this.match("|")) {
        type += " | " + this.advance().value;
      }
      return type;
    }
    parseFunctionDecl(isAsync = false) {
      this.expect("FUNCTION");
      const name = this.expect("IDENT").value;
      if (this.check("=>")) {
        this.pos--;
        return this.parseArrowFunction([], isAsync, name);
      }
      const params = this.parseParamList();
      const body = this.parseBlock();
      return ir.funcDef(name, params, body.stmts, { isAsync });
    }
    parseParamList() {
      this.expect("(");
      const params = [];
      if (this.check(")")) {
        this.advance();
        return params;
      }
      while (!this.check(")") && !this.check("EOF")) {
        const isSpread = !!this.match("...");
        const name = this.expect("IDENT").value;
        let ty;
        if (this.match(":")) {
          ty = this.parseTypeAnnotation();
        }
        let def;
        if (this.match("=")) {
          def = this.parseExpression();
        }
        params.push({ name, type: ty, default: def, isSpread });
        if (!this.check(")")) this.expect(",");
      }
      this.expect(")");
      return params;
    }
    parseArrowFunction(params, isAsync = false, name) {
      if (!isAsync && this.check("IDENT")) {
        isAsync = false;
      }
      this.expect("=>");
      let body;
      if (this.check("{")) {
        const block = this.parseBlock();
        body = block.stmts;
      } else {
        const expr = this.parseExpression();
        body = [ir.ret(expr)];
      }
      return ir.funcDef(name || "anonymous", params, body, { isAsync });
    }
    parseClassDecl() {
      this.expect("CLASS");
      const name = this.expect("IDENT").value;
      let superName;
      if (this.match("EXTENDS")) {
        superName = this.expect("IDENT").value;
      }
      const body = this.parseClassBody();
      return ir.classDef(name, body, { super: superName });
    }
    parseClassBody() {
      this.expect("{");
      const stmts = [];
      while (!this.check("}") && !this.check("EOF")) {
        this.skipComments();
        if (this.check("}")) break;
        const isStatic = !!this.match("STATIC");
        let access;
        if (this.check("IDENT") && (this.peek().value === "public" || this.peek().value === "private" || this.peek().value === "protected")) {
          access = this.advance().value;
        }
        if (this.match("CONSTRUCTOR")) {
          const params = this.parseParamList();
          const body = this.parseBlock();
          stmts.push(ir.funcDef("constructor", params, body.stmts, { isStatic, access }));
        } else if (this.check("GET") || this.check("SET")) {
          const accessor = this.advance().value;
          const methodName = this.expect("IDENT").value;
          if (accessor === "get") {
            const body = this.parseBlock();
            stmts.push(ir.funcDef(`get ${methodName}`, [], body.stmts, { isStatic, access }));
          } else {
            const params = this.parseParamList();
            const body = this.parseBlock();
            stmts.push(ir.funcDef(`set ${methodName}`, params, body.stmts, { isStatic, access }));
          }
        } else if (this.match("FUNCTION")) {
          const methodName = this.expect("IDENT").value;
          const params = this.parseParamList();
          const body = this.parseBlock();
          stmts.push(ir.funcDef(methodName, params, body.stmts, { isStatic, access }));
        } else if (this.check("IDENT")) {
          const methodName = this.advance().value;
          if (this.match("(")) {
            const params = [];
            if (!this.check(")")) {
              while (!this.check(")") && !this.check("EOF")) {
                const isSpread = !!this.match("...");
                const pName = this.expect("IDENT").value;
                let def;
                if (this.match("=")) def = this.parseExpression();
                params.push({ name: pName, default: def, isSpread });
                if (!this.check(")")) this.expect(",");
              }
            }
            this.expect(")");
            const body = this.parseBlock();
            stmts.push(ir.funcDef(methodName, params, body.stmts, { isStatic, access }));
          } else {
            this.match(";");
          }
        } else {
          this.advance();
        }
      }
      this.expect("}");
      return stmts;
    }
    parseIfElse() {
      this.expect("IF");
      this.expect("(");
      const condition = this.parseExpression();
      this.expect(")");
      const thenBody = this.parseBlock().stmts;
      const elifs = [];
      let elseBody;
      while (this.match("ELSE")) {
        if (this.check("IF")) {
          this.advance();
          this.expect("(");
          const elifCond = this.parseExpression();
          this.expect(")");
          const elifBody = this.parseBlock().stmts;
          elifs.push({ condition: elifCond, body: elifBody });
        } else {
          elseBody = this.parseBlock().stmts;
          break;
        }
      }
      return ir.ifElse(condition, thenBody, elifs, elseBody);
    }
    parseWhile() {
      this.expect("WHILE");
      this.expect("(");
      const condition = this.parseExpression();
      this.expect(")");
      const body = this.parseBlock().stmts;
      return ir.whileLoop(condition, body);
    }
    parseDoWhile() {
      this.expect("DO");
      const body = this.parseBlock().stmts;
      this.expect("WHILE");
      this.expect("(");
      const condition = this.parseExpression();
      this.expect(")");
      this.expectSemicolon();
      return { kind: "doWhileLoop", condition, body };
    }
    parseFor() {
      this.expect("FOR");
      this.expect("(");
      if (this.check("IDENT") && this.peek().value === "await") this.advance();
      if (this.check("IDENT") || this.check("CONST") || this.check("LET") || this.check("VAR")) {
        const saved = this.pos;
        this.advance();
        const name = this.expect("IDENT").value;
        if (this.match("OF")) {
          const iterable = this.parseExpression();
          this.expect(")");
          const body3 = this.parseBlock().stmts;
          return ir.forEach(name, iterable, body3);
        }
        if (this.match("IN")) {
          const iterable = this.parseExpression();
          this.expect(")");
          const body3 = this.parseBlock().stmts;
          return ir.forEach(name, iterable, body3);
        }
        this.pos = saved;
        const init2 = this.parseVarDeclNoSemi();
        const cond2 = this.match(";") ? void 0 : this.parseExpression();
        this.expect(";");
        const update2 = this.check(")") ? void 0 : this.parseExpression();
        this.expect(")");
        const body2 = this.parseBlock().stmts;
        return ir.forLoop(body2, { init: init2, condition: cond2, update: update2 });
      }
      if (this.match(";")) {
        const cond2 = this.check(";") ? void 0 : this.parseExpression();
        this.expect(";");
        const update2 = this.check(")") ? void 0 : this.parseExpression();
        this.expect(")");
        const body2 = this.parseBlock().stmts;
        return ir.forLoop(body2, { condition: cond2, update: update2 });
      }
      const init = this.parseExprOrAssign();
      this.expect(";");
      const cond = this.check(";") ? void 0 : this.parseExpression();
      this.expect(";");
      const update = this.check(")") ? void 0 : this.parseExpression();
      this.expect(")");
      const body = this.parseBlock().stmts;
      return ir.forLoop(body, { init, condition: cond, update });
    }
    parseVarDeclNoSemi() {
      const kw = this.advance();
      const isConst = kw.type === "CONST";
      const name = this.expect("IDENT").value;
      let value;
      if (this.match("=")) {
        value = this.parseExpression();
      }
      if (this.match(";")) {
      }
      return ir.varDecl(name, value, { isConst });
    }
    parseSwitch() {
      this.expect("SWITCH");
      this.expect("(");
      const subject = this.parseExpression();
      this.expect(")");
      this.expect("{");
      const cases = [];
      let defaultBody;
      while (!this.check("}") && !this.check("EOF")) {
        if (this.match("CASE")) {
          const values = [this.parseExpression()];
          this.expect(":");
          const body = [];
          while (!this.check("CASE") && !this.check("DEFAULT") && !this.check("}") && !this.check("EOF")) {
            this.skipComments();
            if (this.check("CASE") || this.check("DEFAULT") || this.check("}")) break;
            body.push(this.parseStatement());
          }
          cases.push({ value: values, body, fallthrough: !this.hasBreakOrReturn(body) });
        } else if (this.match("DEFAULT")) {
          this.expect(":");
          defaultBody = [];
          while (!this.check("CASE") && !this.check("DEFAULT") && !this.check("}") && !this.check("EOF")) {
            this.skipComments();
            if (this.check("CASE") || this.check("DEFAULT") || this.check("}")) break;
            defaultBody.push(this.parseStatement());
          }
        } else {
          this.advance();
        }
      }
      this.expect("}");
      return { kind: "switch", subject, cases, defaultBody };
    }
    hasBreakOrReturn(body) {
      for (const s of body) {
        if (s.kind === "break" || s.kind === "return" || s.kind === "throw") return true;
      }
      return false;
    }
    parseTryCatch() {
      this.expect("TRY");
      const tryBody = this.parseBlock().stmts;
      let catchVar;
      let catchBody;
      let finallyBody;
      if (this.match("CATCH")) {
        if (this.match("(")) {
          catchVar = this.expect("IDENT").value;
          this.expect(")");
        }
        catchBody = this.parseBlock().stmts;
      }
      if (this.match("FINALLY")) {
        finallyBody = this.parseBlock().stmts;
      }
      return ir.tryCatch(tryBody, { catchVar, catchBody, finallyBody });
    }
    parseReturn() {
      this.expect("RETURN");
      if (this.check(";") || this.check("}") || this.check("EOF")) {
        this.expectSemicolon();
        return ir.ret();
      }
      const value = this.parseExpression();
      this.expectSemicolon();
      return ir.ret(value);
    }
    parseThrow() {
      this.expect("THROW");
      const value = this.parseExpression();
      this.expectSemicolon();
      return { kind: "throw", value };
    }
    parseDelete() {
      this.expect("DELETE");
      const target = this.parsePostfix();
      return { kind: "delete", target };
    }
    parseImport() {
      this.expect("IMPORT");
      if (this.check("{")) {
        this.advance();
        const items = [];
        while (!this.check("}") && !this.check("EOF")) {
          items.push(this.expect("IDENT").value);
          if (!this.check("}")) this.expect(",");
        }
        this.expect("}");
        this.expect("FROM");
        const module2 = this.expect("STRING").value;
        this.expectSemicolon();
        return ir.import(module2, { items });
      }
      if (this.check("IDENT")) {
        const name = this.expect("IDENT").value;
        this.expect("FROM");
        const module2 = this.expect("STRING").value;
        this.expectSemicolon();
        return ir.import(module2, { alias: name });
      }
      if (this.check("*")) {
        this.advance();
        this.expect("AS");
        const alias = this.expect("IDENT").value;
        this.expect("FROM");
        const module2 = this.expect("STRING").value;
        this.expectSemicolon();
        return ir.import(module2, { alias });
      }
      const module = this.expect("STRING").value;
      this.expectSemicolon();
      return ir.import(module);
    }
    parseExport() {
      this.expect("EXPORT");
      if (this.match("DEFAULT")) {
        const expr2 = this.parseExpression();
        this.expectSemicolon();
        return ir.exprStmt(expr2);
      }
      if (this.match("FUNCTION")) {
        const fn = this.parseFunctionDecl();
        return fn;
      }
      if (this.match("CLASS")) {
        const cls = this.parseClassDecl();
        return cls;
      }
      if (this.match("{")) {
        const items = [];
        while (!this.check("}") && !this.check("EOF")) {
          items.push(this.expect("IDENT").value);
          if (!this.check("}")) this.expect(",");
        }
        this.expect("}");
        this.expectSemicolon();
        return ir.comment(`export { ${items.join(", ")} }`);
      }
      if (this.match("CONST") || this.match("LET") || this.match("VAR")) {
        return this.parseVarDecl();
      }
      const expr = this.parseExpression();
      this.expectSemicolon();
      return ir.exprStmt(expr);
    }
    parseBlock() {
      this.expect("{");
      const stmts = [];
      while (!this.check("}") && !this.check("EOF")) {
        this.skipComments();
        if (this.check("}")) break;
        const s = this.parseStatement();
        if (s) stmts.push(s);
      }
      this.expect("}");
      return ir.block(stmts);
    }
    parseExprOrAssign() {
      const expr = this.parseExpression();
      const assignOps = ["=", "+=", "-=", "*=", "/=", "%=", "**=", "&=", "|=", "^=", "<<=", ">>=", ">>>=", "??="];
      if (assignOps.includes(this.peek().type)) {
        const op = this.advance().value;
        const value = this.parseExpression();
        this.expectSemicolon();
        if (op === "=") {
          return ir.assign(expr, value);
        }
        return ir.assign(expr, ir.binop(expr, op.slice(0, -1), value));
      }
      this.expectSemicolon();
      return ir.exprStmt(expr);
    }
    parseExpression() {
      return this.parseTernary();
    }
    parseTernary() {
      let expr = this.parseNullishCoalesce();
      if (this.match("?")) {
        const thenExpr = this.parseAssignment();
        this.expect(":");
        const elseExpr = this.parseTernary();
        return ir.ternary(expr, thenExpr, elseExpr);
      }
      return expr;
    }
    parseAssignment() {
      return this.parseNullishCoalesce();
    }
    parseNullishCoalesce() {
      let left = this.parseLogicalOr();
      while (this.check("??")) {
        this.advance();
        const right = this.parseLogicalOr();
        left = { kind: "nullishCoalesce", left, right };
      }
      return left;
    }
    parseLogicalOr() {
      let left = this.parseLogicalAnd();
      while (this.check("||")) {
        this.advance();
        const right = this.parseLogicalAnd();
        left = ir.binop(left, "||", right);
      }
      return left;
    }
    parseLogicalAnd() {
      let left = this.parseBitwiseOr();
      while (this.check("&&")) {
        this.advance();
        const right = this.parseBitwiseOr();
        left = ir.binop(left, "&&", right);
      }
      return left;
    }
    parseBitwiseOr() {
      let left = this.parseBitwiseXor();
      while (this.check("|")) {
        this.advance();
        const right = this.parseBitwiseXor();
        left = ir.binop(left, "|", right);
      }
      return left;
    }
    parseBitwiseXor() {
      let left = this.parseBitwiseAnd();
      while (this.check("^")) {
        this.advance();
        const right = this.parseBitwiseAnd();
        left = ir.binop(left, "^", right);
      }
      return left;
    }
    parseBitwiseAnd() {
      let left = this.parseEquality();
      while (this.check("&")) {
        this.advance();
        const right = this.parseEquality();
        left = ir.binop(left, "&", right);
      }
      return left;
    }
    parseEquality() {
      let left = this.parseRelational();
      while (this.check("==") || this.check("!=") || this.check("===") || this.check("!==")) {
        const op = this.advance().value;
        const right = this.parseRelational();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parseRelational() {
      let left = this.parseShift();
      while (this.check("<") || this.check(">") || this.check("<=") || this.check(">=") || this.check("INSTANCEOF") || this.check("IN")) {
        const op = this.advance().value;
        const right = this.parseShift();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parseShift() {
      let left = this.parseAdditive();
      while (this.check("<<") || this.check(">>") || this.check(">>>")) {
        const op = this.advance().value;
        const right = this.parseAdditive();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parseAdditive() {
      let left = this.parseMultiplicative();
      while (this.check("+") || this.check("-")) {
        const op = this.advance().value;
        const right = this.parseMultiplicative();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parseMultiplicative() {
      let left = this.parseExponentiation();
      while (this.check("*") || this.check("/") || this.check("%")) {
        const op = this.advance().value;
        const right = this.parseExponentiation();
        left = ir.binop(left, op, right);
      }
      return left;
    }
    parseExponentiation() {
      const base = this.parseUnary();
      if (this.check("**")) {
        this.advance();
        const exp = this.parseExponentiation();
        return ir.binop(base, "**", exp);
      }
      return base;
    }
    parseUnary() {
      if (this.check("!")) {
        this.advance();
        return ir.unaryop("!", this.parseUnary());
      }
      if (this.check("~")) {
        this.advance();
        return ir.unaryop("~", this.parseUnary());
      }
      if (this.check("TYPEOF")) {
        this.advance();
        return ir.unaryop("typeof", this.parseUnary());
      }
      if (this.check("VOID")) {
        this.advance();
        return ir.unaryop("void", this.parseUnary());
      }
      if (this.check("DELETE")) {
        this.advance();
        return ir.unaryop("delete", this.parseUnary());
      }
      if (this.check("AWAIT")) {
        this.advance();
        return ir.unaryop("await", this.parseUnary());
      }
      if (this.check("YIELD")) {
        this.advance();
        if (this.check("*")) {
          this.advance();
          return ir.unaryop("yield*", this.parseUnary());
        }
        return ir.unaryop("yield", this.parseUnary());
      }
      if (this.check("+")) {
        this.advance();
        return ir.unaryop("+", this.parseUnary());
      }
      if (this.check("-")) {
        this.advance();
        return ir.unaryop("-", this.parseUnary());
      }
      if (this.check("++")) {
        this.advance();
        return ir.unaryop("++", this.parseUnary());
      }
      if (this.check("--")) {
        this.advance();
        return ir.unaryop("--", this.parseUnary());
      }
      return this.parseNewExpr();
    }
    parseNewExpr() {
      if (this.check("NEW")) {
        this.advance();
        const className = this.expect("IDENT").value;
        if (this.match("(")) {
          const args = this.parseArgList();
          this.expect(")");
          return ir.new(className, args);
        }
        return ir.new(className, []);
      }
      return this.parsePostfix();
    }
    parsePostfix() {
      let expr = this.parseCallExpr();
      while (true) {
        if (this.check("++")) {
          this.advance();
          expr = ir.unaryop("++", expr, false);
        } else if (this.check("--")) {
          this.advance();
          expr = ir.unaryop("--", expr, false);
        } else if (this.check("?.")) {
          this.advance();
          if (this.check("(")) {
            const args = this.parseArgList();
            this.expect(")");
            expr = ir.methodCall(expr, "call", args);
          } else if (this.check("[")) {
            this.advance();
            const index = this.parseExpression();
            this.expect("]");
            expr = ir.indexAccess(expr, index);
          } else {
            const prop = this.expect("IDENT").value;
            expr = ir.propAccess(expr, prop);
          }
        } else if (this.check(".")) {
          this.advance();
          if (this.check("CONSTRUCTOR")) {
            const prop = this.advance().value;
            expr = ir.propAccess(expr, prop);
          } else {
            const prop = this.expect("IDENT").value;
            expr = ir.propAccess(expr, prop);
          }
        } else if (this.check("[")) {
          this.advance();
          const index = this.parseExpression();
          this.expect("]");
          expr = ir.indexAccess(expr, index);
        } else if (this.check("(")) {
          const args = this.parseArgList();
          this.expect(")");
          if (expr.kind === "propertyAccess") {
            const obj = expr.object;
            const method = expr.property;
            expr = ir.methodCall(obj, method, args);
          } else if (expr.kind === "identifier") {
            expr = ir.funcCallExpr(expr.name, args);
          } else {
            expr = ir.funcCallExpr("call", [expr, ...args]);
          }
        } else {
          break;
        }
      }
      return expr;
    }
    parseCallExpr() {
      const t = this.peek();
      if (t.type === "THIS") {
        this.advance();
        return ir.ident("this");
      }
      if (t.type === "SUPER") {
        this.advance();
        if (this.match(".")) {
          const prop = this.expect("IDENT").value;
          return ir.propAccess(ir.ident("super"), prop);
        }
        return ir.ident("super");
      }
      if (t.type === "IDENT" && this.peek().value === "console") {
        this.advance();
        this.expect(".");
        const method = this.expect("IDENT").value;
        if (method === "log" || method === "error" || method === "warn") {
          this.expect("(");
          const args = this.parseArgList();
          this.expect(")");
          return ir.methodCall(ir.ident("console"), method, args);
        }
        return ir.propAccess(ir.ident("console"), method);
      }
      if (t.type === "NUMBER") {
        this.advance();
        return ir.literal(this.parseNumericValue(t.value));
      }
      if (t.type === "STRING") {
        this.advance();
        return ir.literal(t.value, "string");
      }
      if (t.type === "TEMPLATE_START") {
        return this.parseTemplateExpr();
      }
      if (t.type === "TEMPLATE_END") {
        this.advance();
        return ir.literal(t.value, "string");
      }
      if (t.type === "NULL") {
        this.advance();
        return ir.literal(null, "null");
      }
      if (t.type === "UNDEFINED") {
        this.advance();
        return ir.literal("undefined", "undefined");
      }
      if (t.type === "TRUE") {
        this.advance();
        return ir.literal(true);
      }
      if (t.type === "FALSE") {
        this.advance();
        return ir.literal(false);
      }
      if (t.type === "(") {
        this.advance();
        const expr = this.parseExpression();
        this.expect(")");
        return expr;
      }
      if (t.type === "[") {
        return this.parseArrayLiteral();
      }
      if (t.type === "{") {
        return this.parseObjectLiteral();
      }
      if (t.type === "FUNCTION") {
        return this.parseFunctionExpr();
      }
      if (t.type === "CLASS") {
        return this.parseClassExpr();
      }
      if (t.type === "IDENT") {
        this.advance();
        if (t.value === "Number" || t.value === "String" || t.value === "Boolean") {
          if (this.check("(")) {
            this.advance();
            const inner = this.parseExpression();
            this.expect(")");
            return ir.typeCast(inner, t.value);
          }
        }
        return ir.ident(t.value);
      }
      throw new Error(`Unexpected token: ${t.type} (${t.value}) at position ${t.pos}`);
    }
    parseTemplateExpr() {
      const parts = [];
      let t = this.peek();
      if (t.type === "TEMPLATE_START") {
        const staticPart = t.value;
        this.advance();
        const interpParts = [];
        const staticParts = [staticPart];
        while (true) {
          if (this.peek().type === "TEMPLATE_MID") {
            interpParts.push(this.parseInterpExpr(this.peek().value));
            this.advance();
          } else if (this.peek().type === "TEMPLATE_END") {
            parts.push(...staticParts.flatMap((s, i) => {
              const result = [];
              if (s) result.push(s);
              if (i < interpParts.length) result.push(interpParts[i]);
              return result;
            }));
            if (this.peek().value) parts.push(this.peek().value);
            this.advance();
            break;
          } else {
            break;
          }
        }
        if (parts.length === 1 && typeof parts[0] === "string") {
          return ir.literal(parts[0], "string");
        }
        return ir.stringInterp(parts);
      }
      if (t.type === "TEMPLATE_END") {
        this.advance();
        return ir.literal(t.value, "string");
      }
      return ir.literal("", "string");
    }
    parseInterpExpr(exprStr) {
      const innerTokens = new Tokenizer2(exprStr).tokenize();
      const innerParser = new _Parser(innerTokens);
      return innerParser.parseExpression();
    }
    parseArrayLiteral() {
      this.expect("[");
      const elements = [];
      while (!this.check("]") && !this.check("EOF")) {
        if (this.check(",")) {
          elements.push(ir.literal(void 0, "undefined"));
        } else {
          elements.push(this.parseExpression());
        }
        if (!this.check("]")) this.expect(",");
      }
      this.expect("]");
      return ir.arrayLit(elements);
    }
    parseObjectLiteral() {
      this.expect("{");
      const entries = [];
      while (!this.check("}") && !this.check("EOF")) {
        if (this.match("...")) {
          const spread = this.parseExpression();
          entries.push({ key: ir.literal("spread"), value: spread });
          if (!this.check("}")) this.expect(",");
          continue;
        }
        let key;
        if (this.check("STRING")) {
          key = ir.literal(this.advance().value, "string");
        } else if (this.check("NUMBER")) {
          key = ir.literal(this.parseNumericValue(this.advance().value));
        } else if (this.check("[")) {
          this.advance();
          key = this.parseExpression();
          this.expect("]");
        } else {
          const k = this.advance().value;
          if (k === "get" || k === "set") {
            if (this.check("IDENT")) {
              const methodName = this.peek().value;
              this.advance();
              if (this.match("(")) {
                const params = [];
                if (!this.check(")")) {
                  while (!this.check(")")) {
                    const pName = this.expect("IDENT").value;
                    params.push({ name: pName, isSpread: false });
                    if (!this.check(")")) this.expect(",");
                  }
                }
                this.expect(")");
                const body = this.parseBlock();
                entries.push({ key: ir.literal(`${k} ${methodName}`), value: ir.funcDef(`${k} ${methodName}`, params, body.stmts) });
                if (!this.check("}")) this.expect(",");
                continue;
              }
            }
          }
          key = ir.literal(k, "string");
        }
        this.expect(":");
        const value = this.parseExpression();
        entries.push({ key, value });
        if (!this.check("}")) this.expect(",");
      }
      this.expect("}");
      return ir.dictLit(entries);
    }
    parseFunctionExpr() {
      this.expect("FUNCTION");
      const name = this.check("(") ? "anonymous" : this.expect("IDENT").value;
      const params = this.parseParamList();
      const body = this.parseBlock();
      return ir.funcDef(name, params, body.stmts);
    }
    parseClassExpr() {
      this.expect("CLASS");
      const name = this.check("{") ? "anonymous" : this.expect("IDENT").value;
      let superName;
      if (this.match("EXTENDS")) {
        superName = this.expect("IDENT").value;
      }
      const body = this.parseClassBody();
      return ir.classDef(name, body, { super: superName });
    }
    parseArgList() {
      const args = [];
      if (this.check(")")) return args;
      while (!this.check(")") && !this.check("EOF")) {
        if (this.match("...")) {
          args.push(ir.unaryop("...", this.parseExpression()));
        } else {
          args.push(this.parseExpression());
        }
        if (!this.check(")")) this.expect(",");
      }
      return args;
    }
    parseNumericValue(s) {
      if (s.startsWith("0x") || s.startsWith("0X")) return parseInt(s, 16);
      if (s.startsWith("0b") || s.startsWith("0B")) return parseInt(s.slice(2), 2);
      if (s.startsWith("0o") || s.startsWith("0O")) return parseInt(s.slice(2), 8);
      return Number(s);
    }
  };
  var JavaScriptParser = class {
    parse(code, _language) {
      const tokenizer = new Tokenizer2(code);
      const tokens = tokenizer.tokenize();
      const parser = new Parser2(tokens);
      return parser.parseModule(code, _language);
    }
  };

  // src/languages/batch/parser.ts
  var COMPARISON_OPS = /* @__PURE__ */ new Set(["equ", "neq", "leq", "geq", "lss", "gtr"]);
  var COMPARISON_MAP = {
    equ: "==",
    neq: "!=",
    leq: "<=",
    geq: ">=",
    lss: "<",
    gtr: ">"
  };
  var BatchParser = class {
    constructor() {
      __publicField(this, "lines", []);
      __publicField(this, "pos", 0);
      __publicField(this, "labels", /* @__PURE__ */ new Map());
    }
    parse(code, _language) {
      this.lines = this.mergeContinuations(code);
      this.pos = 0;
      this.labels.clear();
      this.preScanLabels();
      const stmts = [];
      while (this.pos < this.lines.length) {
        const line = this.lines[this.pos++].trim();
        if (!line) continue;
        if (line.startsWith("REM") || line.startsWith("::")) {
          stmts.push(ir.comment(line));
          continue;
        }
        const parsed = this.parseLine(line);
        if (parsed) stmts.push(parsed);
      }
      return ir.module(stmts, "batch");
    }
    mergeContinuations(code) {
      const raw = code.replace(/\r\n?/g, "\n").split("\n");
      const merged = [];
      let buf = "";
      for (const line of raw) {
        if (line.endsWith("^")) {
          buf += line.slice(0, -1) + " ";
        } else {
          merged.push(buf + line);
          buf = "";
        }
      }
      if (buf) merged.push(buf);
      return merged;
    }
    preScanLabels() {
      for (let i = 0; i < this.lines.length; i++) {
        const t = this.lines[i].trim();
        if (t.endsWith(":") && !t.startsWith("::")) {
          const label = t.slice(0, -1).trim();
          if (label) this.labels.set(label.toLowerCase(), i);
        }
      }
    }
    parseLine(line) {
      if (!line) return null;
      const stripped = this.stripRedirections(line);
      const cmd = this.extractCommand(stripped);
      if (!cmd) return null;
      const cl = cmd.toLowerCase();
      const rest = stripped.substring(cmd.length).trim();
      if (cl === "echo" || cl === "echo.") return this.parseEcho(stripped);
      if (cl === "set") return this.parseSet(rest, stripped);
      if (cl === "if") return this.parseIf(stripped);
      if (cl === "for") return this.parseFor(stripped);
      if (cl === "goto") return ir.funcCall("goto", [ir.literal(rest.replace(/^-/, "").trim())]);
      if (cl === "call") return this.parseCall(rest);
      if (cl === "pause") return ir.funcCall("pause", []);
      if (cl === "cls") return ir.funcCall("cls", []);
      if (cl === "exit") return ir.funcCall("exit", rest ? [this.parseExpression(rest)] : []);
      if (cl === "title") return ir.funcCall("title", [this.parseExpression(this.unq(rest))]);
      if (cl === "color") return ir.funcCall("color", [ir.literal(rest)]);
      if (cl === "setlocal") return ir.funcCall("setlocal", []);
      if (cl === "endlocal") return ir.funcCall("endlocal", []);
      if (cl === "cd" || cl === "chdir") return ir.funcCall(rest ? "changeDir" : "cwd", rest ? [this.parseExpression(this.unq(rest))] : []);
      if (cl === "mkdir" || cl === "md") return ir.funcCall("mkdir", [this.parseExpression(this.unq(rest))]);
      if (cl === "del" || cl === "erase") return ir.funcCall("removeFile", [this.parseExpression(this.unq(rest))]);
      if (cl === "copy") return this.parseCopyMove(rest, "copyFile");
      if (cl === "move") return this.parseCopyMove(rest, "moveFile");
      if (cl === "ren" || cl === "rename") return this.parseCopyMove(rest, "renameFile");
      if (cl === "type") return ir.funcCall("readFile", [this.parseExpression(this.unq(rest))]);
      if (stripped.endsWith(":") && !stripped.startsWith("::")) return ir.funcCall("label", [ir.literal(stripped.slice(0, -1).trim())]);
      if (this.hasPipe(stripped)) return this.parsePipeline(stripped);
      if (this.hasRedirection(stripped)) return this.parseRedirection(stripped);
      return this.parseCommandInvoke(stripped);
    }
    extractCommand(line) {
      return line.match(/^(\S+)/)?.[1] ?? "";
    }
    parseEcho(line) {
      const rest = line.replace(/^echo[\.\s]*/i, "");
      if (!rest.trim()) return ir.print([ir.literal("")], true);
      const parts = this.parseInterpolatedText(rest);
      const args = parts.map((p) => typeof p === "string" ? ir.stringInterp([p]) : p);
      return ir.print(args, true);
    }
    parseInterpolatedText(text) {
      const result = [];
      let current = "";
      let i = 0;
      while (i < text.length) {
        if (text[i] === "%" && i + 1 < text.length && text[i + 1] !== " ") {
          if (current) {
            result.push(current);
            current = "";
          }
          const v = this.scanVar(text, i, "%");
          if (v) {
            result.push(ir.ident(v.name));
            i = v.end;
            continue;
          }
        }
        if (text[i] === "!") {
          if (current) {
            result.push(current);
            current = "";
          }
          const v = this.scanVar(text, i, "!");
          if (v) {
            result.push(ir.ident(v.name));
            i = v.end;
            continue;
          }
        }
        current += text[i++];
      }
      if (current) result.push(current);
      return result;
    }
    scanVar(text, start, delim) {
      let end = start + 1;
      while (end < text.length && text[end] !== delim) end++;
      if (end >= text.length) return null;
      const name = text.substring(start + 1, end);
      return name ? { name, end: end + 1 } : null;
    }
    parseSet(rest, full) {
      if (!rest) return ir.exprStmt(ir.funcCallExpr("set", []));
      if (rest.toLowerCase().startsWith("/a")) return this.parseSetArithmetic(full);
      if (rest.toLowerCase().startsWith("/p")) return this.parseSetPrompt(rest);
      if (rest.toLowerCase().startsWith("/f")) {
        const eq2 = rest.indexOf("=");
        if (eq2 === -1) return ir.exprStmt(ir.funcCallExpr("set", [ir.literal(rest)]));
        return ir.varDecl(rest.substring(0, eq2).trim(), ir.funcCallExpr("glob", [this.parseExpression(rest.substring(eq2 + 1).trim())]), { isConst: false });
      }
      const eq = rest.indexOf("=");
      if (eq === -1) return ir.varDecl(rest, void 0, { isConst: false });
      return ir.varDecl(rest.substring(0, eq).trim(), this.parseExpression(rest.substring(eq + 1)), { isConst: false });
    }
    parseSetArithmetic(line) {
      const rest = line.replace(/^set\s+\/a\s*/i, "").trim();
      const cleaned = this.unq(rest);
      const eq = cleaned.indexOf("=");
      if (eq === -1) return ir.exprStmt(this.parseArithmetic(cleaned));
      return ir.assign(ir.ident(cleaned.substring(0, eq).trim()), this.parseArithmetic(cleaned.substring(eq + 1).trim()), "=");
    }
    parseSetPrompt(rest) {
      const body = rest.replace(/^\/p\s*/i, "").trim();
      const eq = body.indexOf("=");
      if (eq === -1) return ir.varDecl(body, ir.funcCallExpr("input", []), { isConst: false });
      const prompt = body.substring(eq + 1).trim();
      return ir.varDecl(body.substring(0, eq).trim(), ir.funcCallExpr("input", prompt ? [this.parseExpression(prompt)] : []), { isConst: false });
    }
    parseIf(line) {
      const rest = line.replace(/^if\s+/i, "");
      const kw = rest.match(/^(\S+)\s+/i)?.[1]?.toLowerCase();
      if (!kw) return ir.ifElse(ir.literal(true), [ir.funcCall("if_invalid", [])]);
      let condition;
      let after;
      if (kw === "exist") {
        const neg = rest.toLowerCase().startsWith("if exist not ") || rest.toLowerCase().startsWith("exist not ");
        const path = rest.replace(/^exist\s+(not\s+)?/i, "").replace(/\s+(goto|call|\().*$/, "").trim();
        condition = ir.funcCallExpr("fileExists", [this.parseExpression(this.unq(path))]);
        if (neg) condition = ir.unaryop("!", condition, true);
        after = rest.replace(/^exist\s+(?:not\s+)?[^\s]+\s*/i, "").trim();
      } else if (kw === "not") {
        const inner = rest.replace(/^not\s+/i, "");
        const innerKw = inner.match(/^(\S+)\s+/i)?.[1]?.toLowerCase();
        if (innerKw === "exist") {
          const path = inner.replace(/^exist\s+/i, "").replace(/\s+(goto|call|\().*$/, "").trim();
          condition = ir.unaryop("!", ir.funcCallExpr("fileExists", [this.parseExpression(this.unq(path))]), true);
          after = inner.replace(/^exist\s+[^\s]+\s*/i, "").trim();
        } else if (innerKw === "defined") {
          const vn = inner.replace(/^defined\s+/i, "").replace(/\s.*$/, "").trim();
          condition = ir.unaryop("!", ir.funcCallExpr("defined", [ir.literal(vn)]), true);
          after = inner.replace(/^defined\s+[^\s]+\s*/i, "").trim();
        } else {
          const parts = inner.split(/\s+/);
          condition = this.parseComparison(parts[0], parts[1] ?? "equ", parts.slice(2, -1).join(" "));
          after = inner.replace(/^\S+\s+\S+\s+\S+\s*/, "").trim();
        }
      } else if (kw === "defined") {
        const vn = rest.replace(/^defined\s+/i, "").replace(/\s.*$/, "").trim();
        condition = ir.funcCallExpr("defined", [ir.literal(vn)]);
        after = rest.replace(/^defined\s+[^\s]+\s*/i, "").trim();
      } else if (COMPARISON_OPS.has(kw)) {
        const parts = rest.split(/\s+/);
        condition = this.parseComparison(parts[0], parts[1], parts.slice(2, -1).join(" "));
        after = rest.replace(/^\S+\s+\S+\s+\S+\s*/, "").trim();
      } else {
        condition = this.parseExpression(rest.replace(/\s+(goto|call|\().*$/, "").trim());
        after = rest.replace(/^\S+\s*/i, "").trim();
      }
      const block = this.extractBlock(after);
      const stmts = block.stmts.length > 0 ? this.parseLines(block.stmts) : [];
      const actL = block.action.toLowerCase();
      if (actL.startsWith("goto")) {
        return ir.ifElse(condition, [ir.funcCall("goto", [ir.literal(block.action.replace(/^goto\s*/i, "").replace(/^-/, "").trim())])]);
      }
      if (actL.startsWith("call")) {
        stmts.unshift(this.parseCommandInvoke(block.action.replace(/^call\s*/i, "").trim()));
      }
      let elseBody;
      const em = after.match(/^\(\s*\)\s*else\s*(\{.*)/i);
      if (em) {
        const eb = this.extractBlock(em[1].replace(/^else\s*/, "").trim());
        elseBody = eb.stmts.length > 0 ? this.parseLines(eb.stmts) : [ir.empty()];
      }
      return ir.ifElse(condition, stmts, [], elseBody);
    }
    parseComparison(left, op, right) {
      return ir.binop(this.parseExpression(left), COMPARISON_MAP[op.toLowerCase()] ?? op, this.parseExpression(right));
    }
    extractBlock(text) {
      if (text.match(/^\(\s*\)\s*\{?\s*$/) || text.match(/^\(\s*\)/) || text.match(/^\{?\s*$/)) {
        return { action: "", stmts: this.extractBlockLines() };
      }
      const m = text.match(/^\(\s*\)\s*(.+)/);
      if (m) {
        if (m[1].trim().startsWith("{")) return { action: "", stmts: this.extractBlockLines() };
        return { action: m[1].trim(), stmts: [] };
      }
      return { action: text, stmts: [] };
    }
    extractBlockLines() {
      const result = [];
      let depth = 0;
      let started = false;
      while (this.pos < this.lines.length) {
        const line = this.lines[this.pos++].trim();
        if (!started) {
          if (line === "{" || line === "(" || line === ") {" || line === "({" || line.match(/^\(\s*\)/)) {
            started = true;
            depth = 1;
            continue;
          }
          result.push(line);
          return result;
        }
        for (const ch of line) {
          if (ch === "{" || ch === "(") depth++;
          else if (ch === "}" || ch === ")") depth--;
        }
        if (depth <= 0) {
          const c = line.replace(/^[}\)]+\s*/, "").replace(/\s*[}\)]+$/, "").trim();
          if (c) result.push(c);
          break;
        }
        result.push(line);
      }
      return result;
    }
    parseLines(lines) {
      const savedLines = this.lines;
      const savedPos = this.pos;
      this.lines = lines;
      this.pos = 0;
      const stmts = [];
      while (this.pos < this.lines.length) {
        const line = this.lines[this.pos++].trim();
        if (!line) continue;
        if (line.startsWith("REM") || line.startsWith("::")) {
          stmts.push(ir.comment(line));
          continue;
        }
        const parsed = this.parseLine(line);
        if (parsed) stmts.push(parsed);
      }
      this.lines = savedLines;
      this.pos = savedPos;
      return stmts.length > 0 ? stmts : [ir.empty()];
    }
    parseFor(line) {
      const rest = line.replace(/^for\s+/i, "").trim();
      const lMatch = rest.match(/^\/l\s+(\S+)\s+in\s*\((.+)\)\s+do\s*\{?\s*$/i);
      if (lMatch) {
        const varName = lMatch[1].replace(/%/g, "");
        const rangeParts = lMatch[2].trim().split(/\s+to\s+/i);
        const start = this.parseArithmetic(rangeParts[0]?.trim() ?? "0");
        const end = this.parseArithmetic(rangeParts[1]?.trim() ?? "0");
        const body = this.parseLines(this.extractBlockLines());
        const updateStmt = ir.assign(ir.ident(varName), ir.binop(ir.ident(varName), "+", ir.literal(1)), "=");
        return ir.forLoop([...body, updateStmt], {
          init: ir.assign(ir.ident(varName), start, "="),
          condition: ir.binop(ir.ident(varName), "<=", end)
        });
      }
      const fMatch = rest.match(/^\/f\s+(?:\[delims=\S+\]\s+)?(?:tokens=(\S+)\s+)?(.+?)\s+do\s*\{?\s*$/i);
      if (fMatch) {
        const varName = fMatch[1] ?? "*";
        const source = fMatch[2].trim();
        const iterable = source.startsWith("(") ? this.parseExpression(source) : ir.funcCallExpr("readLines", [this.parseExpression(this.unq(source))]);
        return ir.forEach(varName, iterable, this.parseLines(this.extractBlockLines()));
      }
      const inMatch = rest.match(/^(%%?\w+)\s+in\s*\((.+?)\)\s+do\s*\{?\s*$/i);
      if (inMatch) {
        const varName = inMatch[1].replace(/%%/g, "%").replace(/%/g, "");
        const items = inMatch[2].trim().split(/\s+/).map((s) => this.parseExpression(this.unq(s)));
        return ir.forEach(varName, ir.arrayLit(items), this.parseLines(this.extractBlockLines()));
      }
      const basicMatch = rest.match(/^(%%?\w+)\s+in\s*(\S+)\s+do\s*\{?\s*$/i);
      if (basicMatch) {
        const varName = basicMatch[1].replace(/%%/g, "%").replace(/%/g, "");
        return ir.forEach(varName, this.parseExpression(basicMatch[2]), this.parseLines(this.extractBlockLines()));
      }
      return ir.exprStmt(ir.funcCallExpr("for_invalid", [ir.literal(rest)]));
    }
    parseCall(rest) {
      if (!rest) return ir.funcCall("call", []);
      if (rest.startsWith(":")) return ir.funcCall("call", [ir.literal(rest)]);
      const name = rest.match(/^(\S+)/)?.[1] ?? "";
      const argsStr = rest.substring(name.length).trim();
      const args = argsStr ? this.splitArgs(argsStr).map((a) => this.parseExpression(a)) : [];
      return ir.funcCall(name, args);
    }
    parseCopyMove(rest, fn) {
      const args = this.splitArgs(rest);
      if (args.length >= 2) {
        return ir.funcCall(fn, [this.parseExpression(this.unq(args[0])), this.parseExpression(this.unq(args[1]))]);
      }
      return ir.funcCall(fn, args.map((a) => this.parseExpression(this.unq(a))));
    }
    hasPipe(line) {
      let q = false;
      for (const ch of line) {
        if (ch === '"') q = !q;
        if (ch === "|" && !q) return true;
      }
      return false;
    }
    hasRedirection(line) {
      let q = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') q = !q;
        if (!q && (line[i] === ">" || line[i] === "<" || line[i] === "2" && line[i + 1] === ">")) return true;
      }
      return false;
    }
    parsePipeline(line) {
      const parts = this.splitOn(line, "|");
      if (parts.length <= 1) return this.parseLine(line) ?? ir.empty();
      let result = ir.funcCallExpr(this.extractCommand(parts[0].trim()), this.argsFrom(parts[0].trim()));
      for (let i = 1; i < parts.length; i++) {
        const p = parts[i].trim();
        result = ir.funcCallExpr("pipe", [result, ir.funcCallExpr(this.extractCommand(p), this.argsFrom(p))]);
      }
      return ir.exprStmt(result);
    }
    parseRedirection(line) {
      let m = line.match(/^(.+?)\s*>>\s*(.+)$/);
      if (m) return ir.fileWrite(this.unq(m[2].trim()), ir.funcCallExpr("output", []), true);
      m = line.match(/^(.+?)\s*>\s*(.+)$/);
      if (m) return ir.fileWrite(this.unq(m[2].trim()), ir.funcCallExpr("output", []), false);
      m = line.match(/^(.+?)\s*<\s*(.+)$/);
      if (m) return ir.exprStmt(ir.funcCallExpr("redirectInput", [ir.funcCallExpr("readFile", [this.parseExpression(this.unq(m[2].trim()))])]));
      m = line.match(/^(.+?)\s*2>\s*(.+)$/);
      if (m) return ir.fileWrite(this.unq(m[2].trim()), ir.funcCallExpr("stderr", []), false);
      return this.parseCommandInvoke(line);
    }
    parseCommandInvoke(line) {
      const trimmed = line.trim();
      if (!trimmed) return ir.empty();
      const cmd = this.extractCommand(trimmed);
      const rest = trimmed.substring(cmd.length).trim();
      return ir.funcCall(cmd, rest ? this.splitArgs(rest).map((a) => this.parseExpression(a)) : []);
    }
    argsFrom(line) {
      const cmd = this.extractCommand(line);
      const rest = line.substring(cmd.length).trim();
      return rest ? this.splitArgs(rest).map((a) => this.parseExpression(a)) : [];
    }
    parseExpression(text) {
      const t = this.unq(text.trim());
      if (!t) return ir.literal("");
      if (t.startsWith("%%") || t.startsWith("%") && t.endsWith("%") && t.length > 2) return ir.ident(t.replace(/%/g, ""));
      if (t.startsWith("!") && t.endsWith("!") && t.length > 2) return ir.ident(t.replace(/!/g, ""));
      return this.parseArithmetic(t);
    }
    parseArithmetic(text) {
      const t = text.trim();
      if (!t) return ir.literal(0);
      const state = { pos: 0 };
      return this.parseAddSub(t, state);
    }
    parseAddSub(text, s) {
      let left = this.parseMulDiv(text, s);
      while (s.pos < text.length) {
        this.sp(text, s);
        const ch = text[s.pos];
        if (ch === "+" || ch === "-") {
          s.pos++;
          left = ir.binop(left, ch, this.parseMulDiv(text, s));
        } else break;
      }
      return left;
    }
    parseMulDiv(text, s) {
      let left = this.parsePrimary(text, s);
      while (s.pos < text.length) {
        this.sp(text, s);
        const ch = text[s.pos];
        if (ch === "*" || ch === "/" || ch === "%") {
          s.pos++;
          left = ir.binop(left, ch, this.parsePrimary(text, s));
        } else break;
      }
      return left;
    }
    parsePrimary(text, s) {
      this.sp(text, s);
      if (s.pos >= text.length) return ir.literal(0);
      const ch = text[s.pos];
      if (ch === "(") {
        s.pos++;
        const expr = this.parseAddSub(text, s);
        this.sp(text, s);
        if (s.pos < text.length && text[s.pos] === ")") s.pos++;
        return expr;
      }
      if (ch === "+" || ch === "-") {
        s.pos++;
        return ir.unaryop(ch, this.parsePrimary(text, s), true);
      }
      if (ch === "!") {
        s.pos++;
        return ir.unaryop("!", this.parsePrimary(text, s), true);
      }
      let token = "";
      while (s.pos < text.length) {
        const c = text[s.pos];
        if (c === " ") {
          if (token) break;
          s.pos++;
          continue;
        }
        if ("+-*/%()".includes(c) && token) break;
        token += c;
        s.pos++;
      }
      if (!token) return ir.literal(0);
      if (/^\d+(\.\d+)?$/.test(token)) {
        return ir.literal(token.includes(".") ? parseFloat(token) : parseInt(token, 10));
      }
      if (token.startsWith("%%") || token.startsWith("%") && token.endsWith("%")) return ir.ident(token.replace(/%/g, ""));
      if (token.startsWith("!") && token.endsWith("!")) return ir.ident(token.replace(/!/g, ""));
      return ir.ident(token);
    }
    sp(text, s) {
      while (s.pos < text.length && text[s.pos] === " ") s.pos++;
    }
    unq(s) {
      return s.length >= 2 && s[0] === '"' && s[s.length - 1] === '"' ? s.slice(1, -1) : s;
    }
    stripRedirections(line) {
      let result = "";
      let q = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
          q = !q;
          result += line[i];
        } else if (!q && (line[i] === ">" || line[i] === "<" || line[i] === "|")) break;
        else if (!q && line[i] === "2" && line[i + 1] === ">") break;
        else result += line[i];
      }
      return result.trim();
    }
    splitArgs(text) {
      const args = [];
      let current = "";
      let q = false;
      let pd = 0;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '"') {
          q = !q;
          current += ch;
        } else if (ch === "(" && !q) {
          pd++;
          current += ch;
        } else if (ch === ")" && !q) {
          pd--;
          current += ch;
        } else if (ch === " " && !q && pd === 0) {
          if (current) {
            args.push(current);
            current = "";
          }
        } else current += ch;
      }
      if (current) args.push(current);
      return args;
    }
    splitOn(text, sep) {
      const parts = [];
      let current = "";
      let q = false;
      for (const ch of text) {
        if (ch === '"') q = !q;
        if (ch === sep && !q) {
          parts.push(current);
          current = "";
        } else current += ch;
      }
      parts.push(current);
      return parts;
    }
  };

  // src/languages/emitter.ts
  var pySyntax = {
    lineComment: "# ",
    blockCommentStart: '"""',
    blockCommentEnd: '"""',
    varDecl(name, _type, init, _mutable) {
      return init ? `${name} = ${init}` : `${name} = None`;
    },
    constDecl(name, _type, init) {
      return `${name.toUpperCase()} = ${init}`;
    },
    funcDef(name, params, returnType, body) {
      const sig = params.length ? params.join(", ") : "";
      const ret = returnType ? ` -> ${returnType}` : "";
      return `def ${name}(${sig})${ret}:
${body}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? `(${parent})` : "";
      return `class ${name}${inher}:
${body}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if ${cond}:
${thenBlock}`;
      if (elseBlock) {
        result += `
else:
${elseBlock}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while ${cond}:
${body}`;
    },
    doWhileLoop(cond, body) {
      return `while True:
${body}
    if not (${cond}):
        break`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while ${cond}:
${body}
    ${step}`;
    },
    forEach(varName, iterable, body) {
      return `for ${varName} in ${iterable}:
${body}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`if ${expr} == ${cases[0]?.match}:`, cases[0]?.body || ""];
      for (let i = 1; i < cases.length; i++) {
        lines.push(`elif ${expr} == ${cases[i].match}:`);
        lines.push(cases[i].body);
      }
      if (defaultCase) {
        lines.push("else:");
        lines.push(defaultCase);
      }
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try:
${tryBody}`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += `
except Exception as ${cv}:
${catchBody}`;
      }
      if (finallyBody) {
        result += `
finally:
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value}` : "return";
    },
    breakStmt() {
      return "break";
    },
    continueStmt() {
      return "continue";
    },
    throwStmt(value) {
      return `raise ${value}`;
    },
    print(args) {
      return `print(${args})`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args})`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `not ${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `[${elements}]`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `${targetType}(${value})`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${thenVal} if ${cond} else ${elseVal}`;
    },
    newExpr(className, args) {
      return `${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return "";
    }
  };
  var jsSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, _type, init, mutable) {
      const kw = mutable ? "let" : "const";
      return init ? `${kw} ${name} = ${init};` : `${kw} ${name};`;
    },
    constDecl(name, _type, init) {
      return `const ${name} = ${init};`;
    },
    funcDef(name, params, _returnType, body) {
      const sig = params.join(", ");
      return `function ${name}(${sig}) {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` extends ${parent}` : "";
      return `class ${name}${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond});`;
    },
    forLoop(init, cond, step, body) {
      return `for (${init}; ${cond}; ${step}) {
${body}
}`;
    },
    forEach(varName, iterable, body) {
      return `for (const ${varName} of ${iterable}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(c.body);
        lines.push("    break;");
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(defaultCase);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try {
${tryBody}
}`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += ` catch (${cv}) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "break;";
    },
    continueStmt() {
      return "continue;";
    },
    throwStmt(value) {
      return `throw ${value};`;
    },
    print(args) {
      return `console.log(${args});`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args});`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `[${elements}]`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `(${targetType}) ${value}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `new ${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return "";
    }
  };
  var tsSyntax = {
    ...jsSyntax,
    varDecl(name, type, init, mutable) {
      const kw = mutable ? "let" : "const";
      const t = type ? `: ${type}` : "";
      return init ? `${kw} ${name}${t} = ${init};` : `${kw} ${name}${t};`;
    },
    constDecl(name, type, init) {
      const t = type ? `: ${type}` : "";
      return `const ${name}${t} = ${init};`;
    },
    funcDef(name, params, returnType, body) {
      const ret = returnType ? `: ${returnType}` : "";
      const sig = params.join(", ");
      return `function ${name}(${sig})${ret} {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` extends ${parent}` : "";
      return `class ${name}${inher} {
${body}
}`;
    },
    typeCast(targetType, value) {
      return `${value} as ${targetType}`;
    }
  };
  var cSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, _mutable) {
      return init ? `${type} ${name} = ${init};` : `${type} ${name};`;
    },
    constDecl(name, type, init) {
      return `const ${type} ${name} = ${init};`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.length ? params.join(", ") : "void";
      return `${returnType || "void"} ${name}(${p}) {
${body}
}`;
    },
    classDef(name, _parent, body) {
      return `struct ${name} {
${body}
};`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond});`;
    },
    forLoop(init, cond, step, body) {
      return `for (${init}; ${cond}; ${step}) {
${body}
}`;
    },
    forEach(varName, iterable, body) {
      return `for (int i = 0; i < ${iterable}; i++) {
    int ${varName} = ${iterable}[i];
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
        lines.push("    break;");
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try {
${tryBody}
}`;
      if (catchBody) {
        result += ` catch (${catchVar || "e"}) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "break;";
    },
    continueStmt() {
      return "continue;";
    },
    throwStmt(value) {
      return `throw ${value};`;
    },
    print(args) {
      return `printf("${args}\\n");`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${method}(${obj}, ${args});`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `{${elements}}`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `(${targetType}) ${value}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, _args) {
      return `malloc(sizeof(${className}))`;
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return `#include <stdio.h>
#include <stdlib.h>

`;
    },
    footer() {
      return "";
    }
  };
  var cppSyntax = {
    ...cSyntax,
    classDef(name, parent, body) {
      const inher = parent ? ` : public ${parent}` : "";
      return `class ${name}${inher} {
${body}
};`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.length ? params.join(", ") : "void";
      return `${returnType || "void"} ${name}(${p}) {
${body}
}`;
    },
    print(args) {
      return `std::cout << ${args} << std::endl;`;
    },
    newExpr(className, args) {
      return `new ${className}(${args})`;
    },
    header(_module) {
      return `#include <iostream>
#include <string>
#include <vector>
#include <map>

using namespace std;

`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args});`;
    }
  };
  var csSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, _mutable) {
      return init ? `${type} ${name} = ${init};` : `${type} ${name};`;
    },
    constDecl(name, type, init) {
      return `const ${type} ${name} = ${init};`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      return `${returnType || "void"} ${name}(${p}) {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` : ${parent}` : "";
      return `class ${name}${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond});`;
    },
    forLoop(init, cond, step, body) {
      return `for (${init}; ${cond}; ${step}) {
${body}
}`;
    },
    forEach(varName, iterable, body) {
      return `foreach (var ${varName} in ${iterable}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
        lines.push("    break;");
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try {
${tryBody}
}`;
      if (catchBody) {
        result += ` catch (Exception ${catchVar || "e"}) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "break;";
    },
    continueStmt() {
      return "continue;";
    },
    throwStmt(value) {
      return `throw ${value};`;
    },
    print(args) {
      return `Console.WriteLine(${args});`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args});`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `new[] {${elements}}`;
    },
    dictLit(entries) {
      return `new Dictionary<string, object> {${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `(${targetType}) ${value}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `new ${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return `using System;
using System.Collections.Generic;

`;
    },
    footer() {
      return "";
    }
  };
  var javaSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, _mutable) {
      return init ? `${type} ${name} = ${init};` : `${type} ${name};`;
    },
    constDecl(name, type, init) {
      return `final ${type} ${name} = ${init};`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      return `public static ${returnType || "void"} ${name}(${p}) {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` extends ${parent}` : "";
      return `public class ${name}${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond});`;
    },
    forLoop(init, cond, step, body) {
      return `for (${init}; ${cond}; ${step}) {
${body}
}`;
    },
    forEach(varName, iterable, body) {
      return `for (var ${varName} : ${iterable}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
        lines.push("    break;");
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try {
${tryBody}
}`;
      if (catchBody) {
        result += ` catch (Exception ${catchVar || "e"}) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "break;";
    },
    continueStmt() {
      return "continue;";
    },
    throwStmt(value) {
      return `throw ${value};`;
    },
    print(args) {
      return `System.out.println(${args});`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args});`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `new Object[]{${elements}}`;
    },
    dictLit(entries) {
      return `Map.of(${entries})`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `(${targetType}) ${value}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `new ${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return `import java.util.*;

`;
    },
    footer() {
      return "";
    }
  };
  var goSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, mutable) {
      if (mutable) {
        return init ? `var ${name} ${type} = ${init}` : `var ${name} ${type}`;
      }
      return init ? `${name} := ${init}` : `var ${name} ${type}`;
    },
    constDecl(name, type, init) {
      return type ? `const ${name} ${type} = ${init}` : `const ${name} = ${init}`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      const ret = returnType ? ` ${returnType}` : "";
      return `func ${name}(${p})${ret} {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` ${parent}` : "";
      return `type ${name} struct${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if ${cond} {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `for ${cond} {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `for {
${body}
if !(${cond}) {
    break
}
}`;
    },
    forLoop(init, cond, step, body) {
      return `for ${init}; ${cond}; ${step} {
${body}
}`;
    },
    forEach(varName, iterable, body) {
      return `for _, ${varName} := range ${iterable} {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch ${expr} {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `${tryBody}`;
      if (catchBody) {
        const cv = catchVar || "err";
        result += `
if ${cv} != nil {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += `
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value}` : "return";
    },
    breakStmt() {
      return "break";
    },
    continueStmt() {
      return "continue";
    },
    throwStmt(value) {
      return `panic(${value})`;
    },
    print(args) {
      return `fmt.Println(${args})`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args})`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `[]interface{}{${elements}}`;
    },
    dictLit(entries) {
      return `map[string]interface{}{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `${targetType}(${value})`;
    },
    ternary(cond, thenVal, elseVal) {
      return `func() interface{} { if ${cond} { return ${thenVal} }; return ${elseVal} }()`;
    },
    newExpr(className, _args) {
      return `&${className}{}`;
    },
    indent(code) {
      return code.split("\n").map((l) => `	${l}`).join("\n");
    },
    header(_module) {
      return `package main

import "fmt"

`;
    },
    footer() {
      return `func main() {
}
`;
    }
  };
  var rustSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, mutable) {
      const mut = mutable ? "mut " : "";
      return init ? `let ${mut}${name}${type ? `: ${type}` : ""} = ${init};` : `let ${mut}${name}${type ? `: ${type}` : ""};`;
    },
    constDecl(name, type, init) {
      return `const ${name}${type ? `: ${type}` : ""} = ${init};`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      const ret = returnType ? ` -> ${returnType}` : "";
      return `fn ${name}(${p})${ret} {
${body}
}`;
    },
    classDef(name, _parent, body) {
      return `struct ${name} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if ${cond} {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while ${cond} {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `loop {
${body}
    if !${cond} {
        break;
    }
}`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while ${cond} {
${body}
    ${step}
}`;
    },
    forEach(varName, iterable, body) {
      return `for ${varName} in &${iterable} {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`match ${expr} {`];
      for (const c of cases) {
        lines.push(`    ${c.match} => {`);
        lines.push(`        ${c.body}`);
        lines.push("    },");
      }
      if (defaultCase) {
        lines.push("    _ => {");
        lines.push(`        ${defaultCase}`);
        lines.push("    },");
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `match (|| -> Result<(), Box<dyn std::error::Error>> {
${tryBody}
    Ok(())
})() {
    Ok(_) => {},`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += `
    Err(${cv}) => {
${catchBody}
    },`;
      }
      result += "\n}";
      if (finallyBody) {
        result += `
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "break;";
    },
    continueStmt() {
      return "continue;";
    },
    throwStmt(value) {
      return `panic!(${value});`;
    },
    print(args) {
      return `println!("{}", ${args});`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args});`;
    },
    binaryOp(left, op, right) {
      if (op === "===") return `${left} == ${right}`;
      if (op === "!==") return `${left} != ${right}`;
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `vec![${elements}];`;
    },
    dictLit(entries) {
      return `HashMap::from([${entries}]);`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `${value} as ${targetType}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `if ${cond} { ${thenVal} } else { ${elseVal} }`;
    },
    newExpr(className, _args) {
      return `${className}::new()`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return `use std::collections::HashMap;

`;
    },
    footer() {
      return `fn main() {
}
`;
    }
  };
  var rubySyntax = {
    lineComment: "# ",
    blockCommentStart: "=begin",
    blockCommentEnd: "=end",
    varDecl(name, _type, init, _mutable) {
      return init ? `${name} = ${init}` : `${name} = nil`;
    },
    constDecl(name, _type, init) {
      return `${name} = ${init}`;
    },
    funcDef(name, params, _returnType, body) {
      const p = params.length ? `(${params.join(", ")})` : "";
      return `def ${name}${p}
${body}
end`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` < ${parent}` : "";
      return `class ${name}${inher}
${body}
end`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if ${cond}
${thenBlock}`;
      if (elseBlock) {
        result += `
else
${elseBlock}`;
      }
      result += "\nend";
      return result;
    },
    whileLoop(cond, body) {
      return `while ${cond}
${body}
end`;
    },
    doWhileLoop(cond, body) {
      return `begin
${body}
end while ${cond}`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while ${cond}
${body}
    ${step}
end`;
    },
    forEach(varName, iterable, body) {
      return `${iterable}.each do |${varName}|
${body}
end`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`case ${expr}`];
      for (const c of cases) {
        lines.push(`when ${c.match}`);
        lines.push(c.body);
      }
      if (defaultCase) {
        lines.push("else");
        lines.push(defaultCase);
      }
      lines.push("end");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `begin
${tryBody}`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += `
rescue Exception => ${cv}
${catchBody}`;
      }
      if (finallyBody) {
        result += `
ensure
${finallyBody}`;
      }
      result += "\nend";
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value}` : "return";
    },
    breakStmt() {
      return "break";
    },
    continueStmt() {
      return "next";
    },
    throwStmt(value) {
      return `raise ${value}`;
    },
    print(args) {
      return `puts ${args}`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args})`;
    },
    binaryOp(left, op, right) {
      if (op === "===") return `${left} == ${right}`;
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      if (op === "-") return `-${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `[${elements}]`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(_targetType, value) {
      return value;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `${className}.new(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return "";
    }
  };
  var phpSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, _type, init, _mutable) {
      return init ? `$${name} = ${init};` : `$${name} = null;`;
    },
    constDecl(name, _type, init) {
      return `define('${name}', ${init});`;
    },
    funcDef(name, params, _returnType, body) {
      const p = params.map((p2) => `$${p2}`).join(", ");
      return `function ${name}(${p}) {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` extends ${parent}` : "";
      return `class ${name}${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond});`;
    },
    forLoop(init, cond, step, body) {
      return `for (${init}; ${cond}; ${step}) {
${body}
}`;
    },
    forEach(varName, iterable, body) {
      return `foreach (${iterable} as $${varName}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
        lines.push("    break;");
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try {
${tryBody}
}`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += ` catch (Exception $${cv}) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "break;";
    },
    continueStmt() {
      return "continue;";
    },
    throwStmt(value) {
      return `throw new Exception(${value});`;
    },
    print(args) {
      return `echo ${args};`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${obj}->${method}(${args});`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}$${operand}`;
    },
    arrayLit(elements) {
      return `[${elements}]`;
    },
    dictLit(entries) {
      return `[${entries}]`;
    },
    stringInterp(parts) {
      return parts.join(" . ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}->${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `(${targetType}) ${value}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `new ${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return `<?php

`;
    },
    footer() {
      return "";
    }
  };
  var luaSyntax = {
    lineComment: "-- ",
    blockCommentStart: "--[[",
    blockCommentEnd: "]]",
    varDecl(name, _type, init, _mutable) {
      return init ? `local ${name} = ${init}` : `local ${name} = nil`;
    },
    constDecl(name, _type, init) {
      return `local ${name} = ${init}`;
    },
    funcDef(name, params, _returnType, body) {
      const p = params.join(", ");
      return `function ${name}(${p})
${body}
end`;
    },
    classDef(name, parent, _body) {
      const inher = parent ? ` (${parent})` : "";
      return `${name} = {}${inher}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if ${cond} then
${thenBlock}`;
      if (elseBlock) {
        result += `
else
${elseBlock}`;
      }
      result += "\nend";
      return result;
    },
    whileLoop(cond, body) {
      return `while ${cond} do
${body}
end`;
    },
    doWhileLoop(cond, body) {
      return `repeat
${body}
until not (${cond})`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while ${cond} do
${body}
    ${step}
end`;
    },
    forEach(varName, iterable, body) {
      return `for _, ${varName} in ipairs(${iterable}) do
${body}
end`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [];
      for (let i = 0; i < cases.length; i++) {
        const prefix = i === 0 ? "if" : "elseif";
        lines.push(`${prefix} ${expr} == ${cases[i].match} then`);
        lines.push(cases[i].body);
      }
      if (defaultCase) {
        lines.push("else");
        lines.push(defaultCase);
      }
      lines.push("end");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `local ok, ${catchVar || "err"} = pcall(function()
${tryBody}
end)`;
      if (catchBody) {
        result += `
if not ok then
${catchBody}
end`;
      }
      if (finallyBody) {
        result += `
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value}` : "return";
    },
    breakStmt() {
      return "break";
    },
    continueStmt() {
      return "goto continue";
    },
    throwStmt(value) {
      return `error(${value})`;
    },
    print(args) {
      return `print(${args})`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}:${method}(${args})`;
    },
    binaryOp(left, op, right) {
      if (op === "!=") return `${left} ~= ${right}`;
      if (op === "&&") return `${left} and ${right}`;
      if (op === "||") return `${left} or ${right}`;
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `not ${operand}`;
      if (op === "-") return `-${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `{${elements}}`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" .. ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(_targetType, value) {
      return `tonumber(${value})`;
    },
    ternary(cond, thenVal, elseVal) {
      return `(${cond}) and (${thenVal}) or (${elseVal})`;
    },
    newExpr(className, _args) {
      return `setmetatable({}, {__index = ${className}})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return "";
    }
  };
  var kotlinSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, mutable) {
      const kw = mutable ? "var" : "val";
      return init ? `${kw} ${name}: ${type} = ${init}` : `${kw} ${name}: ${type}? = null`;
    },
    constDecl(name, type, init) {
      return `val ${name}: ${type} = ${init}`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      const ret = returnType ? `: ${returnType}` : "";
      return `fun ${name}(${p})${ret} {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` : ${parent}()` : "";
      return `class ${name}${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond})`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while (${cond}) {
${body}
    ${step}
}`;
    },
    forEach(varName, iterable, body) {
      return `for (${varName} in ${iterable}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`when (${expr}) {`];
      for (const c of cases) {
        lines.push(`    ${c.match} -> {`);
        lines.push(`        ${c.body}`);
        lines.push("    }");
      }
      if (defaultCase) {
        lines.push("    else -> {");
        lines.push(`        ${defaultCase}`);
        lines.push("    }");
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try {
${tryBody}
}`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += ` catch (${cv}: Exception) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value}` : "return";
    },
    breakStmt() {
      return "break";
    },
    continueStmt() {
      return "continue";
    },
    throwStmt(value) {
      return `throw ${value}`;
    },
    print(args) {
      return `println(${args})`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args})`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `listOf(${elements})`;
    },
    dictLit(entries) {
      return `mapOf(${entries})`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `${value} as ${targetType}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `if (${cond}) ${thenVal} else ${elseVal}`;
    },
    newExpr(className, args) {
      return `${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return `fun main() {
}
`;
    }
  };
  var swiftSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, mutable) {
      const kw = mutable ? "var" : "let";
      return init ? `${kw} ${name}: ${type} = ${init}` : `${kw} ${name}: ${type}!`;
    },
    constDecl(name, type, init) {
      return `let ${name}: ${type} = ${init}`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      const ret = returnType ? ` -> ${returnType}` : "";
      return `func ${name}(${p})${ret} {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? `: ${parent}` : "";
      return `class ${name}${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if ${cond} {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while ${cond} {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `repeat {
${body}
} while ${cond}`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while ${cond} {
${body}
    ${step}
}`;
    },
    forEach(varName, iterable, body) {
      return `for ${varName} in ${iterable} {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch ${expr} {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `do {
${tryBody}
}`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += ` catch {
    let ${cv} = error
${catchBody}
}`;
      }
      if (finallyBody) {
        result += `
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value}` : "return";
    },
    breakStmt() {
      return "break";
    },
    continueStmt() {
      return "continue";
    },
    throwStmt(value) {
      return `fatalError(${value})`;
    },
    print(args) {
      return `print(${args})`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args})`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `[${elements}]`;
    },
    dictLit(entries) {
      return `[${entries}]`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `${value} as! ${targetType}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return `import Foundation

`;
    },
    footer() {
      return "";
    }
  };
  var dartSyntax = {
    lineComment: "// ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, type, init, mutable) {
      const kw = mutable ? "var" : "final";
      return init ? `${kw} ${name} = ${init}` : `${type}? ${name};`;
    },
    constDecl(name, type, init) {
      return `const ${type} ${name} = ${init};`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      const ret = returnType ? `${returnType} ` : "";
      return `${ret}${name}(${p}) {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` extends ${parent}` : "";
      return `class ${name}${inher} {
${body}
}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond});`;
    },
    forLoop(init, cond, step, body) {
      return `for (${init}; ${cond}; ${step}) {
${body}
}`;
    },
    forEach(varName, iterable, body) {
      return `for (var ${varName} in ${iterable}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
        lines.push("    break;");
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `try {
${tryBody}
}`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += ` catch (${cv}) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "break;";
    },
    continueStmt() {
      return "continue;";
    },
    throwStmt(value) {
      return `throw ${value};`;
    },
    print(args) {
      return `print(${args});`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args});`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `[${elements}]`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `${value} as ${targetType}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return `void main() {
}
`;
    }
  };
  var vbSyntax = {
    lineComment: "' ",
    blockCommentStart: "",
    blockCommentEnd: "",
    varDecl(name, type, init, _mutable) {
      return init ? `Dim ${name} As ${type} = ${init}` : `Dim ${name} As ${type}`;
    },
    constDecl(name, type, init) {
      return `Const ${name} As ${type} = ${init}`;
    },
    funcDef(name, params, returnType, body) {
      const p = params.join(", ");
      const ret = returnType ? ` As ${returnType}` : "";
      return `Function ${name}(${p})${ret}
${body}
End Function`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` Inherits ${parent}` : "";
      return `Class ${name}${inher}
${body}
End Class`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `If ${cond} Then
${thenBlock}`;
      if (elseBlock) {
        result += `
Else
${elseBlock}`;
      }
      result += "\nEnd If";
      return result;
    },
    whileLoop(cond, body) {
      return `While ${cond}
${body}
End While`;
    },
    doWhileLoop(cond, body) {
      return `Do While ${cond}
${body}
Loop`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
Do While ${cond}
${body}
    ${step}
Loop`;
    },
    forEach(varName, iterable, body) {
      return `For Each ${varName} In ${iterable}
${body}
Next`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`Select Case ${expr}`];
      for (const c of cases) {
        lines.push(`  Case ${c.match}`);
        lines.push(`    ${c.body}`);
      }
      if (defaultCase) {
        lines.push("  Case Else");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("End Select");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `Try
${tryBody}`;
      if (catchBody) {
        const cv = catchVar || "ex";
        result += `
Catch ${cv} As Exception
${catchBody}`;
      }
      if (finallyBody) {
        result += `
Finally
${finallyBody}`;
      }
      result += "\nEnd Try";
      return result;
    },
    returnStmt(value) {
      return value ? `Return ${value}` : "Return";
    },
    breakStmt() {
      return "Exit Do";
    },
    continueStmt() {
      return "Continue Do";
    },
    throwStmt(value) {
      return `Throw ${value}`;
    },
    print(args) {
      return `Console.WriteLine(${args})`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}.${method}(${args})`;
    },
    binaryOp(left, op, right) {
      if (op === "&&") return `${left} And ${right}`;
      if (op === "||") return `${left} Or ${right}`;
      if (op === "!=") return `${left} <> ${right}`;
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `Not ${operand}`;
      if (op === "-") return `-${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `New Object() {${elements}}`;
    },
    dictLit(entries) {
      return `New Dictionary(Of String, Object) From {${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" & ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}(${index})`;
    },
    typeCast(targetType, value) {
      return `CType(${value}, ${targetType})`;
    },
    ternary(cond, thenVal, elseVal) {
      return `If(${cond}, ${thenVal}, ${elseVal})`;
    },
    newExpr(className, args) {
      return `New ${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return `Imports System
Imports System.Collections.Generic

`;
    },
    footer() {
      return `Module Program
    Sub Main()
    End Sub
End Module
`;
    }
  };
  var perlSyntax = {
    lineComment: "# ",
    blockCommentStart: "=pod",
    blockCommentEnd: "=cut",
    varDecl(name, _type, init, _mutable) {
      return init ? `my $${name} = ${init};` : `my $${name};`;
    },
    constDecl(name, _type, init) {
      return `use constant ${name} => ${init};`;
    },
    funcDef(name, _params, _returnType, body) {
      return `sub ${name} {
${body}
}`;
    },
    classDef(name, parent, body) {
      const inher = parent ? ` extends ${parent}` : "";
      return `package ${name};${inher}

${body}

1;`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `do {
${body}
} while (${cond});`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while (${cond}) {
${body}
    ${step}
}`;
    },
    forEach(varName, iterable, body) {
      return `foreach my $${varName} (@{${iterable}}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`given (${expr}) {`];
      for (const c of cases) {
        lines.push(`  when (${c.match}) {`);
        lines.push(`    ${c.body}`);
        lines.push("  }");
      }
      if (defaultCase) {
        lines.push("  default {");
        lines.push(`    ${defaultCase}`);
        lines.push("  }");
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `eval {
${tryBody}
};`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += `
if ($@) {
    my $${cv} = $@;
${catchBody}
}`;
      }
      if (finallyBody) {
        result += `
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return ${value};` : "return;";
    },
    breakStmt() {
      return "last;";
    },
    continueStmt() {
      return "next;";
    },
    throwStmt(value) {
      return `die ${value};`;
    },
    print(args) {
      return `print ${args};`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, args) {
      return `${obj}->${method}(${args});`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      if (op === "-") return `-${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `(${elements})`;
    },
    dictLit(entries) {
      return `(${entries})`;
    },
    stringInterp(parts) {
      return parts.join(" . ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}->{${prop}}`;
    },
    indexAccess(obj, index) {
      return `${obj}->[${index}]`;
    },
    typeCast(targetType, value) {
      return `${targetType}(${value})`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, _args) {
      return `${className}->new()`;
    },
    indent(code) {
      return code.split("\n").map((l) => `    ${l}`).join("\n");
    },
    header(_module) {
      return `use strict;
use warnings;

`;
    },
    footer() {
      return "";
    }
  };
  var rSyntax = {
    lineComment: "# ",
    blockCommentStart: "",
    blockCommentEnd: "",
    varDecl(name, _type, init, _mutable) {
      const op = _mutable ? "<-" : "<-";
      return init ? `${name} ${op} ${init}` : `${name} ${op} NULL`;
    },
    constDecl(name, _type, init) {
      return `${name} <- ${init}`;
    },
    funcDef(name, params, _returnType, body) {
      const p = params.join(", ");
      return `${name} <- function(${p}) {
${body}
}`;
    },
    classDef(name, _parent, body) {
      return `${name} <- setClass("${name}")
${body}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if (${cond}) {
${thenBlock}
}`;
      if (elseBlock) {
        result += ` else {
${elseBlock}
}`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `while (${cond}) {
${body}
}`;
    },
    doWhileLoop(cond, body) {
      return `repeat {
${body}
    if (!(${cond})) break
}`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
while (${cond}) {
${body}
    ${step}
}`;
    },
    forEach(varName, iterable, body) {
      return `for (${varName} in ${iterable}) {
${body}
}`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(`    ${c.body}`);
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(`    ${defaultCase}`);
      }
      lines.push("}");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `tryCatch({
${tryBody}
`;
      if (catchBody) {
        const cv = catchVar || "e";
        result += `}, error = function(${cv}) {
${catchBody}
})`;
      } else {
        result += "})";
      }
      if (finallyBody) {
        result += `
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `return(${value})` : "return(invisible(NULL))";
    },
    breakStmt() {
      return "break";
    },
    continueStmt() {
      return "next";
    },
    throwStmt(value) {
      return `stop(${value})`;
    },
    print(args) {
      return `print(${args})`;
    },
    funcCall(name, args) {
      return `${name}(${args})`;
    },
    methodCall(obj, method, args) {
      return `${obj}$${method}(${args})`;
    },
    binaryOp(left, op, right) {
      if (op === "===") return `${left} == ${right}`;
      if (op === "!==") return `${left} != ${right}`;
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      if (op === "!") return `!${operand}`;
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `c(${elements})`;
    },
    dictLit(entries) {
      return `list(${entries})`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}$${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[[${index}]]`;
    },
    typeCast(targetType, value) {
      return `as.${targetType}(${value})`;
    },
    ternary(cond, thenVal, elseVal) {
      return `ifelse(${cond}, ${thenVal}, ${elseVal})`;
    },
    newExpr(className, _args) {
      return `new("${className}")`;
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return "";
    }
  };
  var batchSyntax = {
    lineComment: "REM ",
    blockCommentStart: "",
    blockCommentEnd: "",
    varDecl(name, _type, init, _mutable) {
      return init ? `set ${name}=${init}` : `set ${name}=`;
    },
    constDecl(name, _type, init) {
      return `set ${name}=${init}`;
    },
    funcDef(name, _params, _returnType, body) {
      return `:_${name}
${body}
exit /b`;
    },
    classDef(name, _parent, body) {
      return `REM Class: ${name}
${body}`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      let result = `if ${cond} (
${thenBlock}
)`;
      if (elseBlock) {
        result += ` else (
${elseBlock}
)`;
      }
      return result;
    },
    whileLoop(cond, body) {
      return `:while_start
if not ${cond} goto :while_end
${body}
goto :while_start
:while_end`;
    },
    doWhileLoop(cond, body) {
      return `:dowhile_start
${body}
if ${cond} goto :dowhile_start`;
    },
    forLoop(init, cond, step, body) {
      return `${init}
:for_start
if not ${cond} goto :for_end
${body}
${step}
goto :for_start
:for_end`;
    },
    forEach(varName, iterable, body) {
      return `for %%${varName} in (${iterable}) do (
${body}
)`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [];
      for (const c of cases) {
        lines.push(`if ${expr}==${c.match} (${c.body})`);
      }
      if (defaultCase) {
        lines.push(defaultCase);
      }
      return lines.join("\n");
    },
    tryCatch(tryBody, _catchVar, catchBody, finallyBody) {
      let result = `${tryBody}
if errorlevel 1 (`;
      if (catchBody) {
        result += `
${catchBody}`;
      }
      result += "\n)";
      if (finallyBody) {
        result += `
${finallyBody}`;
      }
      return result;
    },
    returnStmt(value) {
      return value ? `exit /b ${value}` : "exit /b";
    },
    breakStmt() {
      return "goto :for_end";
    },
    continueStmt() {
      return "goto :for_start";
    },
    throwStmt(value) {
      return `echo ${value} & exit /b 1`;
    },
    print(args) {
      return `echo ${args}`;
    },
    funcCall(name, args) {
      return `call :_${name} ${args}`;
    },
    methodCall(_obj, method, args) {
      return `call :_${method} ${args}`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `(${elements})`;
    },
    dictLit(entries) {
      return `(${entries})`;
    },
    stringInterp(parts) {
      return parts.join(" ");
    },
    stringLiteral(value) {
      return `${value}`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(_targetType, value) {
      return value;
    },
    ternary(cond, thenVal, elseVal) {
      return `if ${cond} (set result=${thenVal}) else (set result=${elseVal})`;
    },
    newExpr(_className, _args) {
      return "";
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return `@echo off

`;
    },
    footer() {
      return `exit /b 0
`;
    }
  };
  var htmlSyntax = {
    lineComment: "<!-- ",
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",
    varDecl(name, _type, init, _mutable) {
      return `<script>var ${name} = ${init};<\/script>`;
    },
    constDecl(name, _type, init) {
      return `<script>const ${name} = ${init};<\/script>`;
    },
    funcDef(name, params, _returnType, body) {
      const p = params.join(", ");
      return `<script>function ${name}(${p}) {
${body}
}<\/script>`;
    },
    classDef(name, _parent, body) {
      return `<div class="${name}">
${body}
</div>`;
    },
    ifElse(cond, thenBlock, elseBlock) {
      return `<script>if (${cond}) {
${thenBlock}
}${elseBlock ? ` else {
${elseBlock}
}` : ""}<\/script>`;
    },
    whileLoop(cond, body) {
      return `<script>while (${cond}) {
${body}
}<\/script>`;
    },
    doWhileLoop(cond, body) {
      return `<script>do {
${body}
} while (${cond});<\/script>`;
    },
    forLoop(init, cond, step, body) {
      return `<script>for (${init}; ${cond}; ${step}) {
${body}
}<\/script>`;
    },
    forEach(varName, iterable, body) {
      return `<script>for (const ${varName} of ${iterable}) {
${body}
}<\/script>`;
    },
    switchCase(expr, cases, defaultCase) {
      let lines = [`<script>switch (${expr}) {`];
      for (const c of cases) {
        lines.push(`  case ${c.match}:`);
        lines.push(c.body);
        lines.push("    break;");
      }
      if (defaultCase) {
        lines.push("  default:");
        lines.push(defaultCase);
      }
      lines.push("}<\/script>");
      return lines.join("\n");
    },
    tryCatch(tryBody, catchVar, catchBody, finallyBody) {
      let result = `<script>try {
${tryBody}
}`;
      if (catchBody) {
        result += ` catch (${catchVar || "e"}) {
${catchBody}
}`;
      }
      if (finallyBody) {
        result += ` finally {
${finallyBody}
}`;
      }
      result += "}<\/script>";
      return result;
    },
    returnStmt(value) {
      return value ? `<script>return ${value};<\/script>` : "<script>return;<\/script>";
    },
    breakStmt() {
      return "<script>break;<\/script>";
    },
    continueStmt() {
      return "<script>continue;<\/script>";
    },
    throwStmt(value) {
      return `<script>throw ${value};<\/script>`;
    },
    print(args) {
      return `<script>document.write(${args});<\/script>`;
    },
    funcCall(name, args) {
      return `<script>${name}(${args});<\/script>`;
    },
    methodCall(obj, method, args) {
      return `<script>${obj}.${method}(${args});<\/script>`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `[${elements}]`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" + ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}[${index}]`;
    },
    typeCast(targetType, value) {
      return `${value} as ${targetType}`;
    },
    ternary(cond, thenVal, elseVal) {
      return `${cond} ? ${thenVal} : ${elseVal}`;
    },
    newExpr(className, args) {
      return `new ${className}(${args})`;
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
`;
    },
    footer() {
      return `</body>
</html>
`;
    }
  };
  var cssSyntax = {
    lineComment: "/* ",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    varDecl(name, _type, init, _mutable) {
      return `:root {
  --${name}: ${init};
}`;
    },
    constDecl(name, _type, init) {
      return `:root {
  --${name}: ${init};
}`;
    },
    funcDef(name, _params, _returnType, body) {
      return `@keyframes ${name} {
${body}
}`;
    },
    classDef(name, parent, body) {
      const sel = parent ? `${name}, ${parent} ${name}` : name;
      return `${sel} {
${body}
}`;
    },
    ifElse(_cond, thenBlock, _elseBlock) {
      return thenBlock;
    },
    whileLoop(_cond, body) {
      return body;
    },
    doWhileLoop(_cond, body) {
      return body;
    },
    forLoop(_init, _cond, _step, body) {
      return body;
    },
    forEach(_varName, _iterable, body) {
      return body;
    },
    switchCase(_expr, cases, _defaultCase) {
      return cases.map((c) => `${c.match} {
${c.body}
}`).join("\n");
    },
    tryCatch(tryBody, _catchVar, _catchBody, _finallyBody) {
      return tryBody;
    },
    returnStmt(_value) {
      return "";
    },
    breakStmt() {
      return "";
    },
    continueStmt() {
      return "";
    },
    throwStmt(_value) {
      return "";
    },
    print(args) {
      return `content: ${args};`;
    },
    funcCall(name, args) {
      return `${name}(${args});`;
    },
    methodCall(obj, method, _args) {
      return `${obj} { ${method}: auto; }`;
    },
    binaryOp(left, op, right) {
      return `${left} ${op} ${right}`;
    },
    unaryOp(op, operand) {
      return `${op}${operand}`;
    },
    arrayLit(elements) {
      return `(${elements})`;
    },
    dictLit(entries) {
      return `{${entries}}`;
    },
    stringInterp(parts) {
      return parts.join(" ");
    },
    stringLiteral(value) {
      return `"${value}"`;
    },
    propertyAccess(obj, prop) {
      return `${obj}.${prop}`;
    },
    indexAccess(obj, index) {
      return `${obj}:nth-child(${index})`;
    },
    typeCast(_targetType, value) {
      return value;
    },
    ternary(_cond, thenVal, _elseVal) {
      return thenVal;
    },
    newExpr(_className, _args) {
      return "";
    },
    indent(code) {
      return code.split("\n").map((l) => `  ${l}`).join("\n");
    },
    header(_module) {
      return "";
    },
    footer() {
      return "";
    }
  };
  var syntaxMap = {
    python: pySyntax,
    javascript: jsSyntax,
    typescript: tsSyntax,
    c: cSyntax,
    cpp: cppSyntax,
    csharp: csSyntax,
    java: javaSyntax,
    go: goSyntax,
    rust: rustSyntax,
    ruby: rubySyntax,
    php: phpSyntax,
    lua: luaSyntax,
    kotlin: kotlinSyntax,
    swift: swiftSyntax,
    dart: dartSyntax,
    vb: vbSyntax,
    perl: perlSyntax,
    r: rSyntax,
    batch: batchSyntax,
    html: htmlSyntax,
    css: cssSyntax
  };
  function indentLines(code, indent) {
    return code.split("\n").map((l) => `${indent}${l}`).join("\n");
  }
  var MultiLanguageEmitter = class {
    constructor(lang) {
      __publicField(this, "syntax");
      __publicField(this, "lang");
      this.lang = lang;
      this.syntax = syntaxMap[lang];
    }
    emit(ir2) {
      const parts = [];
      parts.push(this.syntax.header(ir2));
      parts.push(this.emitStmts(ir2.stmts, 0));
      parts.push(this.syntax.footer());
      return parts.join("\n");
    }
    emitStmts(stmts, depth) {
      return stmts.map((s) => this.emitStmt(s, depth)).join("\n");
    }
    emitStmt(stmt, depth) {
      const ind = this.indentStr(depth);
      switch (stmt.kind) {
        case "varDecl": {
          const init = stmt.value ? this.emitExpr(stmt.value) : "";
          const line = this.syntax.varDecl(stmt.name, stmt.type || "", init, !stmt.isConst);
          return `${ind}${line}`;
        }
        case "funcDef": {
          const params = this.emitParams(stmt.params);
          const body = this.indentLines(this.emitStmts(stmt.body, depth + 1));
          const line = this.syntax.funcDef(stmt.name, params, stmt.returnType || "", body);
          return `${ind}${line}`;
        }
        case "classDef": {
          const body = this.indentLines(this.emitStmts(stmt.body, depth + 1));
          const line = this.syntax.classDef(stmt.name, stmt.super || null, body);
          return `${ind}${line}`;
        }
        case "ifElse": {
          const cond = this.emitExpr(stmt.condition);
          const thenBody = this.indentLines(this.emitStmts(stmt.thenBody, depth + 1));
          const elseBody = stmt.elseBody ? this.indentLines(this.emitStmts(stmt.elseBody, depth + 1)) : null;
          const line = this.syntax.ifElse(cond, thenBody, elseBody);
          return `${ind}${line}`;
        }
        case "whileLoop": {
          const cond = this.emitExpr(stmt.condition);
          const body = this.indentLines(this.emitStmts(stmt.body, depth + 1));
          const line = this.syntax.whileLoop(cond, body);
          return `${ind}${line}`;
        }
        case "doWhileLoop": {
          const cond = this.emitExpr(stmt.condition);
          const body = this.indentLines(this.emitStmts(stmt.body, depth + 1));
          const line = this.syntax.doWhileLoop(cond, body);
          return `${ind}${line}`;
        }
        case "forLoop": {
          const init = stmt.init ? this.emitStmt(stmt.init, 0) : "";
          const cond = stmt.condition ? this.emitExpr(stmt.condition) : "";
          const step = stmt.update ? this.emitExpr(stmt.update) : "";
          const body = this.indentLines(this.emitStmts(stmt.body, depth + 1));
          const line = this.syntax.forLoop(init, cond, step, body);
          return `${ind}${line}`;
        }
        case "forEachLoop": {
          const iterable = this.emitExpr(stmt.iterable);
          const body = this.indentLines(this.emitStmts(stmt.body, depth + 1));
          const line = this.syntax.forEach(stmt.variable, iterable, body);
          return `${ind}${line}`;
        }
        case "switch": {
          const expr = this.emitExpr(stmt.subject);
          const cases = stmt.cases.map((c) => ({
            match: c.value.map((v) => this.emitExpr(v)).join(", "),
            body: this.indentLines(this.emitStmts(c.body, depth + 1))
          }));
          const defaultCase = stmt.defaultBody ? this.indentLines(this.emitStmts(stmt.defaultBody, depth + 1)) : null;
          const line = this.syntax.switchCase(expr, cases, defaultCase);
          return `${ind}${line}`;
        }
        case "tryCatch": {
          const tryBody = this.indentLines(this.emitStmts(stmt.tryBody, depth + 1));
          const catchBody = stmt.catchBody ? this.indentLines(this.emitStmts(stmt.catchBody, depth + 1)) : null;
          const finallyBody = stmt.finallyBody ? this.indentLines(this.emitStmts(stmt.finallyBody, depth + 1)) : null;
          const line = this.syntax.tryCatch(tryBody, stmt.catchVar || null, catchBody, finallyBody);
          return `${ind}${line}`;
        }
        case "return": {
          const value = stmt.value ? this.emitExpr(stmt.value) : null;
          const line = this.syntax.returnStmt(value);
          return `${ind}${line}`;
        }
        case "break": {
          return `${ind}${this.syntax.breakStmt()}`;
        }
        case "continue": {
          return `${ind}${this.syntax.continueStmt()}`;
        }
        case "throw": {
          const value = this.emitExpr(stmt.value);
          const line = this.syntax.throwStmt(value);
          return `${ind}${line}`;
        }
        case "exprStmt": {
          const expr = this.emitExpr(stmt.expr);
          return `${ind}${expr}`;
        }
        case "print": {
          const args = stmt.args.map((a) => this.emitExpr(a)).join(", ");
          const line = this.syntax.print(args);
          return `${ind}${line}`;
        }
        default:
          return `${ind}${this.syntax.lineComment}unsupported statement`;
      }
    }
    emitExpr(expr) {
      switch (expr.kind) {
        case "literal":
          if (expr.typeHint === "string") return this.syntax.stringLiteral(String(expr.value));
          if (expr.typeHint === "null") return "null";
          return String(expr.value);
        case "identifier":
          return expr.name;
        case "binaryOp":
          return this.syntax.binaryOp(
            this.emitExpr(expr.left),
            expr.operator,
            this.emitExpr(expr.right)
          );
        case "unaryOp":
          return this.syntax.unaryOp(expr.operator, this.emitExpr(expr.operand));
        case "funcCallExpr":
          return this.syntax.funcCall(expr.name, expr.args.map((a) => this.emitExpr(a)).join(", "));
        case "methodCall": {
          const args = Array.isArray(expr.args) ? expr.args.map((a) => this.emitExpr(a)).join(", ") : this.emitExpr(expr.args);
          return this.syntax.methodCall(this.emitExpr(expr.object), expr.method, args);
        }
        case "propertyAccess":
          return this.syntax.propertyAccess(this.emitExpr(expr.object), expr.property);
        case "indexAccess":
          return this.syntax.indexAccess(this.emitExpr(expr.object), this.emitExpr(expr.index));
        case "arrayLiteral":
          return this.syntax.arrayLit(expr.elements.map((e) => this.emitExpr(e)).join(", "));
        case "dictLiteral":
          return this.syntax.dictLit(
            expr.entries.map((e) => `${this.emitExpr(e.key)}: ${this.emitExpr(e.value)}`).join(", ")
          );
        case "stringInterp":
          return this.syntax.stringInterp(expr.parts.map((p) => typeof p === "string" ? p : this.emitExpr(p)));
        case "ternary":
          return this.syntax.ternary(
            this.emitExpr(expr.condition),
            this.emitExpr(expr.thenExpr),
            this.emitExpr(expr.elseExpr)
          );
        case "typeCast":
          return this.syntax.typeCast(expr.targetType, this.emitExpr(expr.expr));
        case "new":
          return this.syntax.newExpr(expr.className, expr.args.map((a) => this.emitExpr(a)).join(", "));
        default:
          return this.syntax.lineComment + "unsupported expression";
      }
    }
    emitParams(params) {
      return params.map((p) => {
        if (this.lang === "typescript" || this.lang === "dart") {
          return p.type ? `${p.name}: ${p.type}` : p.name;
        }
        return p.name;
      });
    }
    indentStr(depth) {
      const config = this.getIndentConfig();
      return config.repeat(depth);
    }
    getIndentConfig() {
      switch (this.lang) {
        case "python":
          return "    ";
        case "go":
        case "lua":
        case "ruby":
        case "perl":
        case "r":
          return "  ";
        case "javascript":
        case "typescript":
        case "c":
        case "cpp":
        case "java":
        case "csharp":
        case "php":
        case "dart":
        case "kotlin":
        case "swift":
        case "rust":
        case "vb":
        case "html":
        case "css":
        case "batch":
          return "  ";
        default:
          return "  ";
      }
    }
    indentLines(code) {
      const indent = this.getIndentConfig();
      return indentLines(code, indent);
    }
  };

  // src/blocks/library.ts
  var CATEGORY_COLORS = {
    program: "#4C97FF",
    variables: "#FF8C1A",
    control: "#FFAB19",
    strings: "#59C059",
    math: "#FF6680",
    arrays: "#9966FF",
    functions: "#0FC3E6",
    classes: "#FF69B4",
    io: "#A0A0A0",
    operators: "#40BF4B",
    datetime: "#CF8B2D"
  };
  function port(id, label, type, direction) {
    return { id, label, type, direction };
  }
  var blockDefs = [
    // ── program (4) ──
    {
      id: "print",
      label: "Print",
      category: "program",
      description: "Output text to the console",
      color: CATEGORY_COLORS.program,
      shape: "stack",
      ports: [port("value", "Value", "any", "input")],
      templates: {
        python: "print({value})",
        javascript: "console.log({value});"
      },
      irMapping: ["print"],
      group: "io"
    },
    {
      id: "input",
      label: "Input",
      category: "program",
      description: "Read user input",
      color: CATEGORY_COLORS.program,
      shape: "reporter",
      ports: [port("prompt", "Prompt", "string", "input"), port("result", "Result", "string", "output")],
      templates: {
        python: "input({prompt})",
        javascript: "prompt({prompt})"
      },
      irMapping: ["funcCallExpr"],
      group: "io"
    },
    {
      id: "comment",
      label: "Comment",
      category: "program",
      description: "Add a code comment",
      color: CATEGORY_COLORS.program,
      shape: "stack",
      ports: [port("text", "Text", "string", "input")],
      templates: {
        python: "# {text}",
        javascript: "// {text}"
      },
      irMapping: ["comment"],
      group: "io"
    },
    {
      id: "main",
      label: "Main",
      category: "program",
      description: "Program entry point",
      color: CATEGORY_COLORS.program,
      shape: "hat",
      ports: [],
      templates: {
        python: 'if __name__ == "__main__":\n{body}',
        javascript: "{body}"
      },
      irMapping: ["funcDef"],
      group: "structure"
    },
    // ── variables (5) ──
    {
      id: "set-variable",
      label: "Set Variable",
      category: "variables",
      description: "Set a variable to a value",
      color: CATEGORY_COLORS.variables,
      shape: "stack",
      ports: [port("name", "Name", "string", "input"), port("value", "Value", "any", "input")],
      templates: {
        python: "{name} = {value}",
        javascript: "let {name} = {value};"
      },
      irMapping: ["varDecl"],
      group: "core"
    },
    {
      id: "get-variable",
      label: "Get Variable",
      category: "variables",
      description: "Get the value of a variable",
      color: CATEGORY_COLORS.variables,
      shape: "reporter",
      ports: [port("name", "Name", "string", "input"), port("value", "Value", "any", "output")],
      templates: {
        python: "{name}",
        javascript: "{name}"
      },
      irMapping: ["identifier"],
      group: "core"
    },
    {
      id: "increment-variable",
      label: "Increment Variable",
      category: "variables",
      description: "Change a variable by an amount",
      color: CATEGORY_COLORS.variables,
      shape: "stack",
      ports: [port("name", "Name", "string", "input"), port("amount", "Amount", "number", "input")],
      templates: {
        python: "{name} += {amount}",
        javascript: "{name} += {amount};"
      },
      irMapping: ["assign"],
      group: "core"
    },
    {
      id: "global-variable",
      label: "Global Variable",
      category: "variables",
      description: "Declare a global variable",
      color: CATEGORY_COLORS.variables,
      shape: "stack",
      ports: [port("name", "Name", "string", "input"), port("value", "Value", "any", "input")],
      templates: {
        python: "global {name}\n{name} = {value}",
        javascript: "var {name} = {value};"
      },
      irMapping: ["varDecl"],
      group: "core"
    },
    {
      id: "type-of",
      label: "Type Of",
      category: "variables",
      description: "Get the type of a value",
      color: CATEGORY_COLORS.variables,
      shape: "reporter",
      ports: [port("value", "Value", "any", "input"), port("result", "Type", "string", "output")],
      templates: {
        python: "type({value}).__name__",
        javascript: "typeof {value}"
      },
      irMapping: ["funcCallExpr"],
      group: "core"
    },
    // ── control (8) ──
    {
      id: "if",
      label: "If",
      category: "control",
      description: "Run code if condition is true",
      color: CATEGORY_COLORS.control,
      shape: "c-block",
      ports: [port("condition", "Condition", "boolean", "input")],
      templates: {
        python: "if {condition}:\n{body}",
        javascript: "if ({condition}) {\n{body}\n}"
      },
      irMapping: ["ifElse"],
      group: "conditionals"
    },
    {
      id: "if-else",
      label: "If-Else",
      category: "control",
      description: "Run code based on condition",
      color: CATEGORY_COLORS.control,
      shape: "c-block",
      ports: [port("condition", "Condition", "boolean", "input")],
      templates: {
        python: "if {condition}:\n{body}\nelse:\n{elseBody}",
        javascript: "if ({condition}) {\n{body}\n} else {\n{elseBody}\n}"
      },
      irMapping: ["ifElse"],
      group: "conditionals"
    },
    {
      id: "while-loop",
      label: "While Loop",
      category: "control",
      description: "Repeat while condition is true",
      color: CATEGORY_COLORS.control,
      shape: "c-block",
      ports: [port("condition", "Condition", "boolean", "input")],
      templates: {
        python: "while {condition}:\n{body}",
        javascript: "while ({condition}) {\n{body}\n}"
      },
      irMapping: ["whileLoop"],
      group: "loops"
    },
    {
      id: "for-loop",
      label: "For Loop",
      category: "control",
      description: "Repeat with counter",
      color: CATEGORY_COLORS.control,
      shape: "c-block",
      ports: [
        port("var", "Variable", "string", "input"),
        port("from", "From", "number", "input"),
        port("to", "To", "number", "input"),
        port("step", "Step", "number", "input")
      ],
      templates: {
        python: "for {var} in range({from}, {to}, {step}):\n{body}",
        javascript: "for (let {var} = {from}; {var} < {to}; {var} += {step}) {\n{body}\n}"
      },
      irMapping: ["forLoop"],
      group: "loops"
    },
    {
      id: "for-each",
      label: "For Each",
      category: "control",
      description: "Iterate over a collection",
      color: CATEGORY_COLORS.control,
      shape: "c-block",
      ports: [port("item", "Item", "string", "input"), port("list", "List", "array", "input")],
      templates: {
        python: "for {item} in {list}:\n{body}",
        javascript: "for (const {item} of {list}) {\n{body}\n}"
      },
      irMapping: ["forEachLoop"],
      group: "loops"
    },
    {
      id: "repeat-n",
      label: "Repeat N Times",
      category: "control",
      description: "Repeat code N times",
      color: CATEGORY_COLORS.control,
      shape: "c-block",
      ports: [port("count", "Count", "number", "input")],
      templates: {
        python: "for _i in range({count}):\n{body}",
        javascript: "for (let _i = 0; _i < {count}; _i++) {\n{body}\n}"
      },
      irMapping: ["forLoop"],
      group: "loops"
    },
    {
      id: "switch-case",
      label: "Switch Case",
      category: "control",
      description: "Match a value against cases",
      color: CATEGORY_COLORS.control,
      shape: "c-block",
      ports: [port("value", "Value", "any", "input")],
      templates: {
        python: "match {value}:\n{body}",
        javascript: "switch ({value}) {\n{body}\n}"
      },
      irMapping: ["switch"],
      group: "conditionals"
    },
    {
      id: "break-continue",
      label: "Break / Continue",
      category: "control",
      description: "Break or continue a loop",
      color: CATEGORY_COLORS.control,
      shape: "stack",
      ports: [port("action", "Action", "string", "input")],
      templates: {
        python: "{action}",
        javascript: "{action};"
      },
      irMapping: ["break", "continue"],
      group: "loops"
    },
    // ── strings (5) ──
    {
      id: "concatenate",
      label: "Concatenate",
      category: "strings",
      description: "Join two strings together",
      color: CATEGORY_COLORS.strings,
      shape: "reporter",
      ports: [
        port("a", "String 1", "string", "input"),
        port("b", "String 2", "string", "input"),
        port("result", "Result", "string", "output")
      ],
      templates: {
        python: "{a} + {b}",
        javascript: "{a} + {b}"
      },
      irMapping: ["binaryOp"],
      group: "operations"
    },
    {
      id: "length",
      label: "Length",
      category: "strings",
      description: "Get the length of a string",
      color: CATEGORY_COLORS.strings,
      shape: "reporter",
      ports: [port("text", "Text", "string", "input"), port("result", "Length", "number", "output")],
      templates: {
        python: "len({text})",
        javascript: "{text}.length"
      },
      irMapping: ["propertyAccess"],
      group: "operations"
    },
    {
      id: "substring",
      label: "Substring",
      category: "strings",
      description: "Get part of a string",
      color: CATEGORY_COLORS.strings,
      shape: "reporter",
      ports: [
        port("text", "Text", "string", "input"),
        port("start", "Start", "number", "input"),
        port("end", "End", "number", "input"),
        port("result", "Result", "string", "output")
      ],
      templates: {
        python: "{text}[{start}:{end}]",
        javascript: "{text}.slice({start}, {end})"
      },
      irMapping: ["slice"],
      group: "operations"
    },
    {
      id: "to-upper-lower",
      label: "To Upper / Lower",
      category: "strings",
      description: "Change string case",
      color: CATEGORY_COLORS.strings,
      shape: "reporter",
      ports: [port("text", "Text", "string", "input"), port("mode", "Mode", "string", "input"), port("result", "Result", "string", "output")],
      templates: {
        python: "{text}.{mode}()",
        javascript: "{text}.{mode}()"
      },
      irMapping: ["methodCall"],
      group: "operations"
    },
    {
      id: "contains",
      label: "Contains",
      category: "strings",
      description: "Check if string contains substring",
      color: CATEGORY_COLORS.strings,
      shape: "boolean",
      ports: [
        port("text", "Text", "string", "input"),
        port("search", "Search", "string", "input"),
        port("result", "Result", "boolean", "output")
      ],
      templates: {
        python: "{search} in {text}",
        javascript: "{text}.includes({search})"
      },
      irMapping: ["funcCallExpr"],
      group: "operations"
    },
    // ── math (6) ──
    {
      id: "add",
      label: "Add",
      category: "math",
      description: "Add two numbers",
      color: CATEGORY_COLORS.math,
      shape: "reporter",
      ports: [
        port("a", "A", "number", "input"),
        port("b", "B", "number", "input"),
        port("result", "Result", "number", "output")
      ],
      templates: {
        python: "{a} + {b}",
        javascript: "{a} + {b}"
      },
      irMapping: ["binaryOp"],
      group: "arithmetic"
    },
    {
      id: "subtract",
      label: "Subtract",
      category: "math",
      description: "Subtract two numbers",
      color: CATEGORY_COLORS.math,
      shape: "reporter",
      ports: [
        port("a", "A", "number", "input"),
        port("b", "B", "number", "input"),
        port("result", "Result", "number", "output")
      ],
      templates: {
        python: "{a} - {b}",
        javascript: "{a} - {b}"
      },
      irMapping: ["binaryOp"],
      group: "arithmetic"
    },
    {
      id: "multiply",
      label: "Multiply",
      category: "math",
      description: "Multiply two numbers",
      color: CATEGORY_COLORS.math,
      shape: "reporter",
      ports: [
        port("a", "A", "number", "input"),
        port("b", "B", "number", "input"),
        port("result", "Result", "number", "output")
      ],
      templates: {
        python: "{a} * {b}",
        javascript: "{a} * {b}"
      },
      irMapping: ["binaryOp"],
      group: "arithmetic"
    },
    {
      id: "divide",
      label: "Divide",
      category: "math",
      description: "Divide two numbers",
      color: CATEGORY_COLORS.math,
      shape: "reporter",
      ports: [
        port("a", "A", "number", "input"),
        port("b", "B", "number", "input"),
        port("result", "Result", "number", "output")
      ],
      templates: {
        python: "{a} / {b}",
        javascript: "{a} / {b}"
      },
      irMapping: ["binaryOp"],
      group: "arithmetic"
    },
    {
      id: "modulo",
      label: "Modulo",
      category: "math",
      description: "Get remainder of division",
      color: CATEGORY_COLORS.math,
      shape: "reporter",
      ports: [
        port("a", "A", "number", "input"),
        port("b", "B", "number", "input"),
        port("result", "Result", "number", "output")
      ],
      templates: {
        python: "{a} % {b}",
        javascript: "{a} % {b}"
      },
      irMapping: ["binaryOp"],
      group: "arithmetic"
    },
    {
      id: "random",
      label: "Random",
      category: "math",
      description: "Generate a random number",
      color: CATEGORY_COLORS.math,
      shape: "reporter",
      ports: [
        port("min", "Min", "number", "input"),
        port("max", "Max", "number", "input"),
        port("result", "Result", "number", "output")
      ],
      templates: {
        python: "random.randint({min}, {max})",
        javascript: "Math.floor(Math.random() * ({max} - {min} + 1)) + {min}"
      },
      irMapping: ["funcCallExpr"],
      group: "functions"
    },
    // ── arrays (5) ──
    {
      id: "create-array",
      label: "Create Array",
      category: "arrays",
      description: "Create a new array",
      color: CATEGORY_COLORS.arrays,
      shape: "reporter",
      ports: [port("items", "Items", "any", "input"), port("result", "Array", "array", "output")],
      templates: {
        python: "[{items}]",
        javascript: "[{items}]"
      },
      irMapping: ["arrayLiteral"],
      group: "core"
    },
    {
      id: "array-get",
      label: "Array Get",
      category: "arrays",
      description: "Get an element from an array",
      color: CATEGORY_COLORS.arrays,
      shape: "reporter",
      ports: [
        port("array", "Array", "array", "input"),
        port("index", "Index", "number", "input"),
        port("result", "Value", "any", "output")
      ],
      templates: {
        python: "{array}[{index}]",
        javascript: "{array}[{index}]"
      },
      irMapping: ["indexAccess"],
      group: "operations"
    },
    {
      id: "array-push",
      label: "Array Push",
      category: "arrays",
      description: "Add element to end of array",
      color: CATEGORY_COLORS.arrays,
      shape: "stack",
      ports: [port("array", "Array", "array", "input"), port("value", "Value", "any", "input")],
      templates: {
        python: "{array}.append({value})",
        javascript: "{array}.push({value});"
      },
      irMapping: ["arrayPush"],
      group: "operations"
    },
    {
      id: "array-length",
      label: "Array Length",
      category: "arrays",
      description: "Get the length of an array",
      color: CATEGORY_COLORS.arrays,
      shape: "reporter",
      ports: [port("array", "Array", "array", "input"), port("result", "Length", "number", "output")],
      templates: {
        python: "len({array})",
        javascript: "{array}.length"
      },
      irMapping: ["propertyAccess"],
      group: "operations"
    },
    {
      id: "array-contains",
      label: "Array Contains",
      category: "arrays",
      description: "Check if array contains value",
      color: CATEGORY_COLORS.arrays,
      shape: "boolean",
      ports: [
        port("array", "Array", "array", "input"),
        port("value", "Value", "any", "input"),
        port("result", "Result", "boolean", "output")
      ],
      templates: {
        python: "{value} in {array}",
        javascript: "{array}.includes({value})"
      },
      irMapping: ["funcCallExpr"],
      group: "operations"
    },
    // ── functions (4) ──
    {
      id: "define-function",
      label: "Define Function",
      category: "functions",
      description: "Define a new function",
      color: CATEGORY_COLORS.functions,
      shape: "hat",
      ports: [port("name", "Name", "string", "input"), port("params", "Params", "string", "input")],
      templates: {
        python: "def {name}({params}):\n{body}",
        javascript: "function {name}({params}) {\n{body}\n}"
      },
      irMapping: ["funcDef"],
      group: "structure"
    },
    {
      id: "call-function",
      label: "Call Function",
      category: "functions",
      description: "Call a function",
      color: CATEGORY_COLORS.functions,
      shape: "stack",
      ports: [port("name", "Name", "string", "input"), port("args", "Args", "any", "input"), port("result", "Result", "any", "output")],
      templates: {
        python: "{name}({args})",
        javascript: "{name}({args});"
      },
      irMapping: ["funcCallExpr"],
      group: "core"
    },
    {
      id: "return",
      label: "Return",
      category: "functions",
      description: "Return a value from a function",
      color: CATEGORY_COLORS.functions,
      shape: "cap",
      ports: [port("value", "Value", "any", "input")],
      templates: {
        python: "return {value}",
        javascript: "return {value};"
      },
      irMapping: ["return"],
      group: "flow"
    },
    {
      id: "lambda",
      label: "Lambda",
      category: "functions",
      description: "Create an anonymous function",
      color: CATEGORY_COLORS.functions,
      shape: "reporter",
      ports: [port("params", "Params", "string", "input"), port("body", "Body", "any", "input"), port("result", "Result", "function", "output")],
      templates: {
        python: "lambda {params}: {body}",
        javascript: "({params}) => {body}"
      },
      irMapping: ["funcDef"],
      group: "structure"
    },
    // ── classes (4) ──
    {
      id: "define-class",
      label: "Define Class",
      category: "classes",
      description: "Define a new class",
      color: CATEGORY_COLORS.classes,
      shape: "hat",
      ports: [port("name", "Name", "string", "input"), port("parent", "Parent", "string", "input")],
      templates: {
        python: "class {name}({parent}):\n{body}",
        javascript: "class {name} extends {parent} {\n{body}\n}"
      },
      irMapping: ["classDef"],
      group: "structure"
    },
    {
      id: "define-method",
      label: "Define Method",
      category: "classes",
      description: "Define a method in a class",
      color: CATEGORY_COLORS.classes,
      shape: "hat",
      ports: [port("name", "Name", "string", "input"), port("params", "Params", "string", "input")],
      templates: {
        python: "def {name}(self{params}):\n{body}",
        javascript: "{name}({params}) {\n{body}\n}"
      },
      irMapping: ["funcDef"],
      group: "structure"
    },
    {
      id: "create-instance",
      label: "Create Instance",
      category: "classes",
      description: "Create a new instance of a class",
      color: CATEGORY_COLORS.classes,
      shape: "reporter",
      ports: [
        port("className", "Class", "string", "input"),
        port("args", "Args", "any", "input"),
        port("result", "Instance", "object", "output")
      ],
      templates: {
        python: "{className}({args})",
        javascript: "new {className}({args})"
      },
      irMapping: ["new"],
      group: "core"
    },
    {
      id: "property-access",
      label: "Property Access",
      category: "classes",
      description: "Access a property of an object",
      color: CATEGORY_COLORS.classes,
      shape: "reporter",
      ports: [
        port("object", "Object", "object", "input"),
        port("property", "Property", "string", "input"),
        port("result", "Value", "any", "output")
      ],
      templates: {
        python: "{object}.{property}",
        javascript: "{object}.{property}"
      },
      irMapping: ["propertyAccess"],
      group: "operations"
    },
    // ── fileio (3) ──
    {
      id: "read-file",
      label: "Read File",
      category: "io",
      description: "Read contents of a file",
      color: CATEGORY_COLORS.io,
      shape: "reporter",
      ports: [port("path", "Path", "string", "input"), port("result", "Content", "string", "output")],
      templates: {
        python: "open({path}).read()",
        javascript: 'require("fs").readFileSync({path}, "utf8")'
      },
      irMapping: ["funcCallExpr"],
      group: "file"
    },
    {
      id: "write-file",
      label: "Write File",
      category: "io",
      description: "Write content to a file",
      color: CATEGORY_COLORS.io,
      shape: "stack",
      ports: [port("path", "Path", "string", "input"), port("content", "Content", "string", "input")],
      templates: {
        python: 'with open({path}, "w") as _f:\n    _f.write({content})',
        javascript: 'require("fs").writeFileSync({path}, {content});'
      },
      irMapping: ["fileWrite"],
      group: "file"
    },
    {
      id: "file-exists",
      label: "File Exists",
      category: "io",
      description: "Check if a file exists",
      color: CATEGORY_COLORS.io,
      shape: "boolean",
      ports: [port("path", "Path", "string", "input"), port("result", "Result", "boolean", "output")],
      templates: {
        python: "os.path.exists({path})",
        javascript: 'require("fs").existsSync({path})'
      },
      irMapping: ["funcCallExpr"],
      group: "file"
    },
    // ── operators (4) ──
    {
      id: "equals",
      label: "Equals",
      category: "operators",
      description: "Check if two values are equal",
      color: CATEGORY_COLORS.operators,
      shape: "boolean",
      ports: [
        port("a", "A", "any", "input"),
        port("b", "B", "any", "input"),
        port("result", "Result", "boolean", "output")
      ],
      templates: {
        python: "{a} == {b}",
        javascript: "{a} === {b}"
      },
      irMapping: ["binaryOp"],
      group: "comparison"
    },
    {
      id: "greater-than",
      label: "Greater Than",
      category: "operators",
      description: "Check if A is greater than B",
      color: CATEGORY_COLORS.operators,
      shape: "boolean",
      ports: [
        port("a", "A", "number", "input"),
        port("b", "B", "number", "input"),
        port("result", "Result", "boolean", "output")
      ],
      templates: {
        python: "{a} > {b}",
        javascript: "{a} > {b}"
      },
      irMapping: ["binaryOp"],
      group: "comparison"
    },
    {
      id: "less-than",
      label: "Less Than",
      category: "operators",
      description: "Check if A is less than B",
      color: CATEGORY_COLORS.operators,
      shape: "boolean",
      ports: [
        port("a", "A", "number", "input"),
        port("b", "B", "number", "input"),
        port("result", "Result", "boolean", "output")
      ],
      templates: {
        python: "{a} < {b}",
        javascript: "{a} < {b}"
      },
      irMapping: ["binaryOp"],
      group: "comparison"
    },
    {
      id: "and-or",
      label: "And / Or",
      category: "operators",
      description: "Logical AND or OR",
      color: CATEGORY_COLORS.operators,
      shape: "boolean",
      ports: [
        port("a", "A", "boolean", "input"),
        port("b", "B", "boolean", "input"),
        port("op", "Operator", "string", "input"),
        port("result", "Result", "boolean", "output")
      ],
      templates: {
        python: "{a} {op} {b}",
        javascript: "{a} {op} {b}"
      },
      irMapping: ["binaryOp"],
      group: "logic"
    },
    // ── datetime (3) ──
    {
      id: "current-time",
      label: "Current Time",
      category: "datetime",
      description: "Get the current date and time",
      color: CATEGORY_COLORS.datetime,
      shape: "reporter",
      ports: [port("result", "Result", "string", "output")],
      templates: {
        python: "datetime.datetime.now()",
        javascript: "new Date()"
      },
      irMapping: ["funcCallExpr"],
      group: "core"
    },
    {
      id: "format-date",
      label: "Format Date",
      category: "datetime",
      description: "Format a date to string",
      color: CATEGORY_COLORS.datetime,
      shape: "reporter",
      ports: [
        port("date", "Date", "any", "input"),
        port("format", "Format", "string", "input"),
        port("result", "Result", "string", "output")
      ],
      templates: {
        python: "{date}.strftime({format})",
        javascript: "{date}.toLocaleDateString({format})"
      },
      irMapping: ["methodCall"],
      group: "operations"
    },
    {
      id: "timestamp",
      label: "Timestamp",
      category: "datetime",
      description: "Get Unix timestamp",
      color: CATEGORY_COLORS.datetime,
      shape: "reporter",
      ports: [port("result", "Result", "number", "output")],
      templates: {
        python: "int(time.time())",
        javascript: "Date.now()"
      },
      irMapping: ["funcCallExpr"],
      group: "core"
    }
  ];
  var libraryMap = new Map(blockDefs.map((b) => [b.id, b]));
  var blocksByCategory = /* @__PURE__ */ new Map();
  for (const block of blockDefs) {
    const list = blocksByCategory.get(block.category) ?? [];
    list.push(block);
    blocksByCategory.set(block.category, list);
  }
  var allCategories = [
    "program",
    "variables",
    "control",
    "strings",
    "math",
    "arrays",
    "functions",
    "classes",
    "io",
    "operators",
    "datetime"
  ];
  var blockLibrary = {
    getCategoryBlocks(category) {
      return blocksByCategory.get(category) ?? [];
    },
    getBlock(id) {
      return libraryMap.get(id);
    },
    getAllCategories() {
      return allCategories;
    },
    searchBlocks(query) {
      const q = query.toLowerCase();
      return blockDefs.filter(
        (b) => b.label.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)
      );
    },
    getGroups() {
      const groups = /* @__PURE__ */ new Map();
      for (const block of blockDefs) {
        const key = `${block.category}/${block.group}`;
        const list = groups.get(key) ?? [];
        list.push(block);
        groups.set(key, list);
      }
      return groups;
    }
  };

  // src/blocks/converter.ts
  var BINARY_OP_BLOCK = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "%": "modulo",
    "==": "equals",
    "===": "equals",
    ">": "greater-than",
    "<": "less-than",
    "&&": "and-or",
    "||": "and-or"
  };
  var nodeIdCounter = 0;
  function nextId() {
    return `node-${nodeIdCounter++}`;
  }
  function exprToFieldValue(expr) {
    switch (expr.kind) {
      case "literal":
        if (typeof expr.value === "string") return expr.value;
        return String(expr.value);
      case "identifier":
        return expr.name;
      case "binaryOp": {
        const left = exprToFieldValue(expr.left);
        const right = exprToFieldValue(expr.right);
        return `${left} ${expr.operator} ${right}`;
      }
      case "funcCallExpr": {
        const args = expr.args.map(exprToFieldValue).join(", ");
        return `${expr.name}(${args})`;
      }
      case "methodCall": {
        const obj = exprToFieldValue(expr.object);
        const args = expr.args.map(exprToFieldValue).join(", ");
        return `${obj}.${expr.method}(${args})`;
      }
      case "propertyAccess": {
        const obj = exprToFieldValue(expr.object);
        return `${obj}.${expr.property}`;
      }
      case "indexAccess": {
        const obj = exprToFieldValue(expr.object);
        const idx = exprToFieldValue(expr.index);
        return `${obj}[${idx}]`;
      }
      case "unaryOp":
        return expr.prefix ? `${expr.operator}${exprToFieldValue(expr.operand)}` : `${exprToFieldValue(expr.operand)}${expr.operator}`;
      case "ternary": {
        const cond = exprToFieldValue(expr.condition);
        const then = exprToFieldValue(expr.thenExpr);
        const els = exprToFieldValue(expr.elseExpr);
        return `${cond} ? ${then} : ${els}`;
      }
      case "new": {
        const args = expr.args.map(exprToFieldValue).join(", ");
        return `new ${expr.className}(${args})`;
      }
      case "typeCast":
        return exprToFieldValue(expr.expr);
      default:
        return "";
    }
  }
  function getBlockData(blockId) {
    const def = blockLibrary.getBlock(blockId);
    if (!def) return null;
    return {
      label: def.label,
      color: def.color,
      shape: def.shape,
      category: def.category
    };
  }
  function makeNode(blockType, x, y, fields = {}) {
    const data = getBlockData(blockType);
    return {
      id: nextId(),
      type: "block",
      position: { x, y },
      data: {
        blockType,
        label: data?.label ?? blockType,
        color: data?.color ?? "#999",
        shape: data?.shape ?? "stack",
        fields,
        category: data?.category ?? "program"
      }
    };
  }
  var IRToBlocksConverter = class {
    constructor() {
      __publicField(this, "yOffset", 0);
      __publicField(this, "allNodes", []);
      __publicField(this, "allEdges", []);
    }
    convert(ir2) {
      nodeIdCounter = 0;
      this.yOffset = 0;
      this.allNodes = [];
      this.allEdges = [];
      for (const stmt of ir2.stmts) {
        const result = this.convertStmt(stmt, 0);
        this.allNodes.push(...result.nodes);
        this.allEdges.push(...result.edges);
      }
      return { nodes: this.allNodes, edges: this.allEdges };
    }
    convertStmt(stmt, indent) {
      const nodes = [];
      const edges = [];
      const x = indent * 30;
      const y = this.yOffset;
      switch (stmt.kind) {
        case "print": {
          const node = makeNode("print", x, y, {
            value: stmt.args.map(exprToFieldValue).join(", ")
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "comment": {
          const node = makeNode("comment", x, y, { text: stmt.text });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "varDecl": {
          const node = makeNode("set-variable", x, y, {
            name: stmt.name,
            value: stmt.value ? exprToFieldValue(stmt.value) : ""
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "assign": {
          const target = exprToFieldValue(stmt.target);
          const value = exprToFieldValue(stmt.value);
          const node = makeNode("increment-variable", x, y, {
            name: target,
            amount: value
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "return": {
          const node = makeNode("return", x, y, {
            value: stmt.value ? exprToFieldValue(stmt.value) : ""
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "break": {
          const node = makeNode("break-continue", x, y, { action: "break" });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "continue": {
          const node = makeNode("break-continue", x, y, { action: "continue" });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "ifElse": {
          const node = makeNode("if-else", x, y, {
            condition: exprToFieldValue(stmt.condition)
          });
          nodes.push(node);
          this.yOffset += 80;
          const thenResult = this.convertBody(stmt.thenBody, indent + 1);
          nodes.push(...thenResult.nodes);
          edges.push(...thenResult.edges);
          if (thenResult.nodes.length > 0) {
            edges.push({
              id: `${node.id}-then-${thenResult.nodes[0].id}`,
              source: node.id,
              target: thenResult.nodes[0].id,
              sourceHandle: "body",
              targetHandle: "input"
            });
          }
          if (stmt.elseBody && stmt.elseBody.length > 0) {
            const elseResult = this.convertBody(stmt.elseBody, indent + 1);
            nodes.push(...elseResult.nodes);
            edges.push(...elseResult.edges);
            if (elseResult.nodes.length > 0) {
              edges.push({
                id: `${node.id}-else-${elseResult.nodes[0].id}`,
                source: node.id,
                target: elseResult.nodes[0].id,
                sourceHandle: "elseBody",
                targetHandle: "input"
              });
            }
          }
          break;
        }
        case "whileLoop": {
          const node = makeNode("while-loop", x, y, {
            condition: exprToFieldValue(stmt.condition)
          });
          nodes.push(node);
          this.yOffset += 80;
          const bodyResult = this.convertBody(stmt.body, indent + 1);
          nodes.push(...bodyResult.nodes);
          edges.push(...bodyResult.edges);
          if (bodyResult.nodes.length > 0) {
            edges.push({
              id: `${node.id}-body-${bodyResult.nodes[0].id}`,
              source: node.id,
              target: bodyResult.nodes[0].id,
              sourceHandle: "body",
              targetHandle: "input"
            });
          }
          break;
        }
        case "forLoop": {
          const varName = stmt.init?.kind === "varDecl" ? stmt.init.name : "i";
          const from = stmt.init?.kind === "varDecl" && stmt.init.value ? exprToFieldValue(stmt.init.value) : "0";
          const to = stmt.condition ? exprToFieldValue(stmt.condition) : "10";
          const step = stmt.update ? exprToFieldValue(stmt.update) : "1";
          const node = makeNode("for-loop", x, y, {
            var: varName,
            from,
            to,
            step
          });
          nodes.push(node);
          this.yOffset += 80;
          const bodyResult = this.convertBody(stmt.body, indent + 1);
          nodes.push(...bodyResult.nodes);
          edges.push(...bodyResult.edges);
          if (bodyResult.nodes.length > 0) {
            edges.push({
              id: `${node.id}-body-${bodyResult.nodes[0].id}`,
              source: node.id,
              target: bodyResult.nodes[0].id,
              sourceHandle: "body",
              targetHandle: "input"
            });
          }
          break;
        }
        case "forEachLoop": {
          const node = makeNode("for-each", x, y, {
            item: stmt.variable,
            list: exprToFieldValue(stmt.iterable)
          });
          nodes.push(node);
          this.yOffset += 80;
          const bodyResult = this.convertBody(stmt.body, indent + 1);
          nodes.push(...bodyResult.nodes);
          edges.push(...bodyResult.edges);
          if (bodyResult.nodes.length > 0) {
            edges.push({
              id: `${node.id}-body-${bodyResult.nodes[0].id}`,
              source: node.id,
              target: bodyResult.nodes[0].id,
              sourceHandle: "body",
              targetHandle: "input"
            });
          }
          break;
        }
        case "switch": {
          const node = makeNode("switch-case", x, y, {
            value: exprToFieldValue(stmt.subject)
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "funcDef": {
          const node = makeNode("define-function", x, y, {
            name: stmt.name,
            params: stmt.params.map((p) => p.name).join(", ")
          });
          nodes.push(node);
          this.yOffset += 80;
          const bodyResult = this.convertBody(stmt.body, indent + 1);
          nodes.push(...bodyResult.nodes);
          edges.push(...bodyResult.edges);
          if (bodyResult.nodes.length > 0) {
            edges.push({
              id: `${node.id}-body-${bodyResult.nodes[0].id}`,
              source: node.id,
              target: bodyResult.nodes[0].id,
              sourceHandle: "body",
              targetHandle: "input"
            });
          }
          break;
        }
        case "classDef": {
          const node = makeNode("define-class", x, y, {
            name: stmt.name,
            parent: stmt.super ?? ""
          });
          nodes.push(node);
          this.yOffset += 80;
          const bodyResult = this.convertBody(stmt.body, indent + 1);
          nodes.push(...bodyResult.nodes);
          edges.push(...bodyResult.edges);
          if (bodyResult.nodes.length > 0) {
            edges.push({
              id: `${node.id}-body-${bodyResult.nodes[0].id}`,
              source: node.id,
              target: bodyResult.nodes[0].id,
              sourceHandle: "body",
              targetHandle: "input"
            });
          }
          break;
        }
        case "funcCall": {
          const node = makeNode("call-function", x, y, {
            name: stmt.name,
            args: stmt.args.map(exprToFieldValue).join(", ")
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "exprStmt": {
          const exprResult = this.convertExpr(stmt.expr, x, y);
          if (exprResult.node) nodes.push(exprResult.node);
          nodes.push(...exprResult.extraNodes);
          edges.push(...exprResult.extraEdges);
          this.yOffset += 80;
          break;
        }
        case "fileWrite": {
          const node = makeNode("write-file", x, y, {
            path: stmt.path,
            content: exprToFieldValue(stmt.content)
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "arrayPush": {
          const node = makeNode("array-push", x, y, {
            array: exprToFieldValue(stmt.array),
            value: stmt.values.map(exprToFieldValue).join(", ")
          });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "import": {
          const node = makeNode("comment", x, y, { text: `import ${stmt.module}` });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
        case "block": {
          const bodyResult = this.convertBody(stmt.stmts, indent);
          nodes.push(...bodyResult.nodes);
          edges.push(...bodyResult.edges);
          break;
        }
        case "empty": {
          break;
        }
        default: {
          const node = makeNode("comment", x, y, { text: stmt.kind });
          nodes.push(node);
          this.yOffset += 80;
          break;
        }
      }
      return { nodes, edges };
    }
    convertExpr(expr, x, y) {
      const extraNodes = [];
      const extraEdges = [];
      switch (expr.kind) {
        case "literal": {
          const node = makeNode("get-variable", x, y, { name: String(expr.value) });
          return { node, extraNodes, extraEdges };
        }
        case "identifier": {
          const node = makeNode("get-variable", x, y, { name: expr.name });
          return { node, extraNodes, extraEdges };
        }
        case "binaryOp": {
          const blockId = BINARY_OP_BLOCK[expr.operator] ?? "add";
          const node = makeNode(blockId, x, y, {
            a: exprToFieldValue(expr.left),
            b: exprToFieldValue(expr.right)
          });
          return { node, extraNodes, extraEdges };
        }
        case "unaryOp": {
          const node = makeNode("set-variable", x, y, {
            name: `${expr.operator}${exprToFieldValue(expr.operand)}`
          });
          return { node, extraNodes, extraEdges };
        }
        case "funcCallExpr": {
          const node = makeNode("call-function", x, y, {
            name: expr.name,
            args: expr.args.map(exprToFieldValue).join(", ")
          });
          return { node, extraNodes, extraEdges };
        }
        case "methodCall": {
          const node = makeNode("to-upper-lower", x, y, {
            text: exprToFieldValue(expr.object),
            mode: expr.method
          });
          return { node, extraNodes, extraEdges };
        }
        case "propertyAccess": {
          const node = makeNode("property-access", x, y, {
            object: exprToFieldValue(expr.object),
            property: expr.property
          });
          return { node, extraNodes, extraEdges };
        }
        case "indexAccess": {
          const node = makeNode("array-get", x, y, {
            array: exprToFieldValue(expr.object),
            index: exprToFieldValue(expr.index)
          });
          return { node, extraNodes, extraEdges };
        }
        case "arrayLiteral": {
          const node = makeNode("create-array", x, y, {
            items: expr.elements.map(exprToFieldValue).join(", ")
          });
          return { node, extraNodes, extraEdges };
        }
        case "dictLiteral": {
          const entries = expr.entries.map((e) => `${exprToFieldValue(e.key)}: ${exprToFieldValue(e.value)}`).join(", ");
          const node = makeNode("create-array", x, y, { items: entries });
          return { node, extraNodes, extraEdges };
        }
        case "new": {
          const node = makeNode("create-instance", x, y, {
            className: expr.className,
            args: expr.args.map(exprToFieldValue).join(", ")
          });
          return { node, extraNodes, extraEdges };
        }
        case "ternary": {
          const node = makeNode("if", x, y, { condition: exprToFieldValue(expr.condition) });
          const thenExpr = this.convertExpr(expr.thenExpr, x + 30, y + 80);
          const elseExpr = this.convertExpr(expr.elseExpr, x + 30, y + 160);
          if (thenExpr.node) {
            extraNodes.push(thenExpr.node);
            extraEdges.push({
              id: `${node.id}-then-${thenExpr.node.id}`,
              source: node.id,
              target: thenExpr.node.id,
              sourceHandle: "body",
              targetHandle: "input"
            });
          }
          if (elseExpr.node) {
            extraNodes.push(elseExpr.node);
            extraEdges.push({
              id: `${node.id}-else-${elseExpr.node.id}`,
              source: node.id,
              target: elseExpr.node.id,
              sourceHandle: "elseBody",
              targetHandle: "input"
            });
          }
          return { node, extraNodes, extraEdges };
        }
        case "typeCast": {
          const node = makeNode("set-variable", x, y, { name: expr.targetType });
          return { node, extraNodes, extraEdges };
        }
        default: {
          const node = makeNode("get-variable", x, y, { name: "" });
          return { node, extraNodes, extraEdges };
        }
      }
    }
    convertBody(stmts, indent) {
      const nodes = [];
      const edges = [];
      let prevNodeId = null;
      for (const stmt of stmts) {
        const result = this.convertStmt(stmt, indent);
        nodes.push(...result.nodes);
        edges.push(...result.edges);
        if (prevNodeId && result.nodes.length > 0) {
          edges.push({
            id: `${prevNodeId}-next-${result.nodes[0].id}`,
            source: prevNodeId,
            target: result.nodes[0].id,
            sourceHandle: "next",
            targetHandle: "input"
          });
        }
        if (result.nodes.length > 0) {
          prevNodeId = result.nodes[result.nodes.length - 1].id;
        }
      }
      return { nodes, edges };
    }
  };

  // src/blocks/resolver.ts
  var ARITHMETIC_OPS = {
    add: "+",
    subtract: "-",
    multiply: "*",
    divide: "/",
    modulo: "%"
  };
  var LOGIC_OPS = {
    and: "&&",
    or: "||"
  };
  var COMPARE_OPS = {
    equals: "==",
    "greater-than": ">",
    "less-than": "<"
  };
  var BlockResolver = class {
    constructor() {
      __publicField(this, "declaredVars", /* @__PURE__ */ new Set());
    }
    resolveNodes(nodes, edges, language) {
      const sorted = this.topologicalSort(nodes, edges);
      const stmts = [];
      for (const node of sorted) {
        const inputs = this.gatherInputs(node, edges);
        const resolved = this.resolveBlock(node, inputs, language);
        stmts.push(...resolved);
      }
      return ir.module(stmts, language);
    }
    resolveBlock(node, inputs, language) {
      const { blockType, fields } = node;
      switch (blockType) {
        case "print": {
          const value = inputs.value?.[0] ?? ir.literal(fields.value ?? "");
          return [ir.print([value])];
        }
        case "input": {
          const prompt = inputs.prompt?.[0] ?? ir.literal(fields.prompt ?? "");
          return [ir.exprStmt(ir.funcCallExpr("input", [prompt]))];
        }
        case "comment": {
          return [ir.comment(fields.text ?? "")];
        }
        case "main": {
          return [ir.funcDef("__main__", [], (inputs.body ?? []).map((e) => ir.exprStmt(e)), { isStatic: false, isAsync: false })];
        }
        case "set-variable": {
          const name = fields.name ?? "x";
          const value = inputs.value?.[0] ?? this.parseFieldValue(fields.value, "any", language);
          this.declaredVars.add(name);
          return [ir.varDecl(name, value)];
        }
        case "get-variable": {
          return [];
        }
        case "increment-variable": {
          const name = fields.name ?? "x";
          const amount = inputs.amount?.[0] ?? this.parseFieldValue(fields.amount, "number", language);
          return [ir.assign(ir.ident(name), amount, "+=")];
        }
        case "global-variable": {
          const name = fields.name ?? "x";
          const value = inputs.value?.[0] ?? this.parseFieldValue(fields.value, "any", language);
          this.declaredVars.add(name);
          return [ir.varDecl(name, value)];
        }
        case "type-of": {
          const value = inputs.value?.[0] ?? ir.literal(fields.value ?? "");
          return [ir.exprStmt(ir.funcCallExpr("type", [value]))];
        }
        case "if": {
          const condition = inputs.condition?.[0] ?? this.parseFieldValue(fields.condition, "boolean", language);
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          return [ir.ifElse(condition, body)];
        }
        case "if-else": {
          const condition = inputs.condition?.[0] ?? this.parseFieldValue(fields.condition, "boolean", language);
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          const elseBody = (inputs.elseBody ?? []).map((e) => ir.exprStmt(e));
          return [ir.ifElse(condition, body, [], elseBody)];
        }
        case "while-loop": {
          const condition = inputs.condition?.[0] ?? this.parseFieldValue(fields.condition, "boolean", language);
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          return [ir.whileLoop(condition, body)];
        }
        case "for-loop": {
          const varName = fields.var ?? "i";
          const from = inputs.from?.[0] ?? this.parseFieldValue(fields.from, "number", language);
          const to = inputs.to?.[0] ?? this.parseFieldValue(fields.to, "number", language);
          const step = inputs.step?.[0] ?? this.parseFieldValue(fields.step ?? "1", "number", language);
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          this.declaredVars.add(varName);
          return [ir.forLoop(body, { init: ir.varDecl(varName, from), condition: ir.binop(ir.ident(varName), "<", to), update: ir.binop(ir.ident(varName), "+", step) })];
        }
        case "for-each": {
          const item = fields.item ?? "item";
          const list = inputs.list?.[0] ?? ir.literal(fields.list ?? "[]");
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          this.declaredVars.add(item);
          return [ir.forEach(item, list, body)];
        }
        case "repeat-n": {
          const count = inputs.count?.[0] ?? this.parseFieldValue(fields.count, "number", language);
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          return [ir.forLoop(body, { init: ir.varDecl("_i", ir.literal(0)), condition: ir.binop(ir.ident("_i"), "<", count), update: ir.binop(ir.ident("_i"), "+", ir.literal(1)) })];
        }
        case "switch-case": {
          const value = inputs.value?.[0] ?? this.parseFieldValue(fields.value, "any", language);
          const cases = (inputs.cases ?? []).map((c) => ({
            value: [c],
            body: [],
            fallthrough: false
          }));
          return [{ kind: "switch", subject: value, cases, defaultBody: void 0 }];
        }
        case "break-continue": {
          const action = fields.action ?? "break";
          return [action === "continue" ? { kind: "continue" } : { kind: "break" }];
        }
        case "concatenate": {
          return [];
        }
        case "length": {
          const text = inputs.text?.[0] ?? ir.literal(fields.text ?? "");
          return [ir.exprStmt(ir.propAccess(text, "length"))];
        }
        case "substring": {
          const text = inputs.text?.[0] ?? ir.literal(fields.text ?? "");
          const start = inputs.start?.[0] ?? this.parseFieldValue(fields.start, "number", language);
          const end = inputs.end?.[0] ?? this.parseFieldValue(fields.end, "number", language);
          return [ir.exprStmt(ir.indexAccess(text, ir.range(start, end)))];
        }
        case "to-upper-lower": {
          const text = inputs.text?.[0] ?? ir.literal(fields.text ?? "");
          const mode = fields.mode ?? "lower";
          return [ir.exprStmt(ir.methodCall(text, mode, []))];
        }
        case "contains": {
          return [];
        }
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
        case "modulo": {
          return [];
        }
        case "random": {
          const min = inputs.min?.[0] ?? this.parseFieldValue(fields.min ?? "0", "number", language);
          const max = inputs.max?.[0] ?? this.parseFieldValue(fields.max ?? "100", "number", language);
          return [ir.exprStmt(ir.funcCallExpr("random", [min, max]))];
        }
        case "create-array": {
          return [];
        }
        case "array-get": {
          const array = inputs.array?.[0] ?? ir.literal(fields.array ?? "[]");
          const index = inputs.index?.[0] ?? this.parseFieldValue(fields.index, "number", language);
          return [ir.exprStmt(ir.indexAccess(array, index))];
        }
        case "array-push": {
          const array = inputs.array?.[0] ?? ir.literal(fields.array ?? "[]");
          const value = inputs.value?.[0] ?? this.parseFieldValue(fields.value, "any", language);
          return [{ kind: "arrayPush", array, values: [value] }];
        }
        case "array-length": {
          const array = inputs.array?.[0] ?? ir.literal(fields.array ?? "[]");
          return [ir.exprStmt(ir.propAccess(array, "length"))];
        }
        case "array-contains": {
          return [];
        }
        case "define-function": {
          const name = fields.name ?? "myFunc";
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          return [ir.funcDef(name, [], body, { isStatic: false, isAsync: false })];
        }
        case "call-function": {
          const name = fields.name ?? "myFunc";
          const args = inputs.args ?? [];
          if (inputs.result) {
            return [ir.exprStmt(ir.funcCallExpr(name, args))];
          }
          return [ir.exprStmt(ir.funcCallExpr(name, args))];
        }
        case "return": {
          const value = inputs.value?.[0];
          return [ir.ret(value)];
        }
        case "lambda": {
          return [];
        }
        case "define-class": {
          const name = fields.name ?? "MyClass";
          const parent = fields.parent;
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          return [ir.classDef(name, body, { super: parent || void 0 })];
        }
        case "define-method": {
          const name = fields.name ?? "method";
          const body = (inputs.body ?? []).map((e) => ir.exprStmt(e));
          return [ir.funcDef(name, [], body, { isStatic: false, isAsync: false })];
        }
        case "create-instance": {
          return [];
        }
        case "property-access": {
          return [];
        }
        case "read-file": {
          const path = inputs.path?.[0] ?? this.parseFieldValue(fields.path, "string", language);
          return [ir.exprStmt(ir.funcCallExpr("readFileSync", [path]))];
        }
        case "write-file": {
          const path = inputs.path?.[0] ?? this.parseFieldValue(fields.path, "string", language);
          const content = inputs.content?.[0] ?? ir.literal(fields.content ?? "");
          return [ir.fileWrite(String(path.value ?? ""), content)];
        }
        case "file-exists": {
          const path = inputs.path?.[0] ?? this.parseFieldValue(fields.path, "string", language);
          return [ir.exprStmt(ir.funcCallExpr("existsSync", [path]))];
        }
        case "equals":
        case "greater-than":
        case "less-than":
        case "and-or": {
          return [];
        }
        case "current-time": {
          return [ir.exprStmt(ir.funcCallExpr("now", []))];
        }
        case "format-date": {
          const date = inputs.date?.[0] ?? ir.literal(fields.date ?? "");
          const format = inputs.format?.[0] ?? this.parseFieldValue(fields.format, "string", language);
          return [ir.exprStmt(ir.methodCall(date, "strftime", [format]))];
        }
        case "timestamp": {
          return [ir.exprStmt(ir.funcCallExpr("Date.now", []))];
        }
        default:
          return [];
      }
    }
    resolveExpressionFor(node, inputs, language) {
      const { blockType, fields } = node;
      switch (blockType) {
        case "get-variable":
          return ir.ident(fields.name ?? "x");
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
        case "modulo": {
          const a = inputs.a?.[0] ?? this.parseFieldValue(fields.a, "number", language);
          const b = inputs.b?.[0] ?? this.parseFieldValue(fields.b, "number", language);
          return ir.binop(a, ARITHMETIC_OPS[blockType], b);
        }
        case "concatenate": {
          const a = inputs.a?.[0] ?? this.parseFieldValue(fields.a, "string", language);
          const b = inputs.b?.[0] ?? this.parseFieldValue(fields.b, "string", language);
          return ir.binop(a, "+", b);
        }
        case "equals":
        case "greater-than":
        case "less-than": {
          const a = inputs.a?.[0] ?? this.parseFieldValue(fields.a, "any", language);
          const b = inputs.b?.[0] ?? this.parseFieldValue(fields.b, "any", language);
          return ir.binop(a, COMPARE_OPS[blockType], b);
        }
        case "and-or": {
          const a = inputs.a?.[0] ?? this.parseFieldValue(fields.a, "boolean", language);
          const b = inputs.b?.[0] ?? this.parseFieldValue(fields.b, "boolean", language);
          const op = fields.op ?? "and";
          return ir.binop(a, LOGIC_OPS[op] ?? op, b);
        }
        case "contains": {
          const text = inputs.text?.[0] ?? this.parseFieldValue(fields.text, "string", language);
          const search = inputs.search?.[0] ?? this.parseFieldValue(fields.search, "string", language);
          return ir.funcCallExpr("includes", [text, search]);
        }
        case "array-contains": {
          const array = inputs.array?.[0] ?? ir.literal(fields.array ?? "[]");
          const value = inputs.value?.[0] ?? this.parseFieldValue(fields.value, "any", language);
          return ir.funcCallExpr("includes", [array, value]);
        }
        case "create-array": {
          const items = inputs.items ?? [];
          return ir.arrayLit(items);
        }
        case "create-instance": {
          const className = fields.className ?? "MyClass";
          const args = inputs.args ?? [];
          return ir.new(className, args);
        }
        case "property-access": {
          const object = inputs.object?.[0] ?? ir.literal(fields.object ?? "");
          const property = fields.property ?? "prop";
          return ir.propAccess(object, property);
        }
        case "lambda": {
          const params = (fields.params ?? "").split(",").filter(Boolean).map((p) => ({ name: p.trim(), isSpread: false }));
          const body = inputs.body?.[0] ?? ir.literal("");
          return { kind: "funcCallExpr", name: "lambda", args: [ir.arrayLit(params.map((p) => ir.literal(p.name))), body] };
        }
        case "input": {
          const prompt = inputs.prompt?.[0] ?? this.parseFieldValue(fields.prompt, "string", language);
          return ir.funcCallExpr("input", [prompt]);
        }
        case "random": {
          const min = inputs.min?.[0] ?? this.parseFieldValue(fields.min ?? "0", "number", language);
          const max = inputs.max?.[0] ?? this.parseFieldValue(fields.max ?? "100", "number", language);
          return ir.funcCallExpr("random", [min, max]);
        }
        case "current-time":
          return ir.funcCallExpr("now", []);
        case "timestamp":
          return ir.funcCallExpr("Date.now", []);
        case "length": {
          const text = inputs.text?.[0] ?? ir.literal(fields.text ?? "");
          return ir.propAccess(text, "length");
        }
        case "array-length": {
          const array = inputs.array?.[0] ?? ir.literal(fields.array ?? "[]");
          return ir.propAccess(array, "length");
        }
        case "substring": {
          const text = inputs.text?.[0] ?? ir.literal(fields.text ?? "");
          const start = inputs.start?.[0] ?? this.parseFieldValue(fields.start, "number", language);
          const end = inputs.end?.[0] ?? this.parseFieldValue(fields.end, "number", language);
          return ir.indexAccess(text, ir.range(start, end));
        }
        case "array-get": {
          const array = inputs.array?.[0] ?? ir.literal(fields.array ?? "[]");
          const index = inputs.index?.[0] ?? this.parseFieldValue(fields.index, "number", language);
          return ir.indexAccess(array, index);
        }
        case "read-file": {
          const path = inputs.path?.[0] ?? this.parseFieldValue(fields.path, "string", language);
          return ir.funcCallExpr("readFileSync", [path]);
        }
        case "file-exists": {
          const path = inputs.path?.[0] ?? this.parseFieldValue(fields.path, "string", language);
          return ir.funcCallExpr("existsSync", [path]);
        }
        default:
          return ir.literal("");
      }
    }
    parseFieldValue(value, type, _language) {
      if (value === void 0 || value === "") {
        switch (type) {
          case "number":
            return ir.literal(0);
          case "boolean":
            return ir.literal(false);
          case "string":
            return ir.literal("");
          default:
            return ir.literal("");
        }
      }
      if (type === "number") {
        const n = Number(value);
        return isNaN(n) ? ir.ident(value) : ir.literal(n);
      }
      if (type === "boolean") {
        return ir.literal(value === "true");
      }
      if (value.startsWith('"') && value.endsWith('"')) {
        return ir.literal(value.slice(1, -1));
      }
      if (value.startsWith("'") && value.endsWith("'")) {
        return ir.literal(value.slice(1, -1));
      }
      return ir.literal(value);
    }
    gatherInputs(node, edges) {
      const inputs = {};
      const incoming = edges.filter((e) => e.target === node.id);
      for (const edge of incoming) {
        const sourceNode = this.findSourceNode(edge.source);
        if (!sourceNode) continue;
        const expr = this.resolveExpressionFor(sourceNode, {}, "python");
        const handle = edge.targetHandle;
        if (!inputs[handle]) inputs[handle] = [];
        inputs[handle].push(expr);
      }
      return inputs;
    }
    findSourceNode(_sourceId) {
      return null;
    }
    topologicalSort(nodes, edges) {
      const adj = /* @__PURE__ */ new Map();
      const inDeg = /* @__PURE__ */ new Map();
      for (const n of nodes) {
        adj.set(n.id, []);
        inDeg.set(n.id, 0);
      }
      for (const e of edges) {
        if (!adj.has(e.source)) continue;
        adj.get(e.source).push(e.target);
        inDeg.set(e.target, (inDeg.get(e.target) ?? 0) + 1);
      }
      const queue = [];
      for (const [id, deg] of inDeg) {
        if (deg === 0) queue.push(id);
      }
      const result = [];
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      while (queue.length > 0) {
        const id = queue.shift();
        const node = nodeMap.get(id);
        if (node) result.push(node);
        for (const neighbor of adj.get(id) ?? []) {
          const newDeg = (inDeg.get(neighbor) ?? 1) - 1;
          inDeg.set(neighbor, newDeg);
          if (newDeg === 0) queue.push(neighbor);
        }
      }
      const sorted = new Set(result.map((n) => n.id));
      for (const n of nodes) {
        if (!sorted.has(n.id)) result.push(n);
      }
      result.sort((a, b) => a.y - b.y);
      return result;
    }
  };

  // src/core/events.ts
  var EventBus = class {
    constructor() {
      __publicField(this, "listeners", /* @__PURE__ */ new Map());
      __publicField(this, "wildcardListeners", []);
    }
    on(event, handler, priority = 0) {
      if (event === "*") {
        const sub2 = {
          handler,
          priority,
          once: false
        };
        this.wildcardListeners.push(sub2);
        this.wildcardListeners.sort((a, b) => b.priority - a.priority);
        return () => {
          const idx = this.wildcardListeners.indexOf(sub2);
          if (idx !== -1) this.wildcardListeners.splice(idx, 1);
        };
      }
      if (!this.listeners.has(event)) this.listeners.set(event, []);
      const subs = this.listeners.get(event);
      const sub = {
        handler,
        priority,
        once: false
      };
      subs.push(sub);
      subs.sort((a, b) => b.priority - a.priority);
      return () => {
        const idx = subs.indexOf(sub);
        if (idx !== -1) subs.splice(idx, 1);
      };
    }
    once(event, handler, priority = 0) {
      if (event === "*") {
        const sub2 = {
          handler,
          priority,
          once: true
        };
        this.wildcardListeners.push(sub2);
        this.wildcardListeners.sort((a, b) => b.priority - a.priority);
        return () => {
          const idx = this.wildcardListeners.indexOf(sub2);
          if (idx !== -1) this.wildcardListeners.splice(idx, 1);
        };
      }
      if (!this.listeners.has(event)) this.listeners.set(event, []);
      const subs = this.listeners.get(event);
      const sub = {
        handler,
        priority,
        once: true
      };
      subs.push(sub);
      subs.sort((a, b) => b.priority - a.priority);
      return () => {
        const idx = subs.indexOf(sub);
        if (idx !== -1) subs.splice(idx, 1);
      };
    }
    off(event, handler) {
      if (event === "*") {
        if (!handler) {
          this.wildcardListeners = [];
        } else {
          this.wildcardListeners = this.wildcardListeners.filter(
            (s) => s.handler !== handler
          );
        }
        return;
      }
      if (!handler) {
        this.listeners.delete(event);
        return;
      }
      const subs = this.listeners.get(event);
      if (!subs) return;
      const idx = subs.findIndex((s) => s.handler === handler);
      if (idx !== -1) subs.splice(idx, 1);
    }
    emit(event, payload) {
      const subs = this.listeners.get(event);
      if (subs) {
        const snapshot = [...subs];
        for (const sub of snapshot) {
          sub.handler(payload);
          if (sub.once) {
            const i = subs.indexOf(sub);
            if (i !== -1) subs.splice(i, 1);
          }
        }
      }
      if (this.wildcardListeners.length > 0) {
        const snapshot = [...this.wildcardListeners];
        for (const sub of snapshot) {
          sub.handler(event, payload);
          if (sub.once) {
            const i = this.wildcardListeners.indexOf(sub);
            if (i !== -1) this.wildcardListeners.splice(i, 1);
          }
        }
      }
    }
    getEventNames() {
      const names = new Set(this.listeners.keys());
      if (this.wildcardListeners.length > 0) names.add("*");
      return [...names];
    }
  };
  var instance = null;
  function createEventBus() {
    return new EventBus();
  }
  function getEventBus() {
    if (!instance) instance = new EventBus();
    return instance;
  }
  return __toCommonJS(web_engine_exports);
})();
