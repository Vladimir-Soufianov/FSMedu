package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.FiliereDto;
import com.backend.FSMedu.entity.Filiere;
import com.backend.FSMedu.entity.Mod;

import java.util.stream.Collectors;

public class FiliereMapper {
    public static FiliereDto mapToFiliereDto(Filiere filiere) {
        FiliereDto filiereDto = new FiliereDto();
        filiereDto.setId(filiere.getId());
        filiereDto.setNom(filiere.getNom());
        if (filiere.getDepartment() != null) {
            filiereDto.setDepartmentId(filiere.getDepartment().getId());
        }
        if (filiere.getChefFiliere() != null) {
            filiereDto.setChefFiliereId(filiere.getChefFiliere().getId());
        }
        filiereDto.setModuleIds(filiere.getMods().stream()
                .map(Mod::getId)
                .collect(Collectors.toList()));
        return filiereDto;
    }

    public static Filiere mapToFiliere(FiliereDto filiereDto) {
        Filiere filiere = new Filiere();
        filiere.setId(filiereDto.getId());
        filiere.setNom(filiereDto.getNom());
        // Implement mapping of other fields if necessary
        return filiere;
    }
}
