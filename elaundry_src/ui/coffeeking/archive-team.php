<?php
/**
 * Team Archive
 */

get_header();

if ( get_query_var( 'paged' ) ) { $paged = get_query_var( 'paged' ); } elseif ( get_query_var( 'page' ) ) { $paged = get_query_var( 'page' ); } else { $paged = 1; }

$wp_query = new WP_Query( array(
	'post_type' => 'team',
	'paged' => (int) $paged,
) );

if ( $wp_query->have_posts() ) :
?>
<div class="team-list inner-page margin-default">
	<div class="row">
		<?php
		while ( $wp_query->have_posts() ) : $wp_query->the_post();

			get_template_part( 'tmpl/content', 'team' );

		endwhile;
		?>  
	</div>
	<?php
		fw_theme_paging_nav();
	?>        
</div>            
<?php
else :
	get_template_part( 'tmpl/content', 'none' );
endif;

get_footer();

