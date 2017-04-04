<?php

/*
 * // This is the plugin name that will be displayed in plugin section
 * Plugin Name: WP 04 Widget
 * Plugin URI: https://www.youtube.com/watch?v=ojTDBvNGsgo
 * Description: WP 04 Widget Description
 * Version: 1.0
 * Author: Sheraz
 * Licence: none
 *
 */

class wp_04_widget extends WP_Widget {
    function __construct() {
        // This name will be displayed in widget Section
        parent::__construct(false, $name = __('Wp 04'));
    }

    function form() {

    }

    function update() {

    }

    function widget($args, $instance) {
        // Any content is that is outputted in this function will be displayed on the page.
        ?>
        This is my widget content
        <?php

    }
}

add_action("widgets_init", function() {
    register_widget("wp_04_widget");
});