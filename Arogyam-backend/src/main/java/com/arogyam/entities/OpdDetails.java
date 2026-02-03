package com.arogyam.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "opddetails")
@Getter
@Setter
@NoArgsConstructor
public class OpdDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Symptoms are required")
    private String symptoms;

    @NotBlank(message = "Diagnosis is required")
    private String diagnosis;

    @NotBlank(message = "Medicines dose is required")
    private String medicinesDose;

    @NotBlank(message = "Dos is required")
    private String dos;

    @NotBlank(message = "Donts is required")
    private String donts;

    @NotBlank(message = "Investigations are required")
    private String investigations;

    @NotBlank(message = "Follow up date is required")
    private String followupDate;

    @NotBlank(message = "Fees is required")
    private String fees;   // keeping String as you decided (safe + short)

    @OneToOne
    @JoinColumn(name = "opdid", unique = true)
    private Opd opd;
}
