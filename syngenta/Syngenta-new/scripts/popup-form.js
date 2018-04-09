"use strict";

$(document).ready(function (){

	(function ($) {
		var  popupForm    = $(".form-popup")
			,popupFormBtn = popupForm.find('.form-popup__close-btn')
			,messageBlock = popupForm.children('.form-popup__inner')
			;
		popupFormBtn.bind("click", function (event) {

			$(this).closest('.form-popup').animate({
				"opacity" : 0
				}
				,400
				,function () {
					$(this).css("display","none").removeClass('show');
					}
				);
		});

	})($);

});