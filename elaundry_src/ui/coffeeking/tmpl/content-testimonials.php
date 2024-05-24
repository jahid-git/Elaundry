<?php
/**
	Testimonials Single Item
 */

$subheader = fw_get_db_post_option(get_The_ID(), 'subheader');

?>
<article class="inner">
	<div class="name color-main"><?php the_title(); ?></div>
	<?php if (!empty($subheader)) echo '<div class="subheader">'. wp_kses_post($subheader) .'</div>'; ?>
	<div class="text"><?php the_content() ?></div>
	<span class="fa fa-quote-right"></span>
</article>
