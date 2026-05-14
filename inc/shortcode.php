<?php


function get_locations_post_info() {

	$args = [
		'post_type' => 'location',
		'post_status' => 'publish',
		'posts_per_page' => -1
	];

	$query = new WP_Query($args); 
	$html = '';

	if ($query->have_posts()) {

		$html .= '<div class="grid locations">';

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

			$html .= '<div class="item location">';
			$html .= '<h3 class="location-title">' . $title . '</h3>';
			$html .= '<p><a href="tel:' . $phone . '">' . $phone . '</a></p>';
			$html .= '<address><p>' . $street . '<br />';
			$html .= $city . ', ' . $state . ' ' . $zip;
			$html .= '</p></address>';
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