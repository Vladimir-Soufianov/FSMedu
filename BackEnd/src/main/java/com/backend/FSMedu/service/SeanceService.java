package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.SeanceDto;
import com.backend.FSMedu.entity.Seance;

import java.util.List;
public interface SeanceService {
    SeanceDto createSeance(SeanceDto seanceDto);
    SeanceDto getSeanceById(long id);
    List<SeanceDto> getAllSeances();
    SeanceDto updateSeance(long id, SeanceDto seanceDto);
    void deleteSeance(long id);
    List<SeanceDto> getSeancesByRoleAndId(String role, Long id);
    List<SeanceDto> getSeancesByType(String type);
}



