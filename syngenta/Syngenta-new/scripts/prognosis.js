"use strict";

var bounds = new google.maps.LatLngBounds();
var
    map
    ,staionCultures  = []
    , curMarkerGlobal = null
	  ,stationsObj     = []
    ,fieldsObj       = []
    ,arFieldStations = []
	  ,jsonFieldsObj   = []
	  ,stationImg      = "/img/marker-station-small.png"
    ,fieldImg        = "/img/marker-green.png"
	  ,fieldImgOrange  = "/img/marker-orange.png"
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
  	scrollwheel: true,
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
  var contentString = '<div id="content-infowindow">  \
                        <p><p> \
                      </div>';

var infowindow = new google.maps.InfoWindow({
  content: contentString
});
// var ibOptions = {
//     		disableAutoPan: false
//     		,maxWidth: 0
//     		,pixelOffset: new google.maps.Size(-140, 0)
//     		,zIndex: null
//     		,boxStyle: {
//           padding: "0px 0px 0px 0px",
//           width: "252px",
//           height: "40px"
//         },
//         closeBoxURL : "",
//         infoBoxClearance: new google.maps.Size(1, 1),
//     		isHidden: false,
//     		pane: "floatPane",
//     		enableEventPropagation: false
//     	};
map["infowindow"] = infowindow ;

  // MAP Events ====================================

  if ( stationsJSON.length > 0) {
      var center = null;
	  for ( var i=0; i < stationsJSON.length; i++ ) {
	  	addStationMarker(stationsJSON[i].location, stationsJSON[i].name, stationsJSON[i].stationId,stationsJSON[i].cultures);
          var pt = new google.maps.LatLng(stationsJSON[i].location);
          bounds.extend(pt);

      }
      center = bounds.getCenter();
      map.panTo(center);
      map.fitBounds(bounds);

  }
  else {
    alert("Ошибка данных о метеостанциях");
  }
  //console.log(Object.keys(fieldsJSON).length);
  if ( Object.keys(fieldsJSON).length) {
    addAllFieldsMarkers(fieldsJSON);
  }
  else {
   // alert("Ошибка данных о всех полях");
  }

  findAllStation(jsonFieldsObj, stationsObj, arFieldStations); // AL STATIONS

  map.addListener("idle", function(){
      var latLng1 = map.getCenter().lat();
      var zoom1 = map.getZoom();

      var pxs  =  70000/(156543.03392 * Math.cos(latLng1 * Math.PI / 180) / Math.pow(2, zoom1));
      pxs = Math.floor(pxs) + Math.floor(pxs)%2;


      var Color_i =1;

      var timerColor = setInterval( function() {
              if (zoom1 < 8){
                  //  console.log('fsdf');
                  $(".danger-radius").css({
                      "width": String(pxs)+"px",
                      "height": String(pxs)+"px",
                      "margin-left": "-"+String(pxs/2)+ "px",
                      "margin-top": "-"+String(pxs/2)+ "px"

                  });
              } else {

                  $(".danger-radius").css({
                      "width": "100px",
                      "height": "100px",
                      "margin-left": "-50px",
                      "margin-top": "-50px"
                  });


              }
              Color_i++;
              if (Color_i == 15) {
                  clearInterval(timerColor);
              }
          }
          ,100
      );
     // console.log("map is idle");
      // setDangerGrad("id-pole_111", "100%", {});
      dangerGradRefresh();
  });

    map.addListener("zoom_changed", function(){
        var latLng1 = map.getCenter().lat();
        var zoom1 = map.getZoom();

        var pxs  =  70000/(156543.03392 * Math.cos(latLng1 * Math.PI / 180) / Math.pow(2, zoom1));
        pxs = Math.floor(pxs) + Math.floor(pxs)%2;


        if (zoom1 < 8){
          //  console.log('fsdf');
        $(".danger-radius").css({
            "width": String(pxs)+"px",
            "height": String(pxs)+"px",
            "margin-left": "-"+String(pxs/2)+ "px",
            "margin-top": "-"+String(pxs/2)+ "px"

        });
        } else {

                $(".danger-radius").css({
                    "width": "100px",
                    "height": "100px",
                    "margin-left": "-50px",
                    "margin-top": "-50px"
                });


        }
    });



  map.addListener('click', function(event) {
		//console.log("click on map");
    var  curLocation = {}
        // ,geoResult   = {}
        ;
    if ( $("#hidden-block_form-field").hasClass('show') ) {
		   curLocation = {lat: event.latLng.lat(), lng: event.latLng.lng()};
       inputLat.val(event.latLng.lat());
       inputLng.val(event.latLng.lng());
        // //console.log("curLOcation "+ "'lat':"+ curLocation.lat + ","+"'lng':" + curLocation.lng);

       if ( !fieldsObj.length ) {
            curMarkerGlobal = addFieldMarker(curLocation, 100, map, fieldsObj, true, "id", fieldImgOrange);
            var  requestComplite = false
              ,requestGetDistrictComplite = false
              ;
          // findStation(curMarker, stationsObj);
          findStation(curMarkerGlobal, stationsObj, s9,false);
          findStation(curMarkerGlobal, stationsObj, s23,false);
          findStation(curMarkerGlobal, stationsObj, s24,false);
          geocodeLatLng( geocoder, map, infowindow, curLocation, function (obj) {
                                                                            geoResult = obj;
                                                                            requestComplite = true;
                                                                            return geoResult;
                                                                            }
                                                                          );
          var timerReq = setInterval( function() {
                if ( requestComplite == true ) {
                  // //console.log("REQUESST TRUUEEE!!");
                  getDistrict( geoResult.regId, s8, function () {
                          getDistrict( geoResult.regId, s81, function () {
                                  requestGetDistrictComplite = true;
                              }
                          );
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
                  //console.log('reg')
                  s7.itemCliker( $(regSelect) );

                    var regOptions1 = $("#select-block_71").find("select").children("option");
                    for(var ii=0; ii < regOptions1.length; ii++) {
                        if ( $(regOptions1[ii]).attr("value") == geoResult.regId ) {
                            var regSelect1 = regOptions1[ii];
                            break;
                        }
                    }
                    // var regSelect = $("#select-block_7").find("select").children("option[value=\"" + geoResult.regId + "\"]");
                    //console.log('reg')
                    s71.itemCliker( $(regSelect1) );



                    clearInterval(timerReq);
                }
              }
              ,100
              );
          var timerReqDistr = setInterval( function() {
                if ( requestGetDistrictComplite == true ) {
                  // //console.log("KEKE requestGetDistrictComplite = " + requestGetDistrictComplite);
                  // debugger;
                  // var distrSelect = $("#select-block_8").find("select").children("option[value=\"" + geoResult.disId + "\"]");
                  var disOptions = $("#select-block_8").find("select").children("option");
                  for(var i=0; i < disOptions.length; i++) {
                     if ( $(disOptions[i]).attr("value") == geoResult.disId ) {
                        var distrSelect = disOptions[i];
                        break;
                     }
                  }
                  //console.log( "Index after for DistrSelect" + $(distrSelect).index() );
                  s8.itemCliker( $(distrSelect) );

                    var disOptions1 = $("#select-block_81").find("select").children("option");
                    for(var ii=0; ii < disOptions1.length; ii++) {
                        if ( $(disOptions1[ii]).attr("value") == geoResult.disId ) {
                            var distrSelect1 = disOptions1[ii];
                            break;
                        }
                    }
                    //console.log( "Index after for DistrSelect" + $(distrSelect).index() );
                    s81.itemCliker( $(distrSelect1) );

                  clearInterval(timerReqDistr);
                }
              }
              ,100
              );
       }
       else { 
          return; 
       }
       google.maps.event.addListener(curMarkerGlobal, "dragend", function (mEvent) {
          var  dragLocation = {lat: mEvent.latLng.lat(), lng: mEvent.latLng.lng()}
              ,requestComplite = false
              ,requestGetDistrictComplite = false
              ;
          inputLat.val(mEvent.latLng.lat());
          inputLng.val(mEvent.latLng.lng());
          //console.log("dragLOcation "+ "'lat':"+ dragLocation.lat + ","+"'lng':" + dragLocation.lng);
          // findStation(curMarker, stationsObj);
          findStation(curMarkerGlobal, stationsObj, s9,false);
          findStation(curMarkerGlobal, stationsObj, s23,false);
          findStation(curMarkerGlobal, stationsObj, s24,false);
          geocodeLatLng( geocoder, map, infowindow, dragLocation, function (obj) {
                                                                            geoResult = obj;
                                                                            requestComplite = true;
                                                                            return geoResult;
                                                                            } 
                                                                          );
          var timerReq = setInterval( function() {
                if ( requestComplite == true ) {
                  // //console.log("REQUESST TRUUEEE!!");
                  getDistrict( geoResult.regId, s8, function () {
                          getDistrict( geoResult.regId, s81, function () {
                                  requestGetDistrictComplite = true;
                              }
                          );
                                                            }
                                                          );
                     //
                  var regOptions = $("#select-block_7").find("select").children("option");
                  for(var i=0; i < regOptions.length; i++) {
                     if ( $(regOptions[i]).attr("value") == geoResult.regId ) {
                        var regSelect = regOptions[i];
                        break;
                     }
                  }
                  // var regSelect = $("#select-block_7").find("select").children("option[value=\"" + geoResult.regId + "\"]");
                  //console.log('reg')
                  s7.itemCliker( $(regSelect) );

                    var regOptions1 = $("#select-block_71").find("select").children("option");
                    for(var ii=0; ii < regOptions1.length; ii++) {
                        if ( $(regOptions1[ii]).attr("value") == geoResult.regId ) {
                            var regSelect1 = regOptions1[ii];
                            break;
                        }
                    }
                    // var regSelect = $("#select-block_7").find("select").children("option[value=\"" + geoResult.regId + "\"]");
                    //console.log('reg')
                    s71.itemCliker( $(regSelect1) );

                  clearInterval(timerReq);                      
                }
              }
              ,100
              );
          var timerReqDistr = setInterval( function() {
                if ( requestGetDistrictComplite == true ) {
                  // //console.log("KEKE requestGetDistrictComplite = " + requestGetDistrictComplite);
                  // debugger;
                  // var distrSelect = $("#select-block_8").find("select").children("option[value=\"" + geoResult.disId + "\"]");
                  var disOptions = $("#select-block_8").find("select").children("option");
                  for(var i=0; i < disOptions.length; i++) {
                     if ( $(disOptions[i]).attr("value") == geoResult.disId ) {
                        var distrSelect = disOptions[i];
                        break;
                     }
                  }
                  //console.log( "Index after for DistrSelect" + $(distrSelect).index() );
                  s8.itemCliker( $(distrSelect) );

                    var disOptions1 = $("#select-block_81").find("select").children("option");
                    for(var ii=0; ii < disOptions1.length; ii++) {
                        if ( $(disOptions1[ii]).attr("value") == geoResult.disId ) {
                            var distrSelect1 = disOptions1[ii];
                            break;
                        }
                    }
                    //console.log( "Index after for DistrSelect" + $(distrSelect).index() );
                    s81.itemCliker( $(distrSelect1) );
                  clearInterval(timerReqDistr);
                }
              }
              ,100
              );
        });
    }
	});

  $('.hidden-block__close-btn').bind('click', function (event) {
    event.preventDefault();
    var  inputLat = $('.input_latitude') 
        ,inputLng = $('.input_longitude')
        ,inputName = $('.input_name')
        ;
    inputLat.add(inputLng).val("");
    inputName.val("");
    s7.delCustomSelect();
      s71.delCustomSelect();
    s8.delCustomSelect();
      s81.delCustomSelect();
    s9.delCustomSelect();
    s23.delCustomSelect();
    s24.delCustomSelect();
    s7  = new Selectblock('#select-block_7');
      s71  = new Selectblock('#select-block_71');
    s8  = new Selectblock('#select-block_8');
      s81  = new Selectblock('#select-block_81');
    s9  = new Selectblock('#select-block_9');
    s23 = new Selectblock('#select-block_23');
    s24 = new Selectblock('#select-block_24');
    s5.refreshSelect([], s5);
    s6.refreshSelect([], s6);

    $(this).closest('.map-app__hidden-block').removeClass('show');
    deleteFieldMarkers();
  });

  $('.map-app__filters').find('select[name="regions"]').on("change", function () {
    var placeId = $(this).children('option[selected="selected"]').attr("value");
    if( placeId !== "all") {
      geocodePlaceId(geocoder, map, infowindow, placeId, 8);
      getDistrict(placeId, s2);
      showSortMarkers(fieldsJSON, placeId, "", "");
      var tmrBindClick = window.setInterval(function () { // waiting 
          if ( $(".danger-radius").length > 0 ) {
                //console.debug($(".danger-radius"));
                setFields(fieldsInfoJSON, s3);// обновление селекта полей
                $(".danger-radius").bind('click', dangerRadiusClick);
                clearInterval(tmrBindClick);
                getDangerGradMax(fieldsInfoJSON);
              }
              else {
                //console.log("No markers");
              }
        }, 100);
    }
    else {
    //  alert("placeId = all" );
      geocodePlaceId(geocoder, map, infowindow, UkraineId, 6);
      showSortMarkers(fieldsJSON, placeId, "", "all");
      s2.refreshSelect([], s2);
      var tmrBindClick = window.setInterval(function () { // waiting 
          if ( $(".danger-radius").length > 0 ) {
                //console.debug($(".danger-radius"));
                setFields(fieldsInfoJSON, s3);// обновление селекта полей
                $(".danger-radius").bind('click', dangerRadiusClick);
                clearInterval(tmrBindClick);
                getDangerGradMax (fieldsInfoJSON);
              }
              else {
                //console.log("No markers");
              }
        }, 100);

    }
  });
  $('.map-app__filters').find('select[name="areas"]').on("change", function (event) {
    var placeId = $(this).children('option[selected="selected"]').attr("value");
    var curplaceIdRegion = $('.map-app__filters').find('select[name="regions"]')
                                                 .children('option[selected="selected"]')
                                                 .attr("value");
    geocodePlaceId(geocoder, map, infowindow, placeId, 10);
    showSortMarkers(fieldsJSON, curplaceIdRegion, placeId, "");
    var tmrBindClick = window.setInterval(function () { // waiting 
      if ( $(".danger-radius").length > 0 ) {
              //console.debug($(".danger-radius"));
              setFields(fieldsInfoJSON, s3);// обновление селекта полей
              $(".danger-radius").bind('click', dangerRadiusClick);
              clearInterval(tmrBindClick);
              getDangerGradMax(fieldsInfoJSON);
            }
            else {
              //console.log("No markers");
            }
      }, 100);
  });
 /* $("#select-block_7").find("select").on("change", function (event) {
    
  }); */
  google.maps.event.addListener(infowindow, 'domready', function() {
    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');
    var iwBackground = iwOuter.prev();
    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();
    // Apply the desired effect to the close button
    iwCloseBtn.css({"display": 'none'});
  });
// END MAP Events ====================================

} // END initMap ++++++++++++++++++

// GLOBAL Events ====================================
google.maps.event.addDomListener(window, "load", initMap); // init map

$('.hidden-block__settings-btn').on('click', function (event) { // relink on fd
  event.preventDefault();
  var idField = $('#select-block_3').find('select')
                                    .children('option[selected="selected"]')
                                    .attr('value');
  location.href = $(this).attr('href')+"&fid="+idField;
});
$('.icon-syngenta.icon-syngenta_18').on('click', function() {
    getDangerGradMax(fieldsInfoJSON);
});

setCulture(culturesJSON, s4);// обновление селекта полей
setCulture(culturesJSON, s11);

var tmrBindClick = window.setInterval(function () { // waiting 
  if ( $(".danger-radius").length > 0 ) {
        //console.debug($(".danger-radius"));
        setFields(fieldsInfoJSON, s3);// обновление селекта полей
        $(".danger-radius").bind('click', dangerRadiusClick);
        // setDangerGrad("id-pole_111", "100%");
        getDangerGradMax (fieldsInfoJSON);
        clearInterval(tmrBindClick);

      }
      else {
        //console.log("No markers");
      }
}, 100);

$("#select-block_3").find("select").on("change", function (event) {
    // debugger;
    // //console.log("CHANGE FIELD!!!");
    var  curMarker       = $(this)
        ,fieldOptions    = $("#select-block_3").find("select").children("option")
        ,culrureOptions  = $("#select-block_4").find("select").children("option")
        ,infoDescription = $("#hidden-block_info-field").find(".fields-info__description")
        ,curCultureName  = "" 
        ,resultFieldId   = $(this).children('option[selected="selected"]').attr("value")
        // ,fieldSelect     = 
        // ,curCultureId    = fieldsInfoJSON[ resultFieldId[1] ]
        ,curCultureId    = fieldsInfoJSON[resultFieldId].culture.idCulture
        ,curStationsObj  = fieldsInfoJSON[resultFieldId].stations
        ;
        for(var i=0; i < culrureOptions.length; i++) {
           if ( $(culrureOptions[i]).attr("value") == curCultureId ) {
              var cultureSelect = culrureOptions[i];
              break;
           }
        }
        s4.itemCliker( $(cultureSelect));
        s5.refreshSelect([],s5);
        infoDescription.html("");
        curCultureName = $("#select-block_4").find("select").children('option[selected="selected"]').html();
        infoDescription.append("<p>" + curCultureName + "</p>");
         // setFields(curStationsObj, s6); // Обновление селекта станциий info-field
        if ( Object.keys(curStationsObj).length) {
          var arrSelect = [];
          var count = 0;
          for(var key in curStationsObj) {
            arrSelect[count] = {
                                   "name" : curStationsObj[key].name
                                  ,"val"  : curStationsObj[key].stationId
                                };
            count++;
          }
        }
        s6.refreshSelect(arrSelect, s6);
});

$("#select-block_6").find("select").on("change", function (event) {
  var stationId  = $(this).children('option[selected="selected"]').attr("value")
     ,fieldId    = $("#select-block_3").find('select').children('option[selected="selected"]').attr("value")
     ,arStations = fieldsInfoJSON[fieldId].stations
     ,dangersObj = {}
     ;
    for ( var i=0; i < arStations.length; i++ ) {
        if ( arStations[i].stationId == stationId ) {
          dangersObj = arStations[i].dangers;
          break;
        }
    }
    if ( Object.keys(dangersObj).length) {
        var arrSelect = [];
        var count = 0;
        for(var key in dangersObj) {
          arrSelect[count] = {
                                 "name" : dangersObj[key].name
                                ,"val"  : key
                              };
          count++;
        }
        s5.refreshSelect(arrSelect, s5);
      }
      else {
       // alert("Ошибка данных о всех полях!!!");
    }
    setStationInfo(stationId, fieldId, fieldsInfoJSON);
});
$("#select-block_5").find("select").on("change", function (event) {
  var dangerId = $(this).children('option[selected="selected"]').attr("value")
     // ,dangerName = $(this).children('option[selected="selected"]').html()
     ,fieldId = $("#select-block_3").find("select").children('option[selected="selected"]').attr("value")
     ,stationId = $("#select-block_6").find("select").children('option[selected="selected"]').attr("value")
     ,arStations = fieldsInfoJSON[fieldId].stations
     ,dangersObj = {}
     // ,count = 0
     ,percent = ""
     ;
   // console.log(dangerId);
  setDangerInfo(fieldId, stationId, dangerId, fieldsInfoJSON);
  for ( var i=0; i < arStations.length; i++ ) {

      if ( arStations[i].stationId == stationId ) {
        dangersObj = arStations[i].dangers;
        break;
      }
  }
  for ( var key in dangersObj ) {
    if ( key == dangerId ) {
      percent = dangersObj[key].percent;

      break;
    }
  }
  setDangerGrad(fieldId, percent);
});

$("#select-block_9").find("select").on("change", function (event) {
  var stationId = $(this).children('option[selected="selected"]').attr("value");
  // getCulture(stationId);
});
$("#select-block_11").find("select").on("change", function (event) {
  var cultureId = $(this).children('option[selected="selected"]').attr("value");
    findStation(curMarkerGlobal, stationsObj, s9,cultureId);
    findStation(curMarkerGlobal, stationsObj, s23,cultureId);
    findStation(curMarkerGlobal, stationsObj, s24,cultureId);
   // alert(cultureId);


  // getDangers(staionCultures, cultureId);
});
(function ($) {
  var addfield = $('.map-app__add-btn');

  addfield.bind('click', function (event) {
    event.preventDefault();

      var inputFieldId = $('.form-feild__hidden-input').find("input[nameh='fieldId']");
      var fieldId = '';
      inputFieldId.val(fieldId);


    // setCulture(culturesJSON, s11); // обновление селекта станции
    $('#hidden-block_form-field').toggleClass('show');
    $('#hidden-block_info-field').removeClass('show');
  });
})($);

(function ($) {
    var addfield1 = $('.map-app__add-btn1');

    addfield1.bind('click', function (event) {
        event.preventDefault();

        var inputFieldId = $('.form-feild__hidden-input').find("input[nameh='fieldId']");
        var fieldId = '';
        inputFieldId.val(fieldId);


        // setCulture(culturesJSON, s11); // обновление селекта станции
        $('#hidden-block_form-field').toggleClass('show');
        $('#hidden-block_info-field').removeClass('show');
    });
})($);

(function ($) { // добавление списка угроз
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
    //console.log('data-value' + dataValue);
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


var tmrBindClick23 = window.setInterval(function () { // waiting
    if ( $('img[src="/img/marker-green.png"]').length > 0 ) {
        //console.debug($(".danger-radius"));

        $('img[src="/img/marker-green.png"]').each(function(indx,element){ $(element).bind('click', dangerRadiusClickMarker); });

        clearInterval(tmrBindClick23);

    }
    else {
        //console.log("No markers");
    }
}, 100);

//(function ($,undefined) { // addform submit popup
//  var  form = $("#form-feild_1")
//      ,btnSubmit = form.find('.form-field__btn_submit')
//      ,popup = $('.form-popup.form-popup_settings')
//      ;
//
//  btnSubmit.bind('click', function(event) {
//    event.preventDefault();
//    event.stopPropagation();
//    popup.css("display",'block').animate({
//      "opacity" : 1
//    }
//    ,400
//    ,function() {
//        $(this).addClass('show');
//      }
//    );
//
//  });
//  popup.find('.form-popup__settings-btn').on("click", function(event) {
//    event.preventDefault();
//    var curBtn = $(this);
//    form.submit();// redirect on field-editor.html
//  });
//})($);

// END GLOBAL Events ====================================

// logic ==============================================================

function dangerRadiusClickMarker (event) {


    var number =0;
    var divparent = $(this).parent();
    $(divparent).attr('id','selected_marker_123');
    var par_divparent = $(divparent).parent();
    var all1 = $(par_divparent).children(".gmnoprint");

    var all2 = $(par_divparent).children(".danger-radius");



    $(all1).each(function(indx,element){
        if ($(element).attr("id") == 'selected_marker_123'){
        number = indx}

    });
    $(divparent).attr('id','');
    //console.log(number);

    var  curMarker = $(all2).eq(number)
        ,curFieldStr     = curMarker.attr("class") // ????;

    var
         fieldOptions    = $("#select-block_3").find("select").children("option")
        ,culrureOptions  = $("#select-block_4").find("select").children("option")
        ,infoDescription = $("#hidden-block_info-field").find(".fields-info__description")
        ,curCultureName  = ""

        ,regExpWrapper   = new RegExp('danger-radius_id_(.*?)(?: |$)', 'gim')
        ,resultFieldId   = regExpWrapper.exec(curFieldStr)
        ,curCultureId    = fieldsInfoJSON[ resultFieldId[1] ].culture.idCulture
        ,curStationsObj  = fieldsInfoJSON[ resultFieldId[1] ].stations
        ,maxDanger = 0
        ,percents = []
        ,maxDangerId = ""
        ,maxDangerName = ""
        ,maxStationId = ""
        ;

    if ( Object.keys(curStationsObj).length) {
        var arrSelect = [];
        var count = 0;
        for(var key in curStationsObj) {
            arrSelect[count] = {
                "name" : curStationsObj[key].name
                ,"val"  : curStationsObj[key].stationId
            };
            count++;
        }
        s6.refreshSelect(arrSelect, s6);
    }
    else {
        alert("Ошибка данных о станциях !!!");
    }

    optionChecker( fieldOptions, resultFieldId[1], s3);
    optionChecker( culrureOptions, curCultureId, s4);

    for (var i=0; i < curStationsObj.length; i++) {
        var arDangers = curStationsObj[i].dangers;
        for( var key in arDangers) {
            if (arDangers[key].percent == 0){ percents.push(0);  }else {
                if (parseInt(arDangers[key].percent)) {
                    percents.push(parseInt(arDangers[key].percent));
                }}

        }

        if (percents.length > 0){
            maxDanger = Math.max.apply(null, percents);
        }else {maxDanger = -1;}

    }

    for (var j=0; j < curStationsObj.length; j++) {
        var arDangers = curStationsObj[j].dangers;

        for( var key in arDangers) {
            // percents.push(parseInt(arDangers[key].percent));
            if ( (!parseInt(arDangers[key].percent) && -1 == maxDanger ) || (parseInt(arDangers[key].percent) == maxDanger) || (0 == maxDanger && arDangers[key].percent == 0) ) {
                maxDangerId = key;
                //  console.log(maxDangerId);
                maxDangerName = arDangers[key].name;
                maxStationId = curStationsObj[j].stationId;
                break;
            }
        }
    }

    optionChecker( $("#select-block_6").find("select").children("option"), maxStationId, s6);
    // s5.refreshSelect([{"val" : maxDangerId , "name": maxDangerName}], s5);
    optionChecker( $("#select-block_5").find("select").children("option"), maxDangerId, s5);
    infoDescription.html("");
    curCultureName = $("#select-block_4").find("select").children('option[selected="selected"]').html();
    infoDescription.append("<p>" + curCultureName + "</p>");
    setDangerInfo( resultFieldId[1], maxStationId, maxDangerId, fieldsInfoJSON );
    if ( !$('#hidden-block_info-field').hasClass('show') ) {
        $('#hidden-block_info-field').toggleClass('show');
        $('#hidden-block_form-field').removeClass('show');
    }
}


function dangerGradRefresh () {
  var  markers         = $(".danger-radius")
      ,dangerId        = ""
      ,dataPercent     = ""
      ,curFieldStr     = ""
      ;
      // debugger;
      $.each(markers, function(key, value) {
        var regExpWrapper   = new RegExp('danger-radius_id_(.*?)(?: |$)', 'gim')
        curFieldStr = $(value).attr('class');
        dataPercent = $(value).attr("data-percent");
        dangerId = regExpWrapper.exec(curFieldStr);
        setDangerGrad(dangerId[1], "");
      });
}
function getDangerGradMax (jsonFieldsObj) {
  var  countFields = 0
      ,coutDangers = 0
      ,maxDanger = 0
      ;
      // debugger;
      for ( var field in jsonFieldsObj ) {
       var   percents = [];
         var arStation = jsonFieldsObj[field].stations;
         for (var i=0; i < arStation.length; i++) {
            var arDangers = arStation[i].dangers;
            for( var key in arDangers) {
                if (arDangers[key].percent == 0){ percents.push(0);  }
                else {
                    if (parseInt(arDangers[key].percent)) {
                        percents.push(parseInt(arDangers[key].percent));
                    }}

            }

             if (percents.length > 0){
                 maxDanger = Math.max.apply(null, percents);


             }else {maxDanger = -1;}

         }
         // console.log(maxDanger);

         setDangerGrad(field, maxDanger);
      }
}
function setDangerGrad (sFieldId, sDangerNumber) {
  // debugger;
  var  clRed1     = "rgba(196,0,0,1)"
      ,clRed2     = "rgba(209,156,156,0)"
      ,clGreen1   = "rgba(93,169,82,1)"
      ,clGreen2   = "rgba(187,237,180,0)"
      ,clOrange1  = "rgba(238,127,1,1)"
      ,clOrange2  = "rgba(238,203,165,0)"
      ,clGrad1    = ""
      ,clGrad2    = ""
      ,curMarker = $(".danger-radius_id_" + sFieldId )
      ,percent   = -1
      //,dataPercent = -1
      ;



    if (sDangerNumber == -1)
    {
        curMarker.css({

            "display": "none"
        });
        percent = -1;

    }else  if (sDangerNumber == "Нет данных")
    {

        percent = -1;

    }
    else if(sDangerNumber === ""){
        if (curMarker.attr("data-percent")){
            percent =  parseInt(curMarker.attr("data-percent"));
        }else { percent = -1; }
    }
    else if(parseInt(sDangerNumber)){
        percent = parseInt(sDangerNumber);

    } else if (sDangerNumber == 0)
    {
        percent = 0;

    } else{

        if (curMarker.attr("data-percent")){
            percent =  parseInt(curMarker.attr("data-percent"));
        }else { percent = -1; }


    }

    curMarker.attr("data-percent", percent);

   // console.log(percent);








   // console.log(sDangerNumber);

        if (percent !=-1) {

        if (percent <= 30) {
            clGrad1 = clGreen1;
            clGrad2 = clGreen2;
            percent = 30;
        }
        else if (percent > 30 && percent <= 65) {
            clGrad1 = clOrange1;
            clGrad2 = clOrange2;
            percent = Math.floor(percent / 1.1);
        }
        else if (percent > 65 && percent <= 100) {
            clGrad1 = clRed1;
            clGrad2 = clRed2;
            percent = Math.floor(percent / 1.25);
           // console.log(percent);
        }

        /*$(".danger-radius").css({

            "margin-left": "-50px",
            "margin-top": "-50px"
        });*/
        curMarker.css({
            "background": "-moz-radial-radial-gradient(center, ellipse cover, " + clGrad1 + "0%, " + clGrad2 + " " + percent + "%)"
            ,
            "background": "-webkit-radial-gradient(center ellipse cover, " + clGrad1 + "0%, " + clGrad2 + " " + percent + "%)"
            ,
            "background": "radial-gradient(ellipse at center, " + clGrad1 + "0%, " + clGrad2 + " " + percent + "%)"
        });
    }else {

            curMarker.css({
                "background": "-moz-radial-radial-gradient(center, ellipse cover, " + clGreen2 + "0%, " + clGreen2 + " " + 100 + "%)"
                ,
                "background": "-webkit-radial-gradient(center ellipse cover, " + clGreen2 + "0%, " + clGreen2 + " " + 100 + "%)"
                ,
                "background": "radial-gradient(ellipse at center, " + clGreen2 + "0%, " + clGreen2 + " " + 100 + "%)"
            });

}


}
function dangerRadiusClick (event) {
    var  curMarker       = $(this)
        ,fieldOptions    = $("#select-block_3").find("select").children("option")
        ,culrureOptions  = $("#select-block_4").find("select").children("option")
        ,infoDescription = $("#hidden-block_info-field").find(".fields-info__description")
        ,curCultureName  = "" 
        ,curFieldStr     = curMarker.attr("class") // ????
        ,regExpWrapper   = new RegExp('danger-radius_id_(.*?)(?: |$)', 'gim')
        ,resultFieldId   = regExpWrapper.exec(curFieldStr)
        ,curCultureId    = fieldsInfoJSON[ resultFieldId[1] ].culture.idCulture
        ,curStationsObj  = fieldsInfoJSON[ resultFieldId[1] ].stations
        ,maxDanger = 0
        ,percents = []
        ,maxDangerId = ""
        ,maxDangerName = ""
        ,maxStationId = ""
        ;
    if ( Object.keys(curStationsObj).length) {
      var arrSelect = [];
      var count = 0;
      for(var key in curStationsObj) {
        arrSelect[count] = {
                               "name" : curStationsObj[key].name
                              ,"val"  : curStationsObj[key].stationId
                            };
        count++;
      }
      s6.refreshSelect(arrSelect, s6);
    }
      else {
        alert("Ошибка данных о станциях !!!");
    }

    optionChecker( fieldOptions, resultFieldId[1], s3);
    optionChecker( culrureOptions, curCultureId, s4);

    for (var i=0; i < curStationsObj.length; i++) {
        var arDangers = curStationsObj[i].dangers;
        for( var key in arDangers) {
         if (arDangers[key].percent == 0){ percents.push(0);  }else {
            if (parseInt(arDangers[key].percent)) {
                percents.push(parseInt(arDangers[key].percent));
            }}

        }

        if (percents.length > 0){
        maxDanger = Math.max.apply(null, percents);
        }else {maxDanger = -1;}

    }

    for (var j=0; j < curStationsObj.length; j++) {
      var arDangers = curStationsObj[j].dangers;

      for( var key in arDangers) {
          // percents.push(parseInt(arDangers[key].percent));
          if ( (!parseInt(arDangers[key].percent) && -1 == maxDanger ) || (parseInt(arDangers[key].percent) == maxDanger) || (0 == maxDanger && arDangers[key].percent == 0) ) {
            maxDangerId = key;
            //  console.log(maxDangerId);
            maxDangerName = arDangers[key].name;
            maxStationId = curStationsObj[j].stationId;
            break;
          }
        } 
    }

    optionChecker( $("#select-block_6").find("select").children("option"), maxStationId, s6);
   // s5.refreshSelect([{"val" : maxDangerId , "name": maxDangerName}], s5);
    optionChecker( $("#select-block_5").find("select").children("option"), maxDangerId, s5);
    infoDescription.html("");
    curCultureName = $("#select-block_4").find("select").children('option[selected="selected"]').html();
    infoDescription.append("<p>" + curCultureName + "</p>");
    setDangerInfo( resultFieldId[1], maxStationId, maxDangerId, fieldsInfoJSON );
    if ( !$('#hidden-block_info-field').hasClass('show') ) {
      $('#hidden-block_info-field').toggleClass('show');
      $('#hidden-block_form-field').removeClass('show');
    }
  }
  function optionChecker(arOptions, sCheck, oSelect) {
    for(var i=0; i < arOptions.length; i++) {
      if ( $(arOptions[i]).attr("value") == sCheck ) {
        var select = arOptions[i];
        break;
        }
    }
    oSelect.itemCliker( $(select) );
  }
  function setDangerInfo (sFieldId, sStationId, sDangerId, jsonFieldsObj) {
    var infoDescription = $("#hidden-block_info-field").find(".fields-info__description")
        ,arStations     = jsonFieldsObj[sFieldId].stations
        ,oDangerInfo    = {}
        ;
    infoDescription.children("p:not(:first)").remove();
    for  ( var i=0; i < arStations.length; i++) {
        if ( arStations[i].stationId == sStationId ) {
          //  console.log(arStations[i].stationId);
          //  console.log(sDangerId);

          //  console.log(arStations[i].dangers[sDangerId]);
          oDangerInfo = arStations[i].dangers[sDangerId];   
          break;   
        }
      } 
    infoDescription.append("<p>" + oDangerInfo.name + ":" + oDangerInfo.percent + "</p>");  
    infoDescription.append("<p>" + oDangerInfo.info + "</p>");  
    //"p:not(:first)
  }
  function setStationInfo (sStationId, sFieldId, jsonFieldsObj) {
    var placeName  = $(".fields-info__place-name")
       ,placeId    = $(".fields-info__place-id")
       ,arStations = jsonFieldsObj[sFieldId].stations 
       ,statName   = null
       ,statDate   = null
       ;
      for  ( var i=0; i < arStations.length; i++) {
        if ( arStations[i].stationId == sStationId ) {
          statName = arStations[i].name;   
          statDate = arStations[i].date;
          break;   
        }
      } 
      placeName.html(statName);
      placeId.html("ID " + sStationId + ", " + statDate);
  }

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
       // alert("Ошибка данных о всех полях!!!");
    }
  }
  function getDistrict (sPlaceId, oSelectBlock, callback) {
    var arrSelect = [];
      var lang = $("html").attr('lang');
      var oAjax = $.ajax({
          'url'      :'/'+lang+'/forecast/default/ajax-regions.html?place_id='+sPlaceId // С‡С‚РѕР± РєР°Р¶РґС‹Р№ СЂР°Р· РЅРѕРІ С„Р°Р№Р» (Р·Р°РїСЂРµС‚ РєРµС€Р°)
          ,'method'   : 'GET'
          ,'dataType' : 'json'
          ,'timeout'  : 10000 // РјР°РєСЃ. РІСЂРµРј РѕР±СЂР°Р±РѕС‚РєРё Р·Р°РїСЂРѕСЃР°
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
                          // //console.log('callback exist!!');
                          callback();
                          }
                        else {
                          // //console.log('callback NOT exist!!!');
                          }
                        // //console.log("succes");
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
  //console.debug(aCultures);
  aCultures.forEach(function (item,i,arr) {
    arrSelect[i] = {
       "name" : item.name
      ,"val"  : item.idCulture
    };
  });
  oCultureSelect.refreshSelect(arrSelect, oCultureSelect); // Обновление cелекта культур
}

function setCulture (aCultures, oCultureSelect) {
    var arrSelect = [];
    //console.debug(aCultures);
    aCultures.forEach(function (item,i,arr) {
        arrSelect[i] = {
            "name" : item.name
            ,"val"  : item.idCulture
        };
    });
    oCultureSelect.refreshSelect(arrSelect, oCultureSelect); // РћР±РЅРѕРІР»РµРЅРёРµ cРµР»РµРєС‚Р° РєСѓР»СЊС‚СѓСЂ
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
                        // //console.log("succes");
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
          // //console.debug(results[0]);
          // //console.debug(results[1]);
          // //console.debug(results[2]);
          // //console.debug(results[3]);
          // //console.debug(results[4]);
          // //console.debug(results[5]);
          // //console.debug(results[6]);
          // //console.debug(results[7]);
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
         //console.log("placeIdDistrict = " + placeIdDistrict);
         //console.log("placeIdRegion   = " + placeIdRegion);
         //console.log("placeIdCountry  = " + placeIdCountry);
         results = [];
          if ( placeIdRegion == null || placeIdDistrict == null || placeIdCountry !== UkraineId ) {
            window.alert("Текущая геолокация не обслуживается системой");
          }
          else {
            // oResult = { "regId" : placeIdRegion, "disId" : placeIdDistrict };
            // //console.debug(oResult);
            // geoResult = { "regId" : placeIdRegion, "disId" : placeIdDistrict };
            // //console.debug(geoResult);
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
	function addStationMarker(location, sStationName, sStationId,sStationCultures) {
      var markerStation = new google.maps.Marker({
        position: location,
        map: map,
        name: sStationName,
        stationId: sStationId,
        icon: stationImg,
          cultures: sStationCultures
      });
      stationsObj.push(markerStation);
  }
  function addAllFieldsMarkers (jsonArray, callback) {

      //console.log("addAllFieldsMarkers");
      for(var region in jsonArray) {
        // //console.log(typeof jsonArray[region]);
        // alert( "PlacId Region " + ": " + region );
        for(var district in jsonArray[region]) {
          // alert("PlacId District " + ": " + district);
          for(var field in jsonArray[region][district]) {
            // alert("PlacId Field " + ": " + field);
            addFieldMarker(jsonArray[region][district][field].location, 100, map, jsonFieldsObj, false, field, fieldImg);
          }
        }
      }
      if ( callback ) {
        // //console.log('callback exist!!');
        callback();
        }
      else {
        // //console.log('callback NOT exist!!!');
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
            addFieldMarker(jsonArray[sPlaceIdRegion][district][field].location, 100, map, jsonFieldsObj, false, field, fieldImg);
          }
        }
    } 
    else if (sPlaceIdDistrict !== "" && sAllValue !== "all") {
    //  alert("SHOW ALL MARKERS BY DISTRICT");
      hideFieldMarkers();
      for(var field in jsonArray[sPlaceIdRegion][sPlaceIdDistrict]) {
            // alert("PlacId Field " + ": " + field);
            addFieldMarker(jsonArray[sPlaceIdRegion][sPlaceIdDistrict][field].location, 100, map, jsonFieldsObj, false, field, fieldImg);
          }
    } else {
    //  alert("SHOW ALL MARKERS");
      hideFieldMarkers();
      addAllFieldsMarkers (jsonArray);
    }
 }
  function addFieldMarker (oCoords, radius, map, aObj, bDraggable, id, markerImg) {
    // //console.log("addCircles");

    var markerFieldClass = "danger-radius danger-radius_id_" + id;
    var markerField = new MarkerWithLabel({
      position: oCoords,
      icon: markerImg,
      draggable: bDraggable,
      labelClass: markerFieldClass,
      labelMarkerId : id,
      zIndex: 10000,
      map: map
    });
    aObj.push(markerField);
    markerField.addListener('mouseover', function() {
        map.infowindow.open(map, this);
        showToolTip(id, this, fieldsInfoJSON);
      });
    markerField.addListener('mouseout', function() {
        map.infowindow.close();
      });
    return markerField;
  }

function showToolTip(sId, oCurMarker, jsonFields) { //
    var infowindow = $('#content-infowindow');
    infowindow.html("");
    infowindow.html("<p>" + jsonFields[sId].name + "</p>");
    console.debug(infowindow);
    console.log(sId);
    console.debug(oCurMarker);
    console.debug(jsonFields);
}

  // function findStation (oMarker, aStations) {
  var notfound = 0;

function in_array(value, array)
{
    for(var i = 0; i < array.length; i++)
    {
        if(array[i] == value) return true;
    }
    return false;
}

function findStation (oMarker, aStations, oStationSelect, culture_id) {

      var  distance    = 0
          ,maxDistance = 100000
          ,markersRad  = []
          ,arrSelect   = []
          ;
      for (var i = 0; i < aStations.length; i++) {
          distance = google.maps.geometry.spherical
              .computeDistanceBetween(oMarker.getPosition(), aStations[i].getPosition());
          // console.log(oMarker.getPosition()); // считает растояние между точками
          if (culture_id === false) {

              if (distance <= maxDistance) {
                  markersRad.push({
                      "marker": aStations[i]
                      // ,"dist" : Math.ceil(distance)
                      , "dist": Math.floor(distance / 1000)
                  });
              }
              else {
                  continue;
              }
          } else{
              if (distance <= maxDistance && in_array(culture_id,aStations[i].cultures)) {
                  markersRad.push({
                      "marker": aStations[i]
                      // ,"dist" : Math.ceil(distance)
                      , "dist": Math.floor(distance / 1000)
                  });
              }
              else {
                  continue;
              }

          }
      }
    if (markersRad.length > 0) {

        markersRad.sort(sortMarkers); // сортируем массив по дистанции от мин до макс
        for ( var i=0; i < markersRad.length; i++) { // Переводим массив к нужному формату для refreshSelect
            arrSelect[i] = {
                "name" : markersRad[i].marker.name + ", " + markersRad[i].dist + "км"
                ,"val"  : markersRad[i].marker.stationId
            };
        }

        // s9.refreshSelect(arrSelect, s9); // Обновление cелекта станции
        oStationSelect.refreshSelect(arrSelect, oStationSelect); // Обновление cелекта станции
        // showNearestMarker(oMarker, markersRad[0].marker);

        // //console.debug(markersRad.sort(sortMarkers));
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
        //   //console.log('distance ', distance);
        // return stationCircle;
      }
      else { 
        s9.refreshSelect(arrSelect, s9); // Обновление cелекта станции
        s24.refreshSelect(arrSelect, s24);
        s23.refreshSelect(arrSelect, s23);
          if (notfound == 0){
          alert("Нет обсуживающих метеостанций в радиусе 100км.");

          }
          notfound++;
          if (notfound == 3){
              notfound =0;
          }
      }
  }
  function findAllStation (aMarkers, aStations, arFieldStations) {
      var  distance    = 0
          ,maxDistance = 100000
          ,arrSelect   = []
          ;
      for (var j = 0; j < aMarkers.length; j++) {
        var markersRad = [];
        for (var i = 0; i < aStations.length; i++) {
          distance = google.maps.geometry.spherical
                          .computeDistanceBetween(aMarkers[j].getPosition(), aStations[i].getPosition()); // считает растояние между точками
          if (distance <= maxDistance) {
              markersRad.push({
                 "marker" : aStations[i]
                ,"dist" : Math.floor(distance/1000)
                });
          } 
          else { continue; }
        }
        if ( markersRad.length ) {
          markersRad.sort(sortMarkers);
          arrSelect   = [];
          for ( var k = 0; k < markersRad.length; k++) { // Переводим массив к нужному формату для refreshSelect
            arrSelect.push({
                   "name" : markersRad[k].marker.name + ", " + markersRad[k].dist + "км"
                           ,"val"  : markersRad[k].marker.stationId
                         });
            arFieldStations[aMarkers[j].labelMarkerId] = arrSelect;
          }
        }
        else {
          arFieldStations[aMarkers[j].labelMarkerId] = [];  
        }
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
      //console.log("delete");
      clearMarkers();
      fieldsObj = [];
    }

    function hideFieldMarkers () {
      for (var i=0; i < jsonFieldsObj.length; i++) {
        jsonFieldsObj[i].setMap(null);
      }
      jsonFieldsObj = [];
    }

