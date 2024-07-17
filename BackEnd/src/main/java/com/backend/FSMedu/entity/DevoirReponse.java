package com.backend.FSMedu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="devoir_reponse")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DevoirReponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "devoir_id")
    private Devoir devoir;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "fichier")
    private String fichierUrl;

}
