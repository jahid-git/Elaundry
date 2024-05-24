<?php
/**
 * The default template for displaying content 3-cols layout
 *
 * Used for both single and index/archive/search.
 */

?>
<div class="col-lg-4 col-md-4 col-sm-6 matchHeight">
	<?php get_template_part( 'tmpl/content-item', get_post_format() ); ?>
</div>
