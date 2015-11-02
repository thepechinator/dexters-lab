import TweenMax from 'gsap';

export default class SuperDeck {
  constructor($context) {
    this.$context = $context;
    this.navEngine = $.deck;
    this.animatedExit = false;
    this.animating = false;

    this.$slides = $context.find('.slide');

    // This can at least help us with the navigation.
    // Hopefully we can just hook into its events.
    this.navEngine(this.$slides);

    this.setupEventListeners();
    this.constructAnimations();
  }

  setupEventListeners() {
    $(document).on('deck.change', (event, from, to) => {
      let $toSlide = this.navEngine('getSlide', to);
      let $fromSlide = this.navEngine('getSlide', from);

      TweenMax.set($fromSlide, {clearProps:"right"});
      // from and to are indices
      console.log($toSlide);
      if (to > from) {
        // moving forward
        TweenMax.from($toSlide, 0.5, {css: {right: "-=100%"}})
      } else {
        // moving backward
        console.log('moving backward');
        TweenMax.from($toSlide, 0.5, {css: {right: "+=100%"}})
      }
    });

    // We need to have an exit animation for the slide we're leaving,
    // because I think it looks cooler.
    $(document).on('deck.beforeChange', (event, from, to) => {
      if (from == to) {
        event.preventDefault();
        return;
      }

      if (!this.animatedExit || this.animating) {
        console.log('animating deck.beforeChange');
        event.preventDefault();

        if (!this.animatedExit) {
          this.animating = true;
          let $fromSlide = this.navEngine('getSlide', from);
          let moveDir = "+=100%";

          // This should be the exact opposite of the incoming slide.
          if (to > from) {
            moveDir = "+=100%";
          } else {
            moveDir = "-=100%";
          }

          TweenMax.to($fromSlide, 0.5,
            {css: {right: moveDir}, onComplete: () => {
              console.log('animation complete');
              this.animatedExit = true;
              this.animating = false;
              this.navEngine('go', to);
            }
          });
        }
      } else if (this.animatedExit) {
        this.animatedExit = false;
      }

    });
  }

  constructAnimations() {
    // this.animation = new TimelineMax({paused: true});
    //
    // this.animation.play();
  }
}