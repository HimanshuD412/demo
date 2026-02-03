package com.arogyam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arogyam.dto.PatientDTO;
import com.arogyam.entities.Patient;
import com.arogyam.service.PatientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/receptionist")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReceptionistController {

    private final PatientService patientService;

    // ==========================
    // REGISTER PATIENT
    // ==========================
    @PostMapping("/patients")
    public ResponseEntity<Patient> addPatient( @Valid @RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.addPatient(patient));
    }

    // ==========================
    // UPDATE PATIENT
    // ==========================
    @PutMapping("/patients")
    public ResponseEntity<Patient> updatePatient(@Valid @RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.updatePatient(patient));
    }

    // ==========================
    // GET ALL PATIENTS
    // ==========================
    @GetMapping("/patients")
    public ResponseEntity<List<PatientDTO>> getAllPatients() {

        List<PatientDTO> list = patientService.getAllPatients()
                .stream()
                .map(p -> {
                    PatientDTO dto = new PatientDTO();
                    dto.setPid(p.getPid());
                    dto.setFirstName(p.getName().getFirstName());
                    dto.setLastName(p.getName().getLastName());
                    dto.setMobileno(String.valueOf(p.getMobileno()));
                    dto.setDoctorId(
                            p.getDoctor() != null ? p.getDoctor().getEid() : null
                    );
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(list);
    }


    // ==========================
    // GET PATIENT BY ID
    // ==========================
    @GetMapping("/patients/{pid}")
    public ResponseEntity<Patient> getPatient(@PathVariable String pid) {
        return ResponseEntity.ok(patientService.getPatientById(pid));
    }

    // ==========================
    // GET PATIENTS BY DOCTOR
    // ==========================
    @GetMapping("/patients/doctor/{doctorId}")
    public ResponseEntity<List<Patient>> getPatientsByDoctor(@PathVariable String doctorId) {
        return ResponseEntity.ok(patientService.getPatientsByDoctor(doctorId));
    }

    // ==========================
    // DELETE PATIENT
    // ==========================
    @DeleteMapping("/patients/{pid}")
    public ResponseEntity<String> deletePatient(@PathVariable String pid) {
        patientService.deletePatient(pid);
        return ResponseEntity.ok("Patient deleted successfully");
    }
}
