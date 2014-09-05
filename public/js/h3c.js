// after page is fully loaded, include images, css, js files

// model
var m = {
  currentScene: 2,
  numberOfScenes: 8,
  isTransition: false,
  isAnimating: false,
  arrowTween: null,
  envelopArrowTween:null,
  currentTimeline: null,

  splash: true // on splash page
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
  $('#viewport').trigger('playScene', 'scene_2');


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
  var tl = timelines[scene](
    // on start
    function() {
      m.isAnimating = true;
    },
    // on complete
    function() {
      m.isAnimating = false;
      if (m.arrowTween.isActive)
        m.arrowTween.resume();
      else
        m.arrowTween.play();
      if(m.currentScene < m.numberOfScenes)
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

  // open evelop
  if(m.splash) {

    // console.log('running splash');
    if (m.envelopArrowTween.isActive){
          m.envelopArrowTween.pause();
          $('.enveloparrow').hide();
    }

    var tl = timelines['open'](
    // on start
    function() {
      m.isAnimating = true;
    },
      // on complete
      function() {
        m.isAnimating = false;
        if (m.arrowTween.isActive)
          m.arrowTween.resume();
        else
          m.arrowTween.play();
        $('.arrow').show();
      });
    tl.play();

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


  tl.to(scene, 1.25, {
      top: "-100%",
      ease: Power1.easeOut,
    }).set(comingScene, {
      'visibility': 'visible'
    }, "-=1.25")
    .from(comingScene, 1.25, {
      top: "100%",
      ease: Power1.easeOut,
    }, "-=1.25");

  tl.play();

  m.currentScene += 1;
};



// define timelines
var timelines = {};

// scene_1
timelines.scene_2 = function(onStart, onComplete) {

  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: function(){
      m.isAnimating = false;

      // play the envelop arrow
      var tlm = new TimelineMax({
        paused: true,
      });

      tlm.to('.enveloparrow', 1, {
        top: "19%",
        autoAlpha: true,
        repeat: -1,
        yoyo: true
      });

      m.envelopArrowTween = tlm;

      tlm.play();
    }
  });

  tl.to('#scene_2 .coverfront', 2, {
      autoAlpha: true,
      ease: Power1.easeIn,
    })
    .to('#scene_2 .envelop', 2, {
      autoAlpha: true,
      ease: Power1.easeIn,
    }, "-=1.5")
    .set('#scene_2 .envelop_white', {
      opacity: 1
    })

  return tl;
};



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




// scene_2
// timelines.scene_2 = function(onStart, onComplete) {
//   var tl = new TimelineMax({
//     delay: 0.5,
//     paused: true,
//     onStart: onStart,
//     onComplete: onComplete
//   });

//   tl.fromTo('#scene_2 .texttop', 1, {
//     left: '100%'
//   }, {
//     left: '50%',
//     autoAlpha: true,
//     // ease: Bounce.easeOut,
//   })

//   .fromTo('#scene_2 .yun', 1, {
//     right: '100%'
//   }, {
//     right: '50%',
//     autoAlpha: true,
//     // ease: Bounce.easeOut,
//   }, "-=0.5")

//   .fromTo('#scene_2 .icon', 1, {
//     top: '0%',
//   }, {
//     top: '40%',
//     autoAlpha: true,
//     ease: Bounce.easeOut,
//   }, "-=0.5")

//   .fromTo('#scene_2 .book', 1, {
//     scaleX: 0,
//     scaleY: 0
//   }, {
//     autoAlpha: true,
//     scaleX: 1,
//     scaleY: 1,
//     // ease: Bounce.easeOut
//   })

//   .fromTo('#scene_2 .textbottom', 1, {
//     right: '0%',
//   }, {
//     right: '15%',
//     autoAlpha: true,
//     // ease: Bounce.easeOut,
//   }, "-=0.5");

//   return tl;
// };






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
      // ease: Bounce.easeOut,
    })
    .fromTo('#scene_3 .textmiddle', 1, {
      right: '0%'
    }, {
      right: '20%',
      autoAlpha: true,
      // ease: Bounce.easeOut,
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
    bottom: '0%'
  }, {
    bottom: '20%',
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
    right: "25%",
    autoAlpha: true
  })

  .fromTo('#scene_6 .shujian', 1, {
    left: "0%",
  }, {
    left: "50%",
    autoAlpha: true
  }, '-=1.5')

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
    left: "45%",
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
    right: "50%",
    autoAlpha: true
  })  


  return tl;
};






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
  });


  return tl;
};


