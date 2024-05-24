<?php if ( ! defined( 'FW' ) ) { die( 'Forbidden' ); }

$cfg = array();
$cfg['default_item_widths'] = array(
	'1_6' => array(
		'title'          => '1/6',
		'backend_class'  => 'fw-col-sm-2',
		'frontend_class' => 'col-xs-6 col-sm-4 col-md-4 col-lg-2',
	),
	'1_5' => array(
		'title'          => '1/5',
		'backend_class'  => 'fw-col-sm-15',
		'frontend_class' => 'fw-col-xs-12 fw-col-sm-15',
	),
	'1_4' => array(
		'title'          => '1/4',
		'backend_class'  => 'fw-col-sm-3 fw-col',
		'frontend_class' => 'fw-col-xs-12 fw-col-sm-6 fw-col-md-6 fw-col-lg-3',
	),
	'1_3' => array(
		'title'          => '1/3',
		'backend_class'  => 'fw-col-sm-4',
		'frontend_class' => 'fw-col-xs-12 fw-col-sm-4',
	),
	'1_2' => array(
		'title'          => '1/2',
		'backend_class'  => 'fw-col-sm-6',
		'frontend_class' => 'fw-col-xs-12 fw-col-sm-6',
	),
	'2_3' => array(
		'title'          => '2/3',
		'backend_class'  => 'fw-col-sm-8',
		'frontend_class' => 'fw-col-xs-12 fw-col-sm-8',
	),
	'3_4' => array(
		'title'          => '3/4',
		'backend_class'  => 'fw-col-sm-9',
		'frontend_class' => 'fw-col-xs-12 fw-col-sm-9',
	),
	'1_1' => array(
		'title'          => '1/1',
		'backend_class'  => 'fw-col-sm-12',
		'frontend_class' => 'fw-col-xs-12',
	),
);
