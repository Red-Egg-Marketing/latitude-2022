<?php


function get_locations_post_info($atts = array('description' => false, 'contact' => true)) {

	$args = [
		'post_type' => 'location',
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'title',
    	'order'          => 'ASC'
	];

	$contact = filter_var($atts['contact'], FILTER_VALIDATE_BOOLEAN);
	$description = filter_var($atts['description'], FILTER_VALIDATE_BOOLEAN);

	$query = new WP_Query($args); 
	$html = '';

	if ($query->have_posts()) {

		$html .= '<div class="locations">';

		while($query->have_posts()) {

			$query->the_post();
			$id = get_the_ID();
			$permalink = get_the_permalink();
			$title = get_the_title();
			$associated_tax = get_post_meta($id, 'gs_team_group', true);
			$phone = get_field('phone_number', 'gs_team_group_' . $associated_tax);
			$street = get_field('address', 'gs_team_group_' . $associated_tax);
			$city = get_field('city', 'gs_team_group_' . $associated_tax);
			$state = get_field('state', 'gs_team_group_' . $associated_tax);
			$zip = get_field('zip_code', 'gs_team_group_' . $associated_tax);
			$term_desc = term_description($associated_tax, 'gs_team_group');

			$html .= '<div class="item location">';
			$html .= '<h3 class="location-title">' . $title . '</h3>';
			if ($contact == true) {
				$html .= '<p><a href="tel:' . $phone . '">' . $phone . '</a></p>';
				$html .= '<address><p>' . $street . '<br />';
				$html .= $city . ', ' . $state . ' ' . $zip;
				$html .= '</p></address>';
			}
			if ($description == true) {
				$html .= $term_desc;
			}
			$html .= '<div class="wp-block-button">';
			$html .= '<a href="' . $permalink . '" class="wp-block-button__link wp-element-button">View Location</a>';  
			$html .= '</div>';
			$html .= '</div>';

		}

		wp_reset_postdata();

		$html .= '</div>';
	}

	return $html;
}

add_shortcode( 'get_locations_shortcode', 'get_locations_post_info'); 


function get_location_contact_info( $atts = array('tax_id' => false)) {
	$id = $atts['tax_id'];
	if ($id == false) return;

	$phone = get_field('phone_number', 'gs_team_group_' . $id);
	$street = get_field('address', 'gs_team_group_' . $id);
	$city = get_field('city', 'gs_team_group_' . $id);
	$state = get_field('state', 'gs_team_group_' . $id);
	$zip = get_field('zip_code', 'gs_team_group_' . $id);
	$link = get_field('link', 'gs_team_group_' . $id);
	$html = '';
	
	$html .= '<address class="contact-info">';
	$html .= '<a href="' . $link . '" target="_blank">';
	$html .= '<p>' . $phone . '</p>';
	$html .= '<p>' . $street . '</p>';
	$html .= '<p>' . $city . ', ' . $state . ' ' . $zip . '</p>';
	$html .= '</a>';
	$html .= '</address>';

	return $html;
}


add_shortcode( 'get_location_contact', 'get_location_contact_info'); 