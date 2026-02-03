package com.arogyam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arogyam.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    List<Employee> findByRole(String role);

    List<Employee> findByStatus(Integer status);

    List<Employee> findByRoleAndStatus(String role, Integer status);
    
    long countByRoleAndStatus(String role, Integer status);

}
