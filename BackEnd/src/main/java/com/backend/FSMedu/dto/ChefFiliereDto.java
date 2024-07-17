package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Filiere;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChefFiliereDto {
    private long id;
    private String nom;
    private String prenom;
    private String cin;
    private String matricule;
    private String role;
    private String email;
    private String mdp;
    private List<Long> modIds;
    private Long filiereId;
    private List<Long> seancesId;
}
