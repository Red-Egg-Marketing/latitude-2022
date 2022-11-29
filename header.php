<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package latitude
 */

$phone = get_field('business_phone', 'options');
$phone_tag = get_field('phone_tagline', 'options');
$modal_form = get_field('menu_form', 'options');
$global_button = get_field('global_estimate_button', 'options');

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'latitude' ); ?></a>

	<header id="masthead" class="site-header">
		<nav class="secondary-navigation">
			<div class="wrapper">
				<?php 
					
					echo '<p><a href="#talk-to-us" data-src="#talk-to-us" data-fancybox="true">Let\'s Talk</a><a href="https://dashboard.yosicare.com/" target="_blank">Login</a></p>'; 

				?>
			</div><!-- .wrapper -->
		</nav><!-- #site-navigation -->
		<div class="main-content-nav">
		<div class="wrapper main-wrapper">
			<div class="site-branding">
				<?php
				the_custom_logo();
				if ( is_front_page() && is_home() ) :
					?>
					<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php
				else :
					?>
					<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php
				endif;
				?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'latitude' ); ?></button>
				<?php

				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu',
						'walker' => new latitude_Menu_Walker()
					)
				);
				if ($modal_form != 0) {
    			    $button_text = get_field('estimate_button_text' ,'options');
    			    if ($global_button == true && !is_user_logged_in()) { ?>
    			        <div class="fixed-buttons">
    			            <div class="fixed-wrapper">
    			                <a  
    			                    href="#talk-to-us"
    			                    data-src="#talk-to-us" 
    			                    class="wp-block-button__link is-small"
    			                    data-fancybox="true"
    			                ><?= $button_text; ?></a>
    			            </div>
    			        </div>
    			    <?php 
    			    }
    		
    			}
				
				?>
			</nav><!-- #site-navigation -->

		</div><!-- .wrapper -->
		</div>
	</header><!-- #masthead -->
	<?php
			if ($modal_form != 0) {
    			    $button_text = get_field('estimate_button_text' ,'options');
    			    if ($global_button == true && !is_user_logged_in()) { ?>
    			        <div class="fixed-buttons desktop">
    			            <div class="fixed-wrapper">
    			                <a  
    			                    href="#talk-to-us"
    			                    data-src="#talk-to-us" 
    			                    class="wp-block-button__link is-small is-style-solid-blue-green"
    			                    data-fancybox="true"
    			                ><?= $button_text; ?></a>
    			            </div>
    			        </div>
    			    <?php 
    			    }
    			}
    	?>
