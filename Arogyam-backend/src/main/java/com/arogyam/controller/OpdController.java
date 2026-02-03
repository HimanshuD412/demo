package com.arogyam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arogyam.dto.OpdDTO;
import com.arogyam.entities.Opd;
import com.arogyam.service.OpdService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/opd")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OpdController {

    private final OpdService opdService;

    // ==========================
    // CREATE OPD (Receptionist)
    // ==========================
    @PostMapping
    public ResponseEntity<Opd> createOpd(@RequestBody Opd opd) {
        return ResponseEntity.ok(opdService.createOpd(opd));
    }

    // ==========================
    // GET ALL PENDING OPD (Admin/Receptionist)
    // ==========================
    @GetMapping("/pending")
    public ResponseEntity<List<OpdDTO>> getAllPendingOpd() {

        List<OpdDTO> list = opdService.getAllPendingOpd()
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
    // UPDATE OPD STATUS
    // ==========================
    @PatchMapping("/{opdid}/status/{status}")
    public ResponseEntity<Opd> updateStatus(
            @PathVariable Integer opdid,
            @PathVariable Integer status) {

        return ResponseEntity.ok(opdService.updateOpdStatus(opdid, status));
    }

    // ==========================
    // DELETE OPD
    // ==========================
    @DeleteMapping("/{opdid}")
    public ResponseEntity<String> deleteOpd(@PathVariable Integer opdid) {
        opdService.deleteOpd(opdid);
        return ResponseEntity.ok("OPD deleted successfully");
    }
}
