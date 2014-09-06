timelines.open = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: function() {
        m.splash = false;
        m.isAnimating = false;
        // m.currentScene = 2;

        if (m.arrowTween.isActive)
          m.arrowTween.resume();
        else
          m.arrowTween.play();
        $('.arrow').show();
      }
  });

  tl.set(".cover", {
      perspective: 800
    })
    .set(".cover", {
      transformStyle: "preserve-3d"
    })
    .set(".coverback", {
      rotationX: -180,
      opacity: 1
    })
    .set([".coverback", ".coverfront"], {
      backfaceVisibility: "hidden"
    })
    .to('#scene_2 .cover', 3, {
      rotationX: 140
    })

  .set('#scene_2 .cover', {
      zIndex: 1
    }, "-=1")
    .set('#scene_2 .letter', {
      zIndex: 2
    }, "-=1")
    .set('#scene_2 .envelop', {
      zIndex: 3
    }, "-=1")
    .set('#scene_2 .letter', {
      opacity: 1
    }, "-=1")
    .to('#scene_2 .letter', 1, {
      top: '0%'
    }, "-=1")
    
    
    .to('#scene_2 .letter', 1.5, {
      width: '100%',
      height: '100%',
      top: '0%',
      left: '0%',
      marginLeft: '0',
    })

    .to(['#scene_2 .envelop', '#scene_2 .envelop_white', '#scene_2 .cover'], 1, {top: '120%'}, "-=2")
    .set(['#scene_2 .envelop', '#scene_2 .envelop_white', '#scene_2 .cover'], {'visibility': 'hidden'})

    .set('#scene_2 .letter', {zIndex: 0})

    // scene 2 animation  
    .fromTo('#scene_2 .texttop', 1, {
      left: '100%'
    }, {
      left: '50%',
      autoAlpha: true,
      // ease: Bounce.easeOut,
    })

    .fromTo('#scene_2 .yun', 1, {
      right: '100%'
    }, {
      right: '50%',
      autoAlpha: true,
      // ease: Bounce.easeOut,
    }, "-=0.5")

    .fromTo('#scene_2 .icon', 1, {
      top: '0%',
    }, {
      top: '40%',
      autoAlpha: true,
      ease: Bounce.easeOut,
    }, "-=0.5")

    .fromTo('#scene_2 .book', 1, {
      scaleX: 0,
      scaleY: 0
    }, {
      autoAlpha: true,
      scaleX: 1,
      scaleY: 1,
      // ease: Bounce.easeOut
    })

    .fromTo('#scene_2 .textbottom', 1, {
      right: '0%',
    }, {
      right: '15%',
      autoAlpha: true,
      // ease: Bounce.easeOut,
    }, "-=0.5");


  return tl;
};

