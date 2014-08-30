$(document).ready(function() {

	console.log('dom ready');

	$.nonbounce();

	// delay each image and append the timestamp to prevent caching 
	var baseUrl = 'images'
		loader = new PxLoader();

	// add 100 images to the queue 
	for (var i = 1; i < 12; i++) {
		// this time we'll create a PxLoaderImage instance instead of just 
		// giving the loader the image url 
		var pxImage = new PxLoaderImage(baseUrl + '/' + i + '.jpg');

		// we can add our own properties for later use 
		pxImage.imageNumber = i;

		loader.add(pxImage);
	}

	// callback that runs every time an image loads 
	loader.addProgressListener(function(e) {

		// log which image completed 
		console.log('image ', e.resource.imageNumber, ' loaded');
		console.log('progress: ', e.completedCount, '/', e.totalCount);


		// $('div#scene-'+ e.resource.imageNumber + ' img.bg').attr('src', 'images/' + e.resource.imageNumber + '.jpg');
		var image = '<img class="bg" src="images/'+ e.resource.imageNumber +'.jpg">';
		$('div#scene-'+ e.resource.imageNumber).prepend(image);
		// $('div#scene-'+ e.resource.imageNumber + ' img.bg').attr('src', 'images/' + e.resource.imageNumber + '.jpg');

		$('.loader .progress').text('Loading...' + parseInt(100*e.completedCount/e.totalCount) + '%' );

	});

	loader.addCompletionListener(function() { 
	    
	    $$('.viewport').swipeDown(function() {
	    	swipeDown();
	    });

	    $$('.viewport').swipeUp(function() {
	    	swipeUp();
	    });

	    $$('.viewport').tap(function() {
	    	$('#scene-1.active div.envelop-container').addClass('open');
	    });


	}); 

	loader.start();

});


var currentScene = 0,
	sceneSize = 11;



function swipeUp() {

	if(currentScene == sceneSize) return false;

	console.log('move to scene ', currentScene + 1);
	
	var currentSceneId = '#scene-' + (currentScene);
	var nextSceneId = '#scene-' + (currentScene + 1);

	$(currentSceneId).addClass('up').removeClass('active');
    $(nextSceneId).addClass('active').removeClass('down');

    currentScene += 1;
}

function swipeDown() {

	if(currentScene == 0) return false;

	console.log('move to scene ', currentScene - 1);
	
	var currentSceneId = '#scene-' + (currentScene);
	var nextSceneId = '#scene-' + (currentScene - 1);

	$(currentSceneId).addClass('down').removeClass('active');
    $(nextSceneId).addClass('active').removeClass('up');

    currentScene -= 1;
}




