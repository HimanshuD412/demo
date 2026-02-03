package com.arogyam.service;

import com.arogyam.entities.OpdDetails;

public interface OpdDetailsService {

    OpdDetails getDetailsByOpdId(Integer opdid);

    OpdDetails updateDetails(OpdDetails details);
}
