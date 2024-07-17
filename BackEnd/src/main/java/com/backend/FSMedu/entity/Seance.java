package com.backend.FSMedu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Seance")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Seance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "start")
    private LocalDateTime start;
    @Column(name = "finish")
    private LocalDateTime finish;
    @ManyToOne
    @JoinColumn(name = "prof_id")
    private Prof prof;

    @ManyToOne
    @JoinColumn(name = "mod_id")
    private Mod mod;

    @Column(name = "local")
    private String local;

    @ManyToOne
    @JoinColumn(name = "chef_fil_id")
    private ChefFiliere cheffil;

    @ManyToOne
    @JoinColumn(name = "chef_dep_id")
    private ChefDepartement chefdep;

    @Column(name = "role") // Added role field
    private String role;

    @Enumerated(EnumType.STRING)
    @Column(name = "seance_type") // Added seanceType field
    private SeanceType seanceType;
}
