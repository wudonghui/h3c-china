
// scene_3
timelines.scene_3 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 0.5,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_3 .texttop', 1, {
      top: '0%'
    }, {
      top: '10%',
      autoAlpha: true,
    })
    .fromTo('#scene_3 .textmiddle', 1, {
      right: '0%'
    }, {
      right: '10%',
      autoAlpha: true,
    }, "-=1")

    .to('#scene_3 .korea', 1, {
      autoAlpha: true
    })

  .fromTo('#scene_3 .gs1', 1, {
    scaleX: 0,
    scaleY: 0
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  }, "-=0.5")

  .fromTo('#scene_3 .plane', 3, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
  })

  .to('#scene_3 .plane', 3, {
    bezier: {
      // curviness: 1.25,
      values: [{
        left: "10%",
        top: "0%"
      }, {
        left: "50%",
        top: "10%"
      }, {
        left: "0%",
        top: "40%"
      }, {
        left: "20%",
        top: "50%"
      }]
    },
  }, "-=3")


  .fromTo('#scene_3 .star', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    rotation:270,
  })

  .fromTo('#scene_3 .after', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  }, "-=1")

  .to('#scene_3 .textbottom', 1, {
    autoAlpha: true
  })


  return tl;
};

