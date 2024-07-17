package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Seance;
import com.backend.FSMedu.entity.Student;

import java.util.stream.Collectors;

public class ModMapper {
    public static ModDto mapToModDto(Mod mod) {
        ModDto modDto = new ModDto();
        modDto.setId(mod.getId());
        modDto.setNom(mod.getNom());
        modDto.setSemestreId(mod.getSemestre() != null ? mod.getSemestre().getId() : null);
        modDto.setProfId(mod.getProf() != null ? mod.getProf().getId() : null);
        modDto.setChefdepId(mod.getChefdep() != null ? mod.getChefdep().getId() : null);
        modDto.setCheffilId(mod.getCheffil() != null ? mod.getCheffil().getId() : null);
        modDto.setFiliereId(mod.getFiliere() != null ? mod.getFiliere().getId() : null); // Corrected to use getFiliere() and getId()
        modDto.setStudentIds(mod.getStudents().stream().map(Student::getId).collect(Collectors.toSet()));
        modDto.setSeanceIds(mod.getSeances().stream().map(Seance::getId).collect(Collectors.toSet()));
        return modDto;
    }

    public static Mod mapToMod(ModDto modDto) {
        Mod mod = new Mod();
        mod.setId(modDto.getId());
        mod.setNom(modDto.getNom());
        // Implement mapping of other fields if necessary
        return mod;
    }
}
