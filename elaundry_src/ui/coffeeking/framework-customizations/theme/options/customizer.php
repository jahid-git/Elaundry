<?php if ( ! defined( 'FW' ) ) { die( 'Forbidden' ); }

$options = array(
    'coffeeking_customizer' => array(
        'title' => esc_html__('CoffeeKing', 'coffeeking'),
        'options' => array(

            'main_color' => array(
                'type' => 'color-picker',
                'value' => '#c0aa83',
                'label' => esc_html__('Main Color', 'coffeeking'),
            ),

            'second_color' => array(
                'type' => 'color-picker',
                'value' => '#B34204',
                'label' => esc_html__('Secondary Color', 'coffeeking'),
            ),

            'gray_color' => array(
                'type' => 'color-picker',
                'value' => '#f6f6f6',
                'label' => esc_html__('Gray Color', 'coffeeking'),
            ),

            'white_color' => array(
                'type' => 'color-picker',
                'value' => '#ffffff',
                'label' => esc_html__('White Color', 'coffeeking'),
            ),

            'black_color' => array(
                'type' => 'color-picker',
                'value' => '#242424',
                'label' => esc_html__('Black Color', 'coffeeking'),
            ),
            'border_radius' => array(
                'type' => 'text',
                'value' => '0px',
                'label' => esc_html__('Border Radius', 'coffeeking'),
            ),    
            'nav_opacity' => array(
                'type'  => 'slider',
                'value' => 0,
                'properties' => array(
                    'min' => 0,
                    'max' => 1,
                    'step' => 0.05,
                ),
                'label' => esc_html__('Navbar Opacity (0 - 1)', 'coffeeking'),
            ), 
            'nav_opacity_scroll' => array(
                'type'  => 'slider',
                'value' => 0.95,
                'properties' => array(
                    'min' => 0,
                    'max' => 1,
                    'step' => 0.05,
                ),
                'label' => esc_html__('Navbar Sticked Opacity (0 - 1)', 'coffeeking'),
            ),
            'logo_height' => array(
                'type'  => 'slider',
                'value' => 60,
                'properties' => array(

                    'min' => 16,
                    'max' => 110,
                    'step' => 1,

                ),
                'label' => esc_html__('Logo Max Height, px', 'coffeeking'),
            ),        
                    
        ),
    ),
);
