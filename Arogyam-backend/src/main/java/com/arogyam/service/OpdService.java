package com.arogyam.service;

import java.util.List;

import com.arogyam.dto.PatientPrescriptionDTO;
import com.arogyam.entities.Opd;
import com.arogyam.entities.OpdDetails;

public interface OpdService {

    Opd createOpd(Opd opd);

    List<Opd> getDoctorQueue(String doctorId);

    List<Opd> getPatientHistory(String pid);
    
    List<PatientPrescriptionDTO> getPatientPrescriptionHistory(String pid);


    List<Opd> getAllPendingOpd();

    Opd updateOpdStatus(Integer opdid, Integer status);

    void deleteOpd(Integer opdid);

    OpdDetails saveOpdDetails(Integer opdid, OpdDetails details);
}
