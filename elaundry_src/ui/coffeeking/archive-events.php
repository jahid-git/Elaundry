<?php
/**
 * Events Archive
 */

get_header();

if ( get_query_var( 'paged' ) ) { $paged = get_query_var( 'paged' ); } elseif ( get_query_var( 'page' ) ) { $paged = get_query_var( 'page' ); } else { $paged = 1; }

$wp_query = new WP_Query( array(
	'post_type' => 'events',
	'paged' => (int) $paged,
) );

if ( $wp_query->have_posts() ) :
?>
<div class="events-list inner-page margin-default">
	<?php
	$iteration = 1;
	while ( $wp_query->have_posts() ) : $wp_query->the_post();

		set_query_var( 'coffeeking_iteration', $iteration );
		get_template_part( 'tmpl/content', 'events' );
		$iteration++;

	endwhile;

	fw_theme_paging_nav();
	?>        
</div>            
<?php
else :
	get_template_part( 'tmpl/content', 'none' );
endif;

get_footer();


