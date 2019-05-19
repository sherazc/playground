package com.sc.project02;

public class App {
  public static void main(String[] args) {
    EmployeesDao employeesDao = new EmployeesDao();
    employeesDao.getAllEmployeeNames().forEach(System.out::println);
  }
}
