import java.util.List;

public class App {
    public static void main(String args[]) {
        System.out.println("Running App");
        EmployeeService employeeService = new EmployeeService();

        List<Employee> employees = employeeService.findAll();

        for (Employee employee: employees) {
            System.out.println(employee.getName());
        }
    }
}