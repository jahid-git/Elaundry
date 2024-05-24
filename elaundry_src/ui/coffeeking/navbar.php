<?php
/**
 * Navigation Bar
 */

$navbar_affix = '';
$navbar_layout = 'default';
if ( function_exists( 'FW' ) ) {

	$navbar_layout = fw_get_db_post_option( $wp_query->get_queried_object_id(), 'navbar-layout' );
	if ( empty($basket_icon) ) $basket_icon = fw_get_db_settings_option( 'basket-icon' );
	
	$navbar_affix = fw_get_db_settings_option( 'navbar-affix' );
	if ($navbar_affix == 'affix') $navbar_affix = 'affix'; else $navbar_affix = '';

}

$navbar_class = '';
if ( !empty($navbar_layout) AND $navbar_layout == 'transparent' ) $navbar_class .= 'navbar-transparent ';
if ( !empty($navbar_layout) AND $navbar_layout == 'transparent-light' ) $navbar_class .= 'navbar-transparent-light ';

if ( empty($basket_icon) ) $basket_icon = 'mobile';

if ( $navbar_layout != 'disabled' ):

?>
<div id="nav-wrapper" class="wrapper-<?php echo esc_attr($navbar_class);?>">
	<nav data-spy="<?php echo esc_attr($navbar_affix); ?>" data-offset-top="0" class="navbar <?php echo esc_attr($navbar_class);?>">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed">
					<span class="sr-only"><?php echo esc_html__( 'Toggle navigation', 'coffeeking' ); ?></span>
					<span class="icon-bar top-bar"></span>
					<span class="icon-bar middle-bar"></span>
					<span class="icon-bar bottom-bar"></span>
				</button>			
				<a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<?php
					if ( function_exists( 'FW' ) ) {

						if ($navbar_layout == 'transparent') {

							$coffeeking_logo = fw_get_db_settings_option( 'logo_footer' );	
						}
							else {

							$coffeeking_logo = fw_get_db_settings_option( 'logo' );	
						}

						if ( !empty( $coffeeking_logo ) ) {

							echo wp_get_attachment_image( $coffeeking_logo['attachment_id'], 'full' );
						}									
					}

					if ( empty( $coffeeking_logo ) ) {

						echo '<img src="' . esc_attr( get_template_directory_uri() . '/assets/images/logo.png' ) . '" alt="' . esc_attr( get_bloginfo( 'title' ) ) . '">';
					}
					?>
				</a>
			</div>
			<?php if( coffeeking_is_wc('wc_active') AND $basket_icon != 'disabled' ) : ?>
				<?php 
					$basket_icon_class = ' hidden-lg';
				?>
				<div class="pull-right  nav-right<?php echo esc_attr( $basket_icon_class ); ?>">	
					<a href="'. get_permalink( get_option('woocommerce_myaccount_page_id') ) .'" class="mobile-user-profile"><span class="fa fa-user"></span></a>
					<a href="<?php echo wc_get_cart_url(); ?>" class="shop_table cart" title="<?php echo esc_html__( 'View your shopping cart', 'coffeeking' ); ?>">
						<i class="fa fa-shopping-cart" aria-hidden="true"></i><span class="cart-contents header-cart-count count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
					</a>
					<?php

					if ( !empty($icons) ) {

						echo '<ul class="ltx-navbar-mobile-icons">';

						foreach ($icons as $item) {

							$custom_icon = $item['icon-type']['fa']['icon_fa'];

							if ( $item['type']['type_radio'] == 'social' AND !empty($custom_icon)) {

								echo '
									<li class="ltx-fa-icon">
										<a href="'. esc_url( $item['type']['social']['href'] ) .'" class="fa '. esc_attr($custom_icon) .'" target="_blank">
										</a>
									</li>';
							}	
						}

						echo '</ul>';
					}

					?>
				</div>
			<?php endif; ?>				
			<div id="navbar" class="navbar-collapse collapse">
				<div class="toggle-wrap">
					<button type="button" class="navbar-toggle collapsed">
						<span class="sr-only"><?php echo esc_html__( 'Toggle navigation', 'coffeeking' ); ?></span>
						<span class="icon-bar top-bar"></span>
						<span class="icon-bar middle-bar"></span>
						<span class="icon-bar bottom-bar"></span>
					</button>							
					<div class="clearfix"></div>
				</div>
				<?php
					wp_nav_menu(array(
						'theme_location'	=> 'primary',
						'menu_class' => 'nav navbar-nav',
						'container'	=> 'ul',
						'link_before' => '<span>',     
						'link_after'  => '</span>'							
					));				
				?>
				<div class="nav-mob">
					<ul class="nav navbar-nav">
					<?php if( coffeeking_is_wc('wc_active') ) : ?>
						<li>
							<a href="<?php echo wc_get_cart_url(); ?>" class="shop_table cart-mob" title="<?php echo esc_html__( 'View your shopping cart', 'coffeeking' ); ?>">
								<span class="cart-contents header-cart-count count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
								<i class="fa fa-shopping-cart" aria-hidden="true"></i>
								<span class="name"><?php echo esc_html__( 'Cart', 'coffeeking' ); ?></span>
							</a>
						</li>
					<?php endif; ?>
					</ul>
				</div>									
			</div>
		</div>
	</nav>
</div>
<?php

endif;

