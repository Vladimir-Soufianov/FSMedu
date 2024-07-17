package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.ProfDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Prof;
import com.backend.FSMedu.entity.Seance;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ProfMapper {

    public static ProfDto mapToProfDto(Prof prof) {
        ProfDto profDto = new ProfDto();
        profDto.setId(prof.getId());
        profDto.setNom(prof.getNom());
        profDto.setPrenom(prof.getPrenom());
        profDto.setCin(prof.getCin());
        profDto.setMatricule(prof.getMatricule());
        profDto.setRole(prof.getRole());
        profDto.setEmail(prof.getEmail());
        profDto.setMdp(prof.getMdp());

        if (prof.getMods() != null) {
            profDto.setModIds(prof.getMods().stream()
                    .map(Mod::getId)
                    .collect(Collectors.toList()));
        }
        if (prof.getSeances() != null) {profDto.setSeanceIds(prof.getSeances().stream()
                    .map(Seance::getId).collect(Collectors.toList()));
        }
        return profDto;
    }

    public static Prof mapToProf(ProfDto profDto) {
        Prof prof = new Prof();
        prof.setId(profDto.getId());
        prof.setNom(profDto.getNom());
        prof.setPrenom(profDto.getPrenom());
        prof.setCin(profDto.getCin());
        prof.setMatricule(profDto.getMatricule());
        prof.setRole(profDto.getRole());
        prof.setEmail(profDto.getEmail());
        prof.setMdp(profDto.getMdp());
        return prof;
    }
}
