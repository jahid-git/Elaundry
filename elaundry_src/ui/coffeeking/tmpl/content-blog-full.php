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
					wp_link_pages( array(
						'before'      => '<div class="page-links"><span class="page-links-title">' . esc_html__( 'Pages:', 'coffeeking' ) . '</span>',
						'after'       => '</div>',
						'link_before' => '<span>',
						'link_after'  => '</span>',
					) );
				?>
	        </div>
	    </div>	    
	    <?php 
			// Previous/next post navigation.
			fw_theme_post_nav();
	    ?>
	    <div class="blog-info">
			<?php
				echo '<span class="date-day">'.get_the_date('d').'</span><span class="date-my">'.get_the_date('F').'<br>'.get_the_date('Y').'</span>';

            	if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {

	                echo '<ul>';
					if ( function_exists( 'pvc_post_views' ) ) {

						echo '<li class="icon-fav">
							<span class="fa fa-eye"></span> '.esc_html( strip_tags( pvc_post_views(get_the_ID(), false) ) ) .'
						</li>';
					}
                    
                    	echo '<li class="icon-comments"><span class="fa fa-commenting"></span> '. get_comments_number( '0', '1', '%' ) .'</li>';
	                echo '</ul>';
                }
			?>	
	    </div>	

	    <?php if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) : ?>


		<?php endif; ?>
		<?php the_tags( '<div class="tags-short"><strong>' . esc_html__( 'Tags:', 'coffeeking' ) . '</strong> ', ', ', '</div>' ); ?>
	    <?php
		if ( in_array( 'category', get_object_taxonomies( get_post_type() ) ) && fw_theme_categorized_blog() ) {

			echo '<div class="cats-short">';
			echo '<strong>' . esc_html__( 'Category:', 'coffeeking' ) . '</strong> ';
			echo get_the_category_list( esc_html_x( ', ', 'Used between list items, there is a space after the comma.', 'coffeeking' ) );
			echo '</div>';
		}
		?>		
		<?php if ( coffeeking_plugin_is_active( 'simple-share-buttons-adder' ) ) { echo do_shortcode( '[ssba]' );} ?>



	</article>
