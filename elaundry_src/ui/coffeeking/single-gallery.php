<?php
/**
 * The Template for gallery inner
 */

get_header();

if ( function_exists( 'fw' ) ):

	$coffeeking_list = fw_get_db_post_option( get_the_ID(), 'photos' );

?>
<div class=" margin-default">
	<div class="gallery-page gallery-inner">
		<div class="container">
			<div class="row">
				<?php foreach ( $coffeeking_list as $item ) : ?>
				<div class="col-lg-4 col-md-4 col-sm-6 col-ms-6">
					<div class="item">
						<a href="<?php echo esc_url( $item['url'] ); ?>" class="swipebox photo">
							<?php echo wp_get_attachment_image( $item['attachment_id'], 'coffeeking-gallery' ); ?><span class="fa fa-search"></span>
						</a>
					</div>
				</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</div>
<?php

endif;

get_footer();

