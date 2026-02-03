package com.arogyam.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientDTO {

    @NotBlank(message = "Patient ID is required")
    @Pattern(regexp = "^P.*", message = "Patient ID must start with P")
    private String pid;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be exactly 10 digits")
    private String mobileno;

    @NotBlank(message = "Doctor ID is required")
    private String doctorId;
}
