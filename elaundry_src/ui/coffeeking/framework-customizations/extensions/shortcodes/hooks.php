<?php if ( ! defined( 'FW' ) ) { die( 'Forbidden' ); }

/** @internal */
function _filter_disable_shortcodes( $to_disable ) {

	$to_disable[] = 'contact_form';
	$to_disable[] = 'calendar';
	$to_disable[] = 'call_to_action';
	$to_disable[] = 'icon';
	$to_disable[] = 'icon_box';
	$to_disable[] = 'notification';
	$to_disable[] = 'special_heading';
	$to_disable[] = 'table';
	$to_disable[] = 'tabs';
	$to_disable[] = 'team_member';
	$to_disable[] = 'testimonials';

	$to_disable[] = 'demo_disabled';

	return $to_disable;
}
add_filter( 'fw_ext_shortcodes_disable_shortcodes', '_filter_disable_shortcodes' );
