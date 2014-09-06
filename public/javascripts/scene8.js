
// scene_8

timelines.scene_8 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 0.5,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_8 .genshu', 1.25, {
    bottom: "100%",
  }, {
    bottom: "10%",
    ease: Bounce.easeOut,
    autoAlpha: true
  })


  .fromTo('#scene_8 .ios', 1.25, {
    bottom: "100%",
  }, {
    bottom: "10%",
    ease: Bounce.easeOut,
    autoAlpha: true
  })

  .fromTo('#scene_8 .android', 1.25, {
    bottom: "100%",
  }, {
    bottom: "10%",
    ease: Bounce.easeOut,
    autoAlpha: true
  }, "-=0.5")


  .fromTo('#scene_8 .txt1', 1, {
    left: "0%",
  }, {
    left: "5%",
    autoAlpha: true
  })

  .fromTo('#scene_8 .txt2', 1, {
    left: "100%",
  }, {
    left: "5%",
    autoAlpha: true
  }, "-=1")

  .fromTo('#scene_8 .txt3', 1, {
    left: "0%",
  }, {
    left: "5%",
    autoAlpha: true
  })

  .fromTo('#scene_8 .txt4', 1, {
    left: "100%",
  }, {
    left: "5%",
    autoAlpha: true
  }, "-=1")

  .to('#scene_8 .txt5', 1, {
    autoAlpha: true
  })

  .to('#scene_8 .note', 1, {
    autoAlpha: true
  });


  return tl;
};
