"use strict";

$(document).ready(function () {
    (function ($, undefined) {
        var  popupForm    = $(".popup-help")
            ,popupFormBtn = popupForm.find('.popup-help__rec-close')
            ,messageBlock = popupForm.children('.popup-help__inner')
            ,btnAddField  = $(".btn_add-field")
            ,btnPopupHelp = popupForm.find(".btn_popup-help")
            ,btnInfo = $('.btn_i')
            ;


        function checkHelp() {
            var  checkBox = $("#input-checkbox_111")
                ;
            if ( checkBox.prop("checked") == true ) {
                $.cookie('help', 1, { expires: 7, path: '/' });
            }
            else {
                $.cookie('help', 0, { expires: 7, path: '/' });
            }
        }
        popupForm.css('height', window.outerHeight );
        $(".wrapper").css('height', window.outerHeight );
        popupFormBtn.bind("click", function (event) {
            $(this).closest('.popup-help').animate({
                    "opacity" : 0
                }
                ,400
                ,function () {
                    $(this).css("display","none").removeClass('show');
                }
            );
        });
        btnAddField.bind("click", function (event) {
            event.preventDefault();
            var popId = $(this).attr('href');
            var cookieHelp = $.cookie('help');
            // console.log(cookieHelp);
            if ( cookieHelp == 0 || cookieHelp === undefined ) {
                // console.log("show popup");
                $(popId).css("display","block").addClass('show').animate({
                        "opacity" : 1
                    }
                    ,400
                );
            }
            // else {
            // 	alert("CookieHelp!!");
            // }
        });
        btnPopupHelp.bind('click', function (event) {
            event.preventDefault();
            checkHelp();
            $(this).closest('.popup-help').animate({
                    "opacity" : 0
                }
                ,400
                ,function () {
                    $(this).css("display","none").removeClass('show');
                }
            );
        });
        btnInfo.bind('click', function (event) {
            event.preventDefault();
            var id = $(this).attr('href')
                ,curPopup = $(id)
                ;
            curPopup.css("display","block").addClass('show').animate({
                    "opacity" : 1
                }
                ,400
            );
        });
    })($);
});