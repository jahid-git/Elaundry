<?php
/**
 * The template for displaying the footer
 */
?>
    </div>
    <?php
    /**
     * Footer include section
     */
    $subscribe_layout = 'disabled';
    if ( function_exists( 'FW' ) ) {

        $subscribe_layout = fw_get_db_post_option( $wp_query->get_queried_object_id(), 'subscribe-layout' );
    }

    if ( function_exists( 'FW' ) AND $subscribe_layout != 'disabled'  ) {

        $subscribe_layout_global = fw_get_db_settings_option( 'subscribe' );
        if ( $subscribe_layout_global == 'visible' ) $subscribe_layout = 'visible';
            else
        if ( $subscribe_layout_global == 'hidden' ) $subscribe_layout = 'disabled';
    }

    $subscribe_section = get_page_by_path( 'subscribe', OBJECT, 'sections' );
    if ( !empty($subscribe_section) AND !empty($subscribe_layout) AND $subscribe_layout != 'disabled' ) {

        echo '<div class="container subscribe-block">'.do_shortcode(wp_kses_post($subscribe_section->post_content)).'</div>';
    }

    ?>
    <?php
    /**
    	Footer customization
    */
    $footer_layout = 'visible';
    if ( function_exists( 'FW' ) ) {

        $footer_layout = fw_get_db_post_option( $wp_query->get_queried_object_id(), 'footer-layout' );
    }

    if ( function_exists( 'FW' ) AND $footer_layout != 'disabled') {

    	/* Counting active cols number */
    	$footer_cols_num = 0;
    	for ($x = 1; $x <= 4; $x++) {

    		if ( !fw_get_db_settings_option( 'footer_' . $x . '_hide' ) ) {

    			$footer_cols_num++;
    		}
    	}
    }                
    	else {

        $footer_cols_num = 0;
   	}    	
	?>	
	<?php if ( $footer_cols_num > 0): ?>
	<section id="block-footer">
		<div class="container">
			<div class="row">
                <?php
                /* By default columns with different layout */
                $footer_tmpl = array(
                	4	=>	array(
                			'col-md-3 col-sm-6 col-ms-12',
                			'col-md-3 col-sm-6 col-ms-12',
                			'col-md-3 col-sm-6 col-ms-12',
                			'col-md-3 col-sm-6 col-ms-12',
                		),
                	3	=>	array(
                			'col-md-4 col-sm-6 col-ms-12',
                			'col-md-4 col-sm-6 col-ms-12',
                			'col-md-4 col-sm-6 col-ms-12',
                			'col-md-4 col-sm-6 col-ms-12',
                		),
                	2	=>	array(
                			'col-md-6 col-sm-12',
                			'col-md-6 col-sm-12',
                			'col-md-6 col-sm-12',
                			'col-md-6 col-sm-12',
                		),
                	1	=>	array(
                			'col-md-12',
                			'col-md-12',
                			'col-md-12',
                			'col-md-12',
                		),
                );

               	$footer_hide = array();
                if ( function_exists( 'fw_get_db_settings_option' ) ) {

                	/* Counting active cols number */
                	$footer_cols_num = 0;
                	for ($x = 1; $x <= 4; $x++) {

                		if ( !fw_get_db_settings_option( 'footer_' . $x . '_hide' ) ) {

                			$footer_cols_num++;
                		}
                			else {

                			$footer_hide[$x] = true;
                		}
                	}
                }                
                	else {

	                $footer_cols_num = 4;
               	}

                for ($x = 1; $x <= 4; $x++):

                	$class = '';
                	if ( isset($footer_tmpl[$footer_cols_num][( $x - 1 )]) ) {

                		$class = $footer_tmpl[$footer_cols_num][( $x - 1 )];
                	}

                	$col_hide_mobile = '';
                	if ( function_exists( 'fw_get_db_settings_option' ) && fw_get_db_settings_option( 'footer_' . $x . '_hide_mobile') ) {

                		$col_hide_mobile = 'hidden-xs hidden-ms hidden-sm';
                	}

                    $coffeeking_footer_sidebars_active = 0;
                    ?>
                    <?php if ( !isset($footer_hide[ $x ]) ): ?>
					<div class="<?php echo esc_attr( $class ).' '.esc_attr( $col_hide_mobile ); ?> matchHeight clearfix">    
						<?php if ( is_active_sidebar( 'footer-' . $x ) ) : ?>
							<div class="footer-widget-area">
								<?php
                                    dynamic_sidebar( 'footer-' . $x );
                                    $coffeeking_footer_sidebars_active++;
                                ?>
							</div>
						<?php else: ?>
							<div class="footer-widget-area">
	                            <h4><?php esc_html__( 'Footer', 'coffeeking' ); ?> <?php echo esc_html( $x ); ?></h4>
	                            <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php echo esc_html__( 'To add your widgets click here', 'coffeeking' ); ?></a>
	                        </div>
						<?php endif; ?>
					</div>
					<?php endif; ?>
                    <?php
                endfor;
                ?>
			</div>
		</div>
	</section><?php endif; ?>
    <?php 
    if ( function_exists( 'FW' ) ) {

        $coffeeking_copyrights = fw_get_db_settings_option( 'copyrights' );
        $coffeeking_go_top_hide = fw_get_db_settings_option( 'go_top_hide');
    }
    ?>
	<footer class="footer-block">
		<div class="container">
			<?php if ( !empty($coffeeking_copyrights) ) : ?>
				<?php echo wp_kses_post( $coffeeking_copyrights ); ?>
			<?php else : ?>
				<p><?php echo esc_html__( 'Like-themes &copy; All Rights Reserved - 2017', 'coffeeking' );?></p>
			<?php endif; ?>
			<?php if ( isset($coffeeking_go_top_hide) AND $coffeeking_go_top_hide !== true ) : ?>
				<a href="#" class="go-top hidden-xs hidden-ms"><span class="fa fa-arrow-up"></span><?php echo esc_html__( 'TOP', 'coffeeking' );?></a>
			<?php endif; ?>
		</div>
	</footer>

	<?php wp_footer(); ?>
</body>
</html>
