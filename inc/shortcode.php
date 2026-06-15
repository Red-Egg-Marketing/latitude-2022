<?php


function get_locations_post_info($atts = array('image' => false, 'description' => false, 'contact' => true)) {

	$args = [
		'post_type' => 'location',
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'title',
    	'order'          => 'ASC'
	];

	$contact = filter_var($atts['contact'], FILTER_VALIDATE_BOOLEAN);
	$description = filter_var($atts['description'], FILTER_VALIDATE_BOOLEAN);
	$with_image = filter_var($atts['image'], FILTER_VALIDATE_BOOLEAN);

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
			$link = get_field('link', 'gs_team_group_' . $associated_tax);
			$override = get_field('link_override', $id);
			$permalink = $override != '' ? get_the_permalink($override) : $permalink;
			$image = get_the_post_thumbnail_url($id, 'post-landscape');
			$term_desc = term_description($associated_tax, 'gs_team_group');

			$html .= '<div class="item location">';
			if ($image != '' && $with_image == true) {
				$html .= '<div class="feat-image">';
				$html .= '<img src="' . $image . '" />';
				$html .= '</div>';
			}
			$html .= '<div class="content">';
			$html .= '<h3 class="location-title">' . $title . '</h3>';
			if ($contact == true) {
				$html .= '<p><a href="tel:' . $phone . '">' . $phone . '</a></p>';
				if ($street != '' && $city != '') {
					$html .= '<address><a href="' . $link . '" target="_blank"><p>' . $street . '<br />';
					$html .= $city . ', ' . $state . ' ' . $zip;
					$html .= '</p></a></address>';
				}
			}
			if ($description == true) {
				$html .= $term_desc;
			}
			$html .= '<div class="wp-block-button">';
			$html .= '<a href="' . $permalink . '" class="wp-block-button__link wp-element-button">View Location</a>';  
			$html .= '</div>';
			$html .= '</div>';
			$html .= '</div>';

		}

		wp_reset_postdata();

		$html .= '</div>';
	}

	return $html;
}

add_shortcode( 'get_locations_shortcode', 'get_locations_post_info'); 


function get_location_contact_info( $atts = array('tax_id' => false, 'with_title' => false, 'class' => '')) {
	$ids = explode(',', $atts['tax_id']);

	if ((is_array($id) && empty($id))) return;
	$class = $atts['class'];
	$with_title = filter_var($atts['with_title'], FILTER_VALIDATE_BOOLEAN);
	$html = '';
	$html .= '<div class="location-wrap"><address class="contact-info ' . $class . '">';
 	$duplicate_phone = '';

	foreach($ids as $id) {
		$phone = get_field('phone_number', 'gs_team_group_' . $id);
		$street = get_field('address', 'gs_team_group_' . $id);
		$city = get_field('city', 'gs_team_group_' . $id);
		$state = get_field('state', 'gs_team_group_' . $id);
		$zip = get_field('zip_code', 'gs_team_group_' . $id);
		$link = get_field('link', 'gs_team_group_' . $id);
		
		$html .= ($duplicate_phone != $phone) ? '<p><a href="tel:' . $phone . '" target="_blank"><strong>' . $phone . '</strong></a></p>' : '';
		if ($with_title == true && $stree != '') {
			$labels = get_term($id);
			$html .= '<p><strong>' . $labels->name . ' Office:</strong> ';
		}
		$html .= $link != '' ? '<a href="' . $link . '" target="_blank">' : '';
		if ($with_title == false && $street != '') {
			$html .= '<p>';
		}
		if ($street != '') {
			$html .= $street . ' ';
			$html .= $city . ', ' . $state . ' ' . $zip . '</p>';
			$html .= $link != '' ? '</a>' : '';
		}
		$duplicate_phone = $phone;
	}

	$html .= '</address></div>';

	return $html;
}


add_shortcode( 'get_location_contact', 'get_location_contact_info'); 