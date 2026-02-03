package com.arogyam.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arogyam.repository.EmployeeRepository;
import com.arogyam.repository.OpdDetailsRepository;
import com.arogyam.repository.PatientRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final EmployeeRepository employeeRepository;
    private final PatientRepository patientRepository;
    private final OpdDetailsRepository opdDetailsRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("doctors", employeeRepository.findByRoleAndStatus("doctor", 1).size());
        stats.put("patients", patientRepository.count());
        stats.put("employees", employeeRepository.findByStatus(1).size());
        stats.put("income", opdDetailsRepository.findAll()
                .stream()
                .mapToInt(d -> Integer.parseInt(d.getFees()))
                .sum());

        return ResponseEntity.ok(stats);
    }
}
