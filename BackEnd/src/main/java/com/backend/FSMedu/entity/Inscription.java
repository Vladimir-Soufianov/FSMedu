package com.backend.FSMedu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "inscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Inscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nom")
    private String nom;
    @Column(name = "prenom")
    private String prenom;
    @Column(name = "email")
    private String email;
    @Column(name = "cne")
    private String cne;
    @Column(name = "telephone")
    private String telephone;
    @Column(name = "cin")
    private String cin;
    @Column(name = "region")
    private String region;
    @Column(name = "annebac")
    private String annebac;
    @Column(name = "filiere")
    private String filiere;
    @Column(name = "cinUrl")
    private String cinUrl; // Store path to CIN image
    @Column(name = "imgUrl")
    private String imgUrl; // Store path to profile image
    @Column(name = "bacUrl")
    private String bacUrl; // Store path to profile image
    @Enumerated(EnumType.STRING)
    private InscriptionStatus status;
}
