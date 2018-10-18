<!doctype html>
<html lang="en">
<head>
    <title>ICNA Register</title>
    <?php include_once 'common_html_head.php' ?>
    <?php include_once 'authenticate.php' ?>
</head>
<body>
<?php include_once 'header.php'?>
<div class="container">
    <div class="row">
        <div class="col-sm-6">
            <h3>Register</h3>
            <form method="post" action="register_submit.php">

                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" name="email" id="email"
                           aria-describedby="emailHelp" placeholder="Enter email" required/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                        anyone else.
                    </small>
                </div>

                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" class="form-control" name="firstName" id="firstName"
                           placeholder="First Name" required/>
                </div>

                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" class="form-control" name="lastName" id="lastName"
                           placeholder="Last Name" required/>
                </div>

                <div class="form-group">
                    <label for="street">Street</label>
                    <input type="text" class="form-control" name="street" id="street"
                           placeholder="Street" required/>
                </div>


                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" name="city" id="city"
                           placeholder="City" required/>
                </div>

<?php include_once "components/register/states.php"?>

                <div class="form-group">
                    <label for="zip">Zip</label>
                    <input type="text" class="form-control" name="zip" id="zip"
                           placeholder="Zip" required/>
                </div>
<hr style="border: 5px solid black"/>

<?php include_once "components/register/chapterRegion.php"?>

                <div class="form-group">
                    <label for="state">Event Start</label>
                    <div class="input-group date" id="eventStartPicker" data-target-input="nearest">
                        <input type="text" id="eventStart" name="eventStart" class="form-control datetimepicker-input" data-target="#eventStartPicker"/>
                        <div class="input-group-append" data-target="#eventStartPicker" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <script type="text/javascript">
                    $(function () {
                        $('#eventStartPicker').datetimepicker();
                    });
                </script>

                <div class="form-group">
                    <label for="state">Event End</label>
                    <div class="input-group date" id="eventEndPicker" data-target-input="nearest">
                        <input type="text" id="eventEnd" name="eventEnd" class="form-control datetimepicker-input" data-target="#eventEndPicker"/>
                        <div class="input-group-append" data-target="#eventEndPicker" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <script type="text/javascript">
                    $(function () {
                        $('#eventEndPicker').datetimepicker();
                    });
                </script>
<?php include_once "components/register/categoryType.php"?>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="description" required placeholder="Description"></textarea>
                </div>

                <div class="form-group">
                    <label for="attendance">Attendance</label>
                    <input type="number" class="form-control" name="attendance" id="attendance"
                           placeholder="Attendance" required/>
                </div>

<?php include_once "components/register/servings.php"?>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
<?php include_once 'footer.php'?>
</body>
</html>