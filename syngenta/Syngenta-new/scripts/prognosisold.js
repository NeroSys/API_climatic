"use strict";

var fieldsInfoJSON = {
    'id-pole_1.1.1' : {
        'location' : {'lat':48.660098465508256, 'lng':32.75848388671875}
        ,'name' : '1.1.1'
        ,'culture' : { "cul_id" : "NAmefield"}
        ,'stations' : [
            { "id_stancii" : '17263176'
                ,"name"       : 'Puma'
                ,"dangers"    : {
                "id_danger_1" : ["Тля:30%","Рекомендовано подальший моніторинг ситуації"]
                ,"id_danger_2" : ["Мошка:60%","Рекомендовано подальший моніторинг ситуації"]
                ,"id_danger_3" : ["Саранча:30%","Рекомендовано подальший моніторинг ситуації"]
            }
            }
            ,{ "id_stancii" : '1701037'
                ,"name"       : 'Sirius'
                ,",dangers"    : {
                    "id_danger_1" : ["Коростоа:30%","Рекомендовано подальший моніторинг ситуації"]
                    ,"id_danger_2" : ["Мошка:60%","Рекомендовано подальший моніторинг ситуації"]
                    ,"id_danger_3" : ["Саранча:30%","Рекомендовано подальший моніторинг ситуації"]
                }
            }
        ]
    }
    ,'id-pole_1.1.2' : {
        'location' : {'lat':48.76340097088824,  'lng':32.354736328125}
        ,'name' : '1.1.2'
        ,'culture' : { "cul_id" : "NAmefield2"}
        ,'stations' : [
            { "id_stancii" : '17263176'
                ,"name"       : 'Puma'
                ,"dangers"    : {
                "id_danger_1" : ["Тля:30%","Рекомендовано подальший моніторинг ситуації"]
                ,"id_danger_2" : ["Мошка:60%","Рекомендовано подальший моніторинг ситуації"]
                ,"id_danger_3" : ["Саранча:30%","Рекомендовано подальший моніторинг ситуації"]
            }
            }
            ,{ "id_stancii" : '1701037'
                ,"name"       : 'Sirius'
                ,"dangers"    : {
                    "id_danger_1" : ["Коростоа:30%","Рекомендовано подальший моніторинг ситуації"]
                    ,"id_danger_2" : ["Мошка:60%","Рекомендовано подальший моніторинг ситуації"]
                    ,"id_danger_3" : ["Саранча:30%","Рекомендовано подальший моніторинг ситуації"]
                }
            }
        ]
    }
    ,'id-pole_1.1.3' : {
        'location' : {'lat':48.614723427841376, 'lng':32.65960693359375}
        ,'name' : '1.1.3'
        ,'culture' : { "cul_id" : "NAmefield3"}
        ,'stations' : [
            { "id_stancii" : '17263176'
                ,"name"       : 'Puma'
                ,"dangers"    : {
                "id_danger_1" : ["Тля:30%","Рекомендовано подальший моніторинг ситуації"]
                ,"id_danger_2" : ["Мошка:60%","Рекомендовано подальший моніторинг ситуації"]
                ,"id_danger_3" : ["Саранча:30%","Рекомендовано подальший моніторинг ситуації"]
            }
            }
            ,{ "id_stancii" : '1701037'
                ,"name"       : 'Sirius'
                ,"dangers"    : {
                    "id_danger_1" : ["Коростоа:30%","Рекомендовано подальший моніторинг ситуації"]
                    ,"id_danger_2" : ["Мошка:60%","Рекомендовано подальший моніторинг ситуації"]
                    ,"id_danger_3" : ["Саранча:30%","Рекомендовано подальший моніторинг ситуації"]
                }
            }
        ]
    }

};



var  map
    ,staionCultures  = []
    ,stationsObj     = []
    ,fieldsObj       = []
    ,jsonFieldsObj   = []
    ,stationImg      = "/img/marker-station-small.png"
    ,fieldImg        = "/img/marker-green.png"
    ,inputLat        = $('.input_latitude')
    ,inputLng        = $('.input_longitude')
    ,UkraineId       = "ChIJjw5wVMHZ0UAREED2iIQGAQA"
    ,geoResult       = {}
    ;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-app__map1'),
        {
            zoom: 7,
            center: {lat: 49.265664, lng: 31.594070},
            scrollwheel: false,
            mapTypeControl: false,
            panControl: false,
            disableDefaultUI: false,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: true,
            streetViewControl: false
        });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;


    // MAP Events ====================================
    if ( stationsJSON.length > 0) {
        for ( var i=0; i < stationsJSON.length; i++ ) {
            addStationMarker(stationsJSON[i].location, stationsJSON[i].name, stationsJSON[i].staionId);
        }
    }
    else {
        alert("Ошибка данных о метеостанциях");
    }
    console.log(Object.keys(fieldsJSON).length);
    if ( Object.keys(fieldsJSON).length) {
        addAllFieldsMarkers(fieldsJSON);
    }
    else {
        alert("Ошибка данных о всех полях");
    }

    map.addListener('click', function(event) {
        console.log("click on map");
        var  curLocation = {}
        // ,geoResult   = {}
            ;
        if ( $("#hidden-block_form-field").hasClass('show') ) {
            curLocation = {lat: event.latLng.lat(), lng: event.latLng.lng()};
            inputLat.val(event.latLng.lat());
            inputLng.val(event.latLng.lng());
            // console.log("curLOcation "+ "'lat':"+ curLocation.lat + ","+"'lng':" + curLocation.lng);

            if ( !fieldsObj.length ) {
                var curMarker = addFieldMarker(curLocation, 100, map, fieldsObj, true, "id")
                    ,requestComplite = false
                    ,requestGetDistrictComplite = false
                    ;
                // findStation(curMarker, stationsObj);
                findStation(curMarker, stationsObj, s9);
                findStation(curMarker, stationsObj, s23);
                findStation(curMarker, stationsObj, s24);
                geocodeLatLng( geocoder, map, infowindow, curLocation, function (obj) {
                        geoResult = obj;
                        requestComplite = true;
                        return geoResult;
                    }
                );
                var timerReq = setInterval( function() {
                        if ( requestComplite == true ) {
                            // console.log("REQUESST TRUUEEE!!");
                            getDistrict( geoResult.regId, s8, function () {
                                    requestGetDistrictComplite = true;
                                }
                            ); //
                            var regOptions = $("#select-block_7").find("select").children("option");
                            for(var i=0; i < regOptions.length; i++) {
                                if ( $(regOptions[i]).attr("value") == geoResult.regId ) {
                                    var regSelect = regOptions[i];
                                    break;
                                }
                            }
                            // var regSelect = $("#select-block_7").find("select").children("option[value=\"" + geoResult.regId + "\"]");
                            console.log('reg')
                            s7.itemCliker( $(regSelect) );
                            clearInterval(timerReq);
                        }
                    }
                    ,100
                );
                var timerReqDistr = setInterval( function() {
                        if ( requestGetDistrictComplite == true ) {
                            // console.log("KEKE requestGetDistrictComplite = " + requestGetDistrictComplite);
                            // debugger;
                            // var distrSelect = $("#select-block_8").find("select").children("option[value=\"" + geoResult.disId + "\"]");
                            var disOptions = $("#select-block_8").find("select").children("option");
                            for(var i=0; i < disOptions.length; i++) {
                                if ( $(disOptions[i]).attr("value") == geoResult.disId ) {
                                    var distrSelect = disOptions[i];
                                    break;
                                }
                            }
                            console.log( "Index after for DistrSelect" + $(distrSelect).index() );
                            s8.itemCliker( $(distrSelect) );
                            clearInterval(timerReqDistr);
                        }
                    }
                    ,100
                );
            }
            else {
                return;
            }
            google.maps.event.addListener(curMarker, "dragend", function (mEvent) {
                var  dragLocation = {lat: mEvent.latLng.lat(), lng: mEvent.latLng.lng()}
                    ,requestComplite = false
                    ,requestGetDistrictComplite = false
                    ;
                inputLat.val(mEvent.latLng.lat());
                inputLng.val(mEvent.latLng.lng());
                console.log("dragLOcation "+ "'lat':"+ dragLocation.lat + ","+"'lng':" + dragLocation.lng);
                // findStation(curMarker, stationsObj);
                findStation(curMarker, stationsObj, s9);
                findStation(curMarker, stationsObj, s23);
                findStation(curMarker, stationsObj, s24);
                geocodeLatLng( geocoder, map, infowindow, dragLocation, function (obj) {
                        geoResult = obj;
                        requestComplite = true;
                        return geoResult;
                    }
                );
                var timerReq = setInterval( function() {
                        if ( requestComplite == true ) {
                            // console.log("REQUESST TRUUEEE!!");
                            getDistrict( geoResult.regId, s8, function () {
                                    requestGetDistrictComplite = true;
                                }
                            ); //
                            var regOptions = $("#select-block_7").find("select").children("option");
                            for(var i=0; i < regOptions.length; i++) {
                                if ( $(regOptions[i]).attr("value") == geoResult.regId ) {
                                    var regSelect = regOptions[i];
                                    break;
                                }
                            }
                            // var regSelect = $("#select-block_7").find("select").children("option[value=\"" + geoResult.regId + "\"]");
                            console.log('reg')
                            s7.itemCliker( $(regSelect) );
                            clearInterval(timerReq);
                        }
                    }
                    ,100
                );
                var timerReqDistr = setInterval( function() {
                        if ( requestGetDistrictComplite == true ) {
                            // console.log("KEKE requestGetDistrictComplite = " + requestGetDistrictComplite);
                            // debugger;
                            // var distrSelect = $("#select-block_8").find("select").children("option[value=\"" + geoResult.disId + "\"]");
                            var disOptions = $("#select-block_8").find("select").children("option");
                            for(var i=0; i < disOptions.length; i++) {
                                if ( $(disOptions[i]).attr("value") == geoResult.disId ) {
                                    var distrSelect = disOptions[i];
                                    break;
                                }
                            }
                            console.log( "Index after for DistrSelect" + $(distrSelect).index() );
                            s8.itemCliker( $(distrSelect) );
                            clearInterval(timerReqDistr);
                        }
                    }
                    ,100
                );
            });
            console.log(curLocation);
        }
    });

    // $(".danger-radius").bind('click', function(event) {
    //     console.log("click on marker");
    //     $('#hidden-block_info-field').toggleClass('show');
    //     $('#hidden-block_form-field').removeClass('show');
    // });
    $('.hidden-block__close-btn').bind('click', function (event) {
        event.preventDefault();
        var  inputLat = $('.input_latitude')
            ,inputLng = $('.input_longitude')
            ,inputName = $('.input_name')
            ;
        inputLat.add(inputLng).val("");
        inputName.val("");
        s7.delCustomSelect();
        s8.delCustomSelect();
        s9.delCustomSelect();
        s23.delCustomSelect();
        s24.delCustomSelect();
        s7  = new Selectblock('#select-block_7');
        s8  = new Selectblock('#select-block_8');
        s9  = new Selectblock('#select-block_9');
        s23 = new Selectblock('#select-block_23');
        s24 = new Selectblock('#select-block_24');
        $(this).closest('.map-app__hidden-block').removeClass('show');
        deleteFieldMarkers();
    });

    $('.map-app__filters').find('select[name="regions"]').on("change", function () {
        var placeId = $(this).children('option[selected="selected"]').attr("value");
        if( placeId !== "all") {
            geocodePlaceId(geocoder, map, infowindow, placeId, 9);
            getDistrict(placeId, s2);
            showSortMarkers(fieldsJSON, placeId, "", "");
        }
        else {
            alert("placeId = all" );
            showSortMarkers(fieldsJSON, placeId, "", "all");
        }
    });
    $('.map-app__filters').find('select[name="areas"]').on("change", function (event) {
        var placeId = $(this).children('option[selected="selected"]').attr("value");
        var curplaceIdRegion = $('.map-app__filters').find('select[name="regions"]')
            .children('option[selected="selected"]')
            .attr("value");
        geocodePlaceId(geocoder, map, infowindow, placeId, 11);
        showSortMarkers(fieldsJSON, curplaceIdRegion, placeId, "");
        // if( placeId !== "all") {
        //   geocodePlaceId(geocoder, map, infowindow, placeId);
        // }
        // else {
        //   alert("placeId = all" );
        // }
    });
    $("#select-block_7").find("select").on("change", function (event) {

    });
// END MAP Events ====================================

} // END initMap ++++++++++++++++++

// GLOBAL Events ====================================
google.maps.event.addDomListener(window, "load", initMap); // init map

var tmrBindClick = window.setInterval(function () { // waiting
    if ( $(".danger-radius").length > 0 ) {
        console.debug($(".danger-radius"));
        setFields(fieldsInfoJSON, s3);// обновление селекта полей
        $(".danger-radius").bind('click', function(event) {
            console.log("click on marker");
            $('#hidden-block_info-field').toggleClass('show');
            $('#hidden-block_form-field').removeClass('show');
        });

        clearInterval(tmrBindClick);
    }
    else {
        console.log("No markers");
    }
}, 100);
// setCulture(culturesJSON, s11);


$("#select-block_9").find("select").on("change", function (event) {
    var stationId = $(this).children('option[selected="selected"]').attr("value");
    // getCulture(stationId);
});
$("#select-block_11").find("select").on("change", function (event) {
    var cultureId = $(this).children('option[selected="selected"]').attr("value");
    // getDangers(staionCultures, cultureId);
});
(function ($) {
    var addfield = $('.map-app__add-btn');

    addfield.bind('click', function (event) {
        event.preventDefault();

        setCulture(culturesJSON, s11); // обновление селекта станции
        $('#hidden-block_form-field').toggleClass('show');
        $('#hidden-block_info-field').removeClass('show');
    });
})($);

(function ($) {
    // debugger;
    var  dangersBlock  = $("#danger-group_1")
        ,select        = dangersBlock.find('select')
        ,selectedList  = dangersBlock.find('.selected-list')
        ,helpBtn       = dangersBlock.find('.selected-list__item-help-btn')
        ,addBtn        = dangersBlock.find('.btn_add-danger')
        ;

    var addSelectedItem = function (event) {
        event.preventDefault();
        // var dataValue = dangersBlock.find(".select-block__item").data("value");
        var dataValue = dangersBlock.find(".select-block__item").attr("data-value");
        console.log('data-value' + dataValue);
        if ( dataValue !== "hide" ) {
            var  optionText = select.children('option[selected="selected"]').html()
                ,jqItem = selectedList.children(".selected-list__item:first-child")
                    .clone()
                    .appendTo(selectedList)
                ;
            jqItem.find('.selected-list__item-text').html(optionText);
            jqItem.find('.selected-list__item-close-btn').bind('click', delItem);
        }
        else {
            return;
        }
    }
    var delItem = function (event) {
        var curItem = $(this).parent(".selected-list__item");
        curItem.remove();
    }
    addBtn.bind('click', addSelectedItem);
})($);

// END GLOBAL Events ====================================

// logic ==============================================================
function setFields (fieldsInfoJSON, oSelectBlock) {
    if ( Object.keys(fieldsInfoJSON).length) {
        var arrSelect = [];
        var count = 0;
        for(var key in fieldsInfoJSON) {
            arrSelect[count] = {
                "name" : fieldsInfoJSON[key].name
                ,"val"  : key
            };
            count++;
        }
        oSelectBlock.refreshSelect(arrSelect, oSelectBlock);
    }
    else {
        alert("Ошибка данных о всех полях!!!");
    }
}
function getDistrict (sPlaceId, oSelectBlock, callback) {
    var arrSelect = [];
    var lang = $("html").attr('lang');
    var oAjax = $.ajax({
        'url'      :'/'+lang+'/forecast/default/ajax-regions.html?place_id='+sPlaceId // С‡С‚РѕР± РєР°Р¶РґС‹Р№ СЂР°Р· РЅРѕРІ С„Р°Р№Р» (Р·Р°РїСЂРµС‚ РєРµС€Р°)
        ,'method'   : 'GET'
        ,'dataType' : 'json'
        ,'timeout'  : 1000 // РјР°РєСЃ. РІСЂРµРј РѕР±СЂР°Р±РѕС‚РєРё Р·Р°РїСЂРѕСЃР°
        ,'data'     : {
            // "placeId" : sPlaceId
        }
        , 'success' : function (oServerResponse) { // Для бизнес логики
            // debugger; // ключевое слово для брекпоинта
            var count = 0;
            for (var key in oServerResponse) { // Переводим массив к нужному формату для refreshSelect
                arrSelect[count] = {
                    "name" : oServerResponse[key]
                    ,"val"  : key
                };
                count++;
            }
            // s2.refreshSelect(arrSelect, s2); // Обновление cелекта районов
            oSelectBlock.refreshSelect(arrSelect, oSelectBlock); // Обновление cелекта районов
            // flagRq = false;
            if ( callback ) {
                // console.log('callback exist!!');
                callback();
            }
            else {
                // console.log('callback NOT exist!!!');
            }
            // console.log("succes");
        }
        , 'error'   : function (oAjax) {
            alert('Проблемы с расчетами, повторите попытку позже');
        }
        , 'complete': function (oAjax) { // Обьеденяет Succes и Error . Техническая логика
            if(oAjax.status == 200) { // 200 = OK
                if ( typeof(oAjax.responseJSON) == 'undefined'){
                    console.error('could not parse server response as JSON object', oAjax.responseText);
                }
                else {}
            }
            else if (oAjax.statusText == "timeout") {
                console.error('AJAX request timed out');
            }
            else if (oAjax.status == 403) { // access forbidden
                console.error('access forbidden');
            }
            else {
                console.error("Unpredicated error", oAjax);
            }
        }
    });
}
function setCulture (aCultures, oCultureSelect) {
    var arrSelect = [];
    console.debug(aCultures);
    aCultures.forEach(function (item,i,arr) {
        arrSelect[i] = {
            "name" : item.name
            ,"val"  : item.idCulture
        };
    });
    oCultureSelect.refreshSelect(arrSelect, oCultureSelect); // Обновление cелекта культур
}
function getCulture (sStationId) {
    var arrSelect = [];
    var oAjax = $.ajax({
        'url'      : 'culturesJSON.json?t-' + new Date().getTime() // чтоб каждый раз нов файл (запрет кеша)
        ,'method'   : 'POST'
        ,'dataType' : 'json'
        ,'timeout'  : 1000 // макс. врем обработки запроса
        ,'data'     : {
            "stationId" : sStationId
        }
        , 'success' : function (oServerResponse) { // Для бизнес логики
            // debugger; // ключевое слово для брекпоинта
            staionCultures = oServerResponse;
            oServerResponse.forEach(function (item,i,arr) {
                arrSelect[i] = {
                    "name" : item.name
                    ,"val"  : item.idCulture
                };
            });
            s11.refreshSelect(arrSelect, s11); // Обновление cелекта культур
            // console.log("succes");
        }
        , 'error'   : function (oAjax) {
            alert('Проблемы с расчетами, повторите попытку позже');
        }
        , 'complete': function (oAjax) { // Обьеденяет Succes и Error . Техническая логика
            if(oAjax.status == 200) { // 200 = OK
                if ( typeof(oAjax.responseJSON) == 'undefined'){
                    console.error('could not parse server response as JSON object', oAjax.responseText);
                }
                else {}
            }
            else if (oAjax.statusText == "timeout") {
                console.error('AJAX request timed out');
            }
            else if (oAjax.status == 403) { // access forbidden
                console.error('access forbidden');
            }
            else {
                console.error("Unpredicated error", oAjax);
            }
        }
    });
}

function getDangers (aCultures, cultureId) {
    // debugger;
    var  arrSelect = []
        ,arrDangers = []
        ,count = 0
        ;
    for (var i=0; i < aCultures.length; i++) {
        if ( aCultures[i].idCulture == cultureId ) {
            arrDangers = aCultures[i].dangers;
            break;
        }
    }

    for (var key in arrDangers) { // Переводим массив к нужному формату для refreshSelect
        arrSelect[count] = {
            "name" : arrDangers[key]
            ,"val"  : key
        };
        count++;
    }
    s12.refreshSelect(arrSelect, s12); // Обновление cелекта угроз
}

function geocodePlaceId(geocoder, map, infowindow, placeId, zoom) {
    geocoder.geocode({'placeId': placeId}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                // map.setZoom(11);
                map.setZoom(zoom);
                map.setCenter(results[0].geometry.location);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}
function geocodeLatLng(geocoder, map, infowindow, latlng, callback) {
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var  placeIdDistrict = null
                ,placeIdRegion   = null
                ,placeIdCountry  = null
                ;
            if (results[1]) {
                // console.debug(results[0]);
                // console.debug(results[1]);
                // console.debug(results[2]);
                // console.debug(results[3]);
                // console.debug(results[4]);
                // console.debug(results[5]);
                // console.debug(results[6]);
                // console.debug(results[7]);
                for ( var i=0; i < results.length; i++) {
                    if ( results[i].types[0] == "administrative_area_level_2" ) {
                        placeIdDistrict = results[i].place_id;
                    }
                    else if (results[i].types[0] == "administrative_area_level_1") {
                        placeIdRegion = results[i].place_id;
                    }
                    else if ( results[i].types[0] == "country" ) {
                        placeIdCountry = results[i].place_id;
                    }
                }
                console.log("placeIdDistrict = " + placeIdDistrict);
                console.log("placeIdRegion   = " + placeIdRegion);
                console.log("placeIdCountry  = " + placeIdCountry);
                results = [];
                if ( placeIdRegion == null || placeIdDistrict == null || placeIdCountry !== UkraineId ) {
                    window.alert("Текущая геолокация не обслуживается системой");
                }
                else {
                    // oResult = { "regId" : placeIdRegion, "disId" : placeIdDistrict };
                    // console.debug(oResult);
                    // geoResult = { "regId" : placeIdRegion, "disId" : placeIdDistrict };
                    // console.debug(geoResult);
                    callback({ "regId" : placeIdRegion, "disId" : placeIdDistrict });
                }
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}
// Adds a marker to the map and push to the array.
function addStationMarker(location, sStationName, sStationId) {
    var markerStation = new google.maps.Marker({
        position: location,
        map: map,
        name: sStationName,
        stationId: sStationId,
        icon: stationImg
    });
    stationsObj.push(markerStation);
}
function addAllFieldsMarkers (jsonArray, callback) {

    console.log("addAllFieldsMarkers");
    for(var region in jsonArray) {
        // console.log(typeof jsonArray[region]);
        // alert( "PlacId Region " + ": " + region );
        for(var district in jsonArray[region]) {
            // alert("PlacId District " + ": " + district);
            for(var field in jsonArray[region][district]) {
                // alert("PlacId Field " + ": " + field);
                addFieldMarker(jsonArray[region][district][field].location, 100, map, jsonFieldsObj, false, field);
            }
        }
    }
    if ( callback ) {
        // console.log('callback exist!!');
        callback();
    }
    else {
        // console.log('callback NOT exist!!!');
    }
}
function  showSortMarkers (jsonArray, sPlaceIdRegion, sPlaceIdDistrict, sAllValue) {
    if ( sPlaceIdDistrict == "" && sAllValue !== "all" ) {
       // alert("SHOW ALL MARKERS BY REGION");
        hideFieldMarkers();
        for(var district in jsonArray[sPlaceIdRegion]) {
            // alert("PlacId District " + ": " + district);
            for(var field in jsonArray[sPlaceIdRegion][district]) {
                // alert("PlacId Field " + ": " + field);
                addFieldMarker(jsonArray[sPlaceIdRegion][district][field].location, 100, map, jsonFieldsObj, false, field);
            }
        }
    }
    else if (sPlaceIdDistrict !== "" && sAllValue !== "all") {
       // alert("SHOW ALL MARKERS BY DISTRICT");
        hideFieldMarkers();
        for(var field in jsonArray[sPlaceIdRegion][sPlaceIdDistrict]) {
            // alert("PlacId Field " + ": " + field);
            addFieldMarker(jsonArray[sPlaceIdRegion][sPlaceIdDistrict][field].location, 100, map, jsonFieldsObj, false, field);
        }
    } else {
        alert("SHOW ALL MARKERS");
        hideFieldMarkers();
        addAllFieldsMarkers (jsonArray);
    }
}
function addFieldMarker (oCoords, radius, map, aObj, bDraggable, id) {
    // console.log("addCircles");

    var markerFieldClass = "danger-radius danger-radius_id_" + id;
    var markerField = new MarkerWithLabel({
        position: oCoords,
        icon: fieldImg,
        draggable: bDraggable,
        labelClass: markerFieldClass,
        zIndex: 10000,
        map: map
    });
    aObj.push(markerField);
    return markerField;
}
// function findStation (oMarker, aStations) {
function findStation (oMarker, aStations, oStationSelect) {

    var  distance    = 0
        ,maxDistance = 100000
        ,markersRad  = []
        ,arrSelect   = []
        ;
    for (var i = 0; i < aStations.length; i++) {
        distance = google.maps.geometry.spherical
            .computeDistanceBetween(oMarker.getPosition(), aStations[i].getPosition()); // считает растояние между точками
        if (distance <= maxDistance) {
            markersRad.push({
                "marker" : aStations[i]
                ,"dist" : Math.ceil(distance)
            });
        }
        else { continue; }
    }
    if (markersRad.length > 0) {

        markersRad.sort(sortMarkers); // сортируем массив по дистанции от мин до макс
        for ( var i=0; i < markersRad.length; i++) { // Переводим массив к нужному формату для refreshSelect
            arrSelect[i] = {
                "name" : markersRad[i].marker.name
                ,"val"  : markersRad[i].marker.stationId
            };
        }

        // s9.refreshSelect(arrSelect, s9); // Обновление cелекта станции
        oStationSelect.refreshSelect(arrSelect, oStationSelect); // Обновление cелекта станции
        // showNearestMarker(oMarker, markersRad[0].marker);

        // console.debug(markersRad.sort(sortMarkers));
        //  var stationCircle = new google.maps.Circle({
        //      strokeColor: '#3367D6',
        //      strokeOpacity: 0.8,
        //      strokeWeight: 2,
        //      fillColor: '#3367D6',
        //      fillOpacity: 0.35,
        //      map: map,
        //      center: oMarker.getPosition(),
        //      radius: maxDistance
        //      // radius: Math.ceil(distance)
        //   });
        //   console.log('distance ', distance);
        // return stationCircle;
    }
    else {
        s9.refreshSelect(arrSelect, s9); // Обновление cелекта станции
       // alert("Нету метеостанций по близости");
    }
}
function sortMarkers (markerA, markerB) {
    return markerA.dist - markerB.dist;
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < fieldsObj.length; i++) {
        fieldsObj[i].setMap(map);
    }
    // for (var i = 0; i < circles.length; i++) {
    //   circles[i].setMap(map);
    // }
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}
// Deletes all markers in the array by removing references to them.
function deleteFieldMarkers() {
    console.log("delete");
    clearMarkers();
    fieldsObj = [];
}

function hideFieldMarkers () {
    for (var i=0; i < jsonFieldsObj.length; i++) {
        jsonFieldsObj[i].setMap(null);
    }
    jsonFieldsObj = [];
}



//----------------------------------------
// function hideCircles (oMarker, oMap) {
//     var  markerClass = oMarker.labelClass
//         ,htmlMarker = document.getElementsByClassName(markerClass);
//         ;
//         // console.log("markerClass " + markerClass);
//         // console.log('htmlMarker ' + htmlMarker[0]);
//         console.debug(htmlMarker[0]);
//         htmlMarker[0].className = "hidden";
//   }

// function showNearestMarker(oMeteoStation, oNearestMarker) {
//       var flightPath = new google.maps.Polyline({
//         path: [ oMeteoStation.getPosition(), oNearestMarker.getPosition() ],
//         geodesic: true,
//         animation: google.maps.Animation.DROP,
//         strokeColor: '#FF0000',
//         strokeOpacity: 1.0,
//         strokeWeight: 2
//       });
//     flightPath.setMap(map);
// 	}

// function findMarker (oMeteoStation, aMarkers) {

//     var    distance = 0
//          // , maxDistance = 100000
//          , maxDistance = 25000
//          , markersRad = [];
//          ;
//     for (var i = 0; i < aMarkers.length; i++) {
//       distance = google.maps.geometry.spherical
//                       .computeDistanceBetween(oMeteoStation.getPosition(), aMarkers[i].getPosition()); // считает растояние между точками
//       if (distance <= maxDistance) {
//           markersRad.push({
//              "marker" : aMarkers[i]
//             ,"dist" : Math.ceil(distance)
//             });
//       }
//       else { continue; }
//     }
//     // console.debug(markersRad);
//     console.log(markersRad[0].marker);
//     markersRad.sort(sortMarkers); // сортируем массив по дистанции от мин до макс
//     showNearestMarker(oMeteoStation, markersRad[0].marker);

//     console.debug( markersRad.sort(sortMarkers) );
//      var stationCircle = new google.maps.Circle({
//          strokeColor: '#3367D6',
//          strokeOpacity: 0.8,
//          strokeWeight: 2,
//          fillColor: '#3367D6',
//          fillOpacity: 0.35,
//          map: map,
//          center: oMeteoStation.getPosition(),
//          radius: maxDistance
//          // radius: Math.ceil(distance)
//       });
//       console.log('distance ', distance);
//   }
// function addCircles (oCoords, radius, map, id) {
//     console.log("addCircles");
//     // var circle = new google.maps.Circle({
//     //     strokeColor: '#FF0000',
//     //     strokeOpacity: 0.8,
//     //     strokeWeight: 2,
//     //     fillColor: '#FF0000',
//     //     fillOpacity: 0.35,
//     //     map: map,
//     //     center: oCoords,
//     //     radius: radius * 10
//     //   });
//     var circleClass = "danger-radius danger-radius_" + id;
//     var circle = new MarkerWithLabel({
//       position: oCoords,
//       icon: image,
//       draggable: true,
//       // labelContent: "<img src='img/marker-green.png'>",
//       // labelAnchor: new google.maps.Point(95, 20),
//       // labelClass: "danger-radius danger-radius_" + (key++),
//       labelClass: circleClass,
//       // labelId: "danger-radius_1",
//       // labelStyle: {
//       //     // opacity: 0.75
//       //    'z-index' : 999998
//       // },
//       zIndex: 10000,
//       map: map
//     })
//     circles.push(circle);
//   }
//    // Adds a marker to the map and push to the array.
//   function addMarker(location) {
//     var marker = new google.maps.Marker({
//       position: location,
//       map: map,
//       // animation: google.maps.Animation.DROP,
//       // zIndex: 999999,
//       icon: imagerg
//     });
//     markers.push(marker);
//   }

//   // // Sets the map on all markers in the array.
//   // function setMapOnAll(map) {
//   //   for (var i = 0; i < markers.length; i++) {
//   //     markers[i].setMap(map);
//   //   }
//   //   for (var i = 0; i < circles.length; i++) {
//   //     circles[i].setMap(map);
//   //   }
//   // }
//   // // Removes the markers from the map, but keeps them in the array.
//   // function clearMarkers() {
//   //   setMapOnAll(null);
//   // }
//   // // Deletes all markers in the array by removing references to them.
//   // function deleteMarkers() {
//   //   console.log("delete");
//   //   clearMarkers();
//   //   markers = [];
//   //   circles = [];
//   // }




// (function ($) {
// 	var closeBtn = $('.hidden-block__close-btn')
// 		;
// 	closeBtn.bind('click', function (event) {
// 		event.preventDefault();
// 		$(this).closest('.map-app__hidden-block').removeClass('show');
// 	});
// })($);
// $(function(){
//   console.debug( $('select[name=areas]'));
//   $('select[name=areas]').on('change', function(){
//     alert("OK");
//   });

// });