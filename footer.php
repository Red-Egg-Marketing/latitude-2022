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
        'email'         => get_field('business_email', 'options'),
        'phone'         => get_field('business_phone', 'options'),
        'street'        => get_field('business_street', 'options'),
        'city'          => get_field('business_city', 'options'),
        'zip'           => get_field('business_zip', 'options'),
        'state'         => get_field('business_state', 'options'),
        'locations'     => get_field('locations', 'options'),
        'icons'         => get_field('icons', 'options'),
    ];
    
?>

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<div class="wrapper">
                <div class="col">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="footer-home"><?php bloginfo( 'name' ); ?></a>
                    <address>
                        <p>
                            <?= $company_settings['street']; ?><br />
                            <?= $company_settings['city']; ?>, <?= $company_settings['state']; ?> <?= $company_settings['zip']; ?>
                             <a href="mailto:<?= $company_settings['email']; ?>" class="contact-link"><?= $company_settings['email'] ?></a>
                             <a href="tel:<?= $company_settings['phone']; ?>" class="contact-link"><?= $company_settings['phone'] ?></a>
                            <?php
                             if (sizeof($company_settings['icons']) > 0) {
                            ?>
                            <ul class="social">
                                 <?php
                                foreach($company_settings['icons'] as $icon) {
                                    $src = $icon['social']['link'];
                                    $class = $icon['social']['icon_class'];
                                    ?>
                                        <li><a href="<?= $src; ?>" class="fa-brands fa-<?= $class; ?>" target="_blank"></a></li>
                                    <?php
                                }
                                ?>
                            </ul>
                            <?php
                            }
                            ?>
                        </p>
                    </address>
                </div>
                <div class="col">
                    <?php
                        wp_nav_menu(
                            array(
                                'theme_location' => 'menu-12',
                                'menu_id'        => 'secondary-menu',
                            )
                        );
                    ?>
                </div>
                <div class="col">
                    <?php
                        wp_nav_menu(
                            array(
                                'theme_location' => 'menu-14',
                                'menu_id'        => 'secondary-menu-2',
                            )
                        );
                    ?>         
                </div>
            </div>
    
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->


<div 
    class="fancybox__container"
    id="talk-to-us" style="display: none;"
>
    <div class="wrapper">
        <iframe src="https://calendly.com/hprasad/30min-1" width="800" height="900" noscroll></iframe> 
    </div>
</div>

<?php 

} // end if
wp_footer(); 

?>

</body>
</html>
