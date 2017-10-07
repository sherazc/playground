import BaseDao from "./BaseDao";

export default class EmployeeDao extends BaseDao {
    findAll(employeeProcessor) {
        let connection = super.connect();
        connection.query('select id, name, salary from employee', (error, employees) => {
            employeeProcessor(employees);
            super.endConnection(connection);
         });
    }
}