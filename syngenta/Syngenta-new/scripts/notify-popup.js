"use strict";

$(document).ready(function() {

    (function ($) {
        var  popupForm    = $(".notifyings-block__notify-popup")
            ,popupFormBtn = popupForm.find('.notifyings-block__notify-popup-close-btn')
            ,messageBlock = popupForm.children('.notifyings-block__notify-popup-inner')
            ,notifyBtn    = $('.notifyings-list__item-btn_edit')
            ;
        popupFormBtn.bind("click", function (event) {

            $(this).closest('.notifyings-block__notify-popup').animate({
                    "opacity" : 0
                }
                ,400
                ,function () {
                    $(this).css("display","none").removeClass('show');
                }
            );
        });
        notifyBtn.bind('click', function (event) {
            event.preventDefault();
            popupForm.css("display","block")
                .animate({
                    "opacity" : 1
                }
                ,400
                ,function () {
                    $(this).addClass('show');
                }
            );
        });

    })($);

});