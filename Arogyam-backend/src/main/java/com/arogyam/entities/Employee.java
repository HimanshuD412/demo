package com.arogyam.entities;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employee")
@Getter
@Setter
@NoArgsConstructor
public class Employee {

    
    @Pattern(regexp = "^EMP.*", message = "Employee ID must start with EMP")
    @Id
    private String eid;

    
    private LocalDate joiningDate;

   
    @Embedded
    private Name name;

    
    private String birthdate;

    
    private String gender;

    
    private String emailID;

    
    private Long mobileno;

    
    private Long adharNo;

    
    private String state;

   
    private String city;

    
    private String role;

  
    private String qualification;

    
    private String specialization;

   
    private Integer status;

   
    @Transient
    private String password;

    // ==========================
    // RELATIONS (leave as is)
    // ==========================

    @OneToMany(mappedBy = "doctor")
    @JsonIgnore
    private List<Patient> patients;

    @OneToMany(mappedBy = "doctor")
    @JsonIgnore
    private List<Opd> opdList;

    @OneToOne(mappedBy = "employee")
    @JsonIgnore
    private Login login;
}
