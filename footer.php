<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package latitude
 */
if (function_exists('get_field')) {
    $company_settings = [
        'locations'     => get_field('locations', 'options'),
        'icons'         => get_field('icons', 'options'),
    ];

    $privacy = get_field('privacy_page', 'options');
    $privacy = get_permalink($privacy);
    
?>

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<div class="wrapper">
                <div class="col">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="footer-home"><?php bloginfo( 'name' ); ?></a>
                
                </div>
                <ul class="col col-locations">
                    <?php
                      foreach($company_settings['locations'] as $location) {

                        $title = $location['location_name'];
                        $phone = $location['phone_number'];
                        $html = '<li class="location">';
                        $html .= '<h4>' . $title . '</h4>';
                        $html .= '<a href="tel:' . $phone . '">' . $phone . '</a>';
                        $html .= '</li>';

                        echo $html;
                      }

                      if (!empty($company_settings['icons'])){
                        echo '<li class="location socials">';
                        echo '<ul class="social-icons">';
                        foreach($company_settings['icons'] as $icon) {
                            $src = $icon['social']['link'];
                            $class = $icon['social']['icon_class'];
                        ?>
                                <li class="social"><a href="<?= $src; ?>" class="fa-brands fa-<?= $class; ?>" target="_blank"></a></li>
                        <?php
                        }
                        echo '</ul>';
                        echo '</li>';
                      }
                    ?>
                </ul>
            </div>
            <div class="footer-copyright">
                <p>Copyright Latitude Insurance | <a href="<?= $privacy; ?>">Privacy Policy</a> | Web Design by <a href="https://redeggmarketing.com/" target="_blank">Red Egg Marketing</a></p>
            </div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php 

} // end if
wp_footer(); 

?>

</body>
</html>
