<?php
require_once "events_service.php";

$eventsArray = findLatestEvents();
?>
<style>
.event_section {
    margin: 50px;
    text-align: center;
}
.event_time {
    font-weight: bold;
    font-size: 15px;
    text-align: left;
}
.event_description {
    font-size: 20px;
    text-align: left;
}
.event_separator {
    margin: 0 auto;
    width: 100%;
    height: 1px;
    background-color: #B38934;
    margin-bottom: 10px;
}
</style>
<div class="event_section">
    <div class="heading" style="margin-bottom: 10px;">
        <?php printConfig("event_slide_title", "Up Coming Events"); ?>
    </div>
<?php
foreach ($eventsArray as $event) {
    $event_date = new DateTime($event["event_date"]);
?>
    <div class="event_time">

        <?php pv($event_date->format("D, M j, Y")); ?>
        <?php
        echo " - ";
        if (isset($event["start_time"]) && strlen($event["start_time"]) > 0 && isset($event["end_time"]) && strlen($event["end_time"]) > 0) {
            pv($event["start_time"]);
            echo " to ";
            pv($event["end_time"]);
        } else if (isset($event["start_time"]) && strlen($event["start_time"]) > 0) {
            pv($event["start_time"]);
        } else if (isset($event["end_time"]) && strlen($event["end_time"]) > 0) {
            pv($event["end_time"]);
        }
        ?>

    </div>
    <div class="event_description">
        <?php pv($event["description"]); ?>
    </div>
    <div class="event_separator"></div>
<?php
}
?>
</div>
