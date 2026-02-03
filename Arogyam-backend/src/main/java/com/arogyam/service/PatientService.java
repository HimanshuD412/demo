package com.arogyam.service;

import java.util.List;

import com.arogyam.entities.Patient;

public interface PatientService {

    Patient addPatient(Patient patient);

    Patient updatePatient(Patient patient);

    Patient getPatientById(String pid);

    List<Patient> getAllPatients();

    List<Patient> getPatientsByDoctor(String doctorId);

    void deletePatient(String pid);
}
