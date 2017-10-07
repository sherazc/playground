import BaseDao from "./BaseDao";

export default class EmployeeDao extends BaseDao {
    findAll(employeeProcessor) {
        let connection = super.connect();
        connection.query('select id, name, salary from employee', (error, employees) => {
            employeeProcessor(employees);
            super.endConnection(connection);
         });
    }

    deleteById(employeeId, deleteEmployeeProcessor) {
        let connection = super.connect();
        connection.query('delete from employee where id=?', employeeId, (error, result) => {
            deleteEmployeeProcessor(employeeId);
            super.endConnection(connection);
         });
    }

    addEmployee(name, salary, addEmployeeProcessor) {
        let connection = super.connect();
        //connection.query('insert into employee set ?', {name: name, salary: salary}, (error, result) => {
        connection.query('insert into employee set ?', [{name}], (error, result) => {
            console.log(error);
            addEmployeeProcessor(name, salary);
            super.endConnection(connection);
         });
    }
}