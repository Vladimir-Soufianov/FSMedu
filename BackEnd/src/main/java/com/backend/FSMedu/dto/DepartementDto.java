package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.ChefDepartement;
import com.backend.FSMedu.entity.Filiere;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartementDto {
    private long id;
    private String nom;
    private long chefdepid;
    private List<Long> filieres;
}
