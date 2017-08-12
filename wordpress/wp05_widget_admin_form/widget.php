<?php

/**
 * Plugin Name: WP 05 Widget Admin Form
 * Plugin URI: http://www.wpexplorer.com/create-widget-plugin-wordpress/
 * Description: This widget demonstrate how to add configuration form in WordPress Dashboard
 * Version: 1.0
 * Author: Sheraz
 * Author URI: http://www.wpexplorer.com/how-to-create-a-widget-plugin-for-wordpress-part-2/
 * License:
 * User: Sheraz
 * Date: 10/30/15
 * Time: 12:29 AM
 */
class Wp05WidgetAdminFormClass extends WP_Widget
{

    function Wp05WidgetAdminFormClass()
    {
        // Wp05WidgetAdminFormClass can be key that WP internally identify this widget
        parent::__construct(false, $name = __('WP 05 Widget Admin Form', 'Wp05WidgetAdminFormClass'));
    }

    function form($instance)
    {

        // Our list of custom widget admin fields
        $defaultFormArray = array(
            // We should always create title filed. Because it is also used in Widget Admin
            // fieldName => fieldLabel
            'title' => 'My Title',
            'my_text_field' => 'Default text field value',
            'my_text_area' => 'Default text area value',
            'my_checkbox' => '',
            'my_select' => ''
        );

        // wp_parse_args merges 2 arrays. Casting $instance so that correct overridden method gets called.
        $instance = wp_parse_args((array)$instance, $defaultFormArray);
        ?>

        <p>
            <label for="<?php echo $this->get_field_id('title') ?>">
                Title:
            </label>
            <input
                type="text"
                class="widefat"
                id="<?php echo $this->get_field_id('title') ?>"
                name="<?php echo $this->get_field_name('title') ?>"
                value="<?php echo $instance['title'] ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('my_text_field') ?>">
                My Text Field
            </label>
            <input
                type="text"
                class="widefat"
                id="<?php echo $this->get_field_id('my_text_field') ?>"
                name="<?php echo $this->get_field_name('my_text_field') ?>"
                placeholder="Place holder for my text field"
                value="<?php echo $instance['my_text_field'] ?>">
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('my_text_area') ?>">
                My Text Area
            </label>
            <textarea
                type="text"
                class="widefat"
                id="<?php echo $this->get_field_id('my_text_area') ?>"
                name="<?php echo $this->get_field_name('my_text_area') ?>"
                placeholder="Place holder for my text area"><?php echo $instance['my_text_area'] ?></textarea>
        </p>


        <p>
            <input
                type="checkbox"
                id="<?php echo $this->get_field_id('my_checkbox') ?>"
                name="<?php echo $this->get_field_name('my_checkbox') ?>"
                value='1' <?php checked('1', $instance['my_checkbox']); ?> >
            <!-- checked() method writes checked="checked" -->
            <label for="<?php echo $this->get_field_id('my_checkbox') ?>">
                My Checkbox
            </label>
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('my_select') ?>">
                My Select
            </label>
            <select
                id="<?php echo $this->get_field_id('my_select') ?>"
                name="<?php echo $this->get_field_name('my_select') ?>"
                class="widefat">

                <?php
                $options = array("lorem", "ipsum", "dolorem");
                foreach ($options as $option) {
                    echo '<option value="' . $option
                        . '" id="' . $option
                        . '"', $instance['my_select'] == $option ? ' selected="selected"' : '', '>', $option, '</option>';
                }
                ?>

            </select>

        </p>
        <?php

    }

    // In this function we use new admin form values and old admin form values and return an array that will be
    // saved by wordpress.
    function update($new_instance, $old_instance)
    {
        $instance = $old_instance;
        $instance['title'] = strip_tags(stripcslashes($new_instance['title']));
        $instance['my_text_field'] = strip_tags(stripcslashes($new_instance['my_text_field']));
        $instance['my_text_area'] = strip_tags(stripcslashes($new_instance['my_text_area']));
        $instance['my_checkbox'] = strip_tags(stripcslashes($new_instance['my_checkbox']));
        $instance['my_select'] = strip_tags(stripcslashes($new_instance['my_select']));
        return $instance;
    }

    function widget($args, $instance)
    {
        //extract($args);
        $title = apply_filters('widget_title', $instance['title']);
        $my_text_field = $instance['my_text_field'];
        $my_text_area = $instance['my_text_area'];
        $my_checkbox = $instance['my_checkbox'];
        $my_select = $instance['my_select'];

        echo $args['before_widget'];
        echo '<div class="widget-text wp_widget_plugin_box">';

        echo '<h3>This is my widget</h3><hr/>';
        echo '<span style="font-weight: bold">My Title:</span>' . $args['before_title'] . $title . $args['after_title'];
        echo '<br/>';
        echo '<span style="font-weight: bold">My Text Field:</span>' . $my_text_field;
        echo '<br/>';
        echo '<span style="font-weight: bold">My Text Area:</span>' . '<p style="; border: 1px solid #AAA">' . $my_text_area . '</p>';
        echo '<span style="font-weight: bold">My Checkbox:</span>';
        if ($my_checkbox && $my_checkbox == '1') {
            echo 'Checked';
        } else {
            echo 'Not Checked';
        }
        echo '<br/>';
        echo '<span style="font-weight: bold">My Select:</span>' . $my_select;
        echo '<hr/>';
        echo '</div>';
        echo $args['after_widget'];
    }

}

// Both of these method works to register widget

add_action('widgets_init',
    create_function('', 'return register_widget("Wp05WidgetAdminFormClass");'));

/*
add_action("widgets_init", function () {
    register_widget("Wp05WidgetAdminFormClass");
});
*/

