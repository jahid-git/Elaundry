<?php
/**
 * The default template for displaying content classic layout
 *
 * Used for both single and index/archive/search.
 */

?>
<div class="col-lg-12">
	<?php get_template_part( 'tmpl/content-item', get_post_format() ); ?>
</div>