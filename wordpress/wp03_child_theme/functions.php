<?php
function wp_theme_02_child_theme_scripts() {
    // wp_enqueue_* (id, uri);
    // get_stylesheet_directory_uri() this function returns child theme's uri
    wp_enqueue_style("my_child_theme_css", get_stylesheet_directory_uri() . "/scripts/css/theme.css");
    wp_enqueue_script("my_child theme javascript", get_stylesheet_directory_uri() . "/scripts/js/extra.js");
}
add_action("wp_enqueue_scripts", "wp_theme_02_child_theme_scripts");

function wp_theme_02_child_theme_widgets_init() {
    register_sidebar(array(
        'name' => "Footer Widget 1",
        'id' => 'footer_widget_1',
        'before_widget' => '', // HTML before widget
        'after_widget' => '', // HTML after widget
        'before_title' => '<h4>', // HTML before title
        'after_title' => '</h4>' // HTML after title
    ));

    register_sidebar(array(
        'name' => "Footer Widget 2",
        'id' => 'footer_widget_2',
        'before_widget' => '', // HTML before widget
        'after_widget' => '', // HTML after widget
        'before_title' => '<h4>', // HTML before title
        'after_title' => '</h4>' // HTML after title
    ));

    register_sidebar(array(
        'name' => "Footer Widget 3",
        'id' => 'footer_widget_3',
        'before_widget' => '', // HTML before widget
        'after_widget' => '', // HTML after widget
        'before_title' => '<h4>', // HTML before title
        'after_title' => '</h4>' // HTML after title
    ));

    register_sidebar(array(
        'name' => "Footer Widget 4",
        'id' => 'footer_widget_4',
        'before_widget' => '', // HTML before widget
        'after_widget' => '', // HTML after widget
        'before_title' => '<h4>', // HTML before title
        'after_title' => '</h4>' // HTML after title
    ));
}
add_action('widgets_init', 'wp_theme_02_child_theme_widgets_init');
