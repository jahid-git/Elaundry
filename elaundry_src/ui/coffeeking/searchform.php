<div class="search-form">
	<form role="search" method="get" class="wp-searchform" action="<?php echo esc_url( site_url() ); ?>" >
		<div class="input-div"><input type="text" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php echo esc_html__( 'Search', 'coffeeking' ); ?>"></div>
		<a href="#" class="search-icon fa fa-search"></a>
	</form>
</div>			
