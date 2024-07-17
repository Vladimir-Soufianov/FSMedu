package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.ChefDepartementDto;
import com.backend.FSMedu.entity.ChefDepartement;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Seance;

import java.util.stream.Collectors;

public class ChefDepartementMapper {

    public static ChefDepartementDto mapToChefDepartementDto(ChefDepartement chefDepartement) {
        ChefDepartementDto chefDepartementDto = new ChefDepartementDto();
        chefDepartementDto.setId(chefDepartement.getId());
        chefDepartementDto.setNom(chefDepartement.getNom());
        chefDepartementDto.setPrenom(chefDepartement.getPrenom());
        chefDepartementDto.setCin(chefDepartement.getCin());
        chefDepartementDto.setMatricule(chefDepartement.getMatricule());
        chefDepartementDto.setRole(chefDepartement.getRole());
        chefDepartementDto.setEmail(chefDepartement.getEmail());
        chefDepartementDto.setMdp(chefDepartement.getMdp());
        if (chefDepartement.getDepartment() != null) {
            chefDepartementDto.setDepartmentId(chefDepartement.getDepartment().getId());
        }
        chefDepartementDto.setModIds(chefDepartement.getMods().stream()
                .map(Mod::getId)
                .collect(Collectors.toList()));

        chefDepartementDto.setSeancesId(chefDepartement.getSeances().stream()
                .map(Seance::getId)
                .collect(Collectors.toList()));

        return chefDepartementDto;
    }

    public static ChefDepartement mapToChefDepartement(ChefDepartementDto chefDepartementDto) {
        ChefDepartement chefDepartement = new ChefDepartement();
        chefDepartement.setId(chefDepartementDto.getId());
        chefDepartement.setNom(chefDepartementDto.getNom());
        chefDepartement.setPrenom(chefDepartementDto.getPrenom());
        chefDepartement.setCin(chefDepartementDto.getCin());
        chefDepartement.setMatricule(chefDepartementDto.getMatricule());
        chefDepartement.setRole(chefDepartementDto.getRole());
        chefDepartement.setEmail(chefDepartementDto.getEmail());
        chefDepartement.setMdp(chefDepartementDto.getMdp());
        // Department mapping should be handled separately in the service layer
        return chefDepartement;
    }
}
