<?php

/**
 * Including google fonts
 */
$coffeeking_font_main = fw_get_db_settings_option( 'font-text' );
$coffeeking_font_headers = fw_get_db_settings_option( 'font-headers' );

$coffeeking_font_main_weights = fw_get_db_settings_option( 'font-text-weights' );
$coffeeking_font_headers_weights = fw_get_db_settings_option( 'font-headers-weights' );


$coffeeking_google_fonts = array();

if ( !empty($coffeeking_font_main['variation']) ) {

	$coffeeking_font_main['variation'] = $coffeeking_font_main['weight'];
	$coffeeking_google_fonts[$coffeeking_font_main['family']][$coffeeking_font_main['variation']] = true;

	if ( !empty($coffeeking_font_main_weights) ) {

		$coffeeking_items = explode(',', $coffeeking_font_main_weights);
		foreach ( $coffeeking_items as $item) $coffeeking_google_fonts[$coffeeking_font_main['family']][$item] = true;
	}

	$coffeeking_google_subsets[$coffeeking_font_main['subset']] = true;
}

if ( !empty($coffeeking_font_headers['variation']) ) {

	$coffeeking_google_fonts[$coffeeking_font_headers['family']][$coffeeking_font_headers['variation']] = true;
	if ( !empty($coffeeking_font_headers_weights) ) {

		$coffeeking_items = explode(',', $coffeeking_font_headers_weights);
		foreach ( $coffeeking_items as $item) $coffeeking_google_fonts[$coffeeking_font_headers['family']][$item] = true;
	}

	$coffeeking_google_subsets[$coffeeking_font_headers['subset']] = true;
}



$theme_style .= "html,body,div,table { 
	font-family: '".esc_attr($coffeeking_font_main['family'])."';
	font-weight: ".esc_attr($coffeeking_font_main['variation']).";
}";

$theme_style .= "h1, h2, h3, h4, h5, h6, .header, .subheader { 
	font-family: '".esc_attr($coffeeking_font_headers['family'])."';
	font-weight: ".esc_attr($coffeeking_font_headers['variation']).";
}";

$family = $subset = '';
foreach ( $coffeeking_google_fonts as $font => $styles ) {

	if ( !empty($family) ) $family .= "%7C";
    $family .= str_replace( ' ', '+', $font ) . ':' . implode( ',', array_keys($styles) );
}

if ( !empty($coffeeking_google_subsets) ) {

	foreach ( $coffeeking_google_subsets as $subset_ => $val ) {

		if ( !empty($subset) ) $subset .= ",";
	    $subset .= $subset_;
	}

	$query_args = array( 'family' => $family, 'subset' => $subset );

	wp_enqueue_style( 'coffeeking-google-fonts', esc_url( add_query_arg( $query_args, '//fonts.googleapis.com/css' ) ), array(), null );
}


