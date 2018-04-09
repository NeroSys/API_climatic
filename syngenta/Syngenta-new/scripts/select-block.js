"use strict";

function Selectblock (sSelector) {
    var s = this;

    s.init(sSelector);
    // Data
    s.selectHtml = s.elem.find('.select'); //
    s.selectHtmlItems = s.selectHtml.children();
    s.selectItemCount = s.selectHtmlItems.length;
    //Logic
    s.createCustomSelect = function () {
        var  CustomItemMarkup = '<div data-value="" class="select-block__item" onchange="" ></div>'
            ,CustomList       = '<ul class="select-block__list"></ul>'
            ;
        s.selectHtml.addClass('select-hidden');
        s.elem.append(CustomItemMarkup)
            .append(CustomList)
        ;
        s.addCustomListItems();
    }
    s.checkSelectedOptions = function () {
        var selectedOption = null;

        $.each(s.selectHtmlItems, function (key, option) {
            // console.log("key " + key + "  " + " option " );
            // console.debug(key);
            // console.debug(option);
            if ( $(option).attr("selected") ) {
                s.itemCliker($(option));
                return;
            }
        });
    }
    s.addCustomListItems = function () {
        var  selectBlockItem = s.elem.find('.select-block__item')
            ,customList = s.elem.find('.select-block__list')
            ,dataValue = null
            ,text = null
            ;
        for(var i=0; i < s.selectItemCount; i++) {
            dataValue = s.selectHtmlItems.eq(i).attr('value');
            text = s.selectHtmlItems.eq(i).html();
            customList.append("<li data-value='" + dataValue + "'class='select-block__list-item'>" + text + "</li>");
        }
        selectBlockItem.attr('data-value', s.selectHtmlItems.eq(0).attr('value'));
        selectBlockItem.html(s.selectHtmlItems.eq(0).html());
        s.elem.find('.select-block__item').css('display', 'block');
    }
    s.clickOnItem = function (event) {
        event.stopPropagation();
        var curItem = $(this);
        s.itemCliker(curItem );
    }
    s.itemCliker = function (curItem) {
        var  selectBlockItem = s.elem.find('.select-block__item')
            ,curItemIndex    = curItem.index() // ???? РІРЅРµС€РЅРµ РЅРµ РІРѕР·РІСЂР°С‰Р°РµС‚ РёРЅРґРµРєСЃ
            ;
        selectBlockItem.html(curItem.text());
        selectBlockItem.attr('data-value', curItem.data('value'));
        s.elem.find('.select-block__list').css("display","none");
        selectBlockItem.removeClass('active');
        s.setOptionSelected(curItemIndex); // ???? РІРЅРµС€РЅРµ РЅРµ РІРѕР·РІСЂР°С‰Р°РµС‚ РёРЅРґРµРєСЃ
    }
    s.blockitemClick = function (event) {
        event.stopPropagation();
        var attr = s.selectHtml.attr("disabled");
        if (typeof attr !== typeof undefined && attr !== false) {
            return;
        }
        else {
            s.elem.find('.select-block__list').css("display", 'block');
            s.elem.find('.select-block__item').addClass('active');
        }
    }
    s.setOptionSelected = function (nIndex) {
        s.selectHtml.children().eq(nIndex).attr("selected", "selected")
            .siblings().removeAttr('selected');
        s.selectHtml.trigger('change');	// ????
    }
    s.globalClick = function (event) {
        event.stopPropagation();

        s.elem.find('.select-block__list').css("display","none");
        s.elem.find('.select-block__item').removeClass('active');

    }
    s.delCustomSelect = function () {
        var  selectBlockItem = s.elem.find('.select-block__item')
            ,customList = s.elem.find('.select-block__list')
            ,options = s.selectHtml.children('option')
            ;
        selectBlockItem.add(customList).remove();
        for (var i=0; i < options.length; i++) {
            $(options[i]).removeAttr("selected");
        }

    }
    s.refreshSelect = function (aArray, oSelectblock) {
        var optionHide = s.selectHtmlItems[0];
        if ( $(s.selectHtmlItems[1]).attr('value') == "all" ) {
            var optionAll = s.selectHtmlItems[1];
            s.selectHtml.empty();
            s.delCustomSelect();
            if ( aArray.length ) {
                aArray.forEach(function(item, i, arr) {
                    if ( i == 0 ) {
                        s.selectHtml.append(optionHide);
                        s.selectHtml.append(optionAll);

                        s.selectHtml.append("<option  value=" + item.val + ">" + item.name + "</option>");
                    }
                    else {
                        s.selectHtml.append("<option  value=" + item.val + ">" + item.name + "</option>");
                    }
                });
            }
            else {
                s.selectHtml.append(optionHide);
                s.selectHtml.append(optionAll);
            }
        }
        else {
            s.selectHtml.empty();
            s.delCustomSelect();
            if ( aArray.length ) {
                aArray.forEach(function(item, i, arr) {
                    if ( i == 0 ) {
                        s.selectHtml.append(optionHide);
                        s.selectHtml.append("<option  value=" + item.val + ">" + item.name + "</option>");
                    }
                    else {
                        s.selectHtml.append("<option  value=" + item.val + ">" + item.name + "</option>");
                    }
                });
            }
            else {
                s.selectHtml.append(optionHide);
            }
        }
        oSelectblock = new Selectblock(sSelector);
    }
    // Event
    s.createCustomSelect();
    // s.checkSelectedOptions();
    s.elem.find('.select-block__list-item').bind('click', s.clickOnItem);
    s.elem.find('.select-block__item').bind('click', s.blockitemClick);
    $(document).bind('click', s.globalClick);
}

Selectblock.prototype = new component();