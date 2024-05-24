<?php
/**
 * The sidebar containing the main widget area
 *
 */

$sidebar_wc = 'disabled';

if ( function_exists('FW') ) {

	$sidebar_wc = fw_get_db_settings_option( 'sidebar_wc_layout' );
}

if ( $sidebar_wc != 'disabled' AND ( coffeeking_is_wc('woocommerce') || coffeeking_is_wc('shop') || coffeeking_is_wc('product') ) ) : ?>
	<div class="col-lg-3 col-md-4 col-lg-pull-9 col-md-pull-8">
		<div id="content-sidebar" class="content-sidebar woocommerce-sidebar widget-area" role="complementary">
			<?php dynamic_sidebar( 'sidebar-wc' ); ?>
		</div>
	</div>
	</div></div>
<?php elseif ( !coffeeking_is_wc('woocommerce') AND is_active_sidebar( 'sidebar-1' ) ) : ?>
	<div class="col-lg-3 col-md-4">
		<div id="content-sidebar" class="content-sidebar widget-area" role="complementary">
			<?php dynamic_sidebar( 'sidebar-1' ); ?>
		</div>
	</div>
<?php endif; ?>
