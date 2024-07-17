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
@Table(name="cheffiliere")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChefFiliere {
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

    @OneToOne
    @JoinColumn(name = "filiere_id")
    @JsonIgnore
    private Filiere filiere;

    @OneToMany(mappedBy = "cheffil")
    @JsonIgnore
    private List<Mod> mods;

    @OneToMany(mappedBy = "cheffil", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Seance> seances = new ArrayList<>();
}




