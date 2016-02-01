import Marionette from 'backbone.marionette';
import DockTemplate from 'templates/dock.nunj';

export default Marionette.LayoutView.extend({
  template: DockTemplate,

  events: {
    'click .js-menu-button': 'onClickMenuButton'
  },

  onClickMenuButton: function() {
    this.$el.find('.js-dock-container').toggleClass('is-showing');
  }
});