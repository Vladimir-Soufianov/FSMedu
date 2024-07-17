package com.backend.FSMedu.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "Year")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Year {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "nom")
    private String nom;
    @Column(name = "start", nullable = false)
    private LocalDate start;
    @Column(name = "finish", nullable = false)
    private LocalDate finish ;
    @Column( name = "active")
    private boolean active;
    }
