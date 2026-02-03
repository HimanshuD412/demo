package com.arogyam.service;

import org.springframework.stereotype.Service;

import com.arogyam.custom_exceptions.ResourceNotFoundException;
import com.arogyam.entities.OpdDetails;
import com.arogyam.repository.OpdDetailsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpdDetailsServiceImpl implements OpdDetailsService {

    private final OpdDetailsRepository opdDetailsRepository;

    @Override
    public OpdDetails getDetailsByOpdId(Integer opdid) {
    	OpdDetails details = opdDetailsRepository.findByOpd_Opdid(opdid);

    	if (details == null) {
    	    throw new ResourceNotFoundException("OPD details not found for OPD id: " + opdid);
    	}

    	return details;

    }

    @Override
    public OpdDetails updateDetails(OpdDetails details) {
        return opdDetailsRepository.save(details);
    }
}
