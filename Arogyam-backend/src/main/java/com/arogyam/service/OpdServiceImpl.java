package com.arogyam.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arogyam.custom_exceptions.ResourceNotFoundException;
import com.arogyam.dto.PatientPrescriptionDTO;
import com.arogyam.entities.Opd;
import com.arogyam.entities.OpdDetails;
import com.arogyam.repository.OpdDetailsRepository;
import com.arogyam.repository.OpdRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OpdServiceImpl implements OpdService {

    private final OpdRepository opdRepository;
    private final OpdDetailsRepository opdDetailsRepository;

    @Override
    public Opd createOpd(Opd opd) {
        opd.setStatus(0); // 0 = pending
        return opdRepository.save(opd);
    }

    @Override
    public List<Opd> getDoctorQueue(String doctorId) {
        return opdRepository.findByDoctor_EidAndStatus(doctorId, 0);
    }

    @Override
    public List<Opd> getPatientHistory(String pid) {
        return opdRepository.findByPatient_Pid(pid);
    }
    
    @Override
    public List<PatientPrescriptionDTO> getPatientPrescriptionHistory(String pid) {

        List<Opd> opds = opdRepository.findByPatient_Pid(pid);

        return opds.stream().map(opd -> {

            OpdDetails d = opd.getOpdDetails();

            return new PatientPrescriptionDTO(
                opd.getOpdid(),
                String.valueOf(opd.getVisitdate()),
                opd.getStatus(),

                d != null ? d.getSymptoms() : null,
                d != null ? d.getDiagnosis() : null,
                d != null ? d.getMedicinesDose() : null,
                d != null ? d.getDos() : null,
                d != null ? d.getDonts() : null,
                d != null ? d.getInvestigations() : null,
                d != null ? d.getFollowupDate() : null,
                d != null ? d.getFees() : null
            );
        }).toList();
    }


    @Override
    public List<Opd> getAllPendingOpd() {
        return opdRepository.findByStatus(0);
    }

    @Override
    public Opd updateOpdStatus(Integer opdid, Integer status) {
        Opd opd = opdRepository.findById(opdid)
                .orElseThrow(() -> new ResourceNotFoundException("OPD not found: " + opdid));
        opd.setStatus(status);
        return opdRepository.save(opd);
    }

    @Override
    public void deleteOpd(Integer opdid) {
        opdRepository.deleteById(opdid);
    }

    @Override
    public OpdDetails saveOpdDetails(Integer opdid, OpdDetails details) {

        // ✅ validation (MOST IMPORTANT)
        if (
            details.getSymptoms() == null || details.getSymptoms().isBlank() ||
            details.getDiagnosis() == null || details.getDiagnosis().isBlank() ||
            details.getMedicinesDose() == null || details.getMedicinesDose().isBlank() ||
            details.getDos() == null || details.getDos().isBlank() ||
            details.getDonts() == null || details.getDonts().isBlank() ||
            details.getInvestigations() == null || details.getInvestigations().isBlank() ||
            details.getFollowupDate() == null || details.getFollowupDate().isBlank() ||
            details.getFees() == null || details.getFees().isBlank()
        ) {
            throw new RuntimeException("All prescription fields are mandatory");
        }

        Opd opd = opdRepository.findById(opdid)
                .orElseThrow(() -> new ResourceNotFoundException("OPD not found"));

        OpdDetails existing = opdDetailsRepository.findByOpd_Opdid(opdid);

        OpdDetails saved;

        if (existing != null) {
            existing.setSymptoms(details.getSymptoms());
            existing.setDiagnosis(details.getDiagnosis());
            existing.setMedicinesDose(details.getMedicinesDose());
            existing.setDos(details.getDos());
            existing.setDonts(details.getDonts());
            existing.setInvestigations(details.getInvestigations());
            existing.setFollowupDate(details.getFollowupDate());
            existing.setFees(details.getFees());
            saved = opdDetailsRepository.save(existing);
        } else {
            details.setOpd(opd);
            saved = opdDetailsRepository.save(details);
        }

        opd.setStatus(1);
        opdRepository.save(opd);

        return saved;
    }
    
    
}
