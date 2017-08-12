<?php 

class Contact {

	private $id = null;
	private $email = null;
	private $userId = null;
	private $password = null;
	private $firstName = null;
	private $lastName = null;
	private $street = null;
	private $city = null;
	private $stateId = null;
	private $zip = null;
	private $phone = null;
	private $longitude = null;
	private $latitude = null;
	private $contactTypeId = null;
	private $dateCreated = null;
	private $dmlDate = null;

	function __construct(){
	}

	public static function createFullContact($id, $email, $userId, $password, $firstName, $lastName, $street, $city, $stateId, $zip, 
			$phone, $longitude, $latitude, $contactTypeId, $dateCreated, $dmlDate){
		$initializedContact = new Contact();
		$initializedContact->setId($id);
		$initializedContact->setEmail($email);
		$initializedContact->setUserId($userId);
		$initializedContact->setPassword($password);
		$initializedContact->setFirstName($firstName);
		$initializedContact->setLastName($lastName);
		$initializedContact->setStreet($street);
		$initializedContact->setCity($city);
		$initializedContact->setStateId($stateId);
		$initializedContact->setZip($zip);
		$initializedContact->setPhone($phone);
		$initializedContact->setLongitude($longitude);
		$initializedContact->setLatitude($latitude);
		$initializedContact->setContactTypeId($contactTypeId);
		$initializedContact->setDateCreated($dateCreated);
		$initializedContact->setDmlDate($dmlDate);
		return $initializedContact;
	}

	function getId() {
		return $this->id;
	}

	function setId($id) {
		$this->id = $id;
	}

	function getEmail() {
		return $this->email;
	}

	function setEmail($email) {
		$this->email = $email;
	}

	function getUserId() {
		return $this->userId;
	}

	function setUserId($userId) {
		$this->userId = $userId;
	}

	function getPassword() {
		return $this->password;
	}

	function setPassword($password) {
		$this->password = $password;
	}

	function getFirstName() {
		return $this->firstName;
	}

	function setFirstName($firstName) {
		$this->firstName = $firstName;
	}

	function getLastName() {
		return $this->lastName;
	}

	function setLastName($lastName) {
		$this->lastName = $lastName;
	}

	function getStreet() {
		return $this->street;
	}

	function setStreet($street) {
		$this->street = $street;
	}

	function getCity() {
		return $this->city;
	}

	function setCity($city) {
		$this->city = $city;
	}

	function getStateId() {
		return $this->stateId;
	}

	function setStateId($stateId) {
		$this->stateId = $stateId;
	}

	function getZip() {
		return $this->zip;
	}

	function setZip($zip) {
		$this->zip = $zip;
	}

	function getPhone() {
		return $this->phone;
	}

	function setPhone($phone) {
		$this->phone = $phone;
	}

	function getLongitude() {
		return $this->longitude;
	}

	function setLongitude($longitude) {
		$this->longitude = $longitude;
	}

	function getLatitude() {
		return $this->latitude;
	}

	function setLatitude($latitude) {
		$this->latitude = $latitude;
	}

	function getContactTypeId() {
		return $this->contactTypeId;
	}

	function setContactTypeId($contactTypeId) {
		$this->contactTypeId = $contactTypeId;
	}

	function getDateCreated() {
		return $this->dateCreated;
	}

	function setDateCreated($dateCreated) {
		$this->dateCreated = $dateCreated;
	}

	function getDmlDate() {
		return $this->dmlDate;
	}

	function setDmlDate($dmlDate) {
		$this->dmlDate = $dmlDate;
	}
}

$domainContact = Contact::createFullContact(null, null, null, null, "Sheraz", null, null, null, null, null, null, null, null, null, null, null);

echo "working";

echo $domainContact->getFirstName();
$domainContact->setFirstName("Tariq");
echo $domainContact->getFirstName();

?>