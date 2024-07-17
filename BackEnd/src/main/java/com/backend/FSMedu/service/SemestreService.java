package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.SemestreDto;

import java.util.List;

public interface SemestreService {
    SemestreDto createSemestre(SemestreDto semestreDto);
    SemestreDto getSemestreById(long id);
    List<SemestreDto> getAllSemestres();
    SemestreDto updateSemestre(long id, SemestreDto semestreDto);
    void deleteSemestre(long id);
}
