	<?php
/**
 * The default template for displaying content inner item
 *
 * Used for both single and index/archive/search.
 */

?>
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	    <a href="<?php the_permalink(); ?>" class="photo">
	        <?php echo the_post_thumbnail('full'); ?>    
	    </a>
	    <div class="description">
	        <a href="<?php esc_url( the_permalink() ); ?>" class="header"><h3><?php the_title(); ?></h3></a>
	        <div class="text text-page margin-bottom-0">
			<?php if ( is_search() ) : ?> 
				<?php
					the_excerpt();
				?>
			<?php else : ?>
				<?php
					add_filter( 'the_content', 'coffeeking_excerpt' );
					the_content( esc_html__( 'Read more &rarr;', 'coffeeking' ) );
				?>
			<?php endif; ?>
	        </div>
	    </div>
	    <a href="<?php esc_url( the_permalink() ); ?>" class="blog-info">
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
	    </a>	    
	</article>
