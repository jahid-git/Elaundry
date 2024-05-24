<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

// Navbar Settings

if ( !empty($css_rgb['nav_bg']) ) {

	$theme_style .= "
	nav.navbar {
	  background: rgba({$css_rgb['nav_bg'][0]}, {$css_rgb['nav_bg'][1]}, {$css_rgb['nav_bg'][2]}, {$css['nav_opacity_top']});
	}
	";
}

$theme_style .= "
@media (max-width: 1199px) {

	nav.navbar ul.navbar-nav li.menu-item-has-children:after
	{ color: {$css['black_color']} ; }

	nav.navbar #navbar
	{ background-color: {$css['main_color']} ; }

	nav.navbar ul.navbar-nav li > a:hover
	{ background-color: {$css['second_color']}; color: {$css['main_color']};   }

	nav.navbar #navbar ul.navbar-nav > .current_page_item > a,
	nav.navbar ul.navbar-nav > li.current_page_parent > a,
	nav.navbar ul.navbar-nav > li.current_page_item > a
	{ color: {$css['white_color']} !important; }

	ul.sub-menu li:hover > a,
	ul.sub-menu li:hover > a:after,
	ul.sub-menu li > a:hover,
	ul.sub-menu li > a:hover:after,
	nav.navbar ul.navbar-nav > li > a:hover:after,
	nav.navbar ul.navbar-nav > li > a:hover .fa,
	nav.navbar ul.navbar-nav > li > a:hover
	{ color: {$css['white_color']} !important; }	
}

#nav-wrapper nav.navbar.navbar-transparent.affix.dark {
  background: rgba({$css_rgb['black_color'][0]}, {$css_rgb['black_color'][1]}, {$css_rgb['black_color'][2]}, {$css['nav_opacity_scroll']}) !important;
}

#nav-wrapper nav.navbar.navbar-transparent-light.affix.dark {
  background: rgba({$css_rgb['white_color'][0]}, {$css_rgb['white_color'][1]}, {$css_rgb['white_color'][2]}, 1) !important;
}

body.admin-bar #adminbarsearch { background-color: transparent !important;}
";


