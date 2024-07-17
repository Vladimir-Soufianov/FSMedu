package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.SemestreDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Semestre;
import com.backend.FSMedu.entity.Year;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.SemestreMapper;
import com.backend.FSMedu.repository.ModRepository;
import com.backend.FSMedu.repository.SemestreRepository;
import com.backend.FSMedu.repository.YearRepository;
import com.backend.FSMedu.service.SemestreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class SemestreServiceImpl implements SemestreService {

    private final SemestreRepository semestreRepository;
    private final YearRepository yearRepository;
    private final ModRepository modRepository;

    @Autowired
    public SemestreServiceImpl(SemestreRepository semestreRepository, YearRepository yearRepository,ModRepository modRepository) {
        this.semestreRepository = semestreRepository;
        this.yearRepository = yearRepository;
        this.modRepository=modRepository;
    }

    @Override
    public SemestreDto createSemestre(SemestreDto semestreDto) {
        Year year = yearRepository.findById(semestreDto.getYearId())
                .orElseThrow(() -> new ResourceNotFoundException("Year not found with ID: " + semestreDto.getYearId()));
        Semestre semestre = SemestreMapper.mapToSemestre(semestreDto);
        semestre.setYear(year);
        Semestre savedSemestre = semestreRepository.save(semestre);
        return SemestreMapper.mapToSemestreDto(savedSemestre);
    }

    @Override
    public SemestreDto getSemestreById(long id) {
        Semestre semestre = semestreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Semestre not found with ID: " + id));
        return SemestreMapper.mapToSemestreDto(semestre);
    }

    @Override
    public List<SemestreDto> getAllSemestres() {
        return semestreRepository.findAll().stream()
                .map(SemestreMapper::mapToSemestreDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SemestreDto updateSemestre(long id, SemestreDto semestreDto) {
        Semestre semestre = semestreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Semestre not found with ID: " + id));

        // Update fields only if they are not null in semestreDto
        if (semestreDto.getNom() != null) {
            semestre.setNom(semestreDto.getNom());
        }
        if (semestreDto.getStart() != null) {
            semestre.setStart(semestreDto.getStart());
        }
        if (semestreDto.getFinish() != null) {
            semestre.setFinish(semestreDto.getFinish());
        }

        // Update year if yearId is provided in semestreDto
        if (semestreDto.getYearId() != 0) {
            Year year = yearRepository.findById(semestreDto.getYearId())
                    .orElseThrow(() -> new ResourceNotFoundException("Year not found with ID: " + semestreDto.getYearId()));
            semestre.setYear(year);
        }

        // Update mods if modIds are provided in semestreDto
        if (semestreDto.getModIds() != null && !semestreDto.getModIds().isEmpty()) {
            List<Mod> mods = semestreDto.getModIds().stream()
                    .map(modId -> modRepository.findById(modId)
                            .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + modId)))
                    .collect(Collectors.toList());
            semestre.setMods(mods);
        }

        // Save the updated semestre entity
        Semestre updatedSemestre = semestreRepository.save(semestre);
        return SemestreMapper.mapToSemestreDto(updatedSemestre);
    }


    @Override
    public void deleteSemestre(long id) {
        Semestre semestre = semestreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Semestre not found with ID: " + id));
        semestreRepository.delete(semestre);
    }
}
