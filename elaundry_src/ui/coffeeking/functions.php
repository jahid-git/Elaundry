<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * Theme Includes
 */
require_once get_template_directory() . '/inc/init.php';

/**
 * Theme defaults
 */

add_theme_support( 'title-tag' );

/**
 * TGM Plugin Activation
 */
{
	require_once get_template_directory() . '/TGM-Plugin-Activation/class-tgm-plugin-activation.php';

	/** @internal */
	function coffeeking_action_theme_register_required_plugins() {

		$config = array(
			'id'           => 'coffeeking',
			'menu'         => 'coffeeking-install-plugins',
			'parent_slug'  => 'themes.php',
			'capability'   => 'edit_theme_options',
			'has_notices'  => true,
			'dismissable'  => true,
			'is_automatic' => false,
		);

		tgmpa( array(

			array(
			'name'      => esc_html__('Like-Themes Plugins', 'coffeeking'),
			'slug'      => 'like-themes-plugins',
			'source'   	=> get_template_directory() . '/inc/plugins/like-themes-plugins.zip',
			'required'  => true,
			'version'  => '1.7.3',
			),
			array(
			'name'      => esc_html__('WPBakery Page Builder', 'coffeeking'),
			'slug'      => 'js_composer',
			'source'   	=> 'http://updates.like-themes.com/plugins/js_composer_6.zip',
			'required'  => true,
			),		
			array(
			'name'      => esc_html__('Envato Market', 'coffeeking'),
			'slug'      => 'envato-market',
			'source'   	=> get_template_directory() . '/inc/plugins/envato-market.zip',
			'required'  => false,
			),									
			array(
			'name'      => esc_html__('Breadcrumb-navxt', 'coffeeking'),
			'slug'      => 'breadcrumb-navxt',
			'required'  => false,
			),
			array(
			'name'      => esc_html__('Contact Form 7', 'coffeeking'),
			'slug'      => 'contact-form-7',
			'required'  => false,
			),
			array(
			'name'      => esc_html__('Post-views-counter', 'coffeeking'),
			'slug'      => 'post-views-counter',
			'required'  => false,
			),
			array(
			'name'      => esc_html__('Unyson', 'coffeeking'),
			'slug'      => 'unyson',
			'required'  => true,
			),
			array(
			'name'      => esc_html__('MailChimp for WordPress', 'coffeeking'),
			'slug'      => 'mailchimp-for-wp',
			'required'  => false,
			),		
			array(
			'name'      => esc_html__('WooCommerce', 'coffeeking'),
			'slug'      => 'woocommerce',
			'required'  => false,
			),
		), $config);

	}
	add_action( 'tgmpa_register', 'coffeeking_action_theme_register_required_plugins' );
}

/**
 * Includes template part, allowing to pass variables
 */
function coffeeking_get_template_part( $slug, $name = null, array $coffeeking_params = array() ) {

	$slug = $slug;
	if ( ! is_null( $name ) ) {

		$slug .= '-' . $name;
	}

	include( get_template_directory() . '/' . $slug . '.php' );
}

/**
 * Single comment function
 */
if ( ! function_exists( 'coffeeking_single_comment' ) ) {
	function coffeeking_single_comment( $comment, $args, $depth ) {

		$GLOBALS['comment'] = $comment;
		switch ( $comment->comment_type ) {
			case 'pingback' :
				?>
				<li class="trackback"><?php esc_html_e( 'Trackback:', 'coffeeking' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( esc_html__( 'Edit', 'coffeeking' ), '<span class="edit-link">', '<span>' ); ?>
				<?php
				break;
			case 'trackback' :
				?>
				<li class="pingback"><?php esc_html_e( 'Pingback:', 'coffeeking' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( esc_html__( 'Edit', 'coffeeking' ), '<span class="edit-link">', '<span>' ); ?>
				<?php
				break;
			default :
				$author_id = $comment->user_id;
				$author_link = get_author_posts_url( $author_id );
				?>
				<li id="comment-<?php comment_ID(); ?>" <?php comment_class( 'comment_item' ); ?>>
					<div class="comment-single">
						<div class="comment-author-avatar"><?php echo get_avatar( $comment, 45 ); ?></div>
						<div class="comment-content">
							<div class="comment-info">
	                            <?php echo esc_html__( 'by', 'coffeeking' );?> <span class="comment-author"><?php echo ( ! empty( $author_id ) ? '<a href="' . esc_url( $author_link ) . '">' : '') . comment_author() . ( ! empty( $author_id ) ? '</a>' : ''); ?></span><span class="hidden-ms hidden-xs"> | </span>
	                            <span class="comment-date-time"><span class="comment-date"><span class="comment_date_label hidden-ms hidden-xs"><?php esc_html_e( 'Posted', 'coffeeking' ); ?></span> <span class="comment_date_value"><?php echo get_comment_date( get_option( 'date_format' ) ); ?></span></span><span class="hidden-ms hidden-xs"> | </span>
	                            <span class="comment-time"><?php echo get_comment_date( get_option( 'time_format' ) ); ?></span></span>
							</div>
							<div class="comment_text_wrap">
								<?php if ( $comment->comment_approved == 0 ) { ?>
								<div class="comment_not_approved"><?php esc_html_e( 'Your comment is awaiting moderation.', 'coffeeking' ); ?></div>
								<?php } ?>
								<div class="comment-text"><?php comment_text(); ?></div>
							</div>
							<?php if ( $depth < $args['max_depth'] ) { ?>
								<div class="comment-reply"><?php comment_reply_link( array_merge( $args, array(
									'depth' => $depth,
									'max_depth' => $args['max_depth'],
								) ) ); ?></div>
							<?php } ?>
						</div>
					</div>
				<?php
				break;
		}
	}
}


/**
 * Print H1 header
*/
if ( !function_exists( 'coffeeking_get_h1' ) ) {

	function coffeeking_get_h1() {

		global $wp_post;
		
		if ( is_home() ) {

			$title = esc_html__( 'All Blog Posts', 'coffeeking' );
		} 
			else
		if ( is_front_page() ) {

			$title = esc_html__( 'Home', 'coffeeking' );
		}
			else
		if ( is_year() ) {

			$title = sprintf( esc_html__( 'Year Archives: %s', 'coffeeking' ), get_the_date( 'Y' ) );
		}
			else				
		if ( is_month() ) {

			$title = sprintf( esc_html__( 'Month Archives: %s', 'coffeeking' ), get_the_date( 'F Y' ) );
		}
			else
		if ( is_day() ) {

			$title = sprintf( esc_html__( 'Day Archives: %s', 'coffeeking' ), get_the_date() );
		}
			else
		if ( is_category() ) {

			$title = single_cat_title( '', false );
		}
			else
		if ( is_tag() ) {

			$title = sprintf( esc_html__( 'Tag: %s', 'coffeeking' ), single_tag_title( '', false ) );
		}
			else
		if ( is_tax() ) {

			$title = single_term_title( '', false );
		}
			else
		if ( is_search() ) {

			$title = sprintf( esc_html__( 'Search Results: %s', 'coffeeking' ), get_search_query() );
		} 
			else				
		if ( is_author() ) {

			if ( !empty( get_query_var( 'author_name' ) ) ) {

				$q = get_user_by( 'slug', get_query_var( 'author_name' ) );
			}
				else {

				$q = get_userdata( get_query_var( 'author' ) );
			}

			$title = sprintf( esc_html__( 'Author: %s', 'coffeeking' ), $q->display_name );
		} 
			else
		if ( is_post_type_archive() ) {

			$q   = get_queried_object();
			$title = '';
			if ( !empty( $q->labels->all_items ) ) {

				$title = $q->labels->all_items;
			}
		}
			else
		if ( is_attachment() ) {

			$title = sprintf( esc_html__( 'Attachment: %s', 'coffeeking' ), get_the_title() );
		}
			else
		if ( is_404() ) {

			$title = esc_html__( '404 Not Found', 'coffeeking' );
		}
			else {

			$title = get_the_title();
		}

		echo wp_kses_post($title);
	}
}

/**
 * Fix for widgets without header
 */
add_filter( 'dynamic_sidebar_params', 'coffeeking_check_sidebar_params' );
function coffeeking_check_sidebar_params( $params ) {
	global $wp_registered_widgets;

	// Exclude for widget with default title
	if ( in_array( $params[0]['widget_name'], array( 'Categories', 'Archives', 'Meta', 'Pages', 'Recent Comments', 'Recent Posts' ) ) ) {

		return $params;
	}

	$settings_getter = $wp_registered_widgets[ $params[0]['widget_id'] ]['callback'][0];
	$settings = $settings_getter->get_settings();
	$settings = $settings[ $params[1]['number'] ];

	if ( $params[0]['after_widget'] === '</div></aside>' && isset( $settings['title'] ) && empty( $settings['title'] ) ) {
		$params[0]['before_widget'] .= '<div class="content">';
	}

	return $params;
}

/**
 * Adds custom post type active item in menu
 */
add_action( 'nav_menu_css_class', 'coffeeking_add_current_nav_class', 10, 2 );
function coffeeking_add_current_nav_class( $classes, $item ) {

	// Getting the current post details
	global $post, $wp;

	$id = ( isset( $post->ID ) ? get_the_ID() : null );

	if ( isset( $id ) ) {

		// Getting the post type of the current post
		$current_post_type = get_post_type_object( get_post_type( $post->ID ) );
		if (!empty($current_post_type->rewrite['slug'])) {

			$current_post_type_slug = $current_post_type->rewrite['slug'];
		}
			else {

			$current_post_type_slug = '';
		}

		$current_url = esc_url( str_replace( '/', '', parse_url( home_url( add_query_arg( array(),$wp->request ) ), PHP_URL_PATH ) ) );
		$menu_slug = strtolower( trim( $item->url ) );

		if ( !empty($current_post_type_slug) && strpos( $menu_slug,$current_post_type_slug ) !== false && $current_url != '#' && $current_url != '' && $current_url === str_replace( '/', '', parse_url( $item->url, PHP_URL_PATH ) ) ) {


			$classes[] = 'current-menu-item';

		} else {

			$classes = array_diff( $classes, array( 'current_page_parent' ) );
		}
	}

	if ( get_post_type() != 'post' && $item->object_id == get_site_option( 'page_for_posts' ) ) {

		$classes = array_diff( $classes, array( 'current_page_parent' ) );
	}

	return $classes;
}


/**
 * Manual excerpt generation
 */
function coffeeking_excerpt( $content, $excerpt = 0 ) {
	global $post;

	if ( ! empty( $post->post_content ) &&
		 ! preg_match( '#<!--more-->#', $post->post_content ) &&
		 ! preg_match( '#<!--nextpage-->#', $post->post_content ) &&
		 ! preg_match( '#twitter.com#', $post->post_content ) &&
		 ! preg_match( '#wp-caption#', $post->post_content )
		) {
		$content = coffeeking_cut_excerpt( $post->post_content , $excerpt );
	}

	return $content;
}

function coffeeking_cut_excerpt( $content = '', $excerpt = 0 ) {

	$cut = false;
	$excerpt_more = apply_filters( 'excerpt_more', ' ...' );
	$content = coffeeking_get_content( $content );
	$texts = preg_grep( '#(<[^>]+>)|(<\/[^>]+>)#s', $content, PREG_GREP_INVERT );
	$total_length = count( preg_split( '//u', implode( '', $texts ), - 1, PREG_SPLIT_NO_EMPTY ) );
	if ( function_exists( 'fw' ) ) {
		$excerpt_set = (int) fw_get_db_settings_option( 'excerpt_auto' );
	} else {
		$excerpt_set = 0;
	}

	if ( $excerpt_set == 0 ) {

		$excerpt_set = 250;
	}
	$excerpt_length = (int) apply_filters( 'excerpt_length', $excerpt_set );

	foreach ( $texts as $key => $text ) {

		$text = preg_split( '//u', $text, - 1, PREG_SPLIT_NO_EMPTY );
		$text = array_slice( $text, 0, $excerpt_length );
		$excerpt_length = $excerpt_length - count( $text );
		$cut = $key;

		if ( 0 >= $excerpt_length ) {
			$content[ $key ] = $texts[ $key ] = implode( '', $text );
			break;
		}
	}

	if ( false !== $cut ) {
		array_splice( $content, $cut + 1 );
	}

	$content = coffeeking_strip_tags( $texts, $cut );

	$content = implode( ' ', $content );
	$content = preg_replace( '/<\/p>/', '', $content );

	if ( $total_length > $excerpt_length ) {
		$content .= $excerpt_more;
	}

	return wp_kses_post( $content, true );
}

/**
 * Cuts text by the number of characters
 */
if ( !function_exists( 'coffeeking_cut_text' ) ) {

	function coffeeking_cut_text( $text, $cut = 300, $aft = ' ...' ) {
		if ( empty( $text ) ) {
			return null;
		}

		if ( empty($cut) AND function_exists( 'fw' ) ) {
			$cut = (int) fw_get_db_settings_option( 'excerpt_wc_auto' );
		}

		$text = wp_strip_all_tags( $text, true );
		$text = strip_tags( $text );
		$text = preg_replace( "/<p>|<\/p>|<br>|(( *&nbsp; *)|(\s{2,}))|\\r|\\n/", ' ', $text );
		if ( function_exists('mb_strripos') AND mb_strlen( $text ) > $cut ) {
			$text = mb_substr( $text, 0, $cut, 'UTF-8' );
			return mb_substr( $text, 0, mb_strripos( $text, ' ', 0, 'UTF-8' ), 'UTF-8' ) . $aft;
		} else {
			return $text;
		}
	}
}

function coffeeking_get_content( $content = '' ) {

	$result = array();
	$content = capital_P_dangit( $content );

	$content = wptexturize( $content );
	$content = convert_smilies( $content );
	$content = wpautop( $content );
	$content = prepend_attachment( $content );
	$content = wp_make_content_images_responsive( $content );
	$content = strip_shortcodes( $content );
	$content = str_replace( ']]>', ']]&gt;', $content );
	$content = str_replace( array( "\r\n", "\r" ), "\n", $content );
	$content = preg_split( '#(<[^>]+>)|(<\/[^>]+>)#s', trim( $content ), - 1, PREG_SPLIT_DELIM_CAPTURE );
	$content = array_diff( $content, array( "\n", '' ) );
	$content = array_values( $content );

	foreach ( $content as $key => $value ) {
		$result[] = str_replace( array( "\r\n", "\r", "\n" ), '', $value );
	}

	return $result;
}

function coffeeking_strip_tags( $texts = array(), $cut = 0 ) {
	if ( ! is_array( $texts ) ) {
		return $texts;
	}

	$clean = array( '<p>' );

	foreach ( $texts as $key => $value ) {
		if ( $key <= $cut ) {
			$clean[] = $value;
		}
	}

	return $clean;
}

if ( !function_exists( 'mrcoffee_is_wc' ) ) {
	/**
	 * Return true|false is woocommerce conditions.
	 *
	 * @param string $tag
	 * @param string|array $attr
	 *
	 * @return bool
	 */
	function coffeeking_is_wc($tag, $attr='') {
		if( !class_exists( 'woocommerce' ) ) return false;
		switch ($tag) {
			case 'wc_active':
		        return true;
			
		    case 'woocommerce':
		        if( function_exists( 'is_woocommerce' ) && is_woocommerce() ) return true;
				break;
		    case 'shop':
		        if( function_exists( 'is_shop' ) && is_shop() ) return true;
				break;
			case 'product_category':
		        if( function_exists( 'is_product_category' ) && is_product_category($attr) ) return true;
				break;
		    case 'product_tag':
		        if( function_exists( 'is_product_tag' ) && is_product_tag($attr) ) return true;
				break;
		    case 'product':
		    	if( function_exists( 'is_product' ) && is_product() ) return true;
				break;
		    case 'cart':
		        if( function_exists( 'is_cart' ) && is_cart() ) return true;
				break;
		    case 'checkout':
		        if( function_exists( 'is_checkout' ) && is_checkout() ) return true;
				break;
		    case 'account_page':
		        if( function_exists( 'is_account_page' ) && is_account_page() ) return true;
				break;
		    case 'wc_endpoint_url':
		        if( function_exists( 'is_wc_endpoint_url' ) && is_wc_endpoint_url($attr) ) return true;
				break;
		    case 'ajax':
		        if( function_exists( 'is_ajax' ) && is_ajax() ) return true;
				break;
		}

		return false;
	}
}


/**
 * Checking active status of plugin
 */
function coffeeking_plugin_is_active( $plugin_var, $plugin_dir = null ) {

	if ( empty( $plugin_dir ) ) { $plugin_dir = $plugin_var;
	}
	return in_array( $plugin_dir . '/' . $plugin_var . '.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) );
}

/**
 * Adding custom stylesheet to admin
 */
add_action( 'admin_enqueue_scripts', 'coffeeking_admin_css' );
function coffeeking_admin_css() {

	wp_enqueue_style( 'coffeeking-admin', get_template_directory_uri() . '/css/admin.css', false, '1.0.0' );
}

function coffeeking_css_style() {

	wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/assets/css/bootstrap-grid.css', array(), '1.0' );

	wp_enqueue_style( 'coffeeking-plugins', get_template_directory_uri() . '/assets/css/plugins.css', array(), '1.0' );

	wp_enqueue_style( 'coffeeking-theme-style', get_stylesheet_uri(), array( 'bootstrap', 'coffeeking-plugins' ), wp_get_theme()->get('Version') );

	if (function_exists('FW')) {

		if ( function_exists( 'fw_get_db_settings_option' )  ) {

			$header_bg = fw_get_db_settings_option( 'header_bg' );
			if (! empty( $header_bg ) ) {

				wp_add_inline_style( 'coffeeking-theme-style', '.page-header { background-image: url(' . esc_attr( $header_bg['url'] ) . ') !important; } ' );
			}

			$footer_bg = fw_get_db_settings_option( 'footer_bg' );
			if (! empty( $footer_bg ) ) {

				wp_add_inline_style( 'coffeeking-theme-style', '#block-footer { background-image: url(' . esc_attr( $footer_bg['url'] ) . ') !important; } ' );
			}

			$bg_404 = fw_get_db_settings_option( '404_bg' );
			if (! empty( $bg_404 ) ) {

				wp_add_inline_style( 'coffeeking-theme-style', 'body.error404 { background-image: url(' . esc_attr( $bg_404['url'] ) . ') !important; } ' );
			}

			$go_top_img = fw_get_db_settings_option( 'go_top_img' );
			if (! empty( $go_top_img ) ) {

				wp_add_inline_style( 'coffeeking-theme-style', '.go-top:before { background-image: url(' . esc_attr( $go_top_img['url'] ) . ') !important; } ' );
			}

			$coffeeking_pace = fw_get_db_settings_option( 'page-loader' );

			if ( !empty($coffeeking_pace) AND !empty($coffeeking_pace['image']) AND !empty($coffeeking_pace['image']['loader_img'])) {

				wp_add_inline_style( 'coffeeking-theme-style', '.paceloader-image .pace-image { background-image: url(' . esc_attr( $coffeeking_pace['image']['loader_img']['url'] ) . ') !important; } ' );
			}
		}
	}
}
add_action( 'wp_enqueue_scripts', 'coffeeking_css_style' );

/**
 * Return inverted contrast value of color
 */
function coffeeking_rgb_contrast($r, $g, $b) {

	if ($r < 128) return array(255,255,255,0.1); else return array(255,255,255,1);
}

/**
 * Lightens/darkens a given colour (hex format), returning the altered colour in hex format.7
 * @param str $hex Colour as hexadecimal (with or without hash);
 * @percent float $percent Decimal ( 0.2 = lighten by 20%(), -0.4 = darken by 40%() )
 * @return str Lightened/Darkend colour as hexadecimal (with hash);
 */
function coffeeking_color_change( $hex, $percent ) {
	
	$hex = preg_replace( '/[^0-9a-f]/i', '', $hex );
	$new_hex = '#';
	
	if ( strlen( $hex ) < 6 ) {

		$hex = $hex[0] + $hex[0] + $hex[1] + $hex[1] + $hex[2] + $hex[2];
	}
	
	for ($i = 0; $i < 3; $i++) {

		$dec = hexdec( substr( $hex, $i*2, 2 ) );
		$dec = min( max( 0, $dec + $dec * $percent ), 255 ); 
		$new_hex .= str_pad( dechex( $dec ) , 2, 0, STR_PAD_LEFT );
	}		
	
	return $new_hex;
}

/*
* Callback function to filter the MCE settings
*/
function coffeeking_wpb_mce_buttons_2($buttons) {
    array_unshift($buttons, 'styleselect');
    return $buttons;
}
add_filter('mce_buttons_2', 'coffeeking_wpb_mce_buttons_2');

function coffeeking_mce_before_init_insert_formats( $init_array ) {  

    $style_formats = array(  
        array(  
            'title' => 'Large Text',  
            'block' => 'span',  
            'classes' => 'text-large',
            'wrapper' => true,
             
        ),  
        array(  
            'title' => 'Small Text',  
            'block' => 'span',  
            'classes' => 'text-small',
            'wrapper' => true, 
        ),
        array(  
            'title' => 'Black Href',  
            'block' => 'a',  
            'classes' => 'black',
            'wrapper' => true, 
        ),          
        array(  
            'title' => 'List Arrow',
            'selector' => 'ul',
            'classes' => 'ul-arrow',
        ),          
    );  
    $init_array['style_formats'] = json_encode( $style_formats );  
     
    return $init_array;  
   
} 
add_filter( 'tiny_mce_before_init', 'coffeeking_mce_before_init_insert_formats' ); 

/**
 * Config used for Like-Themes Plugin to set Visual Composer configuration	
 */
add_filter( 'like_get_vc_config', 'coffeeking_vc_config', 10, 1 );
function coffeeking_vc_config( $value ) {

    return array(
    	'sections'	=>	array(
			esc_html__("Flowing Image", 'coffeeking') 		=> "flowing-image",
			esc_html__("Row with 5 Columns", 'coffeeking') 		=> "row-5-cols",
			esc_html__("Banners Grid", 'coffeeking') 		=> "banners-grid",			
			esc_html__("Open Hours", 'coffeeking') 		=> "open-hours",			
			esc_html__("Water Ripples", 'coffeeking') 		=> "ripples",			
			esc_html__("Background Hidden on mobile", 'coffeeking') 		=> "bg-mobile-hide",			
			esc_html__("Floating Social Block", 'coffeeking') 		=> "floating-social",
			esc_html__("Displaced to top section", 'coffeeking') 		=> "displaced-top",			
		),
		'background' => array(
			esc_html__( "Theme Main Color", 'coffeeking' ) => "theme_color",
			esc_html__( "Second Color", 'coffeeking' ) => "second",			
			esc_html__( "Gray", 'coffeeking' ) => "gray",
			esc_html__( "Black", 'coffeeking' ) => "black",			
			esc_html__( "Black Dark", 'coffeeking' ) => "black_dark",			
		),
		'overlay'	=> array(
			esc_html__( "Dark Overlay", 'coffeeking' ) => "dark",
			esc_html__( "Pattern Overlay", 'coffeeking' ) => "pattern",
			esc_html__( "Black Overlay", 'coffeeking' ) => "black",			
		),

	);
}

$coffeeking_current_scheme = apply_filters ('coffeeking_current_scheme', array());

add_filter( 'woocommerce_output_related_products_args', 'coffeeking_woo_related_products_args' );
function coffeeking_woo_related_products_args( $args ) {
	$args['posts_per_page'] = 3;
	return $args;
}




