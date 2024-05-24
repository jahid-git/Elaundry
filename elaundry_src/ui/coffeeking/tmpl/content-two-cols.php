<?php
/**
 * The default template for displaying content 2-cols layout
 *
 * Used for both single and index/archive/search.
 */

?>
<div class="col-lg-6 col-md-6 col-sm-6 matchHeight">
	<?php get_template_part( 'tmpl/content-item', get_post_format() ); ?>
</div>
