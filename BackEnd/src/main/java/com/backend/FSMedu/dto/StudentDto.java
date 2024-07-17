package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Club;
import com.backend.FSMedu.entity.Mod;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {

    private long id;

    private String nom; //Nom

    private String prenom; //Prenom

    private String cin; // Carte National

    private String cne; // Massar

    private String email; //email

    private String email_aca; //email academique

    private String mdp; //mdp

    private String ce ;//code etudiant

    private List<Long> clubIds; // Club IDs
    private List<Long> modIds; // Mod IDs
    private List<Long> filiereIds; // Filiere IDs
    private List<Long> semestreIds;
}