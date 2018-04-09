"use strict";

$(document).ready(function (){

    function showAuthorization (event) {
        event.stopPropagation();
        console.log("click enter");
        var button = $(this)
            ,authBlock = button.siblings('.authorization')
            ;
        // console.debug(authBlock);
        authBlock.css("display","block").animate({
                "opacity" : 1
            }
            ,400
        );
    }
    function showFormRemember () {
        // event.preventDefault();
        var  formEnter = $(".authorization__form").find(".form-enter")
            ,formRemember = $(".authorization__form").find(".form-enter.form-enter_remember")
            ;
        // if( formEnter.hasClass("active")) {
        formEnter.removeClass('active');
        formRemember.addClass('active');
        // }
        // else {
        // 	formRemember.removeClass('active');
        // 	formEnter.addClass('active');
        // }
    }
    function hideFormRemember () {
        // event.preventDefault();
        var  formEnter = $(".authorization__form").find(".form-enter")
            ,formRemember = $(".authorization__form").find(".form-enter.form-enter_remember")
            ;
        formEnter.addClass('active');
        formRemember.removeClass('active');

    }
    $(".form-enter__link").bind("click", showFormRemember);
    $('.header__list-link_enter').bind('click', showAuthorization);
    $('.authorization').bind('click', function(event) {
        event.stopPropagation();
    });
    $(document).bind('click', function(event){
        // event.stopPropagation();
        if ($(event.target) !== $(".authorization") ){
            $(".authorization").animate({
                    "opacity" : 0
                }
                ,400
                ,function () {
                    $(this).css("display","none");
                    hideFormRemember();
                }
            );
            // showFormRemember();
        }
        else { return; }
    });

});