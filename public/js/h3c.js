// after page is fully loaded, include images, css, js files

// model
var m = {
  currentScene: 1,
  numberOfScenes: 3,
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

  // register swipe event
  $$('#viewport').swipeUp(swipeUp);

  // register playScene event
  $('#viewport').on('playScene', playScene);

  // init the first scene
  $('#viewport').trigger('playScene', 'scene_1');

  m.arrowTween = TweenMax.to('.arrow', 1, {
    bottom: "15px",
    opacity: 1,
    repeat: -1,
    yoyo: true
  });

};

function playScene(event, scene) {
  // console.log('play scene', event, scene);
  var tl = timelines[scene](function() {
      m.isAnimating = true;
    },
    function() {
      m.isAnimating = false;
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

  console.log('transit from ', m.currentScene, ' to ', m.currentScene + 1);

  var scene = '#scene_' + (m.currentScene);
  var comingScene = '#scene_' + (m.currentScene + 1);

  // setup timeline
  var tl = new TimelineLite({
    paused: true,
    onStart: function() {
      m.isTransition = true;
    },
    onComplete: function() {
      m.isTransition = false;
      $('#viewport').trigger('playScene', 'scene_' + m.currentScene);
    }
  });

  tl.add(TweenMax.to(scene, 1, {
    top: "-100%",
  }), 'swipeUp');

  tl.add(TweenLite.from(comingScene, 1, {
    top: "100%",
  }), 'swipeUp');

  tl.play('swipeUp');
  m.currentScene += 1;
};



// define timelines
var timelines = {};

// scene_1
timelines.scene_1 = function(onStart, onComplete) {
  var tl = new TimelineMax({
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
    .set('#scene_1 .envelop_white', {opacity: 1})

    .set(".cover", {perspective:800})
    .set(".cover", {transformStyle:"preserve-3d"})
    .set(".coverback", {rotationX:-180, opacity: 1})
    .set([".coverback", ".coverfront"], {backfaceVisibility:"hidden"})
    .to('#scene_1 .cover', 3, {rotationX: 140})

    .set('#scene_1 .cover', {zIndex:1}, "-=1")
    .set('#scene_1 .letter', {zIndex:2}, "-=1")
    .set('#scene_1 .envelop', {zIndex:3}, "-=1")
    .set('#scene_1 .letter', {opacity:1}, "-=1")
    .to('#scene_1 .letter', 2, {top: '3%'}, "-=1")
    // .to(['#scene_1 .envelop', '#scene_1 .cover'], 2, {top: '20%'}, "-=2");

  return tl;
};



// scene_2
timelines.scene_2 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.fromTo('#scene_2 .texttop', 1, {
    left: '100%',
  }, {
    left: '50%',
    autoAlpha: true,
    ease: Bounce.easeOut,
  })
  .fromTo('#scene_2 .text', 1, {
    left: '0%',
  }, {
    left: '50%',
    autoAlpha: true,
    ease: Bounce.easeOut,
  })
  .fromTo(['#scene_2 .yun', '#scene_2 .icon'], 1, {
    scaleX: 0,
    scaleY: 0
  }, {
    autoAlpha: true,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  })

  .to('#scene_2 .curve', 0.5, {autoAlpha: true})

  .to('#scene_2 .book', 1.5, {
    bezier: {
      values: [{
      left: 90,
      top: 240,
    }],
      // autoRotate: true,
    },
    autoAlpha: true,
    ease: Power1.easeInOut
  }, "-=0.25")

  .fromTo('#scene_2 .textbook', 1, {
    left: '100%',
  }, {
    left: '50%',
    autoAlpha: true,
    ease: Bounce.easeOut,
  });

  return tl;
};