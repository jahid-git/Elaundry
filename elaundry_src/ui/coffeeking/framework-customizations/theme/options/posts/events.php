<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
	'main' => array(
		'title'   => false,
		'type'    => 'box',
		'options' => array(
			'event_date'    => array(
				'label' => esc_html__( 'Event Date', 'coffeeking' ),
				'type'            => 'datetime-picker',
				'datetime-picker' => array(
					'format'        => 'd-m-Y',
					'extra-formats' => array(),
					'moment-format' => 'DD-MM-YYYY',
					'scrollInput'   => false,
					'maxDate'       => false,
					'minDate'       => false,
					'timepicker'    => false,
					'datepicker'    => true,
				)
			),	
		),
	),		
);

