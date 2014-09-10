
// scene_8

timelines.scene_8 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: function(){
      onComplete();

      var rpt = new TimelineMax({paused: true, repeat: -1,
        yoyo: true, repeatDelay: 2});

      rpt.to('#scene_8 .ios', 1, {
        rotationY: 720,
        ease: Power2.easeInOut,
      });

      rpt.to('#scene_8 .android', 1, {
        rotationY: 720,
        ease: Power2.easeInOut,
      }, "-=1.5");

      rpt.play();

      m.repeatTween = rpt;

    }
  });

  tl.fromTo('#scene_8 .genshu', 1.2, {
    bottom: "15%",
    scaleX: 0,
    scaleY: 0,
  }, {
    bottom: "10%",
    scaleX: 1,
    scaleY: 1,
    ease: Power2.easeInOut,
    autoAlpha: 1
  })


  .fromTo('#scene_8 .ios', 1.5, {
    rotationY: 90
  }, {
    rotationY: 1080,
    ease: Power2.easeInOut,
    autoAlpha: 1
  })

  .fromTo('#scene_8 .android', 1.5, {
    rotationY: 90
  }, {
    rotationY: 1080,
    ease: Power2.easeInOut,
    autoAlpha: 1
  }, "-=1")


  .fromTo('#scene_8 .txt1', 1, {
    left: "0%",
  }, {
    left: "5%",
    autoAlpha: 1
  })

  .fromTo('#scene_8 .txt2', 1, {
    left: "100%",
  }, {
    left: "5%",
    autoAlpha: 1
  }, "-=1")

  .fromTo('#scene_8 .txt3', 1, {
    left: "0%",
  }, {
    left: "5%",
    autoAlpha: 1
  })

  .fromTo('#scene_8 .txt4', 1, {
    left: "100%",
  }, {
    left: "5%",
    autoAlpha: 1
  }, "-=1")

  .to('#scene_8 .txt5', 1, {
    autoAlpha: 1
  })

  .to('#scene_8 .note', 1, {
    autoAlpha: 1
  });


  return tl;
};
