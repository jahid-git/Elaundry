<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

// Color
$theme_style .= "
.heading .icon-bg,
.testimonials-list .inner .fa,
.testimonials-list.inner-page .inner .fa,
#block-footer .address li a,
.woocommerce-MyAccount-navigation aside .wp-searchform button[type=\"submit\"],
.widget-area aside .wp-searchform button[type=\"submit\"],
.gallery-page .descr a,
.gallery-page ul li,
.select2-container--default .select2-selection--single .select2-selection__arrow:before,
.wpcf7-form-control-wrap.to:after,
.wpcf7-form-control-wrap.phone:after,
.wpcf7-form-control-wrap.date:after,
.wpcf7-form-control-wrap.cartype:after,
.wpcf7-form-control-wrap.address:after,
.block-descr .date,
.woocommerce-info::before
{ color: {$css['gray_color']}; }
";


// Background
$theme_style .= "
.wpb-js-composer .vc_tta-color-grey.vc_tta-style-classic .vc_tta-tab.vc_active,
.bg-color-gray.vc_column_container > .vc_column-inner,
.bg-color-gray.vc_row-fluid, .bg-color-gray.vc_section,
.top-search input[type='text'],
.comments-area .comment-list li .comment-single,
.comment-text table tbody th,
.text-page table tbody th,
.testimonials-block,
.testimonials,
.woocommerce-MyAccount-navigation,
.widget-area,
.blog article .blog-info,
.blog-info,
.events-list .date,
.woocommerce-product-search,
.wp-searchform,form.post-password-form,form.search-form,form.wpcf7-form,form.form,form.comment-form,form,
.woocommerce #payment #place_order.btn-gray-filled,
.woocommerce-page #payment #place_order.btn-gray-filled,
.woocommerce-cart .wc-proceed-to-checkout a.checkout-button.btn-gray-filled,
.woocommerce div.product form.cart .button.btn-gray-filled,
.woocommerce #respond input#submit.btn-gray-filled,
.woocommerce a.button.btn-gray-filled,
.woocommerce button.button.btn-gray-filled,
.woocommerce input.button.btn-gray-filled,
.button.btn-gray-filled,input[type=\"submit\"].btn-gray-filled,
.wpcf7-submit.btn-gray-filled,
.btn.btn-gray-filled,
.woocommerce-product-search input[type=\"submit\"].btn-gray-filled,
.wp-searchform input[type=\"submit\"].btn-gray-filled,form.post-password-form input[type=\"submit\"].btn-gray-filled,form.search-form input[type=\"submit\"].btn-gray-filled,form.wpcf7-form input[type=\"submit\"].btn-gray-filled,form.form input[type=\"submit\"].btn-gray-filled,form.comment-form input[type=\"submit\"].btn-gray-filled,form input[type=\"submit\"].btn-gray-filled,
.like-contact-form-7.form-bg-default,
.arrow-left.swiper-button-disabled,
.arrow-right.swiper-button-disabled,
.block-icon li .bg-gray,
.woocommerce div.product .woocommerce-tabs ul.tabs li.active,
.woocommerce div.product .woocommerce-tabs .panel,
.woocommerce div.quantity span,
.woocommerce div.product form.cart div.quantity span,
.woocommerce-page div.product form.cart div.quantity span,
.woocommerce-MyAccount-navigation
{ background-color: {$css['gray_color']}; }

@media (min-width: 768px) {
	.woocommerce table.shop_table .woocommerce-cart-form__cart-item:nth-child(even) td
	{ background-color: {$css['gray_color']}; }
}
";

// Border-color
$theme_style .= "
.vc_separator.vc_sep_color_grey .vc_sep_line
{ border-color: {$css['gray_color']} !important; }
";

