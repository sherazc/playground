<?php require $_SERVER["DOCUMENT_ROOT"]."/icnaclinic_contextpath.php"; ?>
<?php require_once $docContext.'/services/util/basic_utils.php';?>
<?php require $docContext.'/services/form_validation.php';?>
<?php require $docContext.'/services/contactDao.php';?>
<?php require $docContext.'/components/sub_page_begin.php';?>
<div id="container" class="hfeed">
<?php require $docContext.'/components/sub_page_header.php';?>

<?php 

$registerFormName = "registerForm";


$fName = getRequestParam("fName");
$lName = getRequestParam("lName");
$userId = getRequestParam("userId");
$password = getRequestParam("password");
$reenterPassword = getRequestParam("reenterPassword");
$email = getRequestParam("email");
$address = getRequestParam("address");
$city = getRequestParam("city");
$zipCode = getRequestParam("zipCode");
$phone = getRequestParam("phone");
$accountType = getRequestParam("accountType");
$state = getRequestParam("state");

if(getRequestParam('submitRegister') == "Register") {
	addErrorIfEmpty($registerFormName, "fName", "First Name");
	addErrorIfEmpty($registerFormName, "lName", "Last Name");
	addErrorIfEmpty($registerFormName, "userId", "User Id");
	addErrorIfEmpty($registerFormName, "password", "Password");
	addErrorIfEmpty($registerFormName, "reenterPassword", "Reenter Password");
	addErrorIfEmpty($registerFormName, "email", "Email");
	addErrorIfEmpty($registerFormName, "address", "Address");
	addErrorIfEmpty($registerFormName, "city", "City");
	addErrorIfEmpty($registerFormName, "zipCode", "Zip Code");
	addErrorIfEmpty($registerFormName, "phone", "Phone");
	
	
	$successfullyRegistered = false;
	if (!formHasErrors($registerFormName)) {
		$successfullyRegistered = addUser(null, $email, $userId, $password, $fName, $lName, $address, $city, $state, $zipCode, $phone, null, null, $accountType);
	}
	
	
}




?>

<div id="wrapper" class="clearfix">

<form action="./register.php" name="<?= $registerFormName ?>" method="post">
<div id="content">

<h3 class="post-title">Register</h3>
<?php defaultPrintFormErrorMessages($registerFormName); ?>
<table border="1" style="width: 400px;">
	<tr>
		<td>
		First Name
		</td>
		<td>
			<input id="fName" name="fName" class="<?= getErrorMessage($registerFormName, "fName") ? "fieldError" : "" ?>" value="<?= $fName ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		Last Name
		</td>
		<td>
			<input id="lName" name="lName" class="<?= getErrorMessage($registerFormName, "lName") ? "fieldError" : "" ?>" value="<?= $lName ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		User Id
		</td>
		<td>
			<input id="userId" name="userId" class="<?= getErrorMessage($registerFormName, "userId") ? "fieldError" : "" ?>" value="<?= $userId ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		Password
		</td>
		<td>
			<input id="password" name="password" class="<?= getErrorMessage($registerFormName, "password") ? "fieldError" : "" ?>" value="<?= $password ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		Reenter Password
		</td>
		<td>
			<input id="reenterPassword" name="reenterPassword" class="<?= getErrorMessage($registerFormName, "reenterPassword") ? "fieldError" : "" ?>" value="<?= $reenterPassword ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		Email
		</td>
		<td>
			<input id="email" name="email" class="<?= getErrorMessage($registerFormName, "email") ? "fieldError" : "" ?>" value="<?= $email ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		Account Type
		</td>
		<td>
			<select id="accountType" name="accountType">
				<option value="100">Physician</option>
				<option value="200">Patient</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>
		Address
		</td>
		<td>
			<input id="address" name="address" class="<?= getErrorMessage($registerFormName, "address") ? "fieldError" : "" ?>" value="<?= $address ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		City
		</td>
		<td>
			<input id="city" name="city" class="<?= getErrorMessage($registerFormName, "city") ? "fieldError" : "" ?>" value="<?= $city ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		State
		</td>
		<td>
			<select id="state" name="state">
				<option value="GA">Georgia</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>
		Zip Code
		</td>
		<td>
			<input id="zipCode" name="zipCode" class="<?= getErrorMessage($registerFormName, "zipCode") ? "fieldError" : "" ?>" value="<?= $zipCode ?>" />
		</td>
	</tr>
	<tr>
		<td>
		Phone
		</td>
		<td>
			<input id="phone" name="phone" class="<?= getErrorMessage($registerFormName, "phone") ? "fieldError" : "" ?>" value="<?= $phone ?>"/>
		</td>
	</tr>
	<tr>
		<td>
		<input id="submitRegister" name="submitRegister" type="submit" value="Register"/>
		</td>
		<td>
			
		</td>
	</tr>
</table>
</div>
</form>
</div>
<!-- end of #wrapper -->
</div>
<!-- end of #container -->
<?php require $docContext.'/components/main_footer.php';?>
<?php require $docContext.'/components/main_page_end.php';?>