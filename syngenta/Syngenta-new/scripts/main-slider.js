var g1 = new Mainslider ("#main-slider_1");

function Mainslider (sSelector) {
	var g = this;
	// Data
	g.main           = $(sSelector);
	g.slides         = g.main.find('.main-slider__item ');
	g.duration       = 500;
	g.regCssPosition = 0;
	g.regSlidesrafe  = 0;

	g.dotContainer = g.main.find('.main-slider__dots');

	g.dotSlider = g.main.find('.dots-slider');
	g.dotSlidePosition = 0;
	g.dotSlideCount    = 1;
	// g.dotSlides = g.dotSlider.find('.dots-slider__item');
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
		}
	g.sliderPrevNext = function () {
		// e.preventDefault();
		// console.log('ARROWBTN');
		var   currentArrow = $(this)
			, slides       = currentArrow.closest('.main-slider').find('.main-slider__item') 
			, activeSlide  = slides.filter('.active')
			, nextSlide    = activeSlide.next()
			, prevSlide    = activeSlide.prev()
			, firstSlide   = g.slides.first()
			, lastSlide    = g.slides.last()
			;
		if ( currentArrow.hasClass('main-slider__arrow_next') ) {
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
		var dotMarkup = '<li class="main-slider__dots-item"> \
							<a href="#" class="main-slider__dots-link"> \
								<span class="main-slider__dot"></span> \
							</a> \
						</li>';
		// var srcImages = [];

		for (var i=0; i < g.slides.length; i++) {
			// srcImages[i] = g.slides.eq(i).find('.main-slider__pic').attr('src');
			g.dotContainer.append(dotMarkup);
			// g.dotContainer.find('.main-slider__dots-pic').eq(i).attr('src', srcImages[i]);
			}
		g.setActiveDot();
		}

	g.deleteDots = function () {
		g.dotContainer.empty();
		}

	g.setActiveDot = function () {
		g.dotContainer.find('.main-slider__dots-item')
						.eq(g.slides.filter('.active').index())
						.addClass('active')
						.siblings()
						.removeClass('active')
						;
		}

	g.clickDots = function (event) {
		event.preventDefault();
		// console.log("Click-Link-dot");
		var  dots            = g.dotContainer.find('.main-slider__dots-item')
			,activeDot       = dots.filter('.active')
			,currentDot      = $(this).closest('.main-slider__dots-item')
			,currenDotIndex  = currentDot.index()
			,direction       = (activeDot.index() < currenDotIndex) ? "forward" : "back"
			,currentSlide    = g.slides.eq(currenDotIndex) 
			;
		g.moveSlider(currentSlide, direction);
		}
	g.sliderAutoPlay = function () {
		var   
			  activeSlide  = g.slides.filter('.active')
			, nextSlide    = activeSlide.next()
		// 	, prevSlide    = activeSlide.prev()
			, firstSlide   = g.slides.first();
		// 	, lastSlide    = s.slides.last()
		// 	;
		if ( nextSlide.length ) {
			// s.moveSlider(nextSlide);
			g.moveSlider(nextSlide);
			}
		else {
			// s.moveSlider(firstSlide);
			g.moveSlider(firstSlide);
			}
		// setTimeout(s.moveSlider(nextSlide), duration);
		}
	g.startTimer = function () {
		window.setInterval(g.sliderAutoPlay, 3000);
		console.log("start slide");
		}
	// g.getDotSliderItemWidth = function () {
	// 	var  dotSliderList = g.dotSlider.find('.dots-slider__list')
	// 		,dotSliderWrapWidth = g.dotSlider.children().width()
	// 		,dotSlide = g.dotSlider.find('.dots-slider__item')
	// 		,dotSlideMaxWidth = 0;
	// 		;
	// 		dotSlideMaxWidth = dotSliderWrapWidth / 6;
	// 	dotSlide.css("max-width", dotSlideMaxWidth);
	// 	return dotSlideMaxWidth;
	// 	// console.log("listwrapWIDTH = " + dotSliderWrapWidth);
	// 	}

	// g.dotSliderPrevNext = function () {
	// 		var currentArrow = $(this);
	// 		if (currentArrow.hasClass('dots-slider__arrow_next')) {
	// 			g.dotMoveSlide("forward");
	// 			// console.log("NEXT");
	// 			}
	// 		else {
	// 			// console.log("PREV");
	// 			g.dotMoveSlide("back");	
	// 		}
	// 	}
	// g.dotSlideAnimation = function (direction) {
	// 	var   dotSliderWrapWidth = g.dotSlider.children().width()
	// 		, dotSliderItemWidth = g.getDotSliderItemWidth()
	// 		, dotSliderList      = g.dotSlider.find('.dots-slider__list')
	// 		, dotSlides          = g.dotSlider.find('.dots-slider__item')
	// 		, slidePositionMax   = -dotSliderItemWidth * dotSlides.length + dotSliderItemWidth*6
	// 		, step               = 0
	// 		, slidePositionBound = 0;
	// 		;
			
	// 		if (direction === "forward") {
	// 			g.dotSlidePosition = Math.max(g.dotSlidePosition - dotSliderItemWidth * g.dotSlideCount, slidePositionMax);
	// 			slidePositionBound = slidePositionMax;
	// 			step = g.dotSlidePosition-50; 
	// 			}
	// 		else if ( direction === "back" ) {
	// 			g.dotSlidePosition = Math.min(g.dotSlidePosition + dotSliderItemWidth * g.dotSlideCount, 0);
	// 			slidePositionBound = 0;
	// 			step = g.dotSlidePosition+50; 
	// 			}

			
	// 		if (g.dotSlidePosition == slidePositionBound) {
	// 			// console.log("step " + step);
	// 			dotSliderList.css({'transform' : "translateX(" + step + 'px' + ")"});
	// 			setTimeout(function(){
	// 				dotSliderList.css({'transform' : "translateX(" + g.dotSlidePosition + 'px' + ")"}); 
	// 				}
	// 				, 500
	// 				);
	// 			}
	// 		else {
	// 			dotSliderList.css({'transform' : "translateX(" + g.dotSlidePosition + 'px' + ")"}); 
	// 			}

	// 	}
	// g.dotMoveSlide = function (direction) {
		
	// 		if (direction === "forward") {

	// 			g.dotSlideAnimation("forward");

	// 			}
	// 		else if (direction === "back") {

	// 			g.dotSlideAnimation("back");

	// 			}	
	// 	}
	// Events
	g.createDots(); // вызов ф-и для создания списка ссылок 
	// g.getDotSliderItemWidth();
	// g.main.find('.main-slider__arrow').bind('click', g.sliderPrevNext);
	g.dotContainer.find('.main-slider__dots-link').bind('click', g.clickDots);
	g.startTimer();
	// g.dotSlider.find('.dots-slider__arrow').bind('click', g.dotSliderPrevNext);
	// $(window).bind('mousedown', g.getDotSliderItemWidth);
	// $(window).bind('mouseup', g.getDotSliderItemWidth);
}