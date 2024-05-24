<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$coffeeking_choices =  array();
$coffeeking_choices['default'] = esc_html__( 'Default', 'coffeeking' );

$options = array(
	'general' => array(
		'title'   => esc_html__( 'Layout', 'coffeeking' ),
		'type'    => 'tab',
		'options' => array(
			'general-box' => array(
				'type'    => 'box',
				'options' => array(		
					'navbar-layout'    => array(
						'label' => esc_html__( 'Navbar', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'default'  		=> esc_html__( 'Default White Background', 'coffeeking' ),
							'transparent-light'	=> esc_html__( 'Transparent (on light background)', 'coffeeking' ),
							'transparent'	=> esc_html__( 'Transparent (on dark background)', 'coffeeking' ),
							'disabled'  	=> esc_html__( 'Hidden', 'coffeeking' ),
						),
						'value' => 'default',
					),			
					'header-layout'    => array(
						'label' => esc_html__( 'Page Header', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'default'  => esc_html__( 'Default', 'coffeeking' ),
							'disabled' => esc_html__( 'Hidden', 'coffeeking' ),
						),
						'value' => 'default',
					),
					'body-color'    => array(
						'label' => esc_html__( 'Body Color', 'coffeeking' ),
						'type'    => 'select',
						'description'   => esc_html__( 'Page Background Color', 'coffeeking' ),
						'choices' => array(
							'default'  => esc_html__( 'Default White', 'coffeeking' ),
							'black-dark'  => esc_html__( 'Black Dark', 'coffeeking' ),
						),
						'value' => 'default',
					),					
					'margin-layout'    => array(
						'label' => esc_html__( 'Content Margin', 'coffeeking' ),
						'type'    => 'select',
						'description'   => esc_html__( 'Margin control for content', 'coffeeking' ),
						'choices' => array(
							'default'  => esc_html__( 'Top And Bottom', 'coffeeking' ),
							'top'  => esc_html__( 'Top Only', 'coffeeking' ),
							'bottom'  => esc_html__( 'Bottom Only', 'coffeeking' ),
							'disabled' => esc_html__( 'Margin Removed', 'coffeeking' ),
						),
						'value' => 'default',
					),					
					'sidebar-layout'    => array(
						'label' => esc_html__( 'Sidebar', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'disabled' => esc_html__( 'Hidden', 'coffeeking' ),
							'left'  => esc_html__( 'Sidebar Left', 'coffeeking' ),
							'right'  => esc_html__( 'Sidebar Right', 'coffeeking' ),
						),
						'value' => 'disabled',
					),
					'subscribe-layout'    => array(
						'label' => esc_html__( 'Subscribe Block', 'coffeeking' ),
						'type'    => 'select',
						'description'   => esc_html__( 'Subscribe block before footer. Can be edited from Sections Menu.', 'coffeeking' ),
						'choices' => array(
							'default'  => esc_html__( 'Visible', 'coffeeking' ),
							'disabled' => esc_html__( 'Hidden', 'coffeeking' ),
						),
						'value' => 'Visible',
					),
					'footer-layout'    => array(
						'label' => esc_html__( 'Footer Block', 'coffeeking' ),
						'type'    => 'select',
						'description'   => esc_html__( 'Footer block before footer. Can be edited from Sections Menu.', 'coffeeking' ),
						'choices' => array(
							'default'  => esc_html__( 'Visible', 'coffeeking' ),
							'disabled' => esc_html__( 'Hidden', 'coffeeking' ),
						),
						'value' => 'Visible',
					),						
					'blog-layout'    => array(
						'label' => esc_html__( 'Blog Layout', 'coffeeking' ),
						'description'   => esc_html__( 'Used only for blog pages. You may ignore them on static pages.', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'default'  => esc_html__( 'Default', 'coffeeking' ),
							'classic'  => esc_html__( 'One Column', 'coffeeking' ),
							'two-cols' => esc_html__( 'Two Columns', 'coffeeking' ),
							'three-cols' => esc_html__( 'Three Columns', 'coffeeking' ),
						),
						'value' => 'default',
					),
					'gallery-layout'    => array(
						'label' => esc_html__( 'Gallery Layout', 'coffeeking' ),
						'description'   => esc_html__( 'Used only for gallery pages. You may ignore them on static pages.', 'coffeeking' ),
						'type'    => 'select',
						'choices' => array(
							'default' => esc_html__( 'Default', 'coffeeking' ),
							'col-2' => esc_html__( 'Two Columns', 'coffeeking' ),
							'col-3' => esc_html__( 'Three Columns', 'coffeeking' ),
							'col-4' => esc_html__( 'Four Columns', 'coffeeking' ),
						),
						'value' => 'default',
					),					
				)
			),
		)
	)
);


