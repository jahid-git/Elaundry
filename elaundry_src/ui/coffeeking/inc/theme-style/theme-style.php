<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * Generating inline css styles for customization
 */
if ( !function_exists('coffeeking_generate_css') ) {

	function coffeeking_generate_css() {

		// List of attributes
		$css = array(
			'main_color' 			=> true,
			'second_color' 			=> true,			
			'gray_color' 			=> true,
			'white_color' 			=> true,
			'black_color' 			=> true,			
			'footer_color' 			=> true,			

			'nav_bg' 				=> true,
			'nav_opacity_top' 		=> true,
			'nav_opacity_scroll'	=> true,

			'border_radius' 		=> true,
		);

		// Escaping all the attributes
		$css_rgb = array();
		foreach ($css as $key => $item) {

			$css[$key] = esc_attr(fw_get_db_customizer_option($key));
			$css_rgb[$key] = sscanf(esc_attr(fw_get_db_customizer_option($key)), "#%02x%02x%02x");
		}

		$css['black_dark_color'] = coffeeking_color_change($css['black_color'], -0.35);

		$theme_style = "";

		include get_template_directory() . '/inc/theme-style/color-main.php';
		include get_template_directory() . '/inc/theme-style/color-second.php';
		include get_template_directory() . '/inc/theme-style/color-gray.php';
		include get_template_directory() . '/inc/theme-style/color-black.php';
		include get_template_directory() . '/inc/theme-style/color-white.php';
		include get_template_directory() . '/inc/theme-style/color-navbar.php';
		include get_template_directory() . '/inc/theme-style/border-radius.php';		
		include get_template_directory() . '/inc/theme-style/google-fonts.php';		

		$theme_style = str_replace( array( "\n", "\r" ), '', $theme_style );

		return $theme_style;
	}
}
