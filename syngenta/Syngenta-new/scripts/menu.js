"use strict";

var m1 = new Menu('#aside-block_1');

function Menu(Sselector) {
	var m = this;
	// Data
	m.main         = $(Sselector);
	m.menuButton   = m.main.find('.lines-button');
	m.menuLinkText = m.main.find('.main-menu__link-text');
	// Logic
	m.openMenu = function () {
		var header = $('.header');
		if( !m.menuButton.hasClass('close') ) {
			m.menuLinkText.removeClass('main-menu__link-text_hint');
			m.menuButton.addClass('close');
			m.main.add(header).addClass('open');
			m.menuLinkText.addClass('show');
			}
		else {
			m.menuButton.removeClass('close');
			m.main.add(header).removeClass('open');
			m.menuLinkText.removeClass('show');
			m.menuLinkText.addClass('main-menu__link-text_hint');
			}
		}		
	// Events
	m.menuButton.bind('click', m.openMenu);
	
}