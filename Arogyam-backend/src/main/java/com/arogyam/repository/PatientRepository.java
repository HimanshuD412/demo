package com.arogyam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arogyam.entities.Patient;

public interface PatientRepository extends JpaRepository<Patient, String> {

    // find patient by assigned doctor
    List<Patient> findByDoctor_Eid(String doctorId);

    // search by mobile
    Patient findByMobileno(Long mobileno);

    // search by email
    Patient findByEmailID(String emailID);
    boolean existsByDoctor_Eid(String eid);

}
