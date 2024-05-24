<?php
/**
 * The Template for displaying all single posts
 */

get_header(); ?>
<div class="inner-page margin-default">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <section class="blog-post">
				<?php
					// Start the Loop.
				while ( have_posts() ) : the_post();

					get_template_part( 'tmpl/content-events-full' );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
					endwhile;
				?>                    
            </section>
        </div>
    </div>
</div>
<?php

get_footer();
