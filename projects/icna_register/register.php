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

                <div class="form-group">
                    <label for="state">State</label>
                    <select class="form-control" name="state" id="state" required>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="zip">Zip</label>
                    <input type="text" class="form-control" name="zip" id="zip"
                           placeholder="Zip" required/>
                </div>
<hr style="border: 5px solid black"/>


                <div class="form-group">
                    <label for="state">Chapter/Region</label>
                    <select class="form-control" name="chapterRegion" id="chapterRegion" required>
                        <option></option>
                    </select>
                </div>

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
                <div class="form-group">
                    <label for="state">Category</label>
                    <select class="form-control" name="category" id="category" required>
                        <option></option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="state">Category Type</label>
                    <select class="form-control" name="categoryType" id="categoryType" required>
                        <option></option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="description" required placeholder="Description"></textarea>
                </div>

                <div class="form-group">
                    <label for="attendance">Attendance</label>
                    <input type="number" class="form-control" name="attendance" id="attendance"
                           placeholder="Attendance" required/>
                </div>


                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
<?php include_once 'scripts/collection/chapterRegion.php'?>
<?php include_once 'scripts/collection/categoryType.php'?>
<?php include_once 'footer.php'?>
</body>
</html>