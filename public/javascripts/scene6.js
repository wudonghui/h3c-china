
// scene_6

timelines.scene_6 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 0.5,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_6 .maobi', 1, {
    right: "0%",
  }, {
    right: "23%",
    autoAlpha: true
  })


  .fromTo('#scene_6 .shujian', 1.5, {
    top: "40%",
    scaleX: 0,
    scaleY: 0,
  }, {
    top: "55%",
    scaleX: 1,
    scaleY: 1,
    autoAlpha: true
  }, '-=1.5')

  .fromTo('#scene_6 .maobi', 1, {
    top: "42%",
  }, {
    top: "48%",
  })


  .fromTo('#scene_6 .wenzi', 2, {
    bottom: "45%"
  }, {
    bottom: "40%",
    autoAlpha: true
  })

  .to('#scene_6 .textbottom1', 1, {
    autoAlpha: true
  })

  .to('#scene_6 .textbottom2', 1, {
    autoAlpha: true
  })


  return tl;
};