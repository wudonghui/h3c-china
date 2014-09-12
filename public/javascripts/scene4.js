
// scene_4
timelines.scene_4 = function(onStart, onComplete) {
  var tl = new TimelineMax({
    paused: true,
    onStart: onStart,
    onComplete: function(){
      onComplete();


      var rpt = new TimelineMax({paused: true});

      rpt.set('#scene_4', {perspective: 800});
      rpt.set(['#scene_4 .mountain', '#scene_4 .iconright', '#scene_4 .iconmiddle', '#scene_4 .iconleft'], {transformOrigin:"50% 50% 100"});
      // rpt.set(['#scene_4 .iconright', '#scene_4 .iconleft'], {transformOrigin:"50% 50% -100"});
      // rpt.set(['#scene_4 .mountain'], {transformOrigin:"50% 50% 100"});
      
      rpt.fromTo(['#scene_4 .mountain', '#scene_4 .iconright', '#scene_4 .iconmiddle', '#scene_4 .iconleft'], 4, {
        
      },{
        rotationY: 360,
        autoAlpha: true,
        repeatDelay: 2,
        repeat: -1,
        ease: Power2.easeInOut
      });

      rpt.play();

      m.repeatTween = rpt;


    }
  });

  tl.fromTo('#scene_4 .mountain', 1.5, {
    top: '0%',
    scaleX: 0,
    scaleY: 0,
  }, {
    top: '25%',
    scaleX: 1,
    scaleY: 1,
    ease: Power2.easeInOut,
    autoAlpha: true,
  })

  .fromTo('#scene_4 .textbottom1', 1, {
    top: '100%'
  }, {
    top: '68%',
    rotation: 720,
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
    rotation: 720,
    autoAlpha: true
  }, "-=0.5")
 
  return tl;
};
