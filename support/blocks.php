<?php
 // enqueue custom blocks
function latitude_enqueue_block_editor_assets() {
    wp_enqueue_style('latitude-fonts-editor', 'https://use.typekit.net/dly3nlz.css', [], null);
    if (get_post_type() == 'case-studies' || get_post_type() == 'page' || get_post_type() == 'wp_block' && strpos(get_page_template(), 'page-boilerplate.php') == false) {
        $block_path = '/support/assets/js/editor.blocks.js';

        $dependencies = array( 'wp-blocks', 'wp-dom-ready' );

        if( is_object( get_current_screen() ) ){
            if( get_current_screen()->id == 'site-editor' ){
                $dependencies[] = 'wp-edit-site';
            }elseif( get_current_screen()->id == 'widgets' ){
                $dependencies[] = 'wp-edit-widgets';
            }else{
                $dependencies[] = 'wp-edit-post';
            }
        }else{
            $dependencies[] = 'wp-edit-post';
        }
        
        wp_enqueue_script(
            'wp-core-blocks-js',
            get_template_directory_uri() . $block_path,
            [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-dom-ready' ],
            $dependencies,
            'v1.0.0'
        );
        wp_localize_script(
           'wp-core-blocks-js',
           'latitude',
           [
               'template_directory' => get_template_directory_uri()
           ]
        );
        wp_enqueue_style('latitude-editor-css', get_template_directory_uri() . '/blocks.editor.css', ['latitude-fonts-editor']);
    }

}

add_action('enqueue_block_editor_assets', 'latitude_enqueue_block_editor_assets');


// For Dynamic blocks that are registered within blocks folder


function latitude_render_filtered_resources_callback($block_attributes, $content) {
    global $is_IE;

    $title = !empty($block_attributes['mainTitle']) ? $block_attributes['mainTitle'] : '';

    $block_content = '<div class="wp-block-latitude-blocks-resources">';
        $block_content .= '<div class="resources-block">';
            $block_content .= '<div class="resources-wrap">';
                $block_content .= '<div id="ResourcesGrid" class="resources-grid" data-title="' . $title . '">';
                    $block_content .= '<header class="header">';
                        $block_content .= '<h2 class="header-title"><background class="bg-gradient">' . $title . '</background></h2>';
                    $block_content .= '</header>';
                    $block_content .= '<div class="block-wrapper">';
                    if ($is_IE) {
                        $block_content .= latitude_posts_pagination();
                    }
                    $block_content .= '</div>';
                $block_content .= '</div>';
            $block_content .= '</div>';
        $block_content .= '</div>';
    $block_content .= '</div>';

    return $block_content; 
}


function latitude_dynamic_resources_block() {
    
    register_block_type( 'latitude-blocks/resources', [
            'api_version' => 2,
            'script' => 'wp-main-js',
            'render_callback' => 'latitude_render_filtered_resources_callback'
        ] 
    );
}

add_action('init', 'latitude_dynamic_resources_block');


function latitude_render_filtered_projects_callback($block_attributes, $content) {
    $block_content = '';

    $cat = !empty($block_attributes['category']) ? $block_attributes['category'] : '';
    $anchor = !empty($block_attributes['anchor']) ? $block_attributes['anchor'] : '';
    $title = !empty($block_attributes['mainTitle']) ? $block_attributes['mainTitle'] : '';
    $b_content = !empty($block_attributes['content']) ? $block_attributes['content'] : '';
    $bg = !empty($block_attributes['bgSlug']) ? ' ' . $block_attributes['bgSlug'] : '';
    
    $block_content .= '<section class="selected-resources' . $bg . '">';
       $block_content .= '<div class="resources-block">';
            $block_content .= '<div class="block-wrapper" id="' . $anchor . '">';
                $block_content .= '<div class="resources-wrap">';
                    if ($title != 'undefined') {
                        $block_content .= '<header class="header">';
                             $block_content .= $title != '' ? '<h2 class="header-title">' . $title . '</h2>' : '';
                             $block_content .= $b_content != '' ? '<p class="header-description">' . $b_content . '</p>' : '';
                        $block_content .= '</header>';
                    }
                    $block_content .= '<div class="resources grid" data-append data-category="' . $cat . '">';
                    $block_content .= '</div>';
               $block_content .= '</div>';
               $block_content .= $content;
            $block_content .= '</div>';
        $block_content .= '</div>';
    $block_content .= '</section>';
    
    return $block_content;
}


function latitude_dynamic_projects_block() {

    register_block_type( 'latitude-blocks/selected-projects', [
            'api_version' => 2,
            'script' => 'wp-main-js',
            'render_callback' => 'latitude_render_filtered_projects_callback'
        ] 
    );
}

add_action('init', 'latitude_dynamic_projects_block');


function latitude_render_filtered_case_studies_callback($block_attributes, $content) {
    $block_content = '';

    $cat = !empty($block_attributes['category']) ? $block_attributes['category'] : '';
    $anchor = !empty($block_attributes['anchor']) ? $block_attributes['anchor'] : '';
    $title = !empty($block_attributes['mainTitle']) ? $block_attributes['mainTitle'] : '';
    
    $block_content .= '<section class="selected-case-studies-grid">';
       $block_content .= '<div class="resources-block">';
            $block_content .= '<div class="block-wrapper" id="' . $anchor . '">';
                $block_content .= '<div class="resources-wrap">';
                    if ($title != 'undefined') {
                        $block_content .= '<header class="header">';
                             $block_content .= '<h2 class="header-title">' . $title . '</h2>';
                        $block_content .= '</header>';
                    }
                    $block_content .= '<div class="resources grid" data-append data-category="' . $cat . '">';
                    $block_content .= '</div>';
               $block_content .= '</div>';
               $block_content .= $content;
            $block_content .= '</div>';
        $block_content .= '</div>';
    $block_content .= '</section>';
    
    return $block_content;
}


function latitude_dynamic_case_studies_grid_block() {
    if (!is_admin()) {
        wp_enqueue_script(
            'fancybox',
            get_template_directory_uri() . '/support/js-compile/libraries/fancybox-v4.0.26.js',
            ['jquery'],
            'v1.0.1',
            true
        );
        $front_path = '/support/assets/js/main.js';
        wp_enqueue_script(
            'wp-main-js',
            get_template_directory_uri() . $front_path,
            ['wp-api', 'scroll-magic', 'tweenmax', 'tweenmax-animation', 'scrolltrigger'],
            'v1.0.1',
            true
       );
    }

    register_block_type( 'latitude-blocks/selected-case-studies', [
            'api_version' => 2,
            'script' => 'wp-main-js',
            'render_callback' => 'latitude_render_filtered_case_studies_callback'
        ] 
    );
}

add_action('init', 'latitude_dynamic_case_studies_grid_block');


function latitude_render_filtered_case_studies_stat_block_callback($block_attributes, $content) {
    $block_content = '';

    $cat = !empty($block_attributes['category']) ? $block_attributes['category'] : '';
    $anchor = !empty($block_attributes['anchor']) ? $block_attributes['anchor'] : '';
    $title = !empty($block_attributes['mainTitle']) ? $block_attributes['mainTitle'] : '';
    
    $block_content .= '<section class="selected-case-studies">';
       $block_content .= '<div class="case-studies-block">';
            $block_content .= '<div class="block-wrapper" id="' . $anchor . '">';
                $block_content .= '<div class="resources-wrap">';
                    if ($title != '') {
                        $block_content .= '<header class="header">';
                             $block_content .= '<h2 class="header-title">' . $title . '</h2>';
                        $block_content .= '</header>';
                    }
                    $block_content .= '<div class="swiper">';
                        $block_content .= '<div class="resources swiper-wrapper" data-append data-category="' . $cat . '">';
                        $block_content .= '</div>';
                         $block_content .= '<div class="swiper-button-prev"></div>';
                         $block_content .= '<div class="swiper-button-next"></div>';
                    $block_content .= '</div>';
               $block_content .= '</div>';
               $block_content .= $content;
            $block_content .= '</div>';
        $block_content .= '</div>';
    $block_content .= '</section>';
    
    return $block_content;
}


function latitude_dynamic_case_studies_block() {
    
    register_block_type( 'latitude-blocks/selected-case-study', [
            'api_version' => 2,
            'script' => 'wp-main-js',
            'render_callback' => 'latitude_render_filtered_case_studies_stat_block_callback'
        ] 
    );
}

add_action('init', 'latitude_dynamic_case_studies_block');

//remove custom colors from blocks

function latitude_gutenberg_disable_custom_styles() {

     // removes the text box where users can enter custom pixel sizes
    add_theme_support('disable-custom-font-sizes',  ['custom' ] );

    add_theme_support('disable-custom-font-weight',  ['custom' ] );

    // add_theme_support('editor-font-sizes', []);

    add_theme_support( 'editor-color-palette',
        [
            [
                'name' => esc_html('Dark Gray', '@@textdomain'),
                'slug' => 'dark-gray',
                'color' => '#313133'
            ],
            [
                'name' => esc_html('Yellow', '@@textdomain'),
                'slug' => 'yellow',
                'color' => '#FFB924'
            ],
            [
                'name' => esc_html('Blue Green', '@@textdomain'),
                'slug' => 'blue-green',
                'color' => '#0B6F6F'
            ],
            [
                'name' => esc_html('White', '@@textdomain'),
                'slug' => 'white',
                'color' => '#ffffff'
            ],

        ]
    );
    add_theme_support( 'disable-custom-colors' );
}
add_action( 'after_setup_theme', 'latitude_gutenberg_disable_custom_styles' );


function latitude_progress_block_assets() {
   
    wp_enqueue_script(
      'scroll-magic',
      'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js',
      ['jquery', 'tweenmax'],
      '1.0.0',
      true
    );

    wp_enqueue_script(
        'scrolltrigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/ScrollTrigger.min.js',
        ['tweenmax'],
        '1.0.0',
        true
    );

    wp_enqueue_script(
      'tweenmax',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/gsap.min.js',
      ['jquery'],
      '1.0.0',
      true
    );

    wp_enqueue_script(
      'tweenmax-animation',
      'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js',
      ['jquery', 'tweenmax', 'scroll-magic'],
      '1.0.0',
      true
    );
}
add_action( 'enqueue_block_assets', 'latitude_progress_block_assets' );

?>