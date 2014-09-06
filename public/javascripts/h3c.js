
$(document).ready(function() {
  // init jquery plugins
  // no bounce on ios browsers
  $.nonbounce();
});


// after page is fully loaded, include images, css, js files
window.onload = function() {

  // important position adjustment
  // calculate the margin offset 
  
  //scene 4
  $('#scene_4 .iconleft').css('margin-top', 0 - $('#scene_4 .iconleft').height()*0.9);
  $('#scene_4 .iconmiddle').css('margin-top', 0 - $('#scene_4 .iconmiddle').height());
  $('#scene_4 .iconright').css('margin-top', 0 - $('#scene_4 .iconright').height()/2);

  //scene 3
  $('#scene_3 .star').css('margin-top', $('#scene_3 .plane').height()*0.18);
  $('#scene_3 .star').css('margin-left', $('#scene_3 .plane').width()*0.18);  

  //scene 8
  $('#scene_8 .ios').css('margin-bottom', $('#scene_8 .genshu').height()*0.52);
  $('#scene_8 .android').css('margin-bottom', $('#scene_8 .genshu').height()*0.52);


  // set all the scenes invisible
  $('.scene.hidden').css('visibility', 'hidden');

  // register swipe event
  $$('#viewport').swipeUp(swipeUp);
  // $$('#viewport').swipeUp(openEnvelop);

  // register playScene event
  $('#viewport').on('playScene', playScene);
  // init the first scene
  $('#viewport').trigger('playScene', 'scene_2'); 
};



function openEnvelop(){
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

// play the scene animation
function playScene(event, scene) {
  // console.log('play scene', event, scene);
  var tl = timelines[scene](
    // onStart callback
    function() {
      m.isAnimating = true;
    },
    // onComplete callback
    function() {
      m.isAnimating = false;
      
      (m.arrowTween.isActive == true) ? m.arrowTween.resume() : m.arrowTween.play();

      if(m.currentScene < m.numberOfScenes)
        $('.arrow').show();


      // last scene
      // add download link
      if(m.currentScene == m.numberOfScenes) {

        var url_ios = "https://itunes.apple.com/cn/app/gen-shu-de-yun-tu/id721591668?mt=8";
        var url_android = "http://www.h3c.com.cn/pub/0_H3C_APP/Root_uncle_cloud_for_Android.apk";

        $('#scene_8 .ios').click(function(){
          window.location.href = url_ios;
          // window.open(url_ios, '_blank');
        });

        $('#scene_8 .android').click(function(){
          window.location.href = url_android;
          // window.open(url_android, '_blank');
        });

      }



    }
  );

  tl.play();
};


// transit from one scene to another scene
function swipeUp(event) {
  // return if scene is in the state of transition or animation
  if (m.isTransition || m.isAnimating) {
    // console.log('transition or animation is running...');
    return false;
  }

  // return if currentScene is the last scene
  if (m.currentScene == m.numberOfScenes) {
    // console.log('scene reachs last page');
    return false;
  }

  
  // open evelop
  if(m.splash) {
    openEnvelop();
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


  
  // positioning the coming scene to the bottom
  $(comingScene).css('top', '100%')
  $(comingScene).css('z-index', '998');
  $(comingScene).css('visibility', 'visible');

  var transitionDuration = 1.5;
  var transitionDurationPosition = "-=1.5";

  tl.to(scene, transitionDuration, {
      top: "-100%",
      ease: Power2.easeInOut,
    })
  .to(comingScene, transitionDuration, {
      top: "0%",
      ease: Power2.easeInOut,
  }, transitionDurationPosition);


  // tl.to(scene, transitionDuration, {
  //     top: "-100%",
  //     ease: Power2.easeInOut,
  //   }).set(comingScene, {
  //     'visibility': 'visible'
  //   }, transitionDurationPosition)
  //   .from(comingScene, transitionDuration, {
  //     top: "100%",
  //     ease: Power2.easeInOut,
  //   }, transitionDurationPosition);

  tl.play();

  m.currentScene += 1;
};



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


