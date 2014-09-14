// scene_5

timelines.scene_5 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    // delay: 0.5,
    paused: true,
    onStart: onStart,
    onComplete: function() {
      onComplete();

      var rpt = new TimelineMax({
        paused: true
      });

      rpt.to('#scene_5 .circle', 1.5, {
        scaleX: 2,
        scaleY: 2,
        repeat: -1,
        // yoyo: true,
        autoAlpha: 0,
        // repeatDelay: 1
      });

      rpt.play();

      m.repeatTween = rpt;


      // $$('#scene_5 .h').tap(function() {
      //   console.log('tap');

      //   TweenMax.to('#scene_5 .h', 2, {
      //     bezier: {
      //       curviness: 1.25,
      //       values: [{
      //         left: "70%",
      //         top: "70%"
      //       }, {
      //         left: "35%",
      //         top: "40%"
      //       },
      //       {
      //         left: "18%",
      //         top: "30%"
      //       }],
      //     },
      //     ease: Power1.easeInOut
      //   });
      // });


    }
  });

  tl.fromTo('#scene_5 .texttop', 1, {
    left: "100%",
  }, {
    left: "50%",
    autoAlpha: true
  })

  .fromTo('#scene_5 .circle', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: 1,
    scaleX: 1,
    scaleY: 1,
  })

  .fromTo('#scene_5 .h', 1, {
      top: "0%",
      left: "18%",
    }, {
      rotation: 720,
      autoAlpha: 1,
      top: "30%",
      left: "18%",
    }, "-=1")
    .fromTo('#scene_5 .k', 1, {
      top: "30%",
      left: "120%"
    }, {
      rotation: 720,
      autoAlpha: true,
      top: "30%",
      left: "25%",
    }, "-=1")
    .fromTo('#scene_5 .g', 1, {
      top: "50%",
      left: "-20%",
    }, {
      rotation: 720,
      autoAlpha: 1,
      top: "37%",
      left: "7%",
    }, "-=1")


  tl.fromTo('#scene_5 .textmiddle', 1, {
    right: "0%",
  }, {
    right: "10%",
    autoAlpha: true
  })

  .fromTo('#scene_5 .rizhi', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: 1,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  })

  tl.fromTo('#scene_5 .textbottom', 1, {
    left: "0%",
  }, {
    left: "20%",
    autoAlpha: true
  }, "-=0.5")

  return tl;
};