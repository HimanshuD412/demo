package com.arogyam.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.arogyam.custom_exceptions.ResourceNotFoundException;
import com.arogyam.entities.Login;
import com.arogyam.entities.Patient;
import com.arogyam.repository.LoginRepository;
import com.arogyam.repository.PatientRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public Patient addPatient(Patient patient) {

        if (patient.getPid() == null || !patient.getPid().startsWith("P")) {
            throw new RuntimeException("Patient ID must start with P");
        }

        if (patient.getPassword() == null || patient.getPassword().isBlank()) {
            throw new RuntimeException("Password required");
        }

        if (patient.getMobileno() == null) {
            throw new RuntimeException("Mobile number required");
        }

        Patient saved = patientRepository.save(patient);

        Login login = new Login();
        login.setUsername(saved.getPid());
        login.setPassword(passwordEncoder.encode(patient.getPassword()));

        login.setRole("patient");

        loginRepository.save(login);

        return saved;
    }


    @Override
    public Patient updatePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient getPatientById(String pid) {
        return patientRepository.findById(pid)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found: " + pid));
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public List<Patient> getPatientsByDoctor(String doctorId) {
        return patientRepository.findByDoctor_Eid(doctorId);
    }

    @Override
    public void deletePatient(String pid) {

        if (!patientRepository.existsById(pid)) {
            throw new ResourceNotFoundException("Patient not found: " + pid);
        }

        // 1. Delete login
        loginRepository.deleteById(pid);

        // 2. Delete patient
        patientRepository.deleteById(pid);
    }
}
