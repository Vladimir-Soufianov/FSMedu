package com.backend.FSMedu.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Modules")
public class Mod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nom")
    private String nom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semestre_id")
    @JsonIgnore
    private Semestre semestre;

    @ManyToOne
    @JoinColumn(name = "prof_id")
    @JsonIgnore
    private Prof prof;

    @ManyToOne
    @JoinColumn(name = "chefdep_id")
    @JsonIgnore
    private ChefDepartement chefdep;

    @ManyToOne
    @JoinColumn(name = "cheffil_id")
    @JsonIgnore
    private ChefFiliere cheffil;

    @ManyToOne
    @JoinColumn(name = "filiere_id")
    private Filiere filiere;

    @ManyToMany(mappedBy = "mods", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Student> students;

    @OneToMany(mappedBy = "mod", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Seance> seances;
}
