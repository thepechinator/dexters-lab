import TweenMax from 'gsap';

export default class SuperDeck {
  constructor($context) {
    this.$context = $context;
    this.navEngine = $.deck;
    this.animatedExit = false;
    this.animating = false;

    // Tells us what slides have what parent.
    this.slideParentMap = new WeakMap();

    this.$slides = $context.find('.slide');

    this.$slides.each( (index, el) => {
      let $el = $(el);
      this.slideParentMap.set(el, this.findSlideParent($el));
    });

    // This can at least help us with the navigation.
    // Hopefully we can just hook into its events.
    this.navEngine(this.$slides);

    this.setupBasicTransitions();
    this.constructAnimations();
  }

  setupBasicTransitions() {
    $(document).on('deck.change', (event, from, to) => {
      let $toSlide = this.navEngine('getSlide', to);
      let $fromSlide = this.navEngine('getSlide', from);

      // Don't animate if the slides share the same parent.
      if (this.slideParentMap.get($fromSlide[0]) === this.slideParentMap.get($toSlide[0])) {
        return;
      }

      TweenMax.set(this.slideParentMap.get($fromSlide[0]), {clearProps:"right"});
      // from and to are indices
      if (to > from) {
        // moving forward
        TweenMax.from(this.slideParentMap.get($toSlide[0]), 0.5, {css: {right: "-=100%"}})
      } else {
        // moving backward
        TweenMax.from(this.slideParentMap.get($toSlide[0]), 0.5, {css: {right: "+=100%"}})
      }
    });

    // We need to have an exit animation for the slide we're leaving,
    // because I think it looks cooler.
    $(document).on('deck.beforeChange', (event, from, to) => {
      let $fromSlide = this.navEngine('getSlide', from);
      let $toSlide = this.navEngine('getSlide', to);

      if (from == to) {
        event.preventDefault();
        return;
      }

      // Don't animate if the slides share the same parent.
      if (this.slideParentMap.get($fromSlide[0]) === this.slideParentMap.get($toSlide[0])) {
        return;
      }

      if (!this.animatedExit || this.animating) {
        // console.log('animating deck.beforeChange');
        event.preventDefault();

        if (!this.animatedExit) {
          this.animating = true;
          let moveDir = "+=100%";

          // This should be the exact opposite of the incoming slide.
          if (to > from) {
            moveDir = "+=100%";
          } else {
            moveDir = "-=100%";
          }

          $('body').scrollTop(0);
          TweenMax.to(this.slideParentMap.get($fromSlide[0]), 0.5,
            {css: {right: moveDir}, onComplete: () => {
              // console.log('animation complete');
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

  findSlideParent($slide) {
    let $el = $slide;
    while ($el.length) {
      if ($el.hasClass('js-slide-parent')) {
        return $el[0];
      }
      $el = $el.parent();
    }

    return null;
  }

  constructAnimations() {
    // this.animation = new TimelineMax({paused: true});
    //
    // this.animation.play();
  }
}