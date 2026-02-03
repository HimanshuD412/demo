package com.arogyam.entities;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "patient")
@Getter
@Setter
@NoArgsConstructor
public class Patient {

    @Id
    
    @Pattern(regexp = "^P.*", message = "Patient ID must start with P")
    private String pid;

    
    private LocalDate registrationDate;

    
    @Embedded
    private Name name;

   
    private String birthdate;

    
    private String gender;

    
    private String emailID;

    
    private Long mobileno;

   
    private Long adharNo;

   
    private String state;

    
    private String city;

    
    private String bloodGroup;

   
    private String chronicDiseases;

    
    private String medicineAllergy;

   
    @Transient
    private String password;

    // ==========================
    // ASSOCIATIONS
    // ==========================

    @ManyToOne
    @JoinColumn(name = "doctorId")
    private Employee doctor;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<Opd> opdList;
}
