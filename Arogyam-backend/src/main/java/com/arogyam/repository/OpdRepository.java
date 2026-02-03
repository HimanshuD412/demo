package com.arogyam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arogyam.entities.Opd;

public interface OpdRepository extends JpaRepository<Opd, Integer> {

    // OPD queue for doctor (status = 0 → pending)
    List<Opd> findByDoctor_EidAndStatus(String doctorId, Integer status);

    // OPD history of patient
    List<Opd> findByPatient_Pid(String pid);

    // All OPDs of a doctor
    List<Opd> findByDoctor_Eid(String doctorId);

    // Pending OPDs
    List<Opd> findByStatus(Integer status);
    
    boolean existsByDoctor_Eid(String eid);

}
