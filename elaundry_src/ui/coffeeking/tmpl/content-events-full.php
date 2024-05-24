<?php
/**
 * Full blog post
 */

?>
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<div class="image"><?php echo the_post_thumbnail( 'coffeeking-big' ); ?></div>

	    <div class="description">
	        <div class="text text-page">
				<?php
					the_content();
				?>
	        </div>
	    </div>
	    
	    <div class="blog-info">
			<?php

				$event_date = esc_html(fw_get_db_post_option(get_The_ID(), 'event_date'));

				echo '<span class="date-day">'.date('d', strtotime($event_date)).'</span><span class="date-my">'.date('F', strtotime($event_date)).'<br>'.date('Y', strtotime($event_date)).'</span>';

            	if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {

	                echo '<ul>';
					if ( function_exists( 'pvc_post_views' ) ) {

						echo '<li class="icon-fav">
							<span class="fa fa-eye"></span> '.(int) pvc_post_views(get_the_ID(), false) .'
						</li>';
					}
                    
                    	echo '<li class="icon-comments"><span class="fa fa-commenting"></span> '. get_comments_number( '0', '1', '%' ) .'</li>';
	                echo '</ul>';
                }
			?>	
	    </div>	
	    <?php 
			// Previous/next post navigation.
			fw_theme_post_nav();
	    ?>

	</article>
