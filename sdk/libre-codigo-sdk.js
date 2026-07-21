/**
 * Libre Código Plugin SDK v0.1.0-alpha
 * Real plugin API for extending Libre Código IDE
 *
 * Usage:
 *   <script src="libre-codigo-sdk.js"></script>
 *   const sdk = LibreCodigo.init({ pluginId: 'my-plugin', version: '1.0.0' });
 *
 * GitHub: https://github.com/LibreCodigo/LibreCodigo
 * License: MIT
 */
(function (global) {
  'use strict';

  const VERSION = '0.1.0-alpha';

  // ─── Internal State ───────────────────────────────────────────────
  const _commands = new Map();
  const _panels = new Map();
  const _blocks = [];
  const _themes = new Map();
  const _events = {};
  const _notifications = [];
  const _config = {};
  let _host = null;
  let _pluginId = '';
  let _initialized = false;

  // ─── Host Bridge ──────────────────────────────────────────────────
  // The IDE injects a host object that the SDK calls into.
  // Without a host (e.g. standalone usage), methods return safe defaults.

  function _callHost(method) {
    const args = Array.prototype.slice.call(arguments, 1);
    if (_host && typeof _host[method] === 'function') {
      return _host[method].apply(_host, args);
    }
    return null;
  }

  function _callHostAsync(method) {
    const args = Array.prototype.slice.call(arguments, 1);
    return new Promise(function (resolve) {
      if (_host && typeof _host[method] === 'function') {
        var result = _host[method].apply(_host, args);
        if (result && typeof result.then === 'function') {
          result.then(resolve);
        } else {
          resolve(result);
        }
      } else {
        resolve(null);
      }
    });
  }

  // ─── Event Emitter ────────────────────────────────────────────────

  function _on(event, handler, priority) {
    if (!_events[event]) _events[event] = [];
    _events[event].push({ handler: handler, priority: priority || 0 });
    _events[event].sort(function (a, b) { return b.priority - a.priority; });
    return function off() { _off(event, handler); };
  }

  function _once(event, handler, priority) {
    var unsub = _on(event, function () {
      unsub();
      handler.apply(null, arguments);
    }, priority);
    return unsub;
  }

  function _off(event, handler) {
    if (!event) {
      Object.keys(_events).forEach(function (k) { delete _events[k]; });
      return;
    }
    if (!handler) { delete _events[event]; return; }
    if (!_events[event]) return;
    _events[event] = _events[event].filter(function (e) { return e.handler !== handler; });
  }

  function _emit(event, data) {
    if (_events[event]) {
      _events[event].forEach(function (e) {
        try { e.handler(data); } catch (err) { console.error('[SDK] Event error:', err); }
      });
    }
    if (_events['*']) {
      _events['*'].forEach(function (e) {
        try { e.handler({ event: event, data: data }); } catch (err) { console.error('[SDK] Wildcard error:', err); }
      });
    }
  }

  // ─── Validation Helpers ───────────────────────────────────────────

  function _validateId(id, type) {
    if (!id || typeof id !== 'string') {
      throw new Error('[SDK] ' + type + ' requires a string id');
    }
    if (!/^[a-z0-9._-]+$/i.test(id)) {
      throw new Error('[SDK] ' + type + ' id must contain only alphanumeric, dots, hyphens, or underscores');
    }
  }

  function _validateRequired(obj, fields, type) {
    fields.forEach(function (f) {
      if (obj[f] === undefined || obj[f] === null) {
        throw new Error('[SDK] ' + type + ' missing required field: ' + f);
      }
    });
  }

  // ─── Commands ─────────────────────────────────────────────────────

  function registerCommand(id, options) {
    _validateId(id, 'Command');
    _validateRequired(options || {}, ['label'], 'Command');
    if (_commands.has(id)) {
      console.warn('[SDK] Overwriting command: ' + id);
    }
    var cmd = {
      id: id,
      label: options.label,
      description: options.description || '',
      category: options.category || 'General',
      shortcut: options.shortcut || null,
      icon: options.icon || null,
      enabled: options.enabled !== false,
      callback: options.callback || function () {},
    };
    _commands.set(id, cmd);
    _callHost('registerCommand', cmd);
    _emit('command-register', cmd);
    return cmd;
  }

  function unregisterCommand(id) {
    if (_commands.has(id)) {
      _commands.delete(id);
      _callHost('unregisterCommand', id);
      _emit('command-unregister', { id: id });
    }
  }

  function executeCommand(id) {
    var cmd = _commands.get(id);
    if (!cmd) {
      console.warn('[SDK] Command not found: ' + id);
      return false;
    }
    if (!cmd.enabled) {
      console.warn('[SDK] Command disabled: ' + id);
      return false;
    }
    try {
      cmd.callback();
      _emit('command-execute', { id: id });
      return true;
    } catch (err) {
      console.error('[SDK] Command error:', err);
      _emit('error', { message: 'Command ' + id + ': ' + err.message, source: 'sdk' });
      return false;
    }
  }

  function getCommands() {
    return Array.from(_commands.values());
  }

  function getCommand(id) {
    return _commands.get(id) || null;
  }

  function setCommandEnabled(id, enabled) {
    var cmd = _commands.get(id);
    if (cmd) {
      cmd.enabled = !!enabled;
      _callHost('updateCommand', cmd);
    }
  }

  // ─── Panels ───────────────────────────────────────────────────────

  function registerPanel(id, options) {
    _validateId(id, 'Panel');
    _validateRequired(options || {}, ['title'], 'Panel');
    if (_panels.has(id)) {
      console.warn('[SDK] Overwriting panel: ' + id);
    }
    var panel = {
      id: id,
      title: options.title,
      icon: options.icon || 'panel',
      description: options.description || '',
      position: options.position || 'sidebar',
      render: options.render || function (container) {
        container.innerHTML = '<p style="padding:16px;color:#888">Panel content not implemented</p>';
      },
      destroy: options.destroy || null,
    };
    _panels.set(id, panel);
    _callHost('registerPanel', panel);
    _emit('panel-register', panel);
    return panel;
  }

  function unregisterPanel(id) {
    var panel = _panels.get(id);
    if (panel) {
      if (panel.destroy) {
        try { panel.destroy(); } catch (e) { /* ignore */ }
      }
      _panels.delete(id);
      _callHost('unregisterPanel', id);
      _emit('panel-unregister', { id: id });
    }
  }

  function getPanels() {
    return Array.from(_panels.values());
  }

  function showPanel(id) {
    var panel = _panels.get(id);
    if (panel) {
      _callHost('showPanel', id);
      _emit('panel-show', { id: id });
    }
  }

  // ─── Blocks ───────────────────────────────────────────────────────

  function registerBlock(definition) {
    _validateRequired(definition || {}, ['id', 'label', 'category', 'shape'], 'Block');
    _validateId(definition.id, 'Block');

    var block = {
      id: definition.id,
      label: definition.label,
      category: definition.category || 'custom',
      description: definition.description || '',
      color: definition.color || '#C96B4B',
      shape: definition.shape || 'stack',
      ports: (definition.ports || []).map(function (p) {
        return {
          id: p.id,
          label: p.label || p.id,
          type: p.type || 'any',
          direction: p.direction || 'input',
        };
      }),
      toCode: definition.toCode || function () { return ''; },
      fromCode: definition.fromCode || null,
      icon: definition.icon || null,
    };

    _blocks.push(block);
    _callHost('registerBlock', block);
    _emit('block-register', block);
    return block;
  }

  function unregisterBlock(id) {
    var idx = _blocks.findIndex(function (b) { return b.id === id; });
    if (idx >= 0) {
      _blocks.splice(idx, 1);
      _callHost('unregisterBlock', id);
      _emit('block-unregister', { id: id });
    }
  }

  function getBlocks() {
    return _blocks.slice();
  }

  function getBlocksByCategory(category) {
    return _blocks.filter(function (b) { return b.category === category; });
  }

  function getBlock(id) {
    return _blocks.find(function (b) { return b.id === id }) || null;
  }

  function searchBlocks(query) {
    if (!query) return _blocks.slice();
    var q = query.toLowerCase();
    return _blocks.filter(function (b) {
      return b.label.toLowerCase().indexOf(q) >= 0 ||
             b.id.toLowerCase().indexOf(q) >= 0 ||
             b.description.toLowerCase().indexOf(q) >= 0;
    });
  }

  // ─── Themes ───────────────────────────────────────────────────────

  function registerTheme(name, theme) {
    if (!name || !theme) {
      throw new Error('[SDK] Theme requires name and definition');
    }
    _themes.set(name, theme);
    _callHost('registerTheme', { name: name, theme: theme });
    _emit('theme-register', { name: name });
  }

  function getTheme(name) {
    return _themes.get(name) || null;
  }

  function getThemes() {
    return Array.from(_themes.entries()).map(function (e) {
      return { name: e[0], theme: e[1] };
    });
  }

  // ─── Filesystem ───────────────────────────────────────────────────

  function readFile(path) {
    return _callHostAsync('readFile', path);
  }

  function writeFile(path, content) {
    return _callHostAsync('writeFile', path, content);
  }

  function createFile(path, content) {
    return _callHostAsync('createFile', path, content || '');
  }

  function deleteFile(path) {
    return _callHostAsync('deleteFile', path);
  }

  function renameFile(oldPath, newPath) {
    return _callHostAsync('renameFile', oldPath, newPath);
  }

  function listFiles(dirPath) {
    return _callHostAsync('listFiles', dirPath);
  }

  function pathExists(path) {
    return _callHostAsync('pathExists', path);
  }

  function createDirectory(path) {
    return _callHostAsync('createDirectory', path);
  }

  // ─── Editor ───────────────────────────────────────────────────────

  function getEditor() {
    return _callHost('getEditor');
  }

  function getActiveFile() {
    return _callHost('getActiveFile');
  }

  function openFile(path) {
    _callHost('openFile', path);
    _emit('file-open', { path: path });
  }

  function closeFile(path) {
    _callHost('closeFile', path);
    _emit('file-close', { path: path });
  }

  function insertText(text) {
    var editor = getEditor();
    if (editor) {
      var selection = editor.getSelection();
      var id = { major: 1, minor: 1 };
      var op = { identifier: id, range: selection, text: text, forceMoveMarkers: true };
      editor.executeEdits('sdk', [op]);
    }
  }

  function getSelectedText() {
    var editor = getEditor();
    if (editor) {
      var selection = editor.getSelection();
      return editor.getModel().getValueInRange(selection);
    }
    return '';
  }

  function replaceSelectedText(text) {
    var editor = getEditor();
    if (editor) {
      var selection = editor.getSelection();
      var id = { major: 1, minor: 1 };
      var op = { identifier: id, range: selection, text: text, forceMoveMarkers: true };
      editor.executeEdits('sdk', [op]);
    }
  }

  function setLanguage(lang) {
    _callHost('setLanguage', lang);
    _emit('language-change', { language: lang });
  }

  function getLanguage() {
    return _callHost('getLanguage') || 'plaintext';
  }

  // ─── Notifications ────────────────────────────────────────────────

  function showNotification(message, type, duration) {
    var notif = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      message: message,
      type: type || 'info',
      duration: duration || 4000,
      timestamp: new Date().toISOString(),
    };
    _notifications.push(notif);
    if (_notifications.length > 100) _notifications.shift();
    _callHost('showNotification', notif);
    _emit('notification', notif);
    return notif.id;
  }

  function getNotifications() {
    return _notifications.slice();
  }

  // ─── Dialogs ──────────────────────────────────────────────────────

  function showInputBox(options) {
    options = options || {};
    return _callHostAsync('showInputBox', {
      title: options.title || 'Input',
      prompt: options.prompt || '',
      defaultValue: options.defaultValue || '',
      placeHolder: options.placeHolder || '',
      validate: options.validate || null,
    });
  }

  function showQuickPick(items, options) {
    options = options || {};
    return _callHostAsync('showQuickPick', {
      items: items,
      title: options.title || 'Select',
      placeHolder: options.placeHolder || '',
      multiSelect: options.multiSelect || false,
    });
  }

  function showConfirm(message, title) {
    return _callHostAsync('showConfirm', {
      message: message,
      title: title || 'Confirm',
    });
  }

  // ─── Configuration ────────────────────────────────────────────────

  function getConfig(key, defaultValue) {
    if (_config[key] !== undefined) return _config[key];
    return defaultValue !== undefined ? defaultValue : null;
  }

  function setConfig(key, value) {
    _config[key] = value;
    _callHost('setConfig', key, value);
    _emit('config-change', { key: key, value: value });
  }

  function getAllConfig() {
    return Object.assign({}, _config);
  }

  // ─── Terminal ─────────────────────────────────────────────────────

  function writeToTerminal(text) {
    _callHost('writeToTerminal', text);
  }

  function executeInTerminal(command) {
    _callHost('executeInTerminal', command);
  }

  function clearTerminal() {
    _callHost('clearTerminal');
  }

  // ─── Utility ──────────────────────────────────────────────────────

  function generateId(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
  }

  function debounce(fn, ms) {
    var timer;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  }

  function throttle(fn, ms) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= ms) {
        last = now;
        fn.apply(this, arguments);
      }
    };
  }

  // ─── Manifest Loading ─────────────────────────────────────────────

  function loadManifest(manifest) {
    _validateRequired(manifest, ['name', 'version'], 'Manifest');
    _pluginId = manifest.name;
    setConfig('manifest', manifest);

    // Auto-register commands from manifest
    if (manifest.contributes && manifest.contributes.commands) {
      manifest.contributes.commands.forEach(function (cmd) {
        registerCommand(cmd.id || manifest.name + '.' + cmd.label.toLowerCase().replace(/\s+/g, '-'), {
          label: cmd.label,
          category: cmd.category || manifest.name,
          shortcut: cmd.shortcut,
        });
      });
    }

    // Auto-register panels from manifest
    if (manifest.contributes && manifest.contributes.panels) {
      manifest.contributes.panels.forEach(function (p) {
        registerPanel(manifest.name + '.' + p.id, {
          title: p.title,
          icon: p.icon,
        });
      });
    }

    _emit('plugin-load', { manifest: manifest });
    return manifest;
  }

  // ─── Plugin Lifecycle ─────────────────────────────────────────────

  function activate() {
    if (_initialized) return;
    _initialized = true;
    _emit('plugin-activate', { pluginId: _pluginId });
    return {
      pluginId: _pluginId,
      commands: getCommands(),
      panels: getPanels(),
      blocks: getBlocks(),
    };
  }

  function deactivate() {
    _emit('plugin-deactivate', { pluginId: _pluginId });
    _commands.clear();
    _panels.clear();
    _blocks.length = 0;
    _themes.clear();
    _off();
    _initialized = false;
    _callHost('deactivatePlugin', _pluginId);
  }

  // ─── Public API ───────────────────────────────────────────────────

  var SDK = {
    version: VERSION,

    // Lifecycle
    init: function (options) {
      options = options || {};
      _pluginId = options.pluginId || 'unknown-plugin';
      _host = options.host || (typeof window !== 'undefined' && window.__libreCodigoHost) || null;
      if (options.manifest) loadManifest(options.manifest);
      return SDK;
    },
    activate: activate,
    deactivate: deactivate,

    // Commands
    registerCommand: registerCommand,
    unregisterCommand: unregisterCommand,
    executeCommand: executeCommand,
    getCommands: getCommands,
    getCommand: getCommand,
    setCommandEnabled: setCommandEnabled,

    // Panels
    registerPanel: registerPanel,
    unregisterPanel: unregisterPanel,
    getPanels: getPanels,
    showPanel: showPanel,

    // Blocks
    registerBlock: registerBlock,
    unregisterBlock: unregisterBlock,
    getBlocks: getBlocks,
    getBlock: getBlock,
    getBlocksByCategory: getBlocksByCategory,
    searchBlocks: searchBlocks,

    // Themes
    registerTheme: registerTheme,
    getTheme: getTheme,
    getThemes: getThemes,

    // Events
    on: _on,
    once: _once,
    off: _off,

    // Filesystem
    readFile: readFile,
    writeFile: writeFile,
    createFile: createFile,
    deleteFile: deleteFile,
    renameFile: renameFile,
    listFiles: listFiles,
    pathExists: pathExists,
    createDirectory: createDirectory,

    // Editor
    getEditor: getEditor,
    getActiveFile: getActiveFile,
    openFile: openFile,
    closeFile: closeFile,
    insertText: insertText,
    getSelectedText: getSelectedText,
    replaceSelectedText: replaceSelectedText,
    setLanguage: setLanguage,
    getLanguage: getLanguage,

    // Notifications
    showNotification: showNotification,
    getNotifications: getNotifications,

    // Dialogs
    showInputBox: showInputBox,
    showQuickPick: showQuickPick,
    showConfirm: showConfirm,

    // Configuration
    getConfig: getConfig,
    setConfig: setConfig,
    getAllConfig: getAllConfig,

    // Terminal
    writeToTerminal: writeToTerminal,
    executeInTerminal: executeInTerminal,
    clearTerminal: clearTerminal,

    // Manifest
    loadManifest: loadManifest,

    // Utilities
    generateId: generateId,
    debounce: debounce,
    throttle: throttle,
  };

  global.LibreCodigo = SDK;

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
