

// scene_7

timelines.scene_7 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 0.5,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_7 .texttop', 1, {
    left: "0%",
  }, {
    left: "50%",
    autoAlpha: true
  })

  .to('#scene_7 .zhi', 1, {
    autoAlpha: true
  })

  .fromTo('#scene_7 .xin', 1, {
    left: "0%",
  }, {
    left: "35%",
    autoAlpha: true
  }, "-=0.5")

  .to('#scene_7 .circle1', 0.5, {
    autoAlpha: true
  })

  .fromTo('#scene_7 .book1', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    // ease: Bounce.easeOut
  }, "-=0.5")

  .fromTo('#scene_7 .textmiddle', 1, {
    right: "0%",
  }, {
    right: "20%",
    autoAlpha: true
  })


  .to('#scene_7 .circle2', 0.5, {
    autoAlpha: true
  })

  .fromTo('#scene_7 .book2', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    // ease: Bounce.easeOut
  }, "-=0.5")

  .fromTo('#scene_7 .textbottom', 1, {
    right: "0%",
  }, {
    right: "45%",
    autoAlpha: true
  })  


  return tl;
};

