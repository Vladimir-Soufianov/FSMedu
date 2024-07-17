package com.backend.FSMedu.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDto {
    private long id;

    private String nom; //Nom

    private String prenom; //Prenom

    private String cin; // Carte National

    private String matricule; // Matricule

    private String role; //Role

    private String email; //email

    private String mdp; //mdp

}
