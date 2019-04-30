import java.util.ArrayList;
import java.util.List;

public class EmployeeService {
  public List<Employee> findAll() {
    List<Employee> employees = new ArrayList<>();
    employees.add(new Employee(100L, "Emp100", 1000D));
    employees.add(new Employee(200L, "Emp200", 2000D));
    employees.add(new Employee(300L, "Emp300", 3000D));
    employees.add(new Employee(400L, "Emp400", 4000D));
    return employees;
  }
}