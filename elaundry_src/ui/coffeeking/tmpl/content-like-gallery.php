<?php
/**
 * The template for displaying posts in the Gallery post format
 */


?>
<?php if ( isset( $coffeeking_params['grid'] ) && $coffeeking_params['grid'] === 4 ) : ?><div class="col-lg-3 col-md-4 col-sm-6 col-ms-6 matchHeight"><?php endif; ?>
<?php if ( isset( $coffeeking_params['grid'] ) && $coffeeking_params['grid'] === 3 ) : ?><div class="col-lg-4 col-md-4 col-sm-6 col-ms-6 matchHeight"><?php endif; ?>
<?php if ( ! isset( $coffeeking_params['grid'] ) || $coffeeking_params['grid'] === 2 ) : ?><div class="col-lg-6 col-md-6 col-sm-6 col-ms-6 matchHeight"><?php endif; ?>

	<article class="item ">
		<a href="<?php esc_url( the_permalink() ); ?>" class="photo"><?php echo the_post_thumbnail( 'craggy-gallery' ); ?></a>
		<div class="descr">
			<div class="row">
				<div class="col-lg-12">
					<h4 class="header"><?php the_title(); ?></h4>
				</div>
			</div>
		</div>
	</article>
</div>
