<?php
/**
 * The template for displaying 404 pages (Not Found)
 */

set_query_var( 'header_disabled', true );

get_header();

	$page = get_posts( array(
		'name' => '404-layout',
		'post_type' => 'page',
	) );

	if ( $page ) {
		
		echo do_shortcode(wp_kses_post( $page[0]->post_content ) );
	}
		else {
		?>
		<section class="page-404 page-404-default">
			<div class="container">
				<div class="center">				
					<h1><?php echo esc_html__( 'Sorry Page Was Not Found', 'coffeeking' ) ?></h1>
					<a href="<?php echo esc_url( home_url( '/' ) ) ?>" class="btn"><?php echo esc_html__( 'Home Page', 'coffeeking' ) ?></a>
				</div>
			</div>
		</section>				
		<?php
	}

get_footer();

