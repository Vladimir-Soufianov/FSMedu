package com.backend.FSMedu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="devoir")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Devoir {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "prof_id")
    private Prof prof;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chefdepartement_id")
    private ChefDepartement chefDepartement;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cheffiliere_id")
    private ChefFiliere chefFiliere;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "modules_id")
    private Mod module;
    @Column(name = "fin")
    private LocalDate fin;
    @Column(name = "fileUrl")
    private String fileUrl;
}
