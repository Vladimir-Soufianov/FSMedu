package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Commentaire;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
        private long id;
        private String titre; //Titre
        private String auteur; //Auteur
        private String description; //Description
        private String category; //Titre
        private boolean dispo; //Disponnibilite
        private List<Commentaire> cmmnt;

}

