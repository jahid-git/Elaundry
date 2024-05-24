<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$descr = '';

$options = array(
	'general' => array(
		'title'   => esc_html__( 'General', 'coffeeking' ),
		'type'    => 'tab',
		'options' => array(
			'general-box' => array(
				'title'   => esc_html__( 'General Settings', 'coffeeking' ),
				'type'    => 'box',
				'options' => array(
					'blog_layout'    => array(
						'label' => esc_html__( 'Blog Layout', 'coffeeking' ),
						'description'   => esc_html__( 'Default blog page layout.', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'classic'  => esc_html__( 'One Column', 'coffeeking' ),
							'two-cols' => esc_html__( 'Two Columns', 'coffeeking' ),
							'three-cols' => esc_html__( 'Three Columns', 'coffeeking' ),
						),
						'value' => 'classic',
					),					
					'gallery_layout'    => array(
						'label' => esc_html__( 'Default Gallery Layout', 'coffeeking' ),
						'description'   => esc_html__( 'Default galley page layout.', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'col-2' => esc_html__( 'Two Columns', 'coffeeking' ),
							'col-3' => esc_html__( 'Three Columns', 'coffeeking' ),
							'col-4' => esc_html__( 'Four Columns', 'coffeeking' ),
						),
						'value' => 'col-2',
					),
					'sidebar_layout'    => array(
						'label' => esc_html__( 'Blogs Sidebar', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'disabled' => esc_html__( 'Disabled', 'coffeeking' ),
							'enabled' => esc_html__( 'Enabled', 'coffeeking' ),
						),
						'value' => 'enabled',
					),			
					'sidebar_wc_layout'    => array(
						'label' => esc_html__( 'WooCommerce Sidebar', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'disabled' => esc_html__( 'Disabled', 'coffeeking' ),
							'enabled' => esc_html__( 'Enabled', 'coffeeking' ),
						),
						'value' => 'enabled',
					),								
					'page-loader'    => array(
//						'label' => esc_html__( 'Page Loader', 'coffeeking' ),
						'type'    => 'multi-picker',
						'picker'       => array(
							'loader' => array(
								'label'   => esc_html__( 'Page Loader', 'coffeeking' ),
								'type'    => 'select',
								'choices' => array(
									'disabled' => esc_html__( 'Disabled', 'coffeeking' ),
									'progress' => esc_html__( 'Progress Bar', 'coffeeking' ),
									'dots' => esc_html__( 'Fading Dots', 'coffeeking' ),
									'image' => esc_html__( 'Static Image', 'coffeeking' ),
								),
								'value' => 'dots'
							)
						),						
						'choices' => array(
							'image' => array(
								'loader_img'    => array(
									'label' => esc_html__( 'Page Loader Image', 'coffeeking' ),
									'type'  => 'upload',
								),
							),
						),
						'value' => 'dots',
					),											
					'wc_zoom'    => array(
						'label' => esc_html__( 'WooCommerce Product Hover Zoom', 'coffeeking' ),
						'type'    => 'select',
						'description'   => esc_html__( 'Enables mouse hover zoom in single product page', 'coffeeking' ),
						'choices' => array(
							'disabled'  => esc_html__( 'Disabled', 'coffeeking' ),
							'enabled' => esc_html__( 'Enabled', 'coffeeking' ),
						),
						'value' => 'disabled',
					),
					'google_api'    => array(
						'label' => esc_html__( 'Google API Key', 'coffeeking' ),
						'desc'  => esc_html__( 'Required for contacts page, also used in widget', 'coffeeking' ),
						'type'  => 'text',
					),
/*							
					'scrollSmooth'    => array(
						'label' => esc_html__( 'Smooth Scroll', 'coffeeking' ),
						'description'   => esc_html__( 'Smooth Scroll while clicking on anchor #links', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'disabled' => esc_html__( 'Disabled', 'coffeeking' ),
							'enabled'  => esc_html__( 'Enabled', 'coffeeking' ),
						),
						'value' => 'disabled',
					),									
*/					
					'excerpt_auto'    => array(
						'label' => esc_html__( 'Excerpt Blog Size', 'coffeeking' ),
						'desc'  => esc_html__( 'Automaticly cuts content for blogs', 'coffeeking' ),
						'value'	=> 350,
						'type'  => 'short-text',
					),
					'excerpt_wc_auto'    => array(
						'label' => esc_html__( 'Excerpt WooCommerce Size', 'coffeeking' ),
						'desc'  => esc_html__( 'Automaticly cuts description for products', 'coffeeking' ),
						'value'	=> 50,
						'type'  => 'short-text',
					),					
				),
			),
		),
	),
	'media' => array(
		'title'   => esc_html__( 'Media', 'coffeeking' ),
		'type'    => 'tab',
		'options' => array(
			'media-box' => array(
				'title'   => esc_html__( 'Media', 'coffeeking' ),
				'type'    => 'box',
				'options' => array(
					'logo'    => array(
						'label' => esc_html__( 'Logo Dark', 'coffeeking' ),
						'desc'  => esc_html__( 'Upload logo', 'coffeeking' ),
						'type'  => 'upload',
					),
					'logo_footer'    => array(
						'label' => esc_html__( 'Logo White (Footer)', 'coffeeking' ),
						'desc'  => esc_html__( 'Upload logo', 'coffeeking' ),
						'type'  => 'upload',
					),					
					'header_bg'    => array(
						'label' => esc_html__( 'Inner Header Background', 'coffeeking' ),
						'desc'  => esc_html__( 'By default header is gray, you can replace it with background image', 'coffeeking' ),
						'type'  => 'upload',
					),
					'404_bg'    => array(
						'label' => esc_html__( '404 Page Background', 'coffeeking' ),
						'type'  => 'upload',
					),				
				),
			),
		),
	),
	'navbar' => array(
		'title'   => esc_html__( 'Navbar', 'coffeeking' ),
		'type'    => 'tab',
		'options' => array(
			'navbar-box' => array(
				'title'   => esc_html__( 'Navbar Settings', 'coffeeking' ),
				'type'    => 'box',
				'options' => array(
					'navbar-affix'    => array(
						'label' => esc_html__( 'Navbar sticked', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'disabled'  => esc_html__( 'Disabled', 'coffeeking' ),
							'affix'  => esc_html__( 'Sticked navbar', 'coffeeking' ),
						),
						'value' => 'disabled',
					),										
					'basket-icon'    => array(
						'label' => esc_html__( 'Always show Basket icon', 'coffeeking' ),
						'description'   => esc_html__( 'Basket Icon will be visible in navbar with 3-bars menu.', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'disabled'  => esc_html__( 'Desktop Only', 'coffeeking' ),
							'visible'  => esc_html__( 'Visible Always', 'coffeeking' ),
						),
						'value' => 'visible',
					),
					'social-icons' => array(
		                'label' => esc_html__( 'Menu Icons', 'coffeeking' ),
		                'type' => 'addable-box',
		                'value' => array(),
		                'box-options' => array(
							'type'        => array(
								'type'         => 'multi-picker',
								'label'        => false,
								'desc'         => false,
								'picker'       => array(
									'type_radio' => array(
										'label'   => esc_html__( 'Type', 'coffeeking' ),
										'type'    => 'radio',
										'choices' => array(
											'search' => esc_html__( 'Search', 'coffeeking' ),
											'basket'  => esc_html__( 'WooCommerce Cart', 'coffeeking' ),
											'profile'  => esc_html__( 'User Profile', 'coffeeking' ),
											'social'  => esc_html__( 'Social Icon', 'coffeeking' ),
										),
									)
								),
								'choices'      => array(
									'basket'  => array(
										'count'    => array(
											'label' => esc_html__( 'Count', 'coffeeking' ),
											'type'    => 'select',
											'choices' => array(
												'show' => esc_html__( 'Show count label', 'coffeeking' ),
												'hide'  => esc_html__( 'Hide count label', 'coffeeking' ),
											),
											'value' => 'show',
										),											
									),
									'profile'  => array(
										'logout'    => array(
											'label' => esc_html__( 'Logout', 'coffeeking' ),
											'type'    => 'select',
											'choices' => array(
												'show' => esc_html__( 'Show logout popup', 'coffeeking' ),
												'hide'  => esc_html__( 'Hide logout popup', 'coffeeking' ),
											),
											'value' => 'show',
										),											
									),		
									'social'  => array(
					                    'text' => array(
					                        'label' => esc_html__( 'Label', 'coffeeking' ),
					                        'type' => 'text',
					                    ),
					                    'href' => array(
					                        'label' => esc_html__( 'External Link', 'coffeeking' ),
					                        'type' => 'text',
					                        'value' => '#',
					                    ),											
									),		
								),
								'show_borders' => false,
							),	  														                	
							'icon-type'        => array(
								'type'         => 'multi-picker',
								'label'        => false,
								'desc'         => false,
								'value'        => array(
									'icon_radio' => 'default',
								),
								'picker'       => array(
									'icon_radio' => array(
										'label'   => esc_html__( 'Icon', 'coffeeking' ),
										'type'    => 'radio',
										'choices' => array(
											'default'  => __( 'Default', 'coffeeking' ),
											'fa' => esc_html__( 'FontAwesome', 'coffeeking' )
										),
										'desc'    => esc_html__( 'For social icons you need to use FontAwesome in any case.',
											'coffeeking' ),
									)
								),
								'choices'      => array(
									'default'  => array(
									),
									'fa' => array(
										'icon_fa'  => array(
											'type'  => 'icon',
											'label' => esc_html__( 'Select Icon', 'coffeeking' ),
										),										
									),
								),
								'show_borders' => false,
							),
/*							
							'visible'    => array(
								'label' => esc_html__( 'Visiblity', 'coffeeking' ),
								'type'    => 'select',
								'choices' => array(
									'disabled' => esc_html__( 'Hidden', 'coffeeking' ),
									'mobile'  => esc_html__( 'Mobile Only', 'coffeeking' ),
									'desktop'  => esc_html__( 'Deskop Only', 'coffeeking' ),
									'visible'  => esc_html__( 'Visible Always', 'coffeeking' ),
								),
								'value' => 'desktop',
							),
*/							
		                ),
                		'template' => '{{- type.type_radio }}',		                
                    ),			
				),
			),
		),
	),	
	'fonts' => array(
		'title'   => esc_html__( 'Fonts', 'coffeeking' ),
		'type'    => 'tab',
		'options' => array(

			'footer-box' => array(
				'title'   => esc_html__( 'Fonts Settings', 'coffeeking' ),
				'type'    => 'box',
				'options' => array(
					'font-text'                => array(
						'label' => __( 'Paragraph (text) Font', 'coffeeking' ),
						'type'  => 'typography-v2',
						'desc'	=>	esc_html__( 'Use https://fonts.google.com/ to find font you need', 'coffeeking' ),
						'value'      => array(
							'family'    => 'Kanit',
							'subset'    => 'latin-ext',
							'variation' => 'regular',
							'size'      => 0,
							'line-height' => 0,
							'letter-spacing' => 0,
						),
						'components' => array(
							'family'         => true,
							'size'           => false,
							'line-height'    => false,
							'letter-spacing' => false,
							'color'          => false
						),
					),
					'font-text-weights'    => array(
						'label' => esc_html__( 'Additonal Text weights', 'coffeeking' ),
						'desc'  => esc_html__( 'Coma separated weights, for example: "600,800"', 'coffeeking' ),
						'type'  => 'text',
					),											
					'font-headers'                => array(
						'label' => __( 'Headers Font', 'coffeeking' ),
						'type'  => 'typography-v2',
						'value'      => array(
							'family'    => 'Kanit',
							'subset'    => 'latin-ext',
							'variation' => '900',
							'size'      => 0,
							'line-height' => 0,
							'letter-spacing' => 0,
						),
						'components' => array(
							'family'         => true,
							'size'           => false,
							'line-height'    => false,
							'letter-spacing' => false,
							'color'          => false
						),
					),
					'font-headers-weights'    => array(
						'label' => esc_html__( 'Additonal Headers Weights', 'coffeeking' ),
						'desc'  => esc_html__( 'Coma separated weights, for example: "600,800"', 'coffeeking' ),
						'type'  => 'text',
					),						

				),
			),
		),
	),
	'footer' => array(
		'title'   => esc_html__( 'Footer Block', 'coffeeking' ),
		'type'    => 'tab',
		'options' => array(

			'footer-box' => array(
				'title'   => esc_html__( 'Footer Settings', 'coffeeking' ),
				'type'    => 'box',
				'options' => array(
					'subscribe'    => array(
						'label' => esc_html__( 'Subscribe Block', 'coffeeking' ),
						'desc'   => esc_html__( 'You must install MailChimp plugin to use it', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'default' => esc_html__( 'Default page settings', 'coffeeking' ),
							'visible'  => esc_html__( 'Always visible', 'coffeeking' ),
							'hidden'  => esc_html__( 'Always hidden', 'coffeeking' ),
						),
						'value' => 'default',
					),	
					'go_top_hide'    => array(
						'label' => esc_html__( 'Hide Go Top button in footer', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'no',
					),		
					'footer_bg'    => array(
						'label' => esc_html__( 'Footer Block Background', 'coffeeking' ),
						'type'  => 'upload',
					),						
					'copyrights'    => array(
						'label' => esc_html__( 'Copyrights', 'coffeeking' ),
						'type'  => 'wp-editor',
					),
					'footer_1_hide'    => array(
						'label' => esc_html__( 'Hide Footer 1 Widget', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'no',
					),
					'footer_2_hide'    => array(
						'label' => esc_html__( 'Hide Footer 2 Widgets', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'no',
					),
					'footer_3_hide'    => array(
						'label' => esc_html__( 'Hide Footer 3 Widgets', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'no',
					),
					'footer_4_hide'    => array(
						'label' => esc_html__( 'Hide Footer 4 Widgets', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'no',
					),						
					'footer_1_hide_mobile'    => array(
						'label' => esc_html__( 'Hide Footer 1 Widgets on mobile', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'no',
					),
					'footer_2_hide_mobile'    => array(
						'label' => esc_html__( 'Hide Footer 2 Widgets on mobile', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'yes',
					),
					'footer_3_hide_mobile'    => array(
						'label' => esc_html__( 'Hide Footer 3 Widgets on mobile', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'no',
					),
					'footer_4_hide_mobile'    => array(
						'label' => esc_html__( 'Hide Footer 4 Widgets on mobile', 'coffeeking' ),
						'type'  => 'switch',
						'value'	=> 'yes',
					),					
				),
			),
		),
	),
);
