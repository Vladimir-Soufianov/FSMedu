package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Seance;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfDto {
    private long id;
    private String nom;
    private String prenom;
    private String cin;
    private String matricule;
    private String role;
    private String email;
    private String mdp;
    private List<Long> modIds;
    private List<Long> seanceIds;
}
