package com.arogyam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arogyam.dto.OpdDTO;
import com.arogyam.dto.PatientPrescriptionDTO;
import com.arogyam.entities.OpdDetails;
import com.arogyam.service.OpdDetailsService;
import com.arogyam.service.OpdService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    private final OpdService opdService;
    private final OpdDetailsService opdDetailsService;

    // ==========================
    // GET DOCTOR OPD QUEUE
    // ==========================
    @GetMapping("/queue/{doctorId}")
    public ResponseEntity<List<OpdDTO>> getDoctorQueue(@PathVariable String doctorId) {

        List<OpdDTO> list = opdService.getDoctorQueue(doctorId)
                .stream()
                .map(opd -> {
                    OpdDTO dto = new OpdDTO();
                    dto.setOpdid(opd.getOpdid());
                    dto.setVisitdate(opd.getVisitdate());
                    dto.setPatientId(opd.getPatient().getPid());
                    dto.setDoctorId(opd.getDoctor().getEid());
                    dto.setStatus(opd.getStatus());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(list);
    }


    // ==========================
    // GET PATIENT HISTORY
    // ==========================
    @GetMapping("/history/{pid}")
    public ResponseEntity<List<OpdDTO>> getPatientHistory(@PathVariable String pid) {

        List<OpdDTO> list = opdService.getPatientHistory(pid)
                .stream()
                .map(opd -> {
                    OpdDTO dto = new OpdDTO();
                    dto.setOpdid(opd.getOpdid());
                    dto.setVisitdate(opd.getVisitdate());
                    dto.setPatientId(opd.getPatient().getPid());
                    dto.setDoctorId(opd.getDoctor().getEid());
                    dto.setStatus(opd.getStatus());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(list);
    }


    // ==========================
    // SAVE PRESCRIPTION (OPD DETAILS)
    // ==========================
    @PostMapping("/prescription/{opdid}")
    public ResponseEntity<OpdDetails> savePrescription(
            @PathVariable Integer opdid,
            @Valid @RequestBody OpdDetails details) {

        return ResponseEntity.ok(opdService.saveOpdDetails(opdid, details));
    }

    // ==========================
    // UPDATE PRESCRIPTION
    // ==========================
    @PutMapping("/prescription")
    public ResponseEntity<OpdDetails> updatePrescription(@Valid @RequestBody OpdDetails details) {
        return ResponseEntity.ok(opdDetailsService.updateDetails(details));
    }
    
 // ==========================
 // PATIENT VIEW OWN PRESCRIPTION (DTO)
 // ==========================
 @GetMapping("/patient/history/{pid}")
 public ResponseEntity<List<PatientPrescriptionDTO>> getPatientHistoryForPatient(
         @PathVariable String pid) {

     return ResponseEntity.ok(
         opdService.getPatientPrescriptionHistory(pid)
     );
 }


}
