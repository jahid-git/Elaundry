<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
	'main' => array(
		'title'   => false,
		'type'    => 'box',
		'options' => array(
			'cut'    => array(
				'label' => esc_html__( 'Short Description', 'coffeeking' ),
				'type'  => 'text',
			),
			'link'    => array(
				'label' => esc_html__( 'External Link', 'coffeeking' ),
				'type'  => 'text',
				'value'  => '#',
			),			
		),
	),
);

