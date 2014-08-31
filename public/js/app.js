window.onload = function() {




  TweenLite.set(scene_0, {perspective: 800});
  TweenLite.set(cover, {transformOrigin:"center 0px"});
  TweenLite.to(cover, 2, {rotationX: 130, delay: 1});




  var tl = new TimelineMax({
    paused: true
  });

  // tl.add(TweenMax.to(arrow, 1, {
  //   bottom: "5%",
  //   opacity: 1,
  //   // ease:Bounce.easeOut,
  //   repeat: -1,
  //   // repeatDelay:2, 
  //   yoyo: true
  //     // delay: 1
  // }), 'starter');

  // tl.set("#icon", {visibility:"visible"}).add(TweenLite.from(icon, 1, {
  //   scaleX: 0,
  //   scaleY: 0,
  //   opacity: 1,
  //   ease: Bounce.easeOut,
  // }), 'starter');
 
  // tl.play('starter');

}



$(document).ready(function() {
  console.log('dom ready');
  //no bounce on ios browsers
  $.nonbounce();


  $$('#viewport').swipeDown(function(event) {
    // swipeDown();
    console.log(event);
  });

  $$('#viewport').swipeUp(function(event) {
    // swipeUp();
    console.log(event.target);

    var tl = new TimelineLite({
      paused: true
    });

    tl.add(TweenMax.to(scene_0, 1, {
      top: "-100%",
    }), 'swipeUp');


//     var tl = new TimelineLite({onUpdate:updateSlider});
// tl.set("#content", {visibility:"visible"})
//   .from("h1", 0.5, {left:100, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
// .from("h2", 0.5, {left:-100, autoAlpha:0}, "-=0.25") //add tween 0.25 seconds before previous tween ends
// .from("#feature", 0.5, {scale:0.5, autoAlpha:0}, "feature") // add feature label at start position of this tween
// .from("#description", 0.5, {left:100, autoAlpha:0}, "feature+=0.25") // add tween 0.25 seconds after the feature label
// .staggerFrom("#nav img", 0.5, {scale:0, rotation:-180, autoAlpha:0}, 0.2, "stagger"); 

    tl.add(TweenLite.from(scene_1, 1, {
      top: "100%",
    }), 'swipeUp');


    tl.play('swipeUp');

    TweenLite.set(scene_1, {perspective: 500});
	
	
	  // TweenLite.set(envelop_cover, {transformOrigin:"center center -50px"});
  	TweenLite.to(envelop_cover, 2, {rotationX: -180, ease:Power1.easeInOut, delay: 1});

  });

});


// var currentScene = 0;
// var sceneSize = 11;


// function swipeUp() {

//   if (currentScene == sceneSize) return false;

//   console.log('move to scene ', currentScene + 1);

//   var currentSceneId = '#scene_' + (currentScene);
//   var nextSceneId = '#scene_' + (currentScene + 1);

//   $(currentSceneId).addClass('up').removeClass('active');
//   $(nextSceneId).addClass('active').removeClass('down');

//   currentScene += 1;
// }

// function swipeDown() {

//   if (currentScene == 0) return false;

//   console.log('move to scene ', currentScene - 1);

//   var currentSceneId = '#scene_' + (currentScene);
//   var nextSceneId = '#scene_' + (currentScene - 1);

//   $(currentSceneId).addClass('down').removeClass('active');
//   $(nextSceneId).addClass('active').removeClass('up');

//   currentScene -= 1;
// }