<?php

class HomeController extends CI_Controller {

    public function index() {
        $this->load->view("home");
    }
}