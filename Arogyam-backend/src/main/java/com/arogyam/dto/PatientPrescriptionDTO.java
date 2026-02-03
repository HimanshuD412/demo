package com.arogyam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientPrescriptionDTO {

    private Integer opdid;
    private String visitdate;
    private Integer status;

    private String symptoms;
    private String diagnosis;
    private String medicinesDose;
    private String dos;
    private String donts;
    private String investigations;
    private String followupDate;
    private String fees;
}


