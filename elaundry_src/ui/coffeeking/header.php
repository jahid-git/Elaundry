<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head>
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<meta name="format-detection" content="telephone=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
	// Pageloder Overlay
	$coffeeking_pace = 'disabled';
	if ( function_exists( 'FW' ) ) {

		$coffeeking_pace = fw_get_db_settings_option( 'page-loader' );

		if ( !empty($coffeeking_pace) AND ((!empty($coffeeking_pace['loader']) AND $coffeeking_pace['loader'] != 'disabled') OR 
		( !empty($coffeeking_pace) AND $coffeeking_pace['loader'] != 'disabled') ) ) {

			echo '<div id="preloader"></div>';
		}
	}
?>
<?php get_template_part( 'navbar' ); ?>
<?php
	$pageheader_layout = 'default';
	if ( function_exists( 'FW' ) ) {

		$pageheader_layout = fw_get_db_post_option( $wp_query->get_queried_object_id(), 'header-layout' );
	}
?>
<?php if ( $pageheader_layout != 'disabled' AND empty($header_disabled) ) : ?>
	<header class="page-header like-parallax">
	    <div class="container">   
	    	<h1><?php coffeeking_get_h1(); ?></h1>
			<ul class="breadcrumbs" typeof="BreadcrumbList" vocab="https://schema.org/">
			<?php if ( function_exists( 'bcn_display' ) ) {
				bcn_display_list();
			}?>
			</ul>	 	    	
	    </div>
	</header>
<?php endif; ?>

	<div class="container">