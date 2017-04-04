<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_uri(), array( 'parent-style' ) );
    wp_enqueue_style("my_child_theme_css", get_stylesheet_directory_uri() . "/scripts/css/theme.css");
    wp_enqueue_script("my_child theme javascript", get_stylesheet_directory_uri() . "/scripts/js/extra.js");
}