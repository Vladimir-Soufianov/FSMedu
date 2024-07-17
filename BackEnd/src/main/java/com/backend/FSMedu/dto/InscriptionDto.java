package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.InscriptionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InscriptionDto {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String cne;
    private String telephone;
    private String cin;
    private String region;
    private String annebac;
    private String filiere;
    private String cinUrl;
    private String imgUrl;
    private String bacUrl;
    private InscriptionStatus status;
}
