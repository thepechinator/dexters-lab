// third party stuff
// import 'vendors';
//
// Third party stuff.
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/vibrant-ink.css';
import $ from 'jquery';
// import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'backbone.marionette';

// Our stuff
import 'sass/main.scss';
import BabelREPL from 'babel/repl';
import Stage from 'views/stage';
import SuperDeck from './views/super-deck';

// Need to override this to make it work with templates.
Backbone.Marionette.Renderer.render = function( template, data ) {
  return template.render( data );
};

let stage = new Stage({el: $('.js-stage')});
stage.render();

// A good case for the weakmap, since we need to keep track of
// what component holds. Alternatives would be to somehow
// keep track of these relationships some other way, maybe
// with some data-id or an array you need to loop through.
let weakmap = new WeakMap();
$('.js-example').each(function(index, el) {
  let repl = new BabelREPL($(el));

  // Assigning the jquery object won't work. You need to actually
  // access the index.
  weakmap.set($(this).find('.tabs')[0], repl);
});

// Initialize foundation stuff
$(document).foundation();

// Need to keep track of this, so we can refresh the editor since
// it and tabs don't exactly agree with each other without some help.
$('.tabs').on('toggled', function (event, tab) {
  // Need to check if the key exists in the weakmap, since
  // we have the other tabs on the right to account for
  if (weakmap.has($(tab).parent()[0])) {
    weakmap.get($(tab).parent()[0]).refresh();
  }
});

// Finally, create our deck which has some decent animations.
new SuperDeck($('.slides'));