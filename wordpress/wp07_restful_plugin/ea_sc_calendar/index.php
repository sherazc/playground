<?php
require_once 'ea_domain.php';
/*
Plugin Name: Easy Appointment SC Calendar
Plugin URI: https://www.bitsegment.com
Description: Add this short code to show [ea-sc-calendar title="Sample Tile"].
Version: 1.0
Author: Sheraz
Author URI: http://www.bitsegment.com
*/

// $attributes is an array of values that user of function can pass.

function eaScCalendar($attributes) {
    ob_start();
    ?>
    <h3>
        Hello changed
        <?php
        // Using $attributes value.
        echo $attributes['title'];
        ?>
    </h3>
    <?php
    return ob_get_clean();
}

// parameter 1 is the shortcode, parameter 2 is the function that would run.
add_shortcode("ea-sc-calendar", "eaScCalendar");


// APIs
function getAppointments(): array {
    global $wpdb;
    // TODO: check for confirmation status and maybe date ranges to show
    $appointmentResults = $wpdb->get_results( "
        select 
        a.id a_id,
        a.date a_start_date,
        a.start a_start_time,
        a.end_date a_end_date,
        a.end a_end_time,
        a.status a_status,
        l.name l_location_name,
        s.name s_room_name,
        st.name st_guest
        from wp_ea_appointments a
        join wp_ea_locations l on a.location = l.id -- Location
        join wp_ea_services s on a.service = s.id -- Room
        join wp_ea_staff st on a.worker = st.id -- Guest");

    $appointments = array();
    foreach($appointmentResults as $key => $value) {
        $appointments[$key] = new ScAppointment();
        $appointments[$key]->id = $value->a_id;
        $appointments[$key]->startDate = $value->a_start_date . 'T' . $value->a_start_time;
        $appointments[$key]->endDate = $value->a_end_date . 'T' . $value->a_end_time;
        $appointments[$key]->location = new ScLocation();
        $appointments[$key]->location->name = $value->l_location_name;
        $appointments[$key]->room = new ScRoom();
        $appointments[$key]->room->name = $value->s_room_name;
        $appointments[$key]->guest = new ScGuest();
        $appointments[$key]->guest->name = $value->st_guest;

        $appointments[$key]->event = new ScEvent();
        $eventFieldResults = $wpdb->get_results( "
            select 
            mf.id id,
            mf.label lable,
            mf.slug slug,
            f.value value
            from wp_ea_fields f 
            join wp_ea_meta_fields mf on mf.id = f.field_id 
            where app_id = " . $value->a_id);

        foreach($eventFieldResults as $eventFieldResult) {
            switch($eventFieldResult->slug) {
                case 'name';
                    $appointments[$key]->event->name = $eventFieldResult->value;
                    break;
                case 'description';
                    $appointments[$key]->event->description = $eventFieldResult->value;
                    break;
                case 'email';
                    $appointments[$key]->event->email = $eventFieldResult->value;
                    break;
                case 'phone';
                    $appointments[$key]->event->phone = $eventFieldResult->value;
                    break;

                default;
                    break;
            }
        }

    }



    return $appointments;
}

add_action('rest_api_init', function () {

    register_rest_route('ea_sc_calendar/v1', '/appointments', array(
        'methods' => 'GET',
        'callback' => 'getAppointments',
    ));
});