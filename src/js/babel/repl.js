/**
* Code inspired and taken from https://babeljs.io/scripts/repl.js.
*/

import $ from 'jquery';
import _ from 'underscore';
import CodeMirror from 'codemirror/lib/codemirror';

// babel is provided in an external script tag
export default class BabelREPL {
  constructor($context) {
    // Still have to do this unfortunately.
    this.$context = $context;
    this.$output = $context.find('.js-output');
    this.$consoleReporter = this.$context.find('.js-console');
    this.editor = CodeMirror.fromTextArea($context.find('.js-demo-text')[0], {
      mode: "javascript",
      lineNumbers: true,
      matchBrackets: true,
      tabSize: 2
    });

    // Compile what's already in there.
    this.compile(this.editor.getValue());

    // Attach to change event so we can recompile each time something
    // changes.
    this.editor.on('change', _.debounce(this.handleCodeChange, 500).bind(this));
  }

  handleCodeChange(instance, changeObj) {
    this.compile(instance.getValue());
    console.log('handleCodeChange!', instance.getValue());
  }

  clear() {
    this.$output.text('');
    this.$consoleReporter.empty();
  }

  compile(code) {
    let transformed;

    // Clear out stuff.
    this.clear();

    try {
      transformed = babel.transform(code, {});
      this.evaluate(transformed.code);
    } catch (err) {
      // don't throw it.. just output it
      this.$output.text(err.message);
    }
  }

  evaluate(code) {
    if (typeof this.capturingConsole === 'undefined') {
      // extend console
      this.capturingConsole = Object.create(console);
    }
    let capturingConsole = this.capturingConsole;

    let $consoleReporter = this.$consoleReporter;
    let buffer = [];
    let error;
    let done = false;

    function flush() {
      $consoleReporter.text(buffer.join('\n'));
    }

    function write(data) {
      buffer.push(data);
      if (done) {
        flush();
      }
    }

    capturingConsole.clear = function() {
      buffer = [];
      flush();
    };

    capturingConsole.error = function() {
      error = true;
      capturingConsole.log.apply(capturingConsole, arguments);
    };

    capturingConsole.log =
    capturingConsole.info =
    capturingConsole.debug = function() {
      if (this !== capturingConsole) { return; }

      let args = Array.prototype.slice.call(arguments);
      Function.prototype.apply.call(console.log, console, args);

      let logs = args.reduce(function(logs, log) {
        if (typeof log === 'string') {
          logs.push(log);
        } else if (log instanceof Function) {
          logs.push(log.toString());
        } else {
          logs.push(JSON.stringify(log));
        }
        return logs;
      }, []);

      write(logs.join(' '));
    };

    try {
      // So this is actually running the code we obtained
      // and setting the console used as the capturingConsole
      // we created.
      new Function('console', code)(capturingConsole);
    } catch (err) {
      error = err;
      buffer.push(err.message);
    }

    done = true;
    flush();

    if (error) {
      throw error;
    }
  }
}