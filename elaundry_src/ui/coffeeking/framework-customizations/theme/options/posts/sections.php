<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}


$options = array(
	'theme_block' => array(
		'title'   => esc_html__( 'Theme Block', 'coffeeking' ),
		'label'   => esc_html__( 'Theme Block', 'coffeeking' ),
		'type'    => 'select',
		'choices' => array(
			'none'  => esc_html__( 'Not Assigned', 'coffeeking' ),
			'subscribe'  => esc_html__( 'Subscribe', 'coffeeking' ),			
			'top_bar'  => esc_html__( 'Top Bar', 'coffeeking' ),
		),
		'value' => 'none',
	)
);


