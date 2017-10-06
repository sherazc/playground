var express = require('express');
var router = express.Router();
import HomeController from "./web/HomeController";
import EmployeeController from "./web/EmployeeController";

let homeController = new HomeController();
let employeeController = new EmployeeController();

router.get('/', homeController.home);
router.get('/add', employeeController.addEmployee);
router.post('/add-confirm', employeeController.addEmployeeConfirm);
router.get('/list', employeeController.listEmployees);
router.get('/delete/:id', employeeController.deleteEmployee);

module.exports = router;
