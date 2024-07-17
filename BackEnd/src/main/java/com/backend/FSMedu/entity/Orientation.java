package com.backend.FSMedu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="Orientation")
public class Orientation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="nom")
    private String nom; //Nom
    @Column(name="prenom")
    private String prenom; //Prenom
    @Column(name="cin")
    private String cin; // Carte National
    @Column(name="matricule")
    private String matricule; // Matricule
    @Column(name="role")
    private String role; //Role
    @Column(name="email")
    private String email; //email
    @Column(name="mdp")
    private String mdp; //mdp


}