package com.arogyam.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpdDTO {

    private Integer opdid;
    private LocalDate visitdate;
    private String patientId;
    private String doctorId;
    private Integer status;
}
