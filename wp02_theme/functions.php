<?php
function learningWordPress_resources() {
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_uri(), array( 'parent-style' ) );
    wp_enqueue_style("my_child_theme_css", get_stylesheet_directory_uri() . "/scripts/css/theme.css");
    wp_enqueue_script("my_child theme javascript", get_stylesheet_directory_uri() . "/scripts/js/extra.js");
}

add_action('wp_enqueue_scripts', 'learningWordPress_resources');


//Navigation Menu
register_nav_menus(array(
    'primary' => __('Primary Menu'),
    'footer' => __('Footer Menu')
));


function getTopAncestorId() {

    // This will make global variable $post available to our function;
    global $post;

    // if current page/post have a parent
    if ($post->post_parent) {
        // get_post_ancestors($post->ID); will walk the page hierarchy from current child page to the root parent
        // We are doing array_reverse() so that we can use first item will become the root parent.
        $allAncestorsArray = array_reverse(get_post_ancestors($post->ID));
        return $allAncestorsArray[0];
    } else {
        // Current Page's ID
        return $post->ID;
    }
}


function wp02_theme_init_widgets() {
    register_sidebar(array(
        'name' => "Home Page Widget",
        'id' => 'home_page_widget',
        'before_widget' => '', // HTML before widget
        'after_widget' => '', // HTML after widget
        'before_title' => '', // HTML before title
        'after_title' => '' // HTML after title
    ));
}
add_action('widgets_init', 'wp02_theme_init_widgets');
