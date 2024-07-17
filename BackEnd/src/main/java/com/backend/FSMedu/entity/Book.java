package com.backend.FSMedu.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Entity
@Table(name="book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "titre")
    private String titre; //Titre
    @Column(name = "auteur")
    private String auteur; //Auteur
    @Column(name = "description")
    private String description; //Description
    @Column(name = "category")
    private String category; //Titre
    @Column(name = "dispo")
    private boolean dispo; //Disponnibilite
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Commentaire> cmmnt;
}
