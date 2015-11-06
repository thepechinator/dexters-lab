import $ from 'jquery';

// Effects based on GreenSock example code about particles.
// http://codepen.io/GreenSock/pen/zrmiG
export default class Particle {
    constructor() {
      this.concepts = [
        'arrow functions', 'let', 'classes', 'const', 'default parameters',
        'destructuring', 'for of', 'promises', 'map', 'weakmap', 'set', 'weakset',
        'modules', 'rest', 'spread', 'template strings'
      ];
      this.playing = false;
    }

    create() {
      if (!this.playing) {
        this.playing = true;
        this.createEffect();
      }
    }

    destroy() {
      if (this.playing) {
        $('.particle').remove();
        TweenLite.killTweensOf('.particle');
        this.playing = false;
      }
    }

    createEffect() {
        var density = this.concepts.length-1,
            speed = 1,
            winHeight = $(window).height(),
            start = {yMin:winHeight + 50, yMax:winHeight + 50, xMin:100, xMax:200, scaleMin:0.1, scaleMax:0.25, opacityMin:0.2, opacityMax:0.4},
            mid = {yMin:winHeight * 0.3, yMax:winHeight * 0.5, xMin:75, xMax:400, scaleMin:0.2, scaleMax:1, opacityMin:0.4, opacityMax:1},
            end = {yMin:-180, yMax:-180, xMin:20, xMax:700, scaleMin:0.1, scaleMax:1, opacityMin:0.2, opacityMax:0.7},
            colors = ["#fff","#00e6d7","#fb8100","#d68787","#e849e0","#c7e105","#1bd51b","#e1da35",
              "#fff","#00e6d7","#fb8100","#d68787","#e849e0","#c7e105","#1bd51b","#e1da35"];

        function range(map, prop) {
            var min = map[prop + "Min"],
                max = map[prop + "Max"];
            return min + (max - min) * Math.random();
        }

        function spawn(particle) {
            var wholeDuration = (10 / speed) * (0.7 + Math.random() * 0.4),
                delay = wholeDuration * Math.random(),
                partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4);

            //set the starting values
            TweenLite.set(particle, {y:range(start, "y"), x:range(start, "x"), scale:range(start, "scale"), opacity:range(start, "opacity"), visibility:"hidden", color:colors[ Math.floor(Math.random() * colors.length) ]});

            //the y tween should be continuous and smooth the whole duration
            TweenLite.to(particle, wholeDuration, {delay:delay, y:range(end, "y"), ease:Linear.easeNone});

            //now tween the x independently so that it looks more randomized (rather than linking it with scale/opacity changes too)
            TweenLite.to(particle, partialDuration, {delay:delay, x:range(mid, "x"), ease:Power1.easeOut});
            TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration + delay, x:range(end, "x"), ease:Power1.easeIn});

            //now create some random scale and opacity changes
            partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
            TweenLite.to(particle, partialDuration, {delay:delay, scale:range(mid, "scale"), autoAlpha:range(mid, "opacity"), ease:Linear.easeNone});
            TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration + delay, scale:range(end, "scale"), autoAlpha:range(end, "opacity"), ease:Linear.easeNone, onComplete:spawn, onCompleteParams:[particle]});
        }

        var body = $("body"),
            i, particle;
        for (i = 0; i < density; i++) {
            spawn( $("<div />", {id:"particle"+i}).addClass("particle").text( this.concepts[i]).appendTo(body) );
        }
    }
}
