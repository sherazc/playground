<?php

class Main extends CI_Controller {

    public function index() {
        $this->login();
    }

    public function login() {
        $this->load->view("login");
    }

    public function logout() {
        $this->session->sess_destroy();
        redirect("main/login");
    }

    public function members() {
        // Retrieve Session value
        $isUserLoggedIn = $this->session->userdata("is_logged_in");
        if ($isUserLoggedIn) {
            $this->load->view("members");
        } else {
            redirect("main/restricted");
        }
    }

    public function restricted() {
        $this->load->view("restricted");
    }

    public function login_validation() {
        // Manually loading form_validation library instead of loading in autoload.php
        $this->load->library('form_validation');

        /*
         * set_rules(): sets and load all the rules
         * arg1: parameter name
         * arg2: Title that will be displayed in error messages
         * arg3: validation rule list separated by |
         *
         * callback_methodName: To write custom rules. CI will look for "methodName" function in the same controller
         *
         * xss_clean should not be used for input validation as recomended in codeigniter 3.
         * A largely unknown rule about XSS cleaning is that it should only be applied to output, as opposed to input data.
         * http://stackoverflow.com/questions/28568871/codeigniter-3-unable-to-access-an-error-message
         * https://github.com/bcit-ci/CodeIgniter/blob/develop/user_guide_src/source/installation/upgrade_300.rst#step-13-check-for-usage-of-the-xss_clean-form-validation-rule
         *
         * And if, despite everything, you really need it, go to application/config/autoload.php :
         *
         * $autoload['helper'] = array('security');
         * Or, before your form validation
         * $this->load->helper('security');
         */
        $this->load->helper('security');

        /*
         * Complete list of form_validation rules
         *
         * https://www.codeigniter.com/userguide3/libraries/form_validation.html#rule-reference
         */
        $this->form_validation->set_rules("email", "Email", "required|trim|xss_clean|callback_validation_credentials");

        /*
         * use this URL to generate MD5 checksum
         *
         * http://www.miraclesalad.com/webtools/md5.php
         *
         * "md5" is a builtin function to validate MD5 checksum
         *
         */
        $this->form_validation->set_rules("password", "Password", "required|trim|md5");

        /*
         * $this->form_validation->run(): runs all the rules and return true on successful run.
         */
        if ($this->form_validation->run()) {
            $userData = array(
                "email" => $this->input->post("email"),
                "is_logged_in" => true
            );

            // this statement will append all $userData array values in the session
            $this->session->set_userdata($userData);

            redirect("main/members");
        } else {
            $this->login();
        }
    }


    public function validation_credentials() {
        // Loading model/service that will retrieve data from database.
        $this->load->model("model_users");

        if ($this->model_users->can_log_in()) {
            return true;
        } else {
            /*
             * set_message(): setting error message for current callback method/rule
             *
             * arg1: Callback name
             * arg2: Error message
             */
            $this->form_validation->set_message("validation_credentials", "Incorrect user/password");
            return false;
        }
    }

    public function signUp() {
        $this->load->view("signup");
    }

    public function signUp_validation() {
        $this->load->library('form_validation');
        /*
         * Complete list of form_validation rules
         *
         * https://www.codeigniter.com/userguide3/libraries/form_validation.html#rule-reference
         *
         * is_unique[TableName.FieldName] checks in database for unique value.
         */
        $this->form_validation->set_rules("email", "Email",
            "required|trim|valid_email|is_unique[users.email]");

        /*
         * Setting custom message on a rule.
         */
        $this->form_validation->set_message("is_unique", "Email is already registered.");


        $this->form_validation->set_rules("password", "Password", "required|trim");

        /*
         * matches[requestParameterName] rule matches itself against another another request parameter
         */
        $this->form_validation->set_rules("cpassword", "Confirm Password",
            "required|trim|matches[password]");

        if ($this->form_validation->run()) {
            $emailConfirmLink = $this->createEmailConfimLink();

            $sendConfirmEmail = $this->input->post("cemail");
            $email = $this->input->post("email");
            if ($sendConfirmEmail) {
                $this->sendConfirmationEmail($email, $emailConfirmLink);
            } else {
                // This how pass variable to the view.
                // Create array and pass it when loading a view.
                $viewData = array("emailConfirmLink" => $emailConfirmLink);
                $this->load->view("confirm_email_link", $viewData);
            }

        } else {
            //echo "You shall not pass!";
            $this->load->view("signup");
        }
    }

    public function confirm_email($registrationKey) {
        echo $registrationKey;
    }

    private function sendConfirmationEmail($toEmail, $emailConfirmLink) {

        $this->load->library("email", array("mailtype" => "html"));
        $this->email->from("admin@mycompany.com", "Sheraz");
        $this->email->to($toEmail);
        $this->email->subject("Confirm your email");

        $message = "<p>Thank you for signing up!</p>";
        $message .= "<p><a href=\"" . $emailConfirmLink . "\">Click here</a> to confirm your account</p>";

        $this->email->message($message);

        if ($this->email->send()) {
            echo "The email has been sent";
        } else {
            echo "Could not send email";
        }

    }

    private function createEmailConfimLink() {
        $random_unique_key = md5(uniqid());
        return base_url() . "/main/confirm_email/" . $random_unique_key;
    }
}