package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Department;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChefDepartementDto {
    private long id;
    private String nom;
    private String prenom;
    private String cin;
    private String matricule;
    private String role;
    private String email;
    private String mdp;
    private Long departmentId;
    private List<Long> modIds;
    private List<Long> seancesId;
}
