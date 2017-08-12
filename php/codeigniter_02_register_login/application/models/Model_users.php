<?php

class Model_users extends CI_Model {

    public function can_log_in() {

        // If we manually want to retrieve parameter values
        // echo $_POST["email"];

        // $this->input->post(): Codeigniter method to retrieve post parameters
        // echo $this->input->post("email");


        /*
         * use this URL to generate MD5 checksum
         *
         * http://www.miraclesalad.com/webtools/md5.php
         *
         * md5() function converts string to MD5 checksum
         */


        // Building SQL and retrieving results
        $this->db->where("email", $this->input->post("email"));
        $this->db->where("password", md5($this->input->post("password")));
        $results = $this->db->get("users");

        return $results->num_rows() > 0;
    }
}