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



        var rpt = new TimelineMax({paused: true, repeat: -1, repeatDelay: 1});

        rpt.to('#scene_2 .icon', 0.1, {
          rotation: -20,
        }).to('#scene_2 .icon', 0.1, {
          rotation: 20,
        }).to('#scene_2 .icon', 0.1, {
          rotation: -10,
        }).to('#scene_2 .icon', 0.1, {
          rotation: 20,
        }).to('#scene_2 .icon', 0.1, {
          rotation: 0,
        });

        rpt.to('#scene_2 .circle', 1 , {scaleX: 2, scaleY: 2, autoAlpha: 0}, '-=0.5');

        rpt.play();

        m.repeatTween = rpt;


        $$('#scene_2 .book').tap(function(){

          if(m.openBookTween) {

            if(m.openBookTween.reversed()){
              m.openBookTween.restart();
            }else{
              m.openBookTween.reverse();
            }
          }
          else {
            var openBookTween = TweenLite.to('#scene_2 .book', 1, {width:"100%", height:"96%", rotation: 720, top:"2%", left: '0%'});
            m.openBookTween = openBookTween;
          }

        });

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
      ease: Power2.easeInOut
    })

    // .set(['#scene_2 .envelop_white', '#scene_2 .coverfront', '#scene_2 .coverback'], {'visibility': 'hidden'})

    .to(['#scene_2 .envelop', '#scene_2 .envelop_white', '#scene_2 .cover'], 1, 
      {top: '120%'}, "-=1.5")
    .set(['#scene_2 .envelop', '#scene_2 .envelop_white', '#scene_2 .cover'], {'visibility': 'hidden'})

    .set('#scene_2 .letter', {zIndex: 0})



    // scene 2 animation  
    .fromTo('#scene_2 .txt1', 1, {
        left: '0%'
      }, {
        left: '50%',
        autoAlpha: true,
      })
    .fromTo('#scene_2 .txt2', 1, {
        left: '100%'
      }, {
        left: '50%',
        autoAlpha: true,
      }, "-=1")
    

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


    .fromTo('#scene_2 .circle', 1, {
      scaleX: 0,
      scaleY: 0
    }, {
      scaleX: 1,
      scaleY: 1,
      autoAlpha: true,
    })

    .fromTo('#scene_2 .book', 1, {
      scaleX: 0,
      scaleY: 0
    }, {
      rotation: 750,
      scaleX: 1,
      scaleY: 1,
      autoAlpha: true,
      ease: Power2.easeInOut
    }, "-=1")


    .fromTo('#scene_2 .textbottom', 1, {
      right: '0%',
    }, {
      right: '20%',
      autoAlpha: true,
      // ease: Bounce.easeOut,
    }, "-=0.5");


  return tl;
};

