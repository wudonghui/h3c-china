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

  tl.add(TweenLite.to('#scene_1 .envelop', 1, {
    opacity: 1,
    ease: Power1.easeIn,
  }));

  tl.add(TweenLite.to('#scene_1 .text', 1, {
    opacity: 1,
    ease: Power1.easeIn,
  }));

  tl.add(TweenLite.fromTo('#scene_1 .icon', 1, {
    scaleX: 0,
    scaleY: 0
  }, {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  }));
  return tl;
};



// scene_2
timelines.scene_2 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: onComplete
  });

  tl.add(TweenLite.fromTo('#scene_2 .text', 1, {
    left: '0%',
  }, {
    left: '50%',
    opacity: 1,
    ease: Bounce.easeOut,
  }));

  tl.add(TweenLite.fromTo(['#scene_2 .yun', '#scene_2 .icon'], 1, {
    scaleX: 0,
    scaleY: 0
  }, {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    ease: Bounce.easeOut
  }));


  tl.add(TweenMax.to('#scene_2 .book', 5, {
    bezier: [{
      left: 100,
      top: 250
    }, {
      left: 300,
      top: 0
    }, {
      left: 500,
      top: 400
    }],
    ease: Power1.easeInOut
  }));

  return tl;
};