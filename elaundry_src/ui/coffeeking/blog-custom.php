<?php
/**
 * The blog template file
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 */

$coffeeking_sidebar_hidden = false;
$coffeeking_layout = '';
if ( function_exists( 'fw_get_db_settings_option' ) ) {

	$coffeeking_layout = fw_get_db_post_option( $wp_query->get_queried_object_id(), 'blog-layout' );
	if ($coffeeking_layout == 'three-cols') {

		$coffeeking_sidebar_hidden = true;
	}

	$sidebar = fw_get_db_settings_option( 'sidebar_layout' );
	if ( $sidebar == 'disabled' ) {

		$coffeeking_sidebar_hidden = true;
	}
}

get_header(); ?>
<div class="inner-page margin-default">
	<?php if ( !$coffeeking_sidebar_hidden ): ?><div class="row"><?php endif; ?>
        <div class="<?php if ( !$coffeeking_sidebar_hidden ): ?> col-lg-9 col-md-8<?php else: ?> col-lg-10 col-lg-offset-1 col-md-12<?php endif; ?>">
            <div class="blog blog-block layout-<?php echo esc_attr($coffeeking_layout); ?>">
				<?php

				if ( get_query_var( 'paged' ) ) {

					$paged = get_query_var( 'paged' );

				} elseif ( get_query_var( 'page' ) ) {

					$paged = get_query_var( 'page' );
					
				} else {

					$paged = 1;
				}

				if (isset($_GET['s'])) {

					$wp_query = new WP_Query( array(
						's'		=> esc_sql( $_GET['s'] ),
						'paged' => (int) $paged,
					) );
				}
					else {

					$wp_query = new WP_Query( array(
						'post_type' => 'post',
						'paged' => (int) $paged,
					) );
				}

            	echo '<div class="row">';
				if ( $wp_query->have_posts() ) :

					while ( $wp_query->have_posts() ) : the_post();

						if ( !function_exists( 'fw_get_db_settings_option' ) ) {

							get_template_part( 'tmpl/content', $wp_query->get_post_format() );
						}
							else {

							set_query_var( 'coffeeking_layout', $coffeeking_layout );

							if ($coffeeking_layout == 'three-cols') {

								get_template_part( 'tmpl/content-three-cols', $wp_query->get_post_format() );
							}
								else
							if ($coffeeking_layout == 'two-cols') {

								get_template_part( 'tmpl/content-two-cols', $wp_query->get_post_format() );
							}
								else {

								get_template_part( 'tmpl/content', $wp_query->get_post_format() );
							}
						}

						endwhile;

					else :
						// If no content, include the "No posts found" template.
						get_template_part( 'tmpl/content', 'none' );

					endif;
				echo '</div>';
				?>
				<?php
				if ( have_posts() ) {

					fw_theme_paging_nav();
				}
	            ?>
	        </div>
	    </div>
	    <?php if ( !$coffeeking_sidebar_hidden ) :?>
            <?php
            	get_sidebar();
            ?>
		<?php endif; ?>
	<?php if ( !$coffeeking_sidebar_hidden ): ?></div><?php endif; ?>
</div>
<?php

get_footer();
