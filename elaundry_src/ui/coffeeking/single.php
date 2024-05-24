<?php
/**
 * The Template for displaying all single posts
 */

$sidebar = 'enabled';
$class = 'col-lg-9 col-md-8';
if ( function_exists('FW') ) {

	$sidebar = fw_get_db_settings_option( 'sidebar_layout' );

	if ( $sidebar == 'disabled' ) {

		$class = 'col-lg-10 col-lg-offset-1 col-md-12';
	}
}


get_header(); ?>
<div class="inner-page margin-default">
    <div class="row">
        <div class="<?php echo esc_attr($class); ?>">
            <section class="blog-post">
				<?php
					// Start the Loop.
				while ( have_posts() ) : the_post();

					get_template_part( 'tmpl/content-blog-full', get_post_format() );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
					endwhile;
				?>                    
            </section>
        </div>

		<?php
			if ( $sidebar == 'enabled' ) {

				get_sidebar();
			}
		?>
    </div>
</div>
<?php

get_footer();
