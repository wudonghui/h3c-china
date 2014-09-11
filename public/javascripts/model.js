// timelines container
var timelines = {};

// model
var m = {
  currentScene: 2,
  numberOfScenes: 8,
  isTransition: false,
  isAnimating: false,
  arrowTween: null,
  envelopArrowTween:null,
  currentTimeline: null,

  repeatTween: null,

  splash: true // is on splash page
};


// arrow up tween
// common object shared across all the screens
m.arrowTween = new TimelineMax({
  paused: true,
});

m.arrowTween.to('.arrow', 1, {
  bottom: "7%",
  autoAlpha: 1,
  repeat: -1,
  yoyo: true
});

