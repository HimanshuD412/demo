package com.arogyam.service;

import java.util.List;

import com.arogyam.entities.Employee;

public interface EmployeeService {

    Employee addEmployee(Employee employee);

    Employee updateEmployee(Employee employee);

    Employee getEmployeeById(String eid);

    List<Employee> getAllEmployees();

    List<Employee> getActiveEmployees();

    List<Employee> getDoctors();

    void deleteEmployee(String eid);

    Employee changeStatus(String eid, Integer status);
}
