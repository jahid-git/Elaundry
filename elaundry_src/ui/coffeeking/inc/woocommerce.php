<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * Woocommerce Hooks
 */
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

remove_action( 'woocommerce_before_shop_loop_item',	'woocommerce_template_loop_product_link_open', 10);
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5);

remove_action( 'woocommerce_before_subcategory', 'woocommerce_template_loop_category_link_open', 10);
remove_action( 'woocommerce_after_subcategory',	'woocommerce_template_loop_category_link_close', 10);


add_filter( 'woocommerce_show_page_title', '__return_false' );

add_action('woocommerce_before_main_content', 'coffeeking_wc_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'coffeeking_wc_wrapper_end', 10);

if ( !function_exists( 'coffeeking_wc_wrapper_start' ) ) {
	function coffeeking_wc_wrapper_start() {

		$sidebar_wc = fw_get_db_settings_option( 'sidebar_wc_layout' );

		if ( $sidebar_wc != 'disabled' ) {

			echo '<div class="inner-page margin-default"><div class="row"><div class="col-lg-9 col-lg-push-3 col-md-8 col-md-push-4 text-page">';
		}
			else {

			echo '<div class="inner-page margin-default">';
		}
	}
}

if ( !function_exists( 'coffeeking_wc_wrapper_end' ) ) {
	function coffeeking_wc_wrapper_end() {
	  echo '</div>';
	}
}


add_action( 'woocommerce_before_subcategory_title',	'coffeeking_woocommerce_item_wrapper_start', 9 );
add_action( 'woocommerce_before_shop_loop_item_title', 'coffeeking_woocommerce_item_wrapper_start', 9 );

add_action( 'woocommerce_before_subcategory_title',	'coffeeking_woocommerce_title_wrapper_start', 20 );
add_action( 'woocommerce_before_shop_loop_item_title', 'coffeeking_woocommerce_title_wrapper_start', 20 );

add_action(    'woocommerce_after_shop_loop_item_title',	'coffeeking_woocommerce_title_wrapper_end', 7);


if ( !function_exists( 'coffeeking_woocommerce_item_wrapper_start' ) ) {

	function coffeeking_woocommerce_item_wrapper_start($cat='') {

		echo '<div class="matchHeight item">';
		?>
			<a href="<?php echo esc_url(is_object($cat) ? get_term_link($cat->slug, 'product_cat') : get_permalink()); ?>">
				<div class="image">
		<?php
	}
}



if ( !function_exists( 'coffeeking_woocommerce_title_wrapper_end' ) ) {

	function coffeeking_woocommerce_title_wrapper_end() {

		echo '</a>';		

		if ((is_shop() || is_product_category() || is_product_tag() || is_product_taxonomy()) && !is_product()) {

		    $excerpt = apply_filters('the_excerpt', get_the_excerpt());

			if ( empty($cut) AND function_exists( 'fw' ) ) {
				$cut = (int) fw_get_db_settings_option( 'excerpt_wc_auto' );
			}

			if (empty($cut)) $cut = 50;

			echo '<div class="post_content entry-content">'. wp_kses_post( coffeeking_cut_text( $excerpt, $cut ) ) .'</div>';
		}
	}
}


if ( !function_exists( 'coffeeking_woocommerce_close_item_wrapper' ) ) {

	function coffeeking_woocommerce_item_wrapper_end($cat='') {

		echo '</div>';
	}
}


if ( !function_exists( 'coffeeking_woocommerce_title_wrapper_start' ) ) {

	function coffeeking_woocommerce_title_wrapper_start($cat='') {

		echo '</div>';			
	}
}


add_filter( 'post_class', 'coffeeking_woocommerce_loop_shop_columns_class' );
add_filter( 'product_cat_class', 'coffeeking_woocommerce_loop_shop_columns_class', 10, 3 );

if ( !function_exists( 'coffeeking_woocommerce_loop_shop_columns_class' ) ) {
	function coffeeking_woocommerce_loop_shop_columns_class($classes, $class='', $cat='') {
		global $woocommerce_loop;

		return $classes;
	}
}

add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
	
    add_theme_support( 'woocommerce' );

    if ( function_exists( 'fw_get_db_settings_option' ) ) $wc_zoom = fw_get_db_settings_option( 'wc_zoom' );
	if ( !empty($wc_zoom) AND $wc_zoom == 'enabled') add_theme_support( 'wc-product-gallery-zoom' );

	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );    
}

// Hide uncategorized
add_filter( 'woocommerce_product_subcategories_args', 'custom_woocommerce_product_subcategories_args' );
function custom_woocommerce_product_subcategories_args( $args ) {
  $args['exclude'] = get_option( 'default_product_cat' );
  return $args;
}
