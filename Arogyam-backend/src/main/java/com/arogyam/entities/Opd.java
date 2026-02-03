package com.arogyam.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "opd")
@Getter
@Setter
@NoArgsConstructor
public class Opd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer opdid;

    private LocalDate visitdate;

    private Integer status;

    // ==========================
    // ASSOCIATIONS
    // ==========================

    // Many OPDs → one Patient
    @ManyToOne
    @JoinColumn(name = "pid")
    private Patient patient;

    // Many OPDs → one Doctor (Employee)
    @ManyToOne
    @JoinColumn(name = "doctorid")
    private Employee doctor;

    // One OPD → one OPDDetails
    @OneToOne(mappedBy = "opd", cascade = CascadeType.ALL)
    @JsonIgnore
    private OpdDetails opdDetails;
}
