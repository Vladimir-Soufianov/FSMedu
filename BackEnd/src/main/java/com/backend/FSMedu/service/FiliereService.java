package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.FiliereDto;
import com.backend.FSMedu.dto.ModDto;

import java.util.List;

public interface FiliereService {
    FiliereDto createFiliere(FiliereDto filiereDto);
    FiliereDto getFiliereById(long id);
    List<FiliereDto> getAllFilieres();
    FiliereDto updateFiliere(long id, FiliereDto filiereDto);
    void deleteFiliere(long id);
    List<FiliereDto> getAllFiliereByDepartmentId(Long departmentId);
    List<ModDto> getAllModulesByFiliereId(Long filiereId);
}
