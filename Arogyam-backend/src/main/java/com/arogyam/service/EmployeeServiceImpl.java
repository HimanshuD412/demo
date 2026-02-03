package com.arogyam.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.arogyam.custom_exceptions.ResourceNotFoundException;
import com.arogyam.entities.Employee;
import com.arogyam.entities.Login;
import com.arogyam.repository.EmployeeRepository;
import com.arogyam.repository.LoginRepository;
import com.arogyam.repository.OpdRepository;
import com.arogyam.repository.PatientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;


import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeRepository employeeRepository;
	private final LoginRepository loginRepository;
	private final OpdRepository opdRepository;
	private final PatientRepository patientRepository;
	private final PasswordEncoder passwordEncoder;


    

	@Override
	public Employee addEmployee(Employee employee) {

	    if (employee.getEid() == null || !employee.getEid().startsWith("EMP")) {
	        throw new RuntimeException("Employee ID must start with EMP");
	    }

	    if (employee.getPassword() == null || employee.getPassword().isBlank()) {
	        throw new RuntimeException("Password is mandatory");
	    }

	    if (employee.getJoiningDate() == null) {
	        throw new RuntimeException("Joining date required");
	    }

	    if (employee.getEmailID() == null || employee.getEmailID().isBlank()) {
	        throw new RuntimeException("Email required");
	    }

	    if (employee.getMobileno() == null) {
	        throw new RuntimeException("Mobile number required");
	    }

	    if (employee.getRole() == null || employee.getRole().isBlank()) {
	        throw new RuntimeException("Role is required");
	    }

	    Employee savedEmployee = employeeRepository.save(employee);

	    Login login = new Login();
	    login.setUsername(savedEmployee.getEid());
	    login.setPassword(passwordEncoder.encode(employee.getPassword()));

	    login.setRole(savedEmployee.getRole());
	    login.setEmployee(savedEmployee);

	    loginRepository.save(login);

	    return savedEmployee;
	}


    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee getEmployeeById(String eid) {
        return employeeRepository.findById(eid)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + eid));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Employee> getActiveEmployees() {
        return employeeRepository.findByStatus(1);
    }

    @Override
    public List<Employee> getDoctors() {
        return employeeRepository.findByRoleAndStatus("doctor", 1);
    }

    @Override
    public void deleteEmployee(String eid) {

        Employee emp = employeeRepository.findById(eid)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        // ==============================
        // 1. PREVENT LAST ADMIN DELETION
        // ==============================
        if ("administrator".equals(emp.getRole())) {
            long adminCount = employeeRepository.countByRoleAndStatus("administrator", 1);

            if (adminCount <= 1) {
                throw new RuntimeException("Cannot delete last administrator");
            }
        }

        // ==============================
        // 2. NORMAL DELETE LOGIC
        // ==============================
        boolean usedInOpd = opdRepository.existsByDoctor_Eid(eid);
        boolean usedInPatient = patientRepository.existsByDoctor_Eid(eid);

        if (usedInOpd || usedInPatient) {
            emp.setStatus(0); // soft delete
            employeeRepository.save(emp);
            loginRepository.deleteByEmployee_Eid(eid);
        } else {
            loginRepository.deleteByEmployee_Eid(eid);
            employeeRepository.deleteById(eid);
        }
    }




    @Override
    public Employee changeStatus(String eid, Integer status) {
        Employee emp = getEmployeeById(eid);
        emp.setStatus(status);
        return employeeRepository.save(emp);
    }
}
