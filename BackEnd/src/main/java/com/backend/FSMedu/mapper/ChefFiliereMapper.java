package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.ChefFiliereDto;
import com.backend.FSMedu.entity.ChefFiliere;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Seance;

import java.util.stream.Collectors;

public class ChefFiliereMapper {

    public static ChefFiliereDto mapToChefFiliereDto(ChefFiliere chefFiliere) {
        ChefFiliereDto chefFiliereDto = new ChefFiliereDto();
        chefFiliereDto.setId(chefFiliere.getId());
        chefFiliereDto.setNom(chefFiliere.getNom());
        chefFiliereDto.setPrenom(chefFiliere.getPrenom());
        chefFiliereDto.setCin(chefFiliere.getCin());
        chefFiliereDto.setMatricule(chefFiliere.getMatricule());
        chefFiliereDto.setRole(chefFiliere.getRole());
        chefFiliereDto.setEmail(chefFiliere.getEmail());
        chefFiliereDto.setMdp(chefFiliere.getMdp());

        if (chefFiliere.getFiliere() != null) {
            chefFiliereDto.setFiliereId(chefFiliere.getFiliere().getId());
        }

        chefFiliereDto.setModIds(chefFiliere.getMods().stream()
                .map(Mod::getId)
                .collect(Collectors.toList()));

        chefFiliereDto.setSeancesId(chefFiliere.getSeances().stream()
                .map(Seance::getId)
                .collect(Collectors.toList()));

        return chefFiliereDto;
    }

    public static ChefFiliere mapToChefFiliere(ChefFiliereDto chefFiliereDto) {
        ChefFiliere chefFiliere = new ChefFiliere();
        chefFiliere.setId(chefFiliereDto.getId());
        chefFiliere.setNom(chefFiliereDto.getNom());
        chefFiliere.setPrenom(chefFiliereDto.getPrenom());
        chefFiliere.setCin(chefFiliereDto.getCin());
        chefFiliere.setMatricule(chefFiliereDto.getMatricule());
        chefFiliere.setRole(chefFiliereDto.getRole());
        chefFiliere.setEmail(chefFiliereDto.getEmail());
        chefFiliere.setMdp(chefFiliereDto.getMdp());
        return chefFiliere;
    }
}
