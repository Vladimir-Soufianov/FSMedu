package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.ChefFiliereDto;

import java.util.List;

public interface ChefFiliereService {

    ChefFiliereDto getChefFiliereById(long id);

    ChefFiliereDto createChefFiliere(ChefFiliereDto chefFiliereDto);

    ChefFiliereDto updateChefFiliere(long id, ChefFiliereDto chefFiliereDto);

    void deleteChefFiliere(long id);

    List<ChefFiliereDto> getAllChefFiliere();

    ChefFiliereDto findByCinAndMdp(String cin, String mdp);
    ChefFiliereDto findByCinAndMatricule(String cin, String matricule);

}
