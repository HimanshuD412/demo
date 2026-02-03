package com.arogyam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arogyam.entities.OpdDetails;

public interface OpdDetailsRepository extends JpaRepository<OpdDetails, Integer> {

    // find details by OPD id
    OpdDetails findByOpd_Opdid(Integer opdid);
}
