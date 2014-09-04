// after page is fully loaded, include images, css, js files

// model
var m = {
  currentScene: 1,
  numberOfScenes: 7,
  isTransition: false,
  isAnimating: false,
  arrowTween: null,
  currentTimeline: null
};

$(document).ready(function() {
  // init jquery plugins
  // no bounce on ios browsers
  $.nonbounce();
});



window.onload = function() {

  $('.scene.hidden').css('visibility', 'hidden');

  // register swipe event
  $$('#viewport').swipeUp(swipeUp);

  // register playScene event
  $('#viewport').on('playScene', playScene);

  // init the first scene
  $('#viewport').trigger('playScene', 'scene_1');



  var tl = new TimelineMax({
    paused: true,
  });

  tl.to('.arrow', 1, {
    bottom: "15px",
    opacity: 1,
    repeat: -1,
    yoyo: true
  });

  m.arrowTween = tl;

};

function playScene(event, scene) {
  // console.log('play scene', event, scene);
  var tl = timelines[scene](function() {
      m.isAnimating = true;
    },
    function() {
      m.isAnimating = false;
      if (m.arrowTween.isActive)
        m.arrowTween.resume();
      else
        m.arrowTween.play();
      $('.arrow').show();
    });
  tl.play();
};

function swipeUp(event) {
  // do nothing if currentScene is the last scene
  if (m.isTransition || m.isAnimating) {
    // console.log('transition or animation is running...');
    return false;
  }

  if (m.currentScene == m.numberOfScenes) {
    // console.log('scene reachs last page');
    return false;
  }

  // console.log('transit from ', m.currentScene, ' to ', m.currentScene + 1);

  var scene = '#scene_' + (m.currentScene);
  var comingScene = '#scene_' + (m.currentScene + 1);

  // setup timeline
  var tl = new TimelineLite({
    paused: true,
    onStart: function() {
      m.isTransition = true;
      if (m.arrowTween.isActive)
        m.arrowTween.pause();
      $('.arrow').hide();
    },
    onComplete: function() {
      m.isTransition = false;
      $('#scene_' + (m.currentScene - 1)).css('visibility', 'hidden');
      $('#viewport').trigger('playScene', 'scene_' + m.currentScene);
    }
  });

  // tl.add(TweenMax.to(scene, 1, {
  //   top: "-100%",
  // }), 'swipeUp');

  // tl.add(TweenLite.from(comingScene, 1, {
  //   top: "100%",
  // }), 'swipeUp');

  // tl.play('swipeUp');

  tl.to(scene, 1.5, {
      top: "-100%",
      // ease: Power1.easeIn,
    }).set(comingScene, {
      'visibility': 'visible'
    }, "-=1.5")
    .from(comingScene, 1.5, {
      top: "100%",
      // ease: Power1.easeIn,
    }, "-=1.5");

  tl.play();

  m.currentScene += 1;
};



// define timelines
var timelines = {};

// scene_1
timelines.scene_1 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 1,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.to('#scene_1 .coverfront', 2, {
      autoAlpha: true,
      ease: Power1.easeIn,
    })
    .to('#scene_1 .envelop', 2, {
      autoAlpha: true,
      ease: Power1.easeIn,
    }, "-=1.5")
    .set('#scene_1 .envelop_white', {
      opacity: 1
    })

  .set(".cover", {
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
    .to('#scene_1 .cover', 3, {
      rotationX: 140
    })

  .set('#scene_1 .cover', {
      zIndex: 1
    }, "-=1")
    .set('#scene_1 .letter', {
      zIndex: 2
    }, "-=1")
    .set('#scene_1 .envelop', {
      zIndex: 3
    }, "-=1")
    .set('#scene_1 .letter', {
      opacity: 1
    }, "-=1")
    .to('#scene_1 .letter', 1.5, {
      top: '0%'
    }, "-=1")
    // .to(['#scene_1 .envelop', '#scene_1 .cover'], 2, {top: '20%'}, "-=2");

  return tl;
};



// scene_2
timelines.scene_2 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    delay: 1,
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_2 .texttop', 1.5, {
    left: '100%'
  }, {
    left: '50%',
    autoAlpha: true,
    // ease: Bounce.easeOut,
  })

  .fromTo('#scene_2 .yun', 1.5, {
    right: '100%'
  }, {
    right: '50%',
    autoAlpha: true,
    // ease: Bounce.easeOut,
  })

  .fromTo('#scene_2 .icon', 1.5, {
    top: '0%',
  }, {
    top: '40%',
    autoAlpha: true,
    ease: Bounce.easeOut,
  })

  .fromTo('#scene_2 .book', 1, {
    scaleX: 0,
    scaleY: 0
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    // ease: Bounce.easeOut
  })

  .fromTo('#scene_2 .textbottom', 1.5, {
    right: '0%',
  }, {
    right: '15%',
    autoAlpha: true,
    // ease: Bounce.easeOut,
  });

  return tl;
};






// scene_3
timelines.scene_3 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_3 .texttop', 1.5, {
      top: '0%'
    }, {
      top: '10%',
      autoAlpha: true,
      // ease: Bounce.easeOut,
    })
    .fromTo('#scene_3 .textmiddle', 1.5, {
      right: '0%'
    }, {
      right: '20%',
      autoAlpha: true,
      // ease: Bounce.easeOut,
    })
    .to('#scene_3 .korea', 1, {
      autoAlpha: true
    })

  .fromTo('#scene_3 .gs1', 1.5, {
    scaleX: 0,
    scaleY: 0
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  })

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

  },

    "-=3"
  )


  .fromTo('#scene_3 .after', 1.5, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  })

  .to('#scene_3 .textbottom', 1, {
    autoAlpha: true
  })


  return tl;
};






// scene_4
timelines.scene_4 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_4 .mountain', 1.5, {
    top: '0%'
  }, {
    top: '25%',
    autoAlpha: true,
  })

  .fromTo('#scene_4 .textbottom1', 1.5, {
    bottom: '0%'
  }, {
    bottom: '20%',
    autoAlpha: true,
  })

  .fromTo('#scene_4 .iconleft', 1.5, {
    top: '0%'
  }, {
    top: '10%',
    autoAlpha: true,
    ease: Bounce.easeOut
  })

  .fromTo('#scene_4 .iconright', 1.5, {
    top: '0%'
  }, {
    top: '20%',
    autoAlpha: true,
    ease: Bounce.easeOut
  }, "-=0.5")

  .fromTo('#scene_4 .iconmiddle', 1.5, {
    top: '0%'
  }, {
    top: '15%',
    autoAlpha: true,
    ease: Bounce.easeOut
  }, "-=0.5")


  .to('#scene_4 .textbottom2', 1, {
    autoAlpha: true
  })

 
  return tl;
};



// scene_5

timelines.scene_5 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_5 .texttop', 1.5, {
    right: "0%",
  }, {
    right: "40%",
    autoAlpha: true
  })

  .fromTo('#scene_5 .circle', 1.5, {
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


  tl.fromTo('#scene_5 .textmiddle', 1.5, {
    right: "0%",
  }, {
    right: "20%",
    autoAlpha: true
  })

  .fromTo('#scene_5 .rizhi', 1.5, {
    scaleX: 0,
    scaleY: 0,
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  })

  tl.fromTo('#scene_5 .textbottom', 1.5, {
    left: "0%",
  }, {
    left: "30%",
    autoAlpha: true
  })

  return tl;
};