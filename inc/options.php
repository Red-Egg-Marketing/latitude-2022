<?php
// Add options page for site

if( function_exists('acf_add_options_page') ) {
    
	// Add parent.
    acf_add_options_page(array(
        'page_title'  => __('Latitude Site Settings'),
        'menu_title'  => __('Latitude Site Settings'),
        'redirect'    => false,
     ));

    // acf field validation
    add_filter('acf/validate_value/name=phone_number', function($valid, $value, $field, $input_name) {
        if (!$valid) return $valid;

        if ($value && !preg_match('/^[\+]?[\d\s\-\.\(\)]{7,20}$/', $value)) {
            $valid = 'Please enter a valid phone number.';
        }

        return $valid;
    }, 10, 4);

}