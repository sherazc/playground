<!doctype html>
<html lang="en">
<head>
    <title>ICNA EVENT TRACKER</title>
    <?php include_once 'common_html_head.php' ?>
    <?php include_once 'authenticate.php' ?>
</head>
<body>
<?php include_once 'header.php'?>
<?php

// $ds ='10/11/2018 10:48 PM';
// echo date('Y-m-d G:i:s', strtotime($ds));

?>


<div class="container">
    <div class="row">
        <div class="col-sm-6">
            <h3>Create Event</h3>
            <form method="post" action="event-tracker_submit.php">
                <div class="form-group">
                    <label for="eventName">Event Name</label>
                    <input type="text" class="form-control" name="eventName" id="eventName"
                           placeholder="Event Name" required/>
                </div>

<?php include_once "components/even-tracker/chapterRegion.php"?>
                <div class="form-group">
                    <label for="eventStart">Event Start</label>
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
                    <label for="eventEnd">Event End</label>
                    <div class="input-group date" id="eventEndPicker" data-target-input="nearest">
                        <input type="text" id="eventEnd" name="eventEnd" class="form-control datetimepicker-input" data-target="#eventEndPicker" />
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
<?php include_once "components/even-tracker/categoryType.php"?>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea rows="6" class="form-control" name="description" id="description" required placeholder="Description"></textarea>
                </div>

                <div class="form-group">
                    <label for="attendance">Attendance</label>
                    <input type="number" class="form-control" name="attendance" id="attendance"
                           placeholder="Attendance" required/>
                </div>

<?php include_once "components/even-tracker/servings.php"?>
<?php include_once "components/even-tracker/locationTypes.php"?>

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

                <?php include_once "components/even-tracker/states.php"?>

                <div class="form-group">
                    <label for="zip">Zip</label>
                    <input type="text" class="form-control" name="zip" id="zip"
                           placeholder="Zip" required/>
                </div>
<?php include_once "components/even-tracker/attendees.php"?>

                <div class="form-group">
                    <label for="eventInCharge">Event In-Charge</label>
                    <input type="text" class="form-control" name="eventInCharge" id="eventInCharge"
                           placeholder="Event In-Charge" required/>
                </div>

                <div class="form-group">
                    <label for="speakers">Speakers</label>
                    <textarea rows="6" class="form-control" name="speakers" id="speakers"
                              placeholder="Speakers" required></textarea>
                </div>
                <div class="form-group">
                    <label for="expense">Expense $</label>
                    <input type="number" class="form-control" name="expense" id="expense"
                           placeholder="Expense" required/>
                </div>


                <div class="form-group">
                    <label for="paidBy">Paid By</label>
                    <input type="text" class="form-control" name="paidBy" id="paidBy"
                           placeholder="Paid By" required/>
                </div>

                <div class="form-group">
                    <label for="income">Income $</label>
                    <input type="number" class="form-control" name="income" id="income"
                           placeholder="Income" required/>
                </div>

                <div class="form-group">
                    <label for="donation">In-kind Donation Amount $</label>
                    <input type="number" class="form-control" name="donation" id="donation"
                           placeholder="In-kind Donation Amount" required/>
                </div>

                <div class="form-group">
                    <label for="workers">Number of workers</label>
                    <input type="number" class="form-control" name="workers" id="workers"
                           placeholder="Number of workers" required/>
                </div>

                <div class="form-group">
                    <label for="volunteers">Number of Volunteers</label>
                    <input type="number" class="form-control" name="volunteers" id="volunteers"
                           placeholder="Number of Volunteers" required/>
                </div>

<?php include_once "components/even-tracker/rating.php"?>

                <div class="form-group">
                    <label for="issues">Issues</label>
                    <textarea rows="6" class="form-control" name="issues" id="issues" required placeholder="Issues"></textarea>
                </div>

                <div class="form-group">
                    <label for="comments">Comments</label>
                    <textarea rows="6" class="form-control" name="comments" id="comments" required placeholder="Comments"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
<?php include_once 'footer.php'?>
</body>
</html>