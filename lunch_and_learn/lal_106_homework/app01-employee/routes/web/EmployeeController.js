import viewAttributesComposer from "./utils/viewAttributesComposer";

class EmployeeController {
    addEmployee (request, response) {
        response.render('add-employee', viewAttributesComposer('Add Employee', {}));
    }

    addEmployeeConfirm (request, response) {
        response.render('add-employee-confirm', viewAttributesComposer('Add Employee Confirm', {}));
    }

    listEmployees (request, response) {
        response.render('list-employees', viewAttributesComposer('All Employees', {}));
    }

    deleteEmployee (request, response) {
        response.render('delete-employee', viewAttributesComposer('Employee Deleted', {}));
    }
}

export default EmployeeController;