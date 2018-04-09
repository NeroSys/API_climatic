"use strict";

function Formfield (sSelector) {
    var f = this;

    f.init(sSelector);
    // Data
    f.inputName      = f.elem.find('.input_name');
    f.inputLat       = f.elem.find('.input_latitude');
    f.inputLng       = f.elem.find('.input_longitude');
    f.selectReg      = f.elem.find('.select[name="regions"]');
    f.selectDistr    = f.elem.find('.select[name="areas"]');
    f.selectStation  = f.elem.find('.select[name="mstations"]');
    f.selectCulture  = f.elem.find('.select[name="culture"]');
    f.selectDanger   = f.elem.find('.select[name="danger"]');
    f.btnNext        = f.elem.find('.form-field__btn_next')
    f.btnSubmit      = f.elem.find('.form-field__btn_submit')
    f.controlItem    = f.elem.find('.tabs__controls-item_culture');
    // Logic
    f.validationSettings = function (event) {
        event.preventDefault();
        var  valFlags             = []
            ,selectRegOptions     = f.selectReg.children('option')
            ,selectStationOptions = f.selectStation.children('option')
            ,selectDistrOptions   = f.selectDistr.children('option')
            ;

        valFlags[0] = f.validInput(f.inputLat, 'd');
        valFlags[1] = f.validInput(f.inputLng, 'd');
        valFlags[2] = f.validInput(f.inputName, 'wd');
        valFlags[3] = f.validSelect(selectRegOptions);
        valFlags[4] = f.validSelect(selectDistrOptions);
        valFlags[5] = f.validSelect(selectStationOptions);

        for(var i=0; i < valFlags.length; i++) {
            if ( valFlags[i] === false) {
                f.controlItem.addClass("tabs__controls-item_disabled");
                break;
            }
            else {
                if ( i == valFlags.length-1) {
                    f.controlItem.removeClass("tabs__controls-item_disabled");
                }
            }
        }
    }

    f.validInput = function (jqInput, sTypeReg) {
        var  regW    = /^[A-Za-z]+$/
            ,regD    = /\d+\.\d+/
            ,regWD   = /^[a-zA-Z0-9]+$/
            ,isInput = null
            ,flag    = null
            ;
        console.debug(jqInput);
        if (sTypeReg === "d") {
            isInput = regD.test(jqInput.val());
        }
        else if (sTypeReg === "w") {
            isInput = regW.test(jqInput.val());
        }
        else if (sTypeReg === "wd") {
            isInput = regWD.test(jqInput.val());
        }

        if ( isInput && jqInput.val() !== "" ) {
            jqInput.closest(".form-field__input").removeClass("form-field__input_error");
            jqInput.closest(".form-field__input").addClass("form-field__input_success");
            flag = true;
        }
        else {
            jqInput.closest(".form-field__input").addClass("form-field__input_error");
            jqInput.closest(".form-field__input").removeClass("form-field__input_success");
            flag = false;
        }

        return flag;
    }

    f.validSelect = function (aOptions) {
        var flag = null;
        var selBlockItem = $(aOptions[0]).closest('.select-block').find('.select-block__item');
        for(var i=0; i < aOptions.length; i++) {
            if ( $(aOptions[i]).attr('selected') !== undefined && $(aOptions[i]).attr('selected') !== false) {
                // console.log("ok");
                flag = true;
                break;
            }
            else {
                flag = false;
            }
        }
        if ( flag === true) {
            selBlockItem.addClass('select-block__item_success');
            selBlockItem.removeClass('select-block__item_error');
        }
        else {
            selBlockItem.addClass('select-block__item_error');
            selBlockItem.removeClass('select-block__item_success');
        }
        return flag;
    }
    f.formValidation = function (event) {
        // event.preventDefault();
        var cultFlag = null
            ,dangFlag = null
            ,selectCulOptions = f.selectCulture.children('option')
            ,selectDangOptions = f.selectDanger.children('option')
            ,submit = null
            ;

        cultFlag = f.validSelect(selectCulOptions);
        dangFlag = f.validSelect(selectDangOptions);

        submit = ( cultFlag === true && dangFlag === true) ? true : false;

        return submit;
    }

    // Events
    f.btnNext.bind("click", f.validationSettings);
    f.elem.submit(f.formValidation);
}

Formfield.prototype = new component();