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
	if ( empty($coffeeking_layout) ) $coffeeking_layout = fw_get_db_settings_option( 'blog_layout' );
	if ($coffeeking_layout == 'three-cols') {

		$coffeeking_sidebar_hidden = true;
	}
}

get_header(); ?>
<div class="inner-page margin-default">
	<?php if ( !$coffeeking_sidebar_hidden ): ?><div class="row"><?php endif; ?>
        <div class="<?php if ( !$coffeeking_sidebar_hidden ): ?> col-lg-9 col-md-8<?php endif; ?>">
            <div class="blog blog-block layout-<?php echo esc_attr($coffeeking_layout); ?>">
				<?php

				if ( $wp_query->have_posts() ) :

	            	echo '<div class="row">';
					while ( $wp_query->have_posts() ) : the_post();

						// Showing classic blog without framework
						if ( !function_exists( 'fw_get_db_settings_option' ) ) {

							get_template_part( 'tmpl/content', get_post_format() );
						}
							else {

							set_query_var( 'coffeeking_layout', $coffeeking_layout );

							if ($coffeeking_layout == 'three-cols') {

								get_template_part( 'tmpl/content-three-cols', get_post_format() );
							}
								else
							if ($coffeeking_layout == 'two-cols') {

								get_template_part( 'tmpl/content-two-cols', get_post_format() );
							}
								else {

								get_template_part( 'tmpl/content', get_post_format() );
							}
						}

					endwhile;
					echo '</div>';
				else :
					// If no content, include the "No posts found" template.
					get_template_part( 'tmpl/content', 'none' );

				endif;

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
