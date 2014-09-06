
// scene_5

timelines.scene_5 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 0.5,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_5 .texttop', 1, {
    right: "0%",
  }, {
    right: "40%",
    autoAlpha: true
  })

  .fromTo('#scene_5 .circle', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
  })

  .fromTo('#scene_5 .h', 1, {
    top: "0%",
    left: "18%",
  }, {
    autoAlpha: true,
    top: "30%",
    left: "18%",
  }, "-=1")
  .fromTo('#scene_5 .k', 1, {
    top: "30%",
    left: "120%"
  }, {
    autoAlpha: true,
    top: "30%",
    left: "25%",
  }, "-=1")
  .fromTo('#scene_5 .g', 1, {
    top: "50%",
    left: "-20%",
  }, {
    autoAlpha: true,
    top: "37%",
    left: "7%",
  }, "-=1")


  tl.fromTo('#scene_5 .textmiddle', 1, {
    right: "0%",
  }, {
    right: "20%",
    autoAlpha: true
  })

  .fromTo('#scene_5 .rizhi', 1, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  })

  tl.fromTo('#scene_5 .textbottom', 1, {
    left: "0%",
  }, {
    left: "30%",
    autoAlpha: true
  }, "-=0.5")

  return tl;
};
