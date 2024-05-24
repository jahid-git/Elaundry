<?php
/**
 * Faqs page
 */
?>
<?php get_header(); ?>

<div class="container">
	<div class="faq-list inner-page margin-default">
		<?php

		if ( get_query_var( 'paged' ) ) {
			$paged = get_query_var( 'paged' );
		}
			elseif ( get_query_var( 'page' ) ) { $paged = get_query_var( 'page' );
		}
			else {

			$paged = 1;
		}

		$wp_query = new WP_Query( array(
			'post_type' => 'faq',
			'paged' => (int) $paged,
		) );
		
		/*
			Generating accordion shortcodes
			[vc_tta_accordion][vc_tta_section title="" tab_id=""][vc_column_text][/vc_column_text][/vc_tta_accordion]
		*/	
		if ( $wp_query->have_posts() ) :

			$like_sc = '[vc_tta_accordion]';
			while ( $wp_query->have_posts() ) : $wp_query->the_post();

				$like_sc .= '[vc_tta_section title="'.get_the_title().'" tab_id="faq-'.get_the_ID().'"][vc_column_text]'.esc_html(get_the_content()).'[/vc_column_text][/vc_tta_section]';

			endwhile;
			$like_sc .= '[/vc_tta_accordion]';
			echo do_shortcode($like_sc);
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
<?php get_footer(); ?>
