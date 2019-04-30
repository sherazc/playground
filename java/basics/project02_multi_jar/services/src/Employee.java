public class Employee {
  private Long id;
  private String name;
  private Double salary;

  public Employee() {
  }

  public Employee(Long id, String name, Double salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Double getSalary() {
    return salary;
  }

  public void setSalary(Double salary) {
    this.salary = salary;
  }
}