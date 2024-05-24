<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
	'main' => array(
		'title'   => false,
		'type'    => 'box',
		'options' => array(
			'subheader'    => array(
				'label' => esc_html__( 'Subheader', 'coffeeking' ),
				'type'  => 'text',
			),			
			'items' => array(
				'label' => esc_html__( 'Social Icons For List', 'coffeeking' ),
				'type' => 'addable-box',
				'value' => array(),
				'box-options' => array(
					'icon' => array(
						'label' => esc_html__( 'Icon', 'coffeeking' ),
						'type'  => 'icon',
					),
					'href' => array(
						'label' => esc_html__( 'Link', 'coffeeking' ),
						'desc' => esc_html__( 'If needed', 'coffeeking' ),
						'type' => 'text',
						'value' => '#',
					),
				),
				'template' => '{{- icon }}',
			),			
		),
	),		
);

