"use strict";

jQuery(document).on('ready', function() { 

	initSwiper();
	initEvents();
	initStyles();
	initMap();
	initCollapseMenu();	
	checkCountUp();	

	if (jQuery('#preloader').length) {

		Pace.on('done', function() {
		  initScrollReveal();
		});
	}
		else {

		initScrollReveal();
	}

	if (! /Mobi/.test(navigator.userAgent)) jQuery('.matchHeight').matchHeight();
});

jQuery(window).on('scroll', function (event) {

	checkNavbar();
}).scroll();

jQuery(window).on('load', function(){

	initMasonry();
	initParallax();
});

/* Collapse menu slide */
function initCollapseMenu() {

	var navbar = jQuery('#navbar'),
		navbar_toggle = jQuery('.navbar-toggle'),
		navbar_wrapper = jQuery("#nav-wrapper");

    navbar_wrapper.on('click', '.navbar-toggle', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
        navbar_wrapper.toggleClass('mob-visible');
    });

    navbar.on('click', '.menu-item-type-custom > a, menu-item-object-custom > a', function() {

    	if ( jQuery(this).attr('href') != '' && jQuery(this).attr('href') != '#' && !jQuery(this).hasClass('menu-item-has-children') ) {

            navbar.addClass('collapse');
            navbar_toggle.addClass('collapsed');
    	}
    });

    navbar.on('click', '.menu-item-has-children > a', function(e) {

    	var el = jQuery(this);

    	if (!el.closest('#navbar').hasClass('collapse')) {

    		if ((el.attr('href') === undefined || el.attr('href') === '#') || e.target.tagName == 'A') {

		    	el.next().toggleClass('show');
		    	el.next().children().toggleClass('show');
		    	el.parent().toggleClass('show');

		    	return false;
		    }
	    }
    });

    var lastWidth;
    jQuery(window).on("resize", function () {

    	checkNavbar();

    	var winWidth = jQuery(window).width(),
    		winHeight = jQuery(window).height();

        if (winWidth > 992 && navbar_toggle.is(':hidden')) {
            navbar.addClass('collapse');
            navbar_toggle.addClass('collapsed');
        }

       	lastWidth = winWidth;

		//if (winHeight < 820) navbar_wrapper.find('.navbar').addClass('lighter'); else navbar_wrapper.find('.navbar').removeClass('lighter');     	
    });	
}

/* Navbar is set darker on main page on scroll */
function checkNavbar() {

	var scroll = jQuery(window).scrollTop(),
    	navBar = jQuery('nav.navbar:not(.no-dark)'),
    	topBar = jQuery('.top-bar'),
	    slideDiv = jQuery('.slider-full');

    if (scroll > 1) navBar.addClass('dark'); else navBar.removeClass('dark');
}

/* All keyboard and mouse events */
function initEvents() {

	setTimeout(function() { if ( typeof Pace !== 'undefined' && jQuery('body').hasClass('paceloader-enabled') ) { Pace.stop(); }  }, 3000);		

	initMenuFilter();
	jQuery('.swipebox').swipebox();

	if ( jQuery('.ripples ').length ) {

	    jQuery('.ripples').ripples({
	        resolution: 512,
	        dropRadius: 20,
	        perturbance: 0.04,
	    });
 
	    jQuery('.ripples').ripples("drop", 700, 600, 50, 0.05);
	    jQuery('.ripples').ripples("drop", 750, 650, 50, 0.05);
	    jQuery('.ripples').ripples("drop", 800, 700, 50, 0.05);
	}

	// WooCommerce grid-list toggle
	jQuery('.gridlist-toggle').on('click', 'a', function() {

		jQuery('.matchHeight').matchHeight();
	});

	jQuery('.menu-types').on('click', 'a', function() {

		var el = jQuery(this);

		el.addClass('active').siblings('.active').removeClass('active');
		el.parent().find('.type-value').val(el.data('value'));

		return false;
	});

	/* Scrolling to navbar from "go top" button in footer */
    jQuery('footer').on('click', '.go-top', function() {

	    jQuery('html, body').animate({ scrollTop: 0 }, 800);
	});

    jQuery('.alert').on('click', '.close', function() {

	    jQuery(this).parent().fadeOut();
	    return false;
	});	


	// TopBar Search
    var searchHandler = function(event){

        if (jQuery(event.target).is("#top-search, #top-search *")) return;
        jQuery(document).off("click", searchHandler);
        jQuery('#top-search').toggleClass('show-field');
        jQuery('#navbar').toggleClass('muted');
    }

	jQuery('#top-search-ico').on('click', function (e) {

		e.preventDefault();
		jQuery(this).parent().toggleClass('show-field');
		jQuery('#navbar').toggleClass('muted');
        if (jQuery('#top-search').hasClass('show-field')) {

        	jQuery(document).on("click", searchHandler);
        }
        	else {

        	jQuery(document).off("click", searchHandler);
        }
	});

	jQuery('#top-search input').keypress(function (e) {
		if (e.which == 13) {
			window.location = '/?s=' + jQuery('#top-search input').val();
			return false;
		}
	});

	jQuery('.woocommerce').on('click', 'div.quantity > span', function(e) {

		var f = jQuery(this).siblings('input');
		if (jQuery(this).hasClass('more')) {
			f.val(Math.max(0, parseInt(f.val()))+1);
		} else {
			f.val(Math.max(1, Math.max(0, parseInt(f.val()))-1));
		}
		e.preventDefault();

		jQuery(this).siblings('input').change();

		return false;
	});

	/* Parallax Image Movement */
	jQuery('img.parallax-float').each(function(v, el) {

		var parent = jQuery(el).closest('section'),
			mS = jQuery(el).data('ms'),
			wW = jQuery(window).width(),
			wH = jQuery(window).height();

		var w = mS / wW;

		parent.addClass('parallax-float-section');
		parent.mousemove(function(e) {

			var pageX = e.pageX - (wW / 2);
			var newvalueX = w * pageX * - 1 - 50;
			jQuery(el).css('transform', 'translate('+ newvalueX +'%, -50%)');
		});
	});
}

/* Parallax initialization */
function initParallax() {

	// Only for desktop
	if (/Mobi/.test(navigator.userAgent)) return false;

	jQuery('.like-parallax').each(function() {

		jQuery(this).parallax("50%", 0.3);		
	});

}

/* Adding custom classes to element */
function initStyles() {

	jQuery('form:not(.checkout) select:not(#rating)').wrap('<div class="select-wrap"></div>');
	jQuery('.mc4wp-form .btn').addClass('btn-black-filled');
	jQuery('.wpcf7-checkbox').parent().addClass('margin-none');
	jQuery('.form-btn-shadow .btn,.form-btn-shadow input[type="submit"]').addClass('btn-shadow');
	jQuery('.form-btn-wide .btn,.form-btn-wide input[type="submit"]').addClass('btn-wide');

	jQuery('.navbar-nav > li.menu-item:last').addClass('menu-item-last');

	jQuery('.woocommerce .button').addClass('btn');
	jQuery('.woocommerce .buttons .checkout').addClass('btn  btn-default transform-default color-text-white color-hover-white');
	jQuery('.woocommerce .buttons .wc-forward:not(.checkout)').addClass('btn btn-black-filled color-text-white color-hover-default');
	jQuery('.woocommerce .price_slider_amount .button').addClass('btn btn-black-filled btn-xs color-text-white color-hover-default');
	//jQuery('.widget_price_filter .button').addClass('btn btn-black');


	// Cart quanity change
	jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
	jQuery(document).off('updated_wc_div').on('updated_wc_div', function () {

		jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
		initStyles();
	});
}

/* Starting countUp function */
function checkCountUp() {

	if (jQuery(".countUp").length){

		jQuery('.countUp').counterUp();
	}
}


/* 
	Scroll Reveal Initialization
	Catches the classes: ltx-sr-fade_in ltx-sr-text_el ltx-sr-delay-200 ltx-sr-duration-300 ltx-sr-sequences-100
*/
function initScrollReveal() {

	if (/Mobi/.test(navigator.userAgent) || jQuery(window).width() < 768) return false;

	window.sr = ScrollReveal();

	var srAnimations = {
		zoom_in: {
			
			opacity : 1,
			scale    : 0.01,
		},
		fade_in: {
			distance: '0px',
			scale : 1,		
			opacity : 0,	
		},
		slide_from_left: {
			distance: '150%',
			origin: 'left',			
		},
		slide_from_right: {
			distance: '150%',
			origin: 'right',			
		},
		slide_from_top: {
			distance: '150%',
			origin: 'top',			
		},
		slide_from_bottom: {
			distance: '150%',
			origin: 'bottom',			
		},
	};

	var srElCfg = {

		block: [''],
		items: ['article', '.item'],
		text_el: ['.header', '.subheader', '.btn', 'p', 'img'],
		list_el: ['li']
	};


	/*
		Parsing elements class to get variables
	*/
	jQuery('.ltx-sr').each(function() {

		var el = jQuery(this),
			srClass = el.attr('class');

		var srId = srClass.match(/ltx-sr-id-(\S+)/),
			srEffect = srClass.match(/ltx-sr-effect-(\S+)/),
			srEl = srClass.match(/ltx-sr-el-(\S+)/),
			srDelay = srClass.match(/ltx-sr-delay-(\d+)/),
			srDuration = srClass.match(/ltx-sr-duration-(\d+)/),
			srSeq = srClass.match(/ltx-sr-sequences-(\d+)/); 

		var cfg = srAnimations[srEffect[1]];

		var srConfig = {

			delay : parseInt(srDelay[1]),
			duration : parseInt(srDuration[1]),
			easing   : 'ease-in-out',
			afterReveal: function (domEl) { jQuery(domEl).css('transition', 'all .3s ease'); }
		}			

		cfg = jQuery.extend({}, cfg, srConfig);

		var initedEls = [];
		jQuery.each(srElCfg[srEl[1]], function(i, e) {

			initedEls.push('.ltx-sr-id-' + srId[1] + ' ' + e);
		});

		sr.reveal(initedEls.join(','), cfg, parseInt(srSeq[1]));
	});
}


/*
	Slider filter 
	Filters element in slider and reinits swiper slider after
*/
function initSliderFilter(swiper) {

	var btns = jQuery('.slider-filter'),
		container = jQuery('.slider-filter-container');

	if (btns.length) {

		btns.on('click', 'a.cat, span.cat', function() {

			var el = jQuery(this),
				filter = el.data('filter'),
				limit = el.data('limit');

			container.find('.filter-item').show();
			el.parent().parent().find('.cat-active').removeClass('cat-active')
			el.addClass('cat-active');

			if (filter !== '') {

				container.find('.filter-item').hide();
				container.find('.filter-item.filter-type-' + filter + '').fadeIn();
			}

			if (swiper !== 0) {

				swiper.slideTo(0, 0);
				swiper.update();
			}

			return false;
		});

		// First Init, Activating first tab
		var firstBtn = btns.find('.cat:first')

		firstBtn.addClass('cat-active');
		container.find('.filter-item').hide();
		container.find('.filter-item.filter-type-' + firstBtn.data('filter') + '').show();

		//jQuery('.filter-item:not(.filter-type-' + firstBtn.data('filter') + ')').matchHeight();
	}
}

/*
	Menu filter
*/
function initMenuFilter() {

	var container = jQuery('.menu-sc'),
		btns = jQuery('.menu-sc .menu-filter');

	var niceScrollConf = {cursorcolor:"#242424",cursorborder:"0px",background:"#fff",cursorwidth: "7px",cursorborderradius: "0px",autohidemode:false};

	if (btns.length) {

		btns.on('click', 'a.cat, span.cat', function() {

			var el = jQuery(this),
				filter = el.data('filter');

			container.find('article').show();
			el.parent().parent().find('.cat-active').removeClass('cat-active')
			el.addClass('cat-active');

			if (filter !== '') {

				container.find('article').hide();
				container.find('article.filter-type-' + filter + '').fadeIn();
			}

			jQuery('.menu-sc .items').getNiceScroll().resize();

			return false;
		});

		// First Init, Activating first tab
		var firstBtn = btns.find('.cat:first')

		firstBtn.addClass('cat-active');
		container.find('article').hide();
		container.find('article.filter-type-' + firstBtn.data('filter') + '').show();
	}

	jQuery('.menu-sc .items').niceScroll(niceScrollConf);	
}



/* Swiper slider initialization */
function initSwiper() {


	var products = jQuery('.products-slider'),
		sliders = jQuery('.slider-sc'),
		services = jQuery('.services-slider'),
		clientsSwiperEl = jQuery('.testimonials-slider'),
		gallerySwiperEl = jQuery('.swiper-gallery'),
		portfolio = jQuery('.portfolio-slider'),
		textSwiperEl = jQuery('.swiper-text');

	if (products.length) {

		jQuery(products).each(function(i, el) {


			if (products.length) {

			    var productsSwiper = new Swiper(el, {

					speed		: 1000,
					direction   : 'horizontal',
					nextButton	: '.arrow-right',
					prevButton	: '.arrow-left',
					slidesPerView : products.data('cols'),	        
					slidesPerGroup : products.data('cols'),	        
				
					autoplay    : jQuery(el).data('autoplay'),
					autoplayDisableOnInteraction	: false,
			    });

			    initSliderFilter(productsSwiper);
			}
				else {

			    initSliderFilter(0);
			}

			jQuery(window).on('resize', function(){

				var ww = jQuery(window).width(),
					wh = jQuery(window).height();

				if (products.length && products.data('cols') >= 4) {

					if (ww > 1200) { productsSwiper.params.slidesPerView = 4; productsSwiper.params.slidesPerGroup = 4; }
					if (ww <= 1199) { productsSwiper.params.slidesPerView = 3; productsSwiper.params.slidesPerGroup = 3; }
					if (ww <= 1000) { productsSwiper.params.slidesPerView = 2; productsSwiper.params.slidesPerGroup = 2; }
					if (ww <= 479) { productsSwiper.params.slidesPerView = 1; productsSwiper.params.slidesPerGroup = 1; }		
				
					productsSwiper.update();			
				}	
				
			}).resize();

		});
	}

	if (sliders.length) {

		var pagination,
			arrow1,
			arrow2;

		if (sliders.data('pagination') == 1) pagination = '.swiper-pagination';
		if (sliders.data('arrows') == 1) { arrow1 = '.arrow-right'; arrow2 = '.arrow-left'; }

	    var slidersSwiper = new Swiper(sliders, {

			speed		: 400,
			direction   : 'horizontal',
	        pagination: pagination,
	        paginationClickable: true,					
			nextButton	: arrow1,
			prevButton	: arrow2,
			effect: sliders.data('effect'),
			autoplay    : sliders.data('autoplay'),
			autoplayDisableOnInteraction	: true,
	    });
	}


	if (clientsSwiperEl.length) {

	    var clientsSwiper = new Swiper(clientsSwiperEl, {
			direction   : 'horizontal',

			speed		: 1000,
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			slidesPerView : clientsSwiperEl.data('cols'),
		
			autoplay    : 7000,
			autoplayDisableOnInteraction	: false,
	    });
	}

	/* Slider for inner pages */	
	if (gallerySwiperEl.length) {	

	    var gallerySwiperEl = new Swiper(gallerySwiperEl, {
			direction   : 'horizontal',
	        pagination: '.swiper-pagination',
	        paginationClickable: true,		
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}

	if (textSwiperEl.length) {	

	    var textSwiperEl = new Swiper(textSwiperEl, {
			direction   : 'horizontal',
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			loop		: true,
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}	

	jQuery(window).on('resize', function(){

		var ww = jQuery(window).width(),
			wh = jQuery(window).height();
		if (clientsSwiperEl.length && clientsSwiperEl.data('cols') >= 3) {

			if (ww > 1000) { clientsSwiper.params.slidesPerView = 3; }
			if (ww <= 1000) { clientsSwiper.params.slidesPerView = 2; }
			if (ww <= 479) { clientsSwiper.params.slidesPerView = 1; }		
		
			clientsSwiper.update();			
		}

	}).resize();
}

/* Masonry initialization */
function initMasonry() {

	jQuery('.masonry').masonry({
	  itemSelector: '.item',
	  columnWidth:  '.item'
	});		
}

/* Google maps init */
function initMap() {

	jQuery('.like-google-maps').each(function(i, mapEl) {

		mapEl = jQuery(mapEl);
		if (mapEl.length) {

			var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
			var map = new google.maps.Map(document.getElementById(mapEl.attr('id')), {
			  zoom: mapEl.data('zoom'),
			  center: uluru,
			  scrollwheel: false,
			  styles: mapStyles
			});

			var marker = new google.maps.Marker({
			  position: uluru,
			  icon: mapEl.data('marker'),
			  map: map
			});
		}
	});
}
