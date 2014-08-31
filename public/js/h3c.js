// after page is fully loaded, include images, css, js files

// model
var m = {
  currentScene: 1,
  numberOfScenes: 3,
  isAnimating: false,
  currentTimeline: null
};

$(document).ready(function() {
  // init jquery plugins
  // no bounce on ios browsers
  $.nonbounce();
});

window.onload = function() {

  // register swipe event
  // $$('#viewport').swipeDown(function(event) {
  //   // swipeDown();
  //   console.log(event);
  // });

  $$('#viewport').swipeUp(function(event) {
    swipeUp(event);
    // console.log(event.currentTarget);
  });

};


function swipeUp(event) {
  // do nothing if currentScene is the last scene
  if (m.isAnimating) {
    console.log('timeline is animating');
    return false;
  }

  if (m.currentScene == m.numberOfScenes) {
    console.log('scene reachs last page');
    return false;
  }

  console.log('transit from ', m.currentScene, ' to ', m.currentScene + 1);

  var scene = '#scene_' + (m.currentScene);
  var comingScene = '#scene_' + (m.currentScene + 1);

  // setup timeline
  var tl = new TimelineLite({
    paused: true,
    onStart: function(){
      m.isAnimating = true;
    },
    onComplete: function(){
      m.isAnimating = false;
    }
  });

  tl.add(TweenMax.to(scene, 1.5, {
    top: "-100%",
    ease:Power2.easeInOut
  }), 'swipeUp');


  tl.add(TweenLite.from(comingScene, 1.5, {
    top: "100%",
    ease:Power2.easeInOut
  }), 'swipeUp');


  tl.play('swipeUp');

  m.currentScene += 1;
};




// function swipeDown() {

//   if (currentScene == 0) return false;

//   console.log('move to scene ', currentScene - 1);

//   var currentSceneId = '#scene_' + (currentScene);
//   var nextSceneId = '#scene_' + (currentScene - 1);

//   $(currentSceneId).addClass('down').removeClass('active');
//   $(nextSceneId).addClass('active').removeClass('up');

//   currentScene -= 1;
// }