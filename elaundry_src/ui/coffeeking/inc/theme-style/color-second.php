<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

// Color
$theme_style .= "
.color-second,
.woocommerce form .form-row .required,
.woocommerce ul.products li.product .price ins,
.alert.alert-error .fa, .alert.alert-error .header,
.btn.btn-add-bordered,
.testimonials-list.layout-col1-shadow .arrow-left, .testimonials-list.layout-col1-shadow .arrow-right,
.testimonials-list.layout-col1-shadow .inner .name,
.tariff-slider-sc .ul-yes,
.color-second,
.tariff-item.vip .price,
.top-bar .cart:hover, .top-bar .cart .fa:hover,
.products-sc.products-sc-fastfood article:hover .header h5,
.heading.color-second h1, .heading.color-second h2, .heading.color-second h3, 
.heading.color-second h4, .heading.color-second h5, .heading.color-second h6,
.blog-sc.layout-date-top article .header > *:hover,
.products-sc.products-sc-fastfood .price.color-second,
.heading.subcolor-second .subheader,
.blog-sc article .blog-info .cat-div,
.blog-sc article .blog-info .date.date-bold
{ color: {$css['second_color']}; }
";

// Background
$theme_style .= "
.alert.alert-warning,
nav.navbar .cart .count,
nav.navbar .nav-right .cart .count,
.bg-color-second.vc_row-fluid,
.bg-color-second.vc_section,
.bg-color-second.vc_column_container .vc_column-inner,
.top-bar .cart .count, .navbar .cart .count,
.woocommerce span.onsale,
.bg-color-second.vc_section,
.bg-color-second.vc_column_container .vc_column-inner,
.btn.color-hover-second:hover,
.cart .count,
.btn.btn-second,
.btn.btn-add,
.bg-color-second.vc_section,
.bg-color-second.vc_column_container .vc_column-inner,
.like-contact-form-7.form-style-secondary form input[type=\"submit\"]
{ background-color: {$css['second_color']}; }
";

// Border-color
$theme_style .= "
.btn.btn-add-bordered
{ border-color: {$css['second_color']}; }
";

