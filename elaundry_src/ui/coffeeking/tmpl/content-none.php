<?php
/**
 * The template part for displaying a message that posts cannot be found
 *
 * Learn more: {@link https://codex.wordpress.org/Template_Hierarchy}
 *
 */
?>
<div class="inner-page margin-default">
	<div class="row">
		<div class="page-content col-lg-8">
			<?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

			<p><?php printf( esc_html__( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'coffeeking' ), esc_url( admin_url( 'post-new.php' ) ) ); ?></p>

			<?php elseif ( is_search() ) : ?>

			<p><?php echo esc_html__( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'coffeeking' ); ?></p>
			<?php get_search_form(); ?>

			<?php else : ?>

			<p><?php echo esc_html__( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'coffeeking' ); ?></p>
			<?php get_search_form(); ?>

			<?php endif; ?>
		</div><!-- .page-content -->
	</div>
</div>