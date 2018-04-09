"use strict";



function ajaxNews (sSelector) {
    var c = this;
    var lang = $("html").attr('lang');

    c.datetime= '';

    c.init(sSelector);

    c.flag = false;

    c.addNewsItems = function (oJsonNewsItems) {
        $.each(oJsonNewsItems, function (i) {
            var item =   ' <li class="articles-list__item">\
            <div class="article">';

            if (!(oJsonNewsItems[i].imgsrc  == 'null')){
                item  = item +  '<div class="article__img-wrap"><img src="'+ oJsonNewsItems[i].imgsrc +'" class="article__img"/></div>';

            }


            item  = item + '<div class="article__text-wrap">\
            <div class="article__date"><span class="article__date-icon article__date-icon_articles-orange"><i class="icon-syngenta icon-syngenta_15"></i></span><span class="article__date-text article__date-text_articles-orange">'+ oJsonNewsItems[i].date +'</span></div>\
            <div class="article__title">\
            <h2 class="title title_article title_green">'+ oJsonNewsItems[i].title +'</h2>\
            </div>\
            <div class="article__text"> '+ oJsonNewsItems[i].text +'</div>\
            <div class="article__btn"><a href="'+ oJsonNewsItems[i].hrefext +'" class="btn btn_article">'+ oJsonNewsItems[i].dalee +'</a></div>\
            </div>\
            </div>\
            </li>'

            $(sSelector).ready(function(){c.elem.append(item)});
            c.datetime = oJsonNewsItems[i].datetime;
        });
    }


    $('head').ready( function () {

        if (!c.flag) {
            c.flag = true;
            c.oAjax = $.ajax({

                'url'       : '/'+lang+'/pressroom/articles/ajax-items.html?datetime='+c.datetime // чтоб каждый раз нов файл (запрет кеша)
                // 'url'      : '/newsitems.json?t-' + new Date().getTime() // чтоб каждый раз нов файл (запрет кеша)
                ,'method'   : 'GET'
                ,'dataType' : 'json'
                ,'timeout'  : 20000 // макс. врем обработки запроса
                ,'data'     : {
                    // 'datetime' : c.datetime
                    // a,b (square, thickness, type) про эти парам сообщают бєкендеры
                    // ,'thickness' : c.thickness.val()
                    // ,'type'       : c.type.val()
                }
                , 'success' : function (oServerResponse) { // Для бизнес логики
                    // debugger; // ключевое слово для брекпоинта


                    c.addNewsItems(oServerResponse);
                    // console.debug(c.elem);
                    // console.log("succes");
                    c.flag = false;
                }
                , 'error'   : function (oAjax) {
                    console.error('error ?');
                    //alert('Проблемы с расчетами, повторите попытку позже');
                    // debugger;
                }
                , 'complete': function (oAjax) { // Обьеденяет Succes и Error . Техническая логика
                    // debugger;

                    if(oAjax.status == 200) { // 200 = OK
                        if ( typeof(oAjax.responseJSON) == 'undefined'){
                            console.error('could not parse server response as JSON object', oAjax.responseText);
                            // c.status('error', 'could not parse server response as JSON object');
                        }
                        else {
                            //c.elem.addClass("b-calc_status_ok");
                            // c.status('ok');
                        }

                    }
                    else if (oAjax.statusText == "timeout") {
                        console.error('AJAX request timed out');
                        //c.elem.addClass("b-calc_status_ok");
                        // c.status('error', 'AJAX request timed out');
                    }
                    else if (oAjax.status == 403) { // access forbidden
                        console.error('access forbidden');
                        //c.elem.addClass("b-calc_status_error");
                        // c.status('error', 'access forbidden');
                    }
                    else {
                        console.error("Unpredicated error", oAjax);
                        // c.status('error', 'Unpredicated error');
                    }
                }
            });
        }


    })






    c.getNewsItems = function (event) {
        event.preventDefault();
        var window = $(this);
        // console.log(window.scrollTop());
        // console.log(window.height());
        // console.log($(document).height());
        if ($(document).height()-window.scrollTop() - window.height() <= 2*window.height() && !c.flag) {
            c.flag = true;
            c.oAjax = $.ajax({

                'url'       : '/'+lang+'/pressroom/articles/ajax-items.html?datetime='+c.datetime// чтоб каждый раз нов файл (запрет кеша)
                // 'url'      : '/newsitems.json?t-' + new Date().getTime() // чтоб каждый раз нов файл (запрет кеша)
                ,'method'   : 'GET'
                ,'dataType' : 'json'
                ,'timeout'  : 20000 // макс. врем обработки запроса
                ,'data'     : {
                    // 'datetime' : c.datetime
                    // a,b (square, thickness, type) про эти парам сообщают бєкендеры
                    // ,'thickness' : c.thickness.val()
                    // ,'type'       : c.type.val()
                }
                , 'success' : function (oServerResponse) { // Для бизнес логики
                    // debugger; // ключевое слово для брекпоинта
                    c.addNewsItems(oServerResponse);
                    // console.debug(c.elem);
                    // console.log("succes");
                    c.flag = false;
                }
                , 'error'   : function (oAjax) {
                    console.error('error ?');
                    //alert('Проблемы с расчетами, повторите попытку позже');
                    // debugger;
                }
                , 'complete': function (oAjax) { // Обьеденяет Succes и Error . Техническая логика
                    // debugger;

                    if(oAjax.status == 200) { // 200 = OK
                        if ( typeof(oAjax.responseJSON) == 'undefined'){
                            console.error('could not parse server response as JSON object', oAjax.responseText);
                            // c.status('error', 'could not parse server response as JSON object');
                        }
                        else {
                            //c.elem.addClass("b-calc_status_ok");
                            // c.status('ok');
                        }

                    }
                    else if (oAjax.statusText == "timeout") {
                        console.error('AJAX request timed out');
                        //c.elem.addClass("b-calc_status_ok");
                        // c.status('error', 'AJAX request timed out');
                    }
                    else if (oAjax.status == 403) { // access forbidden
                        console.error('access forbidden');
                        //c.elem.addClass("b-calc_status_error");
                        // c.status('error', 'access forbidden');
                    }
                    else {
                        console.error("Unpredicated error", oAjax);
                        // c.status('error', 'Unpredicated error');
                    }
                }
            });
        }
    }

    $(window).bind('scroll', c.getNewsItems);
}
ajaxNews.prototype = new component();