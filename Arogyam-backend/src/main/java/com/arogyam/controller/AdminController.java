package com.arogyam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arogyam.dto.EmployeeDTO;
import com.arogyam.entities.Employee;
import com.arogyam.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final EmployeeService employeeService;

    // ==========================
    // ADD EMPLOYEE
    // ==========================
    @PostMapping("/employees")
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.addEmployee(employee));
    }

    // ==========================
    // UPDATE EMPLOYEE
    // ==========================
    @PutMapping("/employees")
    public ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.updateEmployee(employee));
    }

    // ==========================
    // GET ALL EMPLOYEES
    // ==========================
    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {

        List<EmployeeDTO> list = employeeService.getAllEmployees()
                .stream()
                .map(emp -> {
                    EmployeeDTO dto = new EmployeeDTO();
                    dto.setEid(emp.getEid());
                    dto.setFirstName(emp.getName().getFirstName());
                    dto.setLastName(emp.getName().getLastName());
                    dto.setRole(emp.getRole());
                    dto.setStatus(emp.getStatus());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(list);
    }


    // ==========================
    // GET DOCTORS
    // ==========================
    @GetMapping("/employees/doctors")
    public ResponseEntity<List<Employee>> getDoctors() {
        return ResponseEntity.ok(employeeService.getDoctors());
    }

    // ==========================
    // GET EMPLOYEE BY ID
    // ==========================
    @GetMapping("/employees/{eid}")
    public ResponseEntity<Employee> getEmployee(@PathVariable String eid) {
        return ResponseEntity.ok(employeeService.getEmployeeById(eid));
    }

    // ==========================
    // ACTIVATE / DEACTIVATE
    // ==========================
    @PatchMapping("/employees/{eid}/status/{status}")
    public ResponseEntity<Employee> changeStatus(
            @PathVariable String eid,
            @PathVariable Integer status) {

        return ResponseEntity.ok(employeeService.changeStatus(eid, status));
    }

    // ==========================
    // DELETE EMPLOYEE
    // ==========================
    @DeleteMapping("/employees/{eid}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String eid) {
        employeeService.deleteEmployee(eid);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}
