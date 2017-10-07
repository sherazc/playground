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
}