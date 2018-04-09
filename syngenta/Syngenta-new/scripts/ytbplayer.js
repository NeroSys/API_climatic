
"use strict";

// https://developers.google.com/youtube/iframe_api_reference
// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



// global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
	// create the global player from the specific iframe (#video)
	player = new YT.Player('video', {
		events: {
			// call this function when player is ready to use
			'onReady': onPlayerReady
		}
	});
}

function onPlayerReady (event) {
	
	// bind events
	var playButton  = $(".video-container__play-button");
	playButton.bind('click', customButtonPlay);
	alert('ss000');

}
// var playButton  = $(".video-container__play-button");
var customButtonPlay = function () {
		
		var  screensaver = $(this).parent('.video-container').find(".video-container__photo-wrap")
			,videoContainer = $(this).parent('.video-container').find('.video-container__video')
		; 


		// var frameMarkup = "<iframe src='' frameborder='0' id='video' class='video-container__frame'></iframe>";
		// var  currentButton = $(this)
		// ,currentSlide = currentButton.parents('.gl-slider__item')
		// ,src = currentSlide.data('link')
		// ,addToSrc = "?enablejsapi=1"
		// ,currentVideoContainer = currentSlide.find('.video-container__video')
		// ;
		// if (currentVideoContainer.children() == null) {
		// 	currentVideoContainer.append(frameMarkup);
		// 	currentVideoContainer.children().attr('src', src+addToSrc);
		// }
		// else {
		// 	currentVideoContainer.children().attr('src', src+addToSrc);
		// }

	// console.log('currentSlide' + currentSlide);
	// console.debug(currentButton);
	// console.debug(currentSlide);
	console.debug(screensaver);


		player.playVideo();
		$(this).hide(600);
		screensaver.animate({
				"opacity": 0
				}
				, 800
				, function  () {
					screensaver.css({
						// 'display':'none'
						'visibility':'hidden'
						})
					}
		);
}

// playButton.bind('click', customButtonPlay);