package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.ProfDto;

import java.util.List;

public interface ProfService {
    ProfDto createProf(ProfDto profDto);
    ProfDto getProfById(Long profId);
    List<ProfDto> getAllProfs();
    ProfDto updateProf(Long profId, ProfDto updatedProf);
    void deleteProf(Long profId);
    ProfDto findByCinAndMdp(String cin, String mdp);
    ProfDto removeModFromProf(Long profId, Long modId);
    ProfDto findByCinAndMatricule(String cin, String matricule) ;
}



