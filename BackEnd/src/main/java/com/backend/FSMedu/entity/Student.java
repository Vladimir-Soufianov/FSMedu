package com.backend.FSMedu.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="students")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="nom")
    private String nom; //Nom
    @Column(name="prenom")
    private String prenom; //Prenom
    @Column(name="cin")
    private String cin; // Carte National
    @Column(name="cne")
    private String cne; // Massar
    @Column(name="email")
    private String email; //email
    @Column(name="email_aca")
    private String email_aca; //email academique
    @Column(name="mdp")
    private String mdp; //mdp
    @Column(name="ce")
    private String ce ; //code etudiant


    @ManyToMany(mappedBy = "students")
    @JsonIgnore
    private List<Club> clubs;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "student_modules",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "modules_id")
    )
    private List<Mod> mods = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "student_filieres",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "filiere_id")
    )
    private List<Filiere> filieres = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "student_semestres",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "semestre_id")
    )
    private List<Semestre> semestres = new ArrayList<>();

}
