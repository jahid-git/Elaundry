<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }
/**
 * Include static files: javascript and css
 */

if ( is_admin() ) {

	return;
}

if ( function_exists( 'fw' ) ) {

	fw()->backend->option_type( 'icon-v2' )->packs_loader->enqueue_frontend_css();
}
	else {

	wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/css/font-awesome/css/font-awesome.min.css', array(), '1.0' );
	wp_enqueue_style( 'fw_css', get_template_directory_uri() . '/assets/css/fw.css', array(), '1.0' );
}

if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {

	wp_enqueue_script( 'comment-reply' );
}

/**
 * Loading plugins and custom coffeeking js scripts
 */
wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/js/modernizr-2.6.2.min.js', array( 'jquery' ), '1.0', false );

wp_enqueue_script( 'html5shiv', get_template_directory_uri() . '/assets/js/html5shiv.js', array(), '', false );
wp_script_add_data( 'html5shiv', 'conditional', 'lt IE 9' );


wp_enqueue_script('counterup', get_template_directory_uri() . '/assets/js/jquery.counterup.min.js', array( 'jquery' ), '1.0', true );
wp_enqueue_script('localscroll', get_template_directory_uri() . '/assets/js/jquery.localscroll-1.2.7-min.js', array( 'jquery' ), '1.2.7', true );
wp_enqueue_script('matchheight', get_template_directory_uri() . '/assets/js/jquery.matchHeight.js', array( 'jquery' ), '', true );
wp_enqueue_script('parallax', get_template_directory_uri() . '/assets/js/jquery.parallax-1.1.3.js', array( 'jquery' ), '1.1.3', true );
wp_enqueue_script('scrollTo', get_template_directory_uri() . '/assets/js/jquery.scrollTo-1.4.2-min.js', array( 'jquery' ), '1.4.2', true );
wp_enqueue_script('swipebox', get_template_directory_uri() . '/assets/js/jquery.swipebox.js', array( 'jquery' ), '1.4.4', true );
wp_enqueue_script('zoomslider', get_template_directory_uri() . '/assets/js/jquery.zoomslider.js', array( 'jquery' ), '0.2.3', true );
wp_enqueue_script('masonry', get_template_directory_uri() . '/assets/js/masonry.pkgd.min.js', array( 'jquery' ), '3.3.2', true );
wp_enqueue_script('scrollreveal', get_template_directory_uri() . '/assets/js/scrollreveal.js', array( 'jquery' ), '3.3.4', true );
wp_enqueue_script('swiper', get_template_directory_uri() . '/assets/js/swiper.jquery.js', array( 'jquery' ), '3.4.1', true );
wp_enqueue_script('nicescroll', get_template_directory_uri() . '/assets/js/jquery.nicescroll.js', array( 'jquery' ), '3.7.6', true );
wp_enqueue_script('waypoint', get_template_directory_uri() . '/assets/js/waypoint.js', array( 'jquery' ), '1.6.2', true );
wp_enqueue_script('fullpage', get_template_directory_uri() . '/assets/js/jquery.fullPage.js', array( 'jquery' ), '2.9.4', true );
wp_enqueue_script( 'affix', get_template_directory_uri() . '/assets/js/affix.js', array( 'jquery' ), '3.3.7', true );
wp_enqueue_script('ripples', get_template_directory_uri() . '/assets/js/jquery.ripples.js', array( 'jquery' ), '0.5.3', true );

wp_enqueue_script( 'coffeeking-map-style', get_template_directory_uri() . '/assets/js/map-style.js', array( 'jquery' ), '1.0', true );
wp_enqueue_script( 'coffeeking-scripts', get_template_directory_uri() . '/assets/js/scripts.js', array( 'jquery' ), wp_get_theme()->get('Version'), true );

$coffeeking_pace = 'disabled';
if ( function_exists( 'FW' ) ) {

	$coffeeking_pace = fw_get_db_settings_option( 'page-loader' );
	if ( !empty($coffeeking_pace) AND ((!empty($coffeeking_pace['loader']) AND $coffeeking_pace['loader'] != 'disabled') OR 
	( !empty($coffeeking_pace) AND $coffeeking_pace['loader'] != 'disabled') ) ) {

		wp_enqueue_script('pace', get_template_directory_uri() . '/assets/js/pace.js', array( 'jquery' ), '', true );
	}
}

/**
 * Customization
 */
if ( function_exists( 'fw' ) ) {

	require_once get_template_directory() . '/inc/theme-style/theme-style.php';
	wp_add_inline_style( 'coffeeking-theme-style', coffeeking_generate_css() );
}
	else {

	$query_args = array( 'family' => 'Kanit:300,400,700,800', 'subset' => 'latin' );
	wp_enqueue_style( 'coffeeking-google-fonts', esc_url( add_query_arg( $query_args, '//fonts.googleapis.com/css' ) ), array(), null );
}


/**
 * Loading FontAwesome 5 fonts
 */
wp_enqueue_style( 'vc_font_awesome_5' );


