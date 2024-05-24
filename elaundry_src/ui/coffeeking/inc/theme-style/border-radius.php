<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

$theme_style .= "
nav.navbar #navbar ul.navbar-nav ul.sub-menu,
nav.navbar #navbar ul.navbar-nav ul.sub-menu li a,
.image-video img,
.blog-sc article .photo.img-rounded,
.blog-sc article .photo.img-rounded img,
.img-shadow-single-gray img,
.img-shadow-gradient img,
.tariff-item,
form,
.select-wrap,
form textarea, form input[type=\"password\"], form input[type=\"search\"], form input[type=\"email\"], form input[type=\"tel\"], form input[type=\"text\"],
.like-contact-form-7.form-style-secondary form input[type=\"submit\"], .like-contact-form-7.form-style-secondary form .btn, .like-contact-form-7.form-style-secondary form .woocommerce-product-search input[type=\"submit\"], .like-contact-form-7.form-style-secondary form .wp-searchform input[type=\"submit\"], .like-contact-form-7.form-style-secondary form form.post-password-form input[type=\"submit\"], .like-contact-form-7.form-style-secondary form form.search-form input[type=\"submit\"], .like-contact-form-7.form-style-secondary form form.wpcf7-form input[type=\"submit\"], .like-contact-form-7.form-style-secondary form form.form input[type=\"submit\"], .like-contact-form-7.form-style-secondary form form.comment-form input[type=\"submit\"], .like-contact-form-7.form-style-secondary form form input[type=\"submit\"],
.btn {
  -webkit-border-radius: {$css['border_radius']} !important;
  -moz-border-radius: {$css['border_radius']} !important;
  border-radius: {$css['border_radius']} !important;
}
";