package com.arogyam.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "login")
@Getter
@Setter
@NoArgsConstructor
public class Login {

    @Id
    private String username;   // PRIMARY KEY (as per DB)

    private String password;
    private String role;

    // ==========================
    // ASSOCIATION
    // ==========================

    @OneToOne
    @JoinColumn(name = "id")   // FK → employee.eid
    private Employee employee;
}
