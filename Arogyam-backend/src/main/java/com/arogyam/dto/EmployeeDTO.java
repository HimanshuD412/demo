package com.arogyam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDTO {

	@NotBlank(message = "Employee ID is required")
    @Pattern(regexp = "^EMP.*", message = "Employee ID must start with EMP")

    private String eid;
	
	@NotBlank(message = "First name is required")
    private String firstName;
	
	@NotBlank(message = "Last name is required")
    private String lastName;
	
	@NotBlank(message = "Role is required")
    private String role;
    private Integer status;
}
