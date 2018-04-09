"use strict";

// function Formfilter (sSelector) {
// 	var f = this;

// 	f.init(sSelector);
// 	// Data
// 	f.selectDate     = f.elem.find('.select[name="date"]');
// 	f.selectPercent  = f.elem.find('.select[name="percent"]');
// 	f.selectField    = f.elem.find('.select[name="fields"]');
// 	f.selectCulture  = f.elem.find('.select[name="cultures"]');
// 	f.selectDanger   = f.elem.find('.select[name="dangers"]');
// 	// f.btnNext        = f.elem.find('.form-field__btn_next')
// 	// f.btnSubmit      = f.elem.find('.form-field__btn_submit')
// 	// f.controlItem    = f.elem.find('.tabs__controls-item_culture');
// 	// Logic
// 	f.selectOnChange = function () {
// 		f.elem.submit();
// 	}

// 	// Events
// 	// f.elem.submit();
// 	f.selectDate     .on('change', f.selectOnChange);
// 	f.selectPercent  .on('change', f.selectOnChange);
// 	f.selectField    .on('change', f.selectOnChange);
// 	f.selectCulture  .on('change', f.selectOnChange);
// 	f.selectDanger   .on('change', f.selectOnChange);
// }

function Formfilter (sSelector) {
    var f = this;

    f.init(sSelector);
    // Data
    f.selects = f.elem.find('.select');
    // Logic
    f.selectOnChange = function () {
        f.elem.submit();
    }
    // Events
    // f.elem.submit();
    f.selects.on('change', f.selectOnChange);
}

Formfilter.prototype = new component();
