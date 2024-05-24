<?php
/**
 * The template for displaying posts in the Gallery post format
 */
$subheader = fw_get_db_post_option(get_The_ID(), 'subheader');
$social_icons = fw_get_db_post_option(get_The_ID(), 'items');

?>
<div class="col-lg-3 col-md-3 col-sm-4 col-ms-6">
	<article class="item matchHeight">
		<a href="<?php esc_url( the_permalink() ); ?>" class="black">
			<span class="photo">
	        <?php
		        echo wp_get_attachment_image( get_post_thumbnail_id( get_the_ID() ), 'full', false  );
	        ?>  			
	        </span>
			<h3 class="header"><?php the_title(); ?></h3>
		</a>
		<?php

			if (!empty($subheader)) echo '<div class="subheader color-main">'. wp_kses_post($subheader) .'</div>';

			if ( !empty($social_icons) ) {

				echo '<ul class="social-small">';
				foreach ($social_icons as $item) {

					echo '<li><a href="'.esc_url( $item['href'] ).'" class="'.esc_attr( $item['icon'] ) .'"></a></li>';
				}
				echo '</ul>';
			}
		?>
	</article>
</div>
