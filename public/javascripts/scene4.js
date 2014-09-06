
// scene_4
timelines.scene_4 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 0.5,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_4 .mountain', 1, {
    top: '0%'
  }, {
    top: '25%',
    autoAlpha: true,
  })

  .fromTo('#scene_4 .textbottom1', 1, {
    top: '100%'
  }, {
    top: '68%',
    autoAlpha: true,
  })

  .fromTo('#scene_4 .iconleft', 1, {
    top: '0%'
  }, {
    top: '25%',
    autoAlpha: true,
    ease: Bounce.easeOut
  })

  .fromTo('#scene_4 .iconright', 1, {
    top: '0%'
  }, {
    top: '25%',
    autoAlpha: true,
    ease: Bounce.easeOut
  }, "-=0.5")

  .fromTo('#scene_4 .iconmiddle', 1, {
    top: '0%'
  }, {
    top: '25%',
    autoAlpha: true,
    ease: Bounce.easeOut
  }, "-=0.5")


  .to('#scene_4 .textbottom2', 1, {
    autoAlpha: true
  })

 
  return tl;
};
