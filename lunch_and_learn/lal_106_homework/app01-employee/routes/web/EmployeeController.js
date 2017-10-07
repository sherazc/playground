import viewAttributesComposer from "./utils/viewAttributesComposer";
import EmployeeDao from "../model/EmployeeDao";

let employeeDao = new EmployeeDao();

class EmployeeController {
    addEmployee (request, response) {
        response.render('add-employee', viewAttributesComposer('Add Employee', {}));
    }

    addEmployeeConfirm (request, response) {
        
        // employeeDao.addEmployee(request.body.name, request.body.salary, (name, salary) => {
        //     response.render('add-employee-confirm', viewAttributesComposer('Add Employee Confirm', {name, salary}));
        // });

        response.render('add-employee-confirm', viewAttributesComposer('Add Employee Confirm', {}));
    }

    listEmployees (request, response) {
        employeeDao.findAll((employees) => {
            response.render('list-employees', viewAttributesComposer('All Employees', {employees}));
        });
    }

    deleteEmployee (request, response) {
        employeeDao.deleteById(request.params.id, employeeId => response.render('delete-employee', 
                viewAttributesComposer('Employee Deleted', {"deletedEmployeeId": employeeId})
            ) 
        );
    }
}

export default EmployeeController;