<?php
/**
 * Events List
 */

$iteration = get_query_var( 'coffeeking_iteration' );
$odd1 = $odd2 = '';
if ( $iteration % 2 == 0) { $odd1 = ' col-lg-push-6 '; $odd2 = ' col-lg-pull-6 '; }

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="row">
	    <a href="<?php the_permalink(); ?>" class="photo col-lg-6 <?php echo esc_attr($odd1); ?>">
	        <?php echo the_post_thumbnail(); ?>    
	    </a>
	    <div class="description col-lg-6 <?php echo esc_attr($odd2); ?>">
	        <a href="<?php esc_url( the_permalink() ); ?>" class="header black"><h2><?php the_title(); ?></h2></a>
			<?php

				$event_date = esc_html(fw_get_db_post_option(get_The_ID(), 'event_date'));

				echo '<div class="date"><span class="date-day">'.date('d', strtotime($event_date)).'</span><span class="date-my">'.date('F', strtotime($event_date)).'<br>'.date('Y', strtotime($event_date)).'</span></div>';

				add_filter( 'the_content', 'coffeeking_excerpt' );
				the_content( esc_html__( 'Read more &rarr;', 'coffeeking' ) );
			?>
	    </div>
	</div>
</article>
