"use strict";

$(document).ready(function () {
	
	(function ($) {
		var 
			 screen        = 0
			,container     = $('.main-content')
			,pages         = container.find('.page')
			,inscroll      = false
			,pageCount     = pages.length
			,clientYStatic = 0
			;
		function scrollPages(event) {
			if(!inscroll) {
				if (event.deltaY > 0 && screen > 0) {
					screen--;
					}
				else if (event.deltaY < 0 && screen < (pageCount - 1)) {
					screen++;
					}
			}
			var position = (-screen*100) + "%";
			container.css('top', position);

			setTimeout(function() {
				inscroll = false;
				}
				, 1300);
			// console.debug(event);
		}
		
		var scrollPagesTouch = function (direction) {
			// clientYStatic = event.clientY;
			console.log(' direction ' + direction);
			if(!inscroll) {
				if (direction == "down" && screen > 0) {
					screen--;
					console.log(' -- ' + direction);
					console.log(' screen -- ' + screen);
					}
				else if (direction == "up" && screen < (pageCount - 1)) {
					screen++;
					console.log(' ++ ' + direction);
					console.log(' screen ++ ' + screen);
					}
			}
			var position = (-screen*100) + "%";
			container.css('top', position);

			setTimeout(function() {
				inscroll = false;
				}
				, 1300);
			console.debug(direction);
		}

		$('body').on('mousewheel', scrollPages);
		$("body").swipe({
			  swipe:function(event, direction, distance, duration, fingerCount) {
				scrollPagesTouch(direction);
			  }
			});

	})($);

});