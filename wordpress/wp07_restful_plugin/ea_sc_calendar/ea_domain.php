<?php

/**
 * EA vs SC domain terminologies
 *
 * location = location
 * services = room
 * staff = guest // Folks who are invited
 * appointment = appointment //
 * field = Event // Event for which appointment is made
 *
 *
 */
class ScLocation {
    public $name;
}

class ScRoom {
    public $name;
}

class ScGuest {
    public $name;
}


class ScEvent {
    public $name;
    public $description;
    public $email;
    public $phone;
}

class ScAppointment {
    public $id;
    public $startDate;
    public $endDate;
    public $location;
    public $room;
    public $guest;
    public $event;
}
