
"use strict";
$(document).ready(function () {
	$(function () {
	  var map = new google.maps.Map(document.getElementById('contact-map'),
	   {
		zoom: 12,
		center: {lat: 50.397041, lng: 30.492218},
		scrollwheel: false,
		mapTypeControl: false,
		panControl: false,
		disableDefaultUI: false,
		mapTypeControlOptions: {
		   style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		   position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		zoomControl: true,
		zoomControlOptions: {
		   position: google.maps.ControlPosition.LEFT_CENTER
		},
		scaleControl: true,
		streetViewControl: false
	  });

	  var image = '/img/marker-orange.png';
	  var beachMarker = new google.maps.Marker({
			position: {lat: 50.397041, lng: 30.492218},
			map: map,
			icon: image
		  	});
	});
	$(function () {
	  var map = new google.maps.Map(document.getElementById('mapbig'),
	   {
		zoom: 12,
		center: {lat: 50.397041, lng: 30.492218},
		scrollwheel: false,
		mapTypeControl: false,
		panControl: false,
		disableDefaultUI: false,
		mapTypeControlOptions: {
		   style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		   position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		zoomControl: true,
		zoomControlOptions: {
		   position: google.maps.ControlPosition.LEFT_CENTER
		},
		scaleControl: true,
		streetViewControl: false
	  });

	  var image = '/img/marker-orange.png';
	  var beachMarker = new google.maps.Marker({
			position: {lat: 50.397041, lng: 30.492218},
			map: map,
			icon: image
		  	});
  	   beachMarker.addListener('click', function() {
			$('.big-map__description').toggleClass('show');
  		});
	});
	(function ($) {
		var closeBtn = $('.hidden-block__close-btn')
			;
		closeBtn.bind('click', function (event) {
			event.preventDefault();
			$(this).closest('.big-map__description').removeClass('show');
		});
	})($);
})
