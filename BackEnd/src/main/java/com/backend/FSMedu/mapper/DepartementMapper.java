package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.DepartementDto;
import com.backend.FSMedu.entity.Department;
import com.backend.FSMedu.entity.Filiere;

import java.util.List;
import java.util.stream.Collectors;

public class DepartementMapper {
    public static DepartementDto mapToDepartementDto(Department department){
        DepartementDto departementDto = new DepartementDto();
        departementDto.setId(department.getId());
        departementDto.setNom(department.getNom());
        List<Long> filiereIds = department.getFilieres().stream()
                .map(Filiere::getId)
                .collect(Collectors.toList());
        departementDto.setFilieres(filiereIds);
        if (department.getChefDepartement() != null){
            departementDto.setChefdepid(department.getChefDepartement().getId());
        }
        return  departementDto;

    }

    public static Department mapToDepartement(DepartementDto departementDto) {
        Department department = new Department();
        department.setId(departementDto.getId());
        department.setNom(departementDto.getNom());
        return department;
    }
}
