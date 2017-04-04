<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CI - Login</title>
</head>
<body>
<div id="container">
    <h1>Login</h1>
    <!--
    Helper function to create form element
    If we dont give any arguments then action will be current page's URL
    All the form functions are available to us because we loaded form library
    $autoload['helper'] = array('form', 'url');

    "main/login_validation" is our controllerName/functionName
    -->
    <?php echo form_open("main/login_validation"); ?>
    <p>
        <!-- validation_errors(): returns all the validation errors
        This method is part of the "form" helper not part of "form_validation"
        Important: Form helper was loaded in autoload.php by doing $autoload['helper'] = array('form', 'url');
        -->
        <?php echo validation_errors(); ?>
    </p>
    <p>Email:
        <!-- Helper function to create simple form input, arg1= field name, arg2=field value -->
        <?php echo form_input("email"); ?>
    </p>
    <p>Password:
        <!-- Helper function to create password input -->
        <?php echo form_password("password"); ?>
    </p>
    <p>
        <!-- Helper function to create submit button, arg1= field name, arg2=field value -->
        <?php echo form_submit("login_submit", "submit"); ?>
    </p>
    <?php echo form_close(); ?>
    <a href="<?php echo base_url()?>main/signup">Sign up</a>
</div>
</body>
</html>