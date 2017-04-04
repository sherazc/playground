<?php
/**
 * // These lines are minimum required parameters to declare a plugin
 * Plugin Name: WP Plugin 01
 * Plugin URI: http://www.google.com
 * Description: This is a basic plugin
 *
 *
 * // Additional Plugin information
 * Author: Sheraz
 * Version: 1.0
 * Author URI: http://news.google.com
 *
 * https://www.youtube.com/watch?v=tSblOUw97Mc&list=PLIjMj0-5C8TI7Jwell1rTvv5XXyrbKDcy&index=1
 */


// This function and action code will remove news box from admin dashboard
function sc_remove_dashboard_widget()
{
    remove_meta_box('dashboard_primary', 'dashboard', 'post_container_1');
}
add_action('wp_dashboard_setup', 'sc_remove_dashboard_widget');


// This will add link to Admin bar
function sc_add_google_link()
{
    global $wp_admin_bar;

    $args = array(
        'id' => 'cric_info',
        'href' => 'http://www.cricinfo.com',
        'title' => 'ESPN cricinfo.com'
    );
    $wp_admin_bar->add_menu($args);
    // This variable contains all values/configuration values used in Admin bar
    // var_dump($wp_admin_bar);
}
add_action('wp_before_admin_bar_render', 'sc_add_google_link');


