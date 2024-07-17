package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.SemestreDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Semestre;
import com.backend.FSMedu.entity.Year;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.repository.ModRepository;
import com.backend.FSMedu.repository.YearRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class SemestreMapper {

    @Autowired
    private static ModRepository modRepository;

    @Autowired
    private static YearRepository yearRepository;

    public static SemestreDto mapToSemestreDto(Semestre semestre) {
        SemestreDto semestreDto = new SemestreDto();
        semestreDto.setId(semestre.getId());
        semestreDto.setNom(semestre.getNom());
        semestreDto.setStart(semestre.getStart());
        semestreDto.setFinish(semestre.getFinish());
        semestreDto.setYearId(semestre.getYear().getId());
        List<Long> modIds = semestre.getMods().stream()
                .map(Mod::getId)
                .collect(Collectors.toList());
        semestreDto.setModIds(modIds);
        return semestreDto;
    }

    public static Semestre mapToSemestre(SemestreDto semestreDto) {
        Semestre semestre = new Semestre();
        semestre.setId(semestreDto.getId());
        semestre.setNom(semestreDto.getNom());
        semestre.setStart(semestreDto.getStart());
        semestre.setFinish(semestreDto.getFinish());
        Year year = yearRepository.findById(semestreDto.getYearId())
                .orElseThrow(() -> new ResourceNotFoundException("Year not found with ID: " + semestreDto.getYearId()));
        semestre.setYear(year);
        List<Mod> mods = semestreDto.getModIds().stream()
                .map(modId -> modRepository.findById(modId)
                        .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + modId)))
                .collect(Collectors.toList());
        semestre.setMods(mods);
        return semestre;
    }
}
