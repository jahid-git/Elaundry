<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
	'main' => array(
		'title'   => false,
		'type'    => 'box',
		'options' => array(
			"price" => array(
				"label" => esc_html__("Price", 'coffeeking'),
				"help"	=>	esc_html__("Use brackets to set units as postfix (for ex: {{ /unit }} )", 'coffeeking'),
				"type" => "text"
			),			
			"btn_href" => array(
				"label" => esc_html__("Button Link", 'coffeeking'),
				"value"	=>	'#',
				"type" => "text"
			),				
			"btn_header" => array(
				"label" => esc_html__("Button Header", 'coffeeking'),
				"type" => "text"
			),
		),
	),		
);

