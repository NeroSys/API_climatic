var g1 = new Galleryslider ("#gl-slider_1");

function Galleryslider (sSelector) {
	var g = this;
	// Data
	g.main           = $(sSelector);
	g.slides         = g.main.find('.gl-slider__item');
	g.duration       = 500;
	g.regCssPosition = 0;
	g.regSlidesrafe  = 0;

	g.dotContainer = g.main.find('.gl-slider__dots');

	g.dotSlider = g.main.find('.dots-slider');
	g.dotSlidePosition = 0;
	g.dotSlideCount    = 1;

	g.playButton = g.main.find('.video-container__play-button');
	g.closeButton = g.main.find('.video-container__close-button');
	// g.VideoFrame = g.main.find('.video-container__frame');
	// g.dotSlides = g.dotSlider.find('.dots-slider__item');
	// g.player = null;
	// Logic1
	g.moveSlider = function (currentSlide, direction){
			var  activeSlide  = g.slides.filter('.active')
				,slideWidth   = g.slides.width()
				,slideForAnim = 0
				; 

			if ( direction === "forward" ) { 
				g.regCssPosition = +slideWidth; // сдвиг на ширишу слайда (left)
				g.regSlidesrafe = -slideWidth; // смещение (left) 
				} 
			else if ( direction === "back" ) {
				g.regCssPosition = -slideWidth; // сдвиг на ширишу слайда для будю аним (left) 
				g.regSlidesrafe = +slideWidth; // смещение (left) 
				}

			currentSlide.css('left', g.regCssPosition).addClass('inslide');

			slideForAnim = g.slides.filter('.inslide'); 

			activeSlide.css("left", g.regSlidesrafe).stop().animate({
				// "left" : g.regSlidesrafe
				"opacity" : 0
				}
				, g.duration
				);
			slideForAnim.css({"left" : 0, "opacity" : 0}).stop().animate({
				// "left" : 0
				"opacity" : 1
				}
				, g.duration
				, function () {
					g.slides.css("left", 0 ).removeClass('active');
					$(this).toggleClass('inslide active'); // ?
					g.setActiveDot();
					}
				);
			g.addSrcLink(slideForAnim);
			g.pauseVideo(activeSlide);
		}
	g.sliderPrevNext = function () {
		// e.preventDefault();
		// console.log('ARROWBTN');
		var   currentArrow = $(this)
			, slides       = currentArrow.closest('.gl-slider').find('.gl-slider__item') 
			, activeSlide  = slides.filter('.active')
			, nextSlide    = activeSlide.next()
			, prevSlide    = activeSlide.prev()
			, firstSlide   = g.slides.first()
			, lastSlide    = g.slides.last()
			;
		if ( currentArrow.hasClass('gl-slider__arrow_next') ) {
				// console.log('NextBTN');
				if ( nextSlide.length ) { // кольцевание слайдера по концу
					g.moveSlider(nextSlide , "forward");
					}
				else {
					g.moveSlider(firstSlide, "forward");
					}
			}
		else {
				// console.log('PREVBTN');
				if ( prevSlide.length ) { // кольцевание слайдера по началу
					g.moveSlider(prevSlide , "back");
					}
				else {
					g.moveSlider(lastSlide , "back");
					}
			}
		}

	g.createDots = function () {
		var dotMarkup = '<li class="gl-slider__dots-item dots-slider__item"> \
							<a href="#" class="gl-slider__dots-link"> \
								<img src="" alt="" class="gl-slider__dots-pic"> \
							</a> \
						</li>';
		var srcImages = [];

		for (var i=0; i < g.slides.length; i++) {
			srcImages[i] = g.slides.eq(i).find('.video-container__photo').attr('src');
			g.dotContainer.append(dotMarkup);
			g.dotContainer.find('.gl-slider__dots-pic').eq(i).attr('src', srcImages[i]);
			}

		g.setActiveDot();
		}

	g.deleteDots = function () {
		g.dotContainer.empty();
		}

	g.setActiveDot = function () {
		g.dotContainer.find('.gl-slider__dots-item')
						.eq(g.slides.filter('.active').index())
						.addClass('active')
						.siblings()
						.removeClass('active')
						;
		}

	g.clickDots = function (event) {
		event.preventDefault();
		// console.log("Click-Link-dot");
		var  dots            = g.dotContainer.find('.gl-slider__dots-item')
			,activeDot       = dots.filter('.active')
			,currentDot      = $(this).closest('.gl-slider__dots-item')
			,currenDotIndex  = currentDot.index()
			,direction       = (activeDot.index() < currenDotIndex) ? "forward" : "back"
			,currentSlide    = g.slides.eq(currenDotIndex) 
			;
		g.moveSlider(currentSlide, direction);
		}

	g.getDotSliderItemWidth = function () {
		var  dotSliderList = g.dotSlider.find('.dots-slider__list')
			,dotSliderWrapWidth = g.dotSlider.children().width()
			,dotSlide = g.dotSlider.find('.dots-slider__item')
			,dotSlideMaxWidth = 0;
			;
			dotSlideMaxWidth = dotSliderWrapWidth / 3;
		dotSlide.css("max-width", dotSlideMaxWidth);
		return dotSlideMaxWidth;
		// console.log("listwrapWIDTH = " + dotSliderWrapWidth);
		}

	g.dotSliderPrevNext = function () {
			var currentArrow = $(this);
			if (currentArrow.hasClass('dots-slider__arrow_next')) {
				g.dotMoveSlide("forward");
				// console.log("NEXT");
				}
			else {
				// console.log("PREV");
				g.dotMoveSlide("back");	
			}
		}
	g.dotSlideAnimation = function (direction) {
		var   dotSliderWrapWidth = g.dotSlider.children().width()
			, dotSliderItemWidth = g.getDotSliderItemWidth()
			, dotSliderList      = g.dotSlider.find('.dots-slider__list')
			, dotSlides          = g.dotSlider.find('.dots-slider__item')
			, slidePositionMax   = -dotSliderItemWidth * dotSlides.length + dotSliderItemWidth*3
			, step               = 0
			, slidePositionBound = 0;
			;
			
			if (direction === "forward") {
				g.dotSlidePosition = Math.max(g.dotSlidePosition - dotSliderItemWidth * g.dotSlideCount, slidePositionMax);
				slidePositionBound = slidePositionMax;
				step = g.dotSlidePosition-50; 
				}
			else if ( direction === "back" ) {
				g.dotSlidePosition = Math.min(g.dotSlidePosition + dotSliderItemWidth * g.dotSlideCount, 0);
				slidePositionBound = 0;
				step = g.dotSlidePosition+50; 
				}

			
			if (g.dotSlidePosition == slidePositionBound) {
				// console.log("step " + step);
				dotSliderList.css({'transform' : "translateX(" + step + 'px' + ")"});
				setTimeout(function(){
					dotSliderList.css({'transform' : "translateX(" + g.dotSlidePosition + 'px' + ")"}); 
					}
					, 500
					);
				}
			else {
				dotSliderList.css({'transform' : "translateX(" + g.dotSlidePosition + 'px' + ")"}); 
				}

		}
	g.dotMoveSlide = function (direction) {
		
			if (direction === "forward") {

				g.dotSlideAnimation("forward");

				}
			else if (direction === "back") {

				g.dotSlideAnimation("back");

				}	
		}
	g.clickPlayButton = function () {
		
		var  screensaver = $(this).parent('.video-container').find(".video-container__photo-wrap")
			,videoContainer = $(this).parent('.video-container').find('.video-container__video')
			,videoCloseBtn = $(this).parent('.video-container').find('.video-container__close-button')
			,bool = true
			,autoplay = ";autoplay=1"
			,src = null
			; 
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
			src = videoContainer.children().attr('src') + autoplay;
			videoContainer.children().attr('src' , src);
			videoCloseBtn.css("display","block");
		}
	g.pauseVideo = function (activeSlide) {
		var  screensaver = activeSlide.find(".video-container__photo-wrap")
			// ,videoContainer = activeSlide.find('.video-container__video')
			,currentButton = activeSlide.find('.video-container__play-button')
			; 
			currentButton.show(600);
			screensaver.animate({
					"opacity": 1
					}
					, 800
					, function  () {
						screensaver.css({
							// 'display':'none'
							'visibility':'visible'
							})
						}
			);
	}
	g.addSrcLink = function (currentSlide) {

		var curPlayer = $('#video');

		curPlayer.fadeOut(function(){
			$(this).empty().remove();
		});


		var frameMarkup = "<iframe src='' frameborder='0' allowfullscreen='' id='video' class='video-container__frame'></iframe>";
		var  src = currentSlide.data('link')
			,addToSrc = "?enablejsapi=1&controls=0&rel=0&showinfo=0&wmode=transparent"
			,currentVideoContainer = currentSlide.find('.video-container__video')
			;
			// if (currentVideoContainer.children() == null) {
				currentVideoContainer.append(frameMarkup);
				currentVideoContainer.children().attr('src', src+addToSrc);
			// }
			// else {
			// 	currentVideoContainer.children().attr('src', src+addToSrc);
			// }
		}
	g.videoClose = function () {
		var
			currentSlide = $(this).closest('.gl-slider__item')
			;
		g.pauseVideo(currentSlide);
		g.addSrcLink(currentSlide);
		$(this).css("display","none");
		// console.debug(currentSlide);
	}
	// Events
	g.createDots(); // вызов ф-и для создания списка ссылок 
	g.getDotSliderItemWidth();
	g.main.find('.gl-slider__arrow').bind('click', g.sliderPrevNext);
	g.dotContainer.find('.gl-slider__dots-link').bind('click', g.clickDots);
	g.playButton.bind('click' , g.clickPlayButton);
	g.closeButton.bind('click' , g.videoClose);
	g.dotSlider.find('.dots-slider__arrow').bind('click', g.dotSliderPrevNext);
	$(window).bind('mousedown', g.getDotSliderItemWidth);
	$(window).bind('mouseup', g.getDotSliderItemWidth);
	g.addSrcLink($('.gl-slider__item.active'));
}