<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CI - Sign up</title>
</head>
<body>
<div id="container">
    <h1>Sign up</h1>
    <?php echo form_open("main/signup_validation") ?>
    <div style="color: red;">
        <p>
            <?php echo validation_errors(); ?>
        </p>
    </div>
    <p>
        Email:
        <!--
        Here $this->input->post('email') will act as form backing
        object/command object in spring
        -->
        <?php echo form_input("email", $this->input->post('email')); ?>
    </p>
    <p>
        Password:
        <?php echo form_password("password"); ?>
    </p>
    <p>
        Confirm Password:
        <?php echo form_password("cpassword"); ?>
    </p>
    <p>
        Send Confirmation Email:
<!--
    form_checkbox() builds checkbox
    arg1: parameter name
    arg2: checkbox value
    arg3: TRUE or FALSE, checked by default or not
 -->
        <?php echo form_checkbox("cemail", "1", TRUE); ?>
    </p>
    <p>
        <?php echo form_submit("signup_submit", "Sign Up"); ?>
    </p>
    <?php echo form_close() ?>
    <a href="<?php echo base_url()?>main/login">Back to Login</a>
</div>
</body>
</html>