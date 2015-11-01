import Marionette from 'backbone.marionette';
import StageTemplate from 'templates/stage.nunj';

export default Marionette.LayoutView.extend({
    template: StageTemplate,

    initialize: function(options) {
      console.log('init');
    }//,

    // onRender: function() {
    //   console.log('stage onRender');
    //   this.$el.html(StageTemplate.render());
    // }
    // onRender: function() {
    //   this.$el.html(this.template.render());
    // }
})