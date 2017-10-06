class EmployeeController {
    addEmployee (request, response) {
        response.render('add-employee', { title: 'Add Employee' });
    }

    addEmployeeConfirm (request, response) {
        response.render('add-employee-confirm', { title: 'Add Employee Confirm' });
    }

    listEmployees (request, response) {
        response.render('list-employees', { title: 'All Employees' });
    }

    deleteEmployee (request, response) {
        response.render('delete-employee', { title: 'Employee Deleted' });
    }
}

export default EmployeeController;