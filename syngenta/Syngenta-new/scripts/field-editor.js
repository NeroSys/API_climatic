


$(document).ready(function (){
	fieldBlockRender(fieldsInfoJSON);
  setFields(fieldsInfoJSON, s25); // methods from prognosis
  setFields(fieldsInfoJSON, s28); // methods from prognosis
  setCulture(culturesJSON, s26); // methods from prognosis
  setCulture(culturesJSON, s29); // methods from prognosis
    s58.checkSelectedOptions();
    s59.checkSelectedOptions();
    s60.checkSelectedOptions();
    s61.checkSelectedOptions();
    s62.checkSelectedOptions();
    // window.f3 = new Formfilter('#filter-form_3');
    var f3 = new Formfilter('#filter-form_3');


    (function($, undefined) { // reset selects in notify edit
        var btnReset = $(".btn_filter_reset");
        btnReset.bind("click" , function (event) {
            event.preventDefault();
            s28.delCustomSelect();
            s29.delCustomSelect();
            s30.delCustomSelect();
            s33.delCustomSelect();
            s34.delCustomSelect();
            s39.delCustomSelect();
            s40.delCustomSelect();
            s28 = new Selectblock('#select-block_28');
            s29 = new Selectblock('#select-block_29');
            s30 = new Selectblock('#select-block_30');
            s33 = new Selectblock('#select-block_33');
            s34 = new Selectblock('#select-block_34');
            s39 = new Selectblock('#select-block_39');
            s40 = new Selectblock('#select-block_40');
        });

    })($);







    (function($) {
		var  checkBtn = $("#input-checkbox_1")
			,hiddenForm = $('.set-notifyings__form-notify.set-notifyings__form-notify_hidden')
			;
		checkBtn.bind('click', function (event) {
			// if ( !hiddenForm.hasClass("active") ) {
			if ( !(checkBtn.is(":not(:checked)")) ) {
				hiddenForm.css("display","block")
							.animate({
								"opacity" : 1
							}
							,400
							,function () {
								// $(this).addClass('active');
								// flag = false;
								// return false;
								}
							);
				} 
			else {
				hiddenForm.animate({
								"opacity" : 0
							}
							,400
							, function () {
								// $(this).css("display","none").removeClass('active');
								$(this).css("display","none");
								}
							);
				}
		});
	})($);

	$('.fields-block__item-btn-arrow').bind('click', showFieldInfo);

	(function ($) {
		var  popupForm    = $(".table-editor__rec")
			,popupFormBtn = popupForm.find('.table-editor__rec-close')
			,messageBlock = popupForm.children('.table-editor__rec-inner')
			,notifyBtn    = $('.list-fields__item-text-btn')
			;
		popupFormBtn.bind("click", function (event) {

			$(this).closest('.table-editor__rec').animate({
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
			var curBtn = $(this);
			getDangerInfo(curBtn);
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


    (function ($) {
        var  popupForm    = $(".table-danger__rec")
            ,popupFormBtn = popupForm.find('.table-danger__rec-close')
            ,messageBlock = popupForm.children('.table-danger__rec-inner')
            ,notifyBtn    = $('.list-dangers__item_btn')
            ,popupDescrBlock = popupForm.find('.table-danger__rec-descr')
            ;
        popupFormBtn.bind("click", function (event) {
           // popupDescrBlock.html("");
            $(this).closest('.table-danger__rec').animate({
                    "opacity" : 0
                }
                ,400
                ,function () {
                    popupDescrBlock.html("");
                    $(this).css("display","none").removeClass('show');
                }
            );
        });
        notifyBtn.bind('click', function (event) {
            event.preventDefault();
            var  curBtn = $(this)
                ,hiddenText = curBtn.children('.list-dangers__item-text_hidden-info').html()
                ;
            console.log(hiddenText);
            popupDescrBlock.html("<p>" + hiddenText + "</p>");
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


	// events ==============================

    $("#select-block_34").find("select").on("change", function (event) { // block click time select
        var  curItem = $(this)
            ,optionValue = curItem.children('option[selected="selected"]').attr("value")
        // ,options = curItem.find(".select").children('option')
            ,timeSelect = $("#select-block_39")
            ,timeSelectHtml = timeSelect.find(".select")
            ,timeSelectTwo = $("#select-block_40")
            ,timeSelectHtmlTwo = timeSelect.find(".select")
            ;
        // alert("click!");
        if ( parseInt(optionValue) === 0 ) {
            // alert("click! 0");
            timeSelect.addClass('select-block_disabled').css("display", "none");
            timeSelectHtml.attr("disabled", "disabled");
            s39.delCustomSelect();
            s39 = new Selectblock('#select-block_39');
            timeSelectTwo.addClass('select-block_disabled').css("display", "none");
            timeSelectHtmlTwo.attr("disabled", "disabled");
            s40.delCustomSelect();
            s40 = new Selectblock('#select-block_40');
        }
        else if ( parseInt(optionValue) === 1 ) {
            // alert("click! 1");
            timeSelect.removeClass('select-block_disabled').css("display", "block");
            timeSelectHtml.removeAttr("disabled");
            s39.delCustomSelect();
            s39 = new Selectblock('#select-block_39');
            timeSelectTwo.removeClass('select-block_disabled').css("display", "block");
            timeSelectHtmlTwo.removeAttr("disabled");
            s40.delCustomSelect();
            s40 = new Selectblock('#select-block_40');
        }
    });

    $("#select-block_55").find("select").on("change", function (event) { // block click time select
        var  curItem = $(this)
            ,optionValue = curItem.children('option[selected="selected"]').attr("value")
        // ,options = curItem.find(".select").children('option')
            ,timeSelect = $("#select-block_57")
            ,timeSelectHtml = timeSelect.find(".select")
            ,timeSelectTwo = $("#select-block_56")
            ,timeSelectHtmlTwo = timeSelect.find(".select")
            ;
        // alert("click!");
        if ( parseInt(optionValue) === 0 ) {
            // alert("click! 0");
            timeSelect.addClass('select-block_disabled').css("display", "none");
           // timeSelectHtml.attr("disabled", "disabled");
           // s57.delCustomSelect();
           // s57 = new Selectblock('#select-block_57');
            timeSelectTwo.addClass('select-block_disabled').css("display", "none");
          //  timeSelectHtmlTwo.attr("disabled", "disabled");
          //  s56.delCustomSelect();
          //  s56 = new Selectblock('#select-block_56');
        }
        else if ( parseInt(optionValue) === 1 ) {
            // alert("click! 1");
            timeSelect.removeClass('select-block_disabled').css("display", "block");
          //  timeSelectHtml.removeAttr("disabled");
          //  s57.delCustomSelect();

          //  s57 = new Selectblock('#select-block_57');
            timeSelectTwo.removeClass('select-block_disabled').css("display", "block");
          //  timeSelectHtmlTwo.removeAttr("disabled");
          //  s56.delCustomSelect();

           // s56 = new Selectblock('#select-block_56');
        }
    });



	$("#select-block_25").find("select").on("change", function (event) {
		var curItem       = $(this)
			 ,resultFieldId = curItem.children('option[selected="selected"]').attr("value")
			 ,fieldItems    = $('.fields-block').find(".list-fields__item_field")
			 ;
    if ( resultFieldId === "all" ) {
      $(fieldItems[0]).closest('.fields-block').find(".fields-block__item:not(:first)").css("display", "block");
    }
    else {
  		for (var i = 0; i < fieldItems.length; i++ ) {
  			if ( $(fieldItems[i]).attr("data-field-id") === resultFieldId ) {
  				$(fieldItems[i]).closest(".fields-block__item").css("display","block")
  								        .siblings().css("display","none")
  								        ;
  				break;
  			}
  		}
    }
	});
  $("#select-block_26").find("select").on("change", function (event) {
    var curItem       = $(this)
       ,resultCultureId = curItem.children('option[selected="selected"]').attr("value")
       ,cultureItems    = $('.fields-block').find(".list-fields__item_culture")
       ;
    if ( resultCultureId === "all" ) {
      $(cultureItems[0]).closest('.fields-block').find(".fields-block__item:not(:first)").css("display", "block");
    }
    else {
      for (var i = 0; i < cultureItems.length; i++ ) {
        if ( $(cultureItems[i]).attr("data-culture-id") === resultCultureId ) {
          $(cultureItems[i]).closest(".fields-block__item").css("display","block")
                          .siblings().css("display","none")
                          ;
          break;
        }
      }
    }
  });


    $(".notifyings-list__item-btn.notifyings-list__item-btn_del").bind("click", function (event) {
        var  curBtn = $(this)
            ,notifyItem = curBtn.closest('.notifyings-list__item')
            //,fieldId        = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
            ,notifyList = notifyItem.children('.notify')
            ,notifyId  = notifyList.attr('data-note');

        var lang = $("html").attr('lang');
        if (confirm(notify_del_q.toUpperCase())) {
            var oAjax = $.ajax({
                'url': '/' + lang + '/cabinet/forfield/user-threat.html'
                , 'method': 'POST'
                , 'dataType': 'json'
                , 'timeout': 10000 // РјР°РєСЃ. РІСЂРµРј РѕР±СЂР°Р±РѕС‚РєРё Р·Р°РїСЂРѕСЃР°
                , 'data': {
                    "id": notifyId,
                    "fieldtok": field_tok
                }
                , 'success': function (oServerResponse) {
                    notifyItem.remove();
                }
                , 'error': function (oAjax) {
                    alert('Проблемы, повторите попытку позже');
                }
                , 'complete': function (oAjax) { // Обьеденяет Succes и Error . Техническая логика
                    if (oAjax.status == 200) { // 200 = OK
                        if (typeof(oAjax.responseJSON) == 'undefined') {
                            console.error('could not parse server response as JSON object', oAjax.responseText);
                        }
                        else {
                        }
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


    });


  $(".btn-field-del").bind("click", function (event) {
    var  curBtn    = $(this)
        ,fieldBlockItem = curBtn.closest('.fields-block__item')
        ,fieldId        = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
        ,fieldItem = curBtn.closest('.fields-block__item')
        ;
     // var confirm_f = confirm(field_del_q.toUpperCase());

      var lang = $("html").attr('lang');
      if (confirm(field_del_q.toUpperCase())) {
          var oAjax = $.ajax({
              'url': '/' + lang + '/cabinet/forfield/field.html'
              , 'method': 'POST'
              , 'dataType': 'json'
              , 'timeout': 10000 // РјР°РєСЃ. РІСЂРµРј РѕР±СЂР°Р±РѕС‚РєРё Р·Р°РїСЂРѕСЃР°
              , 'data': {
                  "id": fieldId,
                  "fieldtok": field_tok
              }
              , 'success': function (oServerResponse) {
                  fieldItem.remove();
                  location.href = '/' + lang + '/cabinet.html?field=1';
              }
              , 'error': function (oAjax) {
                  alert('Проблемы, повторите попытку позже');
              }
              , 'complete': function (oAjax) { // Обьеденяет Succes и Error . Техническая логика
                  if (oAjax.status == 200) { // 200 = OK
                      if (typeof(oAjax.responseJSON) == 'undefined') {
                          console.error('could not parse server response as JSON object', oAjax.responseText);
                      }
                      else {
                      }
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


  });
  $(".btn-field-edit").bind("click", function (event) {
    event.preventDefault();
    var   curBtn         = $(this)
         ,fieldBlockItem = curBtn.closest('.fields-block__item')
         ,fieldId        = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
         // ,fieldName      = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
         ,cultureId      = fieldBlockItem.find('.list-fields__item_culture').attr('data-culture-id')
         ,lat            = fieldsInfoJSON[fieldId].location.lat
         ,lng            = fieldsInfoJSON[fieldId].location.lng
         ,fieldName      = fieldsInfoJSON[fieldId].name
         ,sfield    = fieldsInfoJSON[fieldId].sfield
         ,regionId       = ""
         ,districtId     = ""
         ,formFieldBlock = $('#hidden-block_form-field')
         ,inputName      = formFieldBlock.find("#fields-name")
         ,inputSfield     = formFieldBlock.find("#fields-sfield")
         ,inputLat       = formFieldBlock.find(".input_latitude")
         ,inputLng       = formFieldBlock.find(".input_longitude")
         ,requestGetDistrictComplite = false
         ,mapSection     = $(".map-app")
         ,reqSectionPos  = mapSection.offset().top
         ,inputFieldId = $('.form-feild__hidden-input').find("input[nameh='fieldId']")
        ;
        $('#hidden-block_info-field').removeClass('show');
        inputName.val(fieldName);
        inputSfield.val(sfield);
        inputLat.val(lat);
        inputLng.val(lng);
        inputFieldId.val(fieldId);
        var breakFlag = false;
        for( var regId in fieldsJSON ) {
          if(breakFlag === true) {break;}
          for( var disId in fieldsJSON[regId] ) {
            if (breakFlag === true) {break;}
            for( var fieldkey in fieldsJSON[regId][disId] ) {
              if ( fieldkey == fieldId ) {
                regionId = regId;
                districtId = disId;
                breakFlag = true;
                break;
              }
            }
          }
        }
        getDistrict(regionId, s8, function () {
            getDistrict(regionId, s81, function () {
                requestGetDistrictComplite = true;
            });
                                                });


        var regOptions = $("#select-block_7").find("select").children("option");
        optionChecker(regOptions, regionId , s7);
      var regOptions1 = $("#select-block_71").find("select").children("option");
      optionChecker(regOptions1, regionId , s71);

        var timerReqDistr = setInterval( function() {
                if ( requestGetDistrictComplite == true ) {
                  var disOptions = $("#select-block_8").find("select").children("option");
                  optionChecker(disOptions, districtId , s8);
                    var disOptions1 = $("#select-block_81").find("select").children("option");
                    optionChecker(disOptions1, districtId , s81);
                  clearInterval(timerReqDistr);
                }
              }
              ,100
              );
        var cultureOptions = $("#select-block_11").find("select").children("option");


      jsonFieldsObj.forEach(function(item, i, fieldsObj) {
          if (item.labelMarkerId == fieldId){
              curMarkerGlobal = item;
          }

      });




        s9.refreshSelect(arFieldStations[fieldId], s9);
        s23.refreshSelect(arFieldStations[fieldId], s23);
        s24.refreshSelect(arFieldStations[fieldId], s24);

      optionChecker(cultureOptions, cultureId , s11);

        $("body, html").animate({scrollTop : reqSectionPos},600);

        formFieldBlock.addClass("show");
  });
  $("#select-block_28").find("select").on("change", function (event) {
    // debugger;
    var  curItem     = $(this)
        ,fieldId     = curItem.children("option[selected='selected']").attr("value")
        ,cultureId   = fieldsInfoJSON[fieldId].culture.idCulture
        ,arStation   = fieldsInfoJSON[fieldId].stations
        ,arDangerObj = []
        ,count       = 0
        ,culrureOptions  = $("#select-block_29").find("select").children("option")
        ,culruredivhide  = $("#select-block_29").find('div[data-value="hide"]')
        ;
    for(var i=0; i < culrureOptions.length; i++) {
           if ( $(culrureOptions[i]).attr("value") == cultureId ) {
              var cultureSelect = culrureOptions[i];
              break;
           }
        }
    s29.itemCliker( $(cultureSelect));

      $(culruredivhide).attr("data-value", '');

    var sortDangers = function (dangerA, dangerB) {
      // return parseInt(dangerA.percent) - parseInt(dangerB.percent); from min to max
      return parseInt(dangerB.percent) - parseInt(dangerA.percent); // from max to min
    }

   // for( var i = 0; i < arStation.length; i++) {
        /*for( var i = 0; i < arStation.length; i++) {

            if (Object.keys(arStation[i].dangers).length > 0) {

                var dangers = arStation[i].dangers;
                for (var key in dangers) {
                    arDangerObj[count] = {
                        "val": key
                        , "name": dangers[key].name
                    };
                    count++;
                }
                break;
            }
    }*/

      for( var i = 0; i < arStation.length; i++) {

          if (Object.keys(arStation[i].static_dangers).length > 0) {

              var dangers = arStation[i].static_dangers;
              for (var key in dangers) {
                  arDangerObj[count] = {
                      "val": key
                      , "name": dangers[key].name
                  };
                  count++;
              }
              break;
          }
      }
   // arDangerObj.sort(sortDangers);
    s30.refreshSelect(arDangerObj, s30);
  });

  /*$(".notifyings-list__item-btn_del").bind("click", function (event) {
      var  curBtn = $(this)
          ,notifyItem = curBtn.closest('.notifyings-list__item');
          ;
    notifyItem.remove();
  });*/
  $('.notifyings-list__item-btn_edit').bind("click", function (event) {
    var notifyList = $(this).closest('.notifyings-list__item').children('.notify');
    setNotifyInfo(notifyList);
  });
  
	// Logic ======================================
  function setNotifyInfo ( jqNotifyList ) {
    // debugger;
    var  notifyId  = jqNotifyList.attr('data-note')
        ,fieldId   = jqNotifyList.children('.notify__item_field').attr('data-field-id')
        ,dangerId  = jqNotifyList.children('.notify__item_danger').attr('data-danger-id')
        ,dlvlId    = jqNotifyList.children('.notify__item_danger-lvl').attr('data-dlvl-id')
        ,ntypeId   = jqNotifyList.children('.notify__item_type_notify').attr('data-ntype-id')
        ,freqId    = jqNotifyList.children('.notify__item_freq').attr('data-freq-id')
        ,timeIdOne = jqNotifyList.children('.notify__item_time').attr('data-time-id-1')
        ,timeIdTwo = jqNotifyList.children('.notify__item_time').attr('data-time-id-2')
        ,formSave       = $('#notifyings_2')
        ,inputNotifyId  = formSave.find('input[nameh="notifyId"]')
        ,inputfieldId   = formSave.find('input[nameh="fieldId"]')
        ,inputdangerId   = formSave.find('input[nameh="dangerId"]')
        ,percOptions    = $('#select-block_54').find("select").children('option')
        ,ntypeOptions   = $('#select-block_55').find("select").children('option')
      //  ,freqOptions    = $('#select-block_56').find("select").children('option')
        ,timeOneOptions = $('#select-block_57').find("select").children('option')
        ,timeTwoOptions = $('#select-block_56').find("select").children('option')
        ;
    optionChecker(percOptions, dlvlId , s54);
    optionChecker(ntypeOptions, ntypeId, s55);
    optionChecker(timeTwoOptions, timeIdTwo, s56);
    optionChecker(timeOneOptions, timeIdOne, s57);
    inputNotifyId.val(notifyId);
      inputfieldId.val(fieldId);
      inputdangerId.val(dangerId);

    // console.log("asdad");
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
	function getDangerInfo (jqButtonHelp) {
		var  dangerBlockinfo = jqButtonHelp.closest(".list-fields__item-text_danger").children(".list-fields__item-text-val")
			  ,dangerPercent   = dangerBlockinfo.html() 
			  ,dangerInfo      = dangerBlockinfo.attr('data-info')
			  ,recDescr        = $(".table-editor__rec").find('.table-editor__rec-descr')
			  ;
		recDescr.html("").html("<p>" + dangerInfo + "</p>");
	}
	function fieldBlockRender (jsonFields) {
		var  fieldBlock        = $(".fields-block")
			  ,fieldBlockItem    = fieldBlock.children(".fields-block__item:first")
			  ,curfieldBlockItem = null
			 ;
		for (var fieldId in jsonFields) {
			fieldBlock.append( fieldBlockItem.clone() );
			curfieldBlockItem = fieldBlock.children(".fields-block__item:last");
			fieldBlockItemAdd(fieldId, jsonFields, curfieldBlockItem);
		}
	}
	function fieldBlockItemAdd (sFieldId, jsonFields, jqCurBlockItem) {
		var fieldBlock     = $(".fields-block")
			 ,listField      = jqCurBlockItem.find(".list-fields")
			 ,itemField      = listField.children('.list-fields__item_field')
			 ,itemCulture    = listField.children('.list-fields__item_culture')
			 ,itemDangerName = listField.children('.list-fields__item_danger_name')
			 ,itemDangerInfo = listField.children('.list-fields__item_danger_info')
			 ,arStation      = jsonFields[sFieldId].stations
			 ,arDangerObj    = []
			 ,count = 0
			 ;
		var sortDangers = function (dangerA, dangerB) {
			// return parseInt(dangerA.percent) - parseInt(dangerB.percent); from min to max

            if (dangerB.id == dangerA.id) {
                if (parseInt(dangerB.percent) && parseInt(dangerA.percent)) {
                    return (parseInt(dangerB.percent) - parseInt(dangerA.percent));
                } else {
                    if (parseInt(dangerB.percent)) {
                        return 1;
                    } else if (parseInt(dangerA.percent)) {
                        return -1;
                    } else {
                        return parseInt(dangerB.id) - parseInt(dangerA.id);
                    }
                }
            } else {
                var valA = 0;
                var valB = 0;

                for( var i = 0; i < arDangerObj.length; i++) {

                   if (arDangerObj[i].id == dangerA.id) {

                       if (parseInt(arDangerObj[i].percent)) {
                           valA = Math.max(valA, parseInt(arDangerObj[i].percent));


                       }
                   }
                    if (arDangerObj[i].id == dangerB.id) {

                            if (parseInt(arDangerObj[i].percent)) {
                                valB = Math.max(valB, parseInt(arDangerObj[i].percent));

                            }

                    }

                }
                if (parseInt(dangerA.percent)) {
                    valA = Math.max(valA, parseInt(dangerA.percent));
                }
                if (parseInt(dangerB.percent)) {
                    valB = Math.max(valB, parseInt(dangerB.percent));
                }
                if (valB == valA) {
                    return parseInt(dangerB.id) - parseInt(dangerA.id);
                } else {
                return valB - valA; }
            }
            // from max to min

        }

		for( var i = 0; i < arStation.length; i++) {
			var dangers = arStation[i].dangers;
			for ( var key in dangers ) {
				arDangerObj[count] = {
                    "lat" : jsonFields[sFieldId].location.lat
                    ,"lng" : jsonFields[sFieldId].location.lng
                    ,"idStation" : arStation[i].stationId
					 ,"id" : key
					,"name" : dangers[key].name
					,"percent" : dangers[key].percent
					,"info" : dangers[key].info
					};
				count++;
			}
		}
		arDangerObj.sort(sortDangers);

		itemField.attr("data-field-id", sFieldId);
		itemField.children().html('<a href="#" class="btn-field-edit btn_filds-block"><span><i class="icon-syngenta icon-syngenta_19"></i></span></a><a  class="btn-field-del btn_filds-block"><span><i class="icon-syngenta icon-syngenta_18"></i></span></a>'+jsonFields[sFieldId].name);
		itemCulture.attr("data-culture-id", jsonFields[sFieldId].culture.idCulture )
				   .children().html(jsonFields[sFieldId].culture.name)
				   ;
		for (var i = 0; i < arDangerObj.length; i++) {
             var purepercent = arDangerObj[i].percent.length > 3 ? '-' : arDangerObj[i].percent;
           // var purepercent = arDangerObj[i].percent;
               var CurSname = '';
            var Curlat = '';
            var Curlng = '';
            for (var ii = 0; ii < stationsJSON.length; ii++) {

                if (stationsJSON[ii].stationId == arDangerObj[i].idStation){
                     CurSname = stationsJSON[ii].name;
                    Curlat = stationsJSON[ii].location.lat;
                    Curlng = stationsJSON[ii].location.lng;
                }
            }
            var myLatlng1 = new google.maps.LatLng(Curlat, Curlng);
            var myLatlng2 = new google.maps.LatLng(arDangerObj[i].lat, arDangerObj[i].lng);

           var distance = google.maps.geometry.spherical
                .computeDistanceBetween(myLatlng1,myLatlng2);

            distance = Math.floor(distance/1000);

			itemDangerName.append( "<div data-danger-id='" + arDangerObj[i].id 
								    + "' class='list-fields__item-text'>" 
								    + arDangerObj[i].name+' - '+'Метеостанция: "'+"<em>"+CurSname+'", '+ "</em>"  + distance +"км."+"</div>"
								  );
			itemDangerInfo.append( "<div class='list-fields__item-text list-fields__item-text_danger' data-danger-id='" + arDangerObj[i].id + "'> \
										            <span class='list-fields__item-text-val' data-info='" + arDangerObj[i].info + "' >" + purepercent  + "</span> \
										            <span class='list-fields__item-text-btn'><a class='btn btn_orange btn_help' href='#'>" + recomendations_button + "</a></span> \
									           </div>"
								            );
		}
	}

	function showFieldInfo (event) {
		var  btnArrow    = $(this)
			  ,fields      = btnArrow.closest('.fields-block__item').find('.list-fields__item-text')
			  ,fieldBtns   = btnArrow.closest('.fields-block__item').find('.fields-block__item-btn')
			  ;
		if ( !btnArrow.hasClass('active') ) {
			fieldBtns.css("display","inline-block");
			fields.css("display","block");
			btnArrow.addClass('active');
		}
		else {
			fieldBtns.css("display","none");
			fields.css("display","none");
			btnArrow.removeClass('active');
		}
	}
})