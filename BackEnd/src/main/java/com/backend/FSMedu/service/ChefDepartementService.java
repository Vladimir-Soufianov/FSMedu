package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.ChefDepartementDto;
import com.backend.FSMedu.dto.ChefFiliereDto;

import java.util.List;

public interface ChefDepartementService {

    ChefDepartementDto getChefDepartementById(long id);

    ChefDepartementDto createChefDepartement(ChefDepartementDto chefDepartementDto);

    ChefDepartementDto updateChefDepartement(long id, ChefDepartementDto chefDepartementDto);

    void deleteChefDepartement(long id);

    List<ChefDepartementDto> getAllChefDepartements();
    ChefDepartementDto findByCinAndMdp(String cin, String mdp);
    ChefDepartementDto findByCinAndMatricule(String cin, String matricule) ;
    }

