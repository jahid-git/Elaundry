<?php
/**
 * The template for displaying all text pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other 'pages' on your WordPress site will use a different template.
 */

$sidebar_layout = 'right';
$margin_layout = 'margin-default';
if ( function_exists( 'fw_get_db_settings_option' ) ) {

	$sidebar_layout = fw_get_db_post_option( $wp_query->get_queried_object_id(), 'sidebar-layout' );
	$margin_layout = 'margin-'.fw_get_db_post_option( $wp_query->get_queried_object_id(), 'margin-layout' );
}

get_header(); ?>

	<!-- Content -->
	<div class="<?php echo esc_attr( $margin_layout ); ?>">
	<?php if ( $sidebar_layout != 'disabled' ): ?><div class="inner-page"><?php endif; ?>
	        <div class="row">
	        	<?php if ( $sidebar_layout == 'left' ): ?>
	        		<?php get_sidebar(); ?>
				<?php endif; ?>
	            <div class="<?php if ( $sidebar_layout == 'disabled' ): ?> col-md-12<?php else: ?> col-lg-9 col-md-8<?php endif; ?> text-page">
					<?php
						// Start the Loop.
					while ( have_posts() ) : the_post();

						// Include the page content template.
						get_template_part( 'tmpl/content', 'page' );

						// If comments are open or we have at least one comment, load up the comment template.
						if ( comments_open() || get_comments_number() ) {
							
							comments_template();
						}
						endwhile;
					?>
	            </div>
	        	<?php if ( $sidebar_layout == 'right' ): ?>
	        		<?php get_sidebar(); ?>
				<?php endif; ?>        
	        </div>
	<?php if ( $sidebar_layout != 'disabled' ): ?></div><?php endif; ?>
	</div>

<?php

get_footer();
