package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.ChefFiliereDto;
import com.backend.FSMedu.entity.ChefFiliere;
import com.backend.FSMedu.entity.Filiere;
import com.backend.FSMedu.entity.Seance;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.ChefFiliereMapper;
import com.backend.FSMedu.repository.ChefFiliereRepository;
import com.backend.FSMedu.repository.FiliereRepository;
import com.backend.FSMedu.repository.ModRepository;
import com.backend.FSMedu.service.ChefFiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChefFiliereServiceImpl implements ChefFiliereService {

    private final ChefFiliereRepository chefFiliereRepository;
    private final FiliereRepository filiereRepository;
    private final ModRepository modRepository;

    @Autowired
    public ChefFiliereServiceImpl(ChefFiliereRepository chefFiliereRepository, FiliereRepository filiereRepository,ModRepository modRepository) {
        this.chefFiliereRepository = chefFiliereRepository;
        this.filiereRepository = filiereRepository;
        this.modRepository = modRepository ;
    }

    @Override
    public ChefFiliereDto getChefFiliereById(long id) {
        ChefFiliere chefFiliere = chefFiliereRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chef Filiere not found with id: " + id));
        return ChefFiliereMapper.mapToChefFiliereDto(chefFiliere);
    }

    @Override
    public ChefFiliereDto createChefFiliere(ChefFiliereDto chefFiliereDto) {
        ChefFiliere chefFiliere = ChefFiliereMapper.mapToChefFiliere(chefFiliereDto);

        // Set Filiere if provided
        if (chefFiliereDto.getFiliereId() != null) {
            chefFiliere.setFiliere(filiereRepository.findById(chefFiliereDto.getFiliereId())
                    .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with id: " + chefFiliereDto.getFiliereId())));
        }
        if (chefFiliere.getMods() == null) {
            chefFiliere.setMods(new ArrayList<>());
        }
        if (chefFiliereDto.getModIds() != null && !chefFiliereDto.getModIds().isEmpty()) {
            chefFiliere.setMods(chefFiliereDto.getModIds().stream()
                    .map(modId -> modRepository.findById(modId)
                            .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id: " + modId)))
                    .collect(Collectors.toList()));
            chefFiliere.getMods().forEach(mod -> mod.setCheffil(chefFiliere));
        }

        ChefFiliere savedChefFiliere = chefFiliereRepository.save(chefFiliere);
        return ChefFiliereMapper.mapToChefFiliereDto(savedChefFiliere);
    }



    @Override
    @Transactional
    public ChefFiliereDto updateChefFiliere(long id, ChefFiliereDto chefFiliereDto) {
        ChefFiliere chefFiliere = chefFiliereRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ChefFiliere not found with id: " + id));

        // Update fields from DTO if not null
        if (chefFiliereDto.getNom() != null) {
            chefFiliere.setNom(chefFiliereDto.getNom());
        }
        if (chefFiliereDto.getPrenom() != null) {
            chefFiliere.setPrenom(chefFiliereDto.getPrenom());
        }
        if (chefFiliereDto.getCin() != null) {
            chefFiliere.setCin(chefFiliereDto.getCin());
        }
        if (chefFiliereDto.getMatricule() != null) {
            chefFiliere.setMatricule(chefFiliereDto.getMatricule());
        }
        if (chefFiliereDto.getRole() != null) {
            chefFiliere.setRole(chefFiliereDto.getRole());
        }
        if (chefFiliereDto.getEmail() != null) {
            chefFiliere.setEmail(chefFiliereDto.getEmail());
        }
        if (chefFiliereDto.getMdp() != null) {
            chefFiliere.setMdp(chefFiliereDto.getMdp());
        }

        // Update associated Filiere if provided
        if (chefFiliereDto.getFiliereId() != null) {
            Filiere filiere = filiereRepository.findById(chefFiliereDto.getFiliereId())
                    .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with id: " + chefFiliereDto.getFiliereId()));

            // Set the new ChefFiliere for Filiere
            filiere.setChefFiliere(chefFiliere);
            chefFiliere.setFiliere(filiere); // Set the filiere for the chefFiliere

            filiereRepository.save(filiere); // Save filiere with updated chefFiliereId
        }

        ChefFiliere updatedChefFiliere = chefFiliereRepository.save(chefFiliere);
        return ChefFiliereMapper.mapToChefFiliereDto(updatedChefFiliere);
    }




    @Override
    public void deleteChefFiliere(long id) {
        ChefFiliere chefFiliere = chefFiliereRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chef Filiere not found with id: " + id));
        chefFiliereRepository.delete(chefFiliere);
    }

    @Override
    public List<ChefFiliereDto> getAllChefFiliere() {
        List<ChefFiliere> chefFiliereList = chefFiliereRepository.findAll();
        return chefFiliereList.stream()
                .map(ChefFiliereMapper::mapToChefFiliereDto)
                .collect(Collectors.toList());
    }

    @Override
    public ChefFiliereDto findByCinAndMdp(String cin, String mdp) {
        ChefFiliere chefFiliere = chefFiliereRepository.findByCinAndMdp(cin, mdp);
        if (chefFiliere != null) {
            ChefFiliereDto chefFiliereDto = new ChefFiliereDto();
            chefFiliereDto.setId(chefFiliere.getId());
            chefFiliereDto.setCin(chefFiliere.getCin());
            chefFiliereDto.setNom(chefFiliere.getNom());
            chefFiliereDto.setPrenom(chefFiliere.getPrenom());
            chefFiliereDto.setMatricule(chefFiliere.getMatricule());
            chefFiliereDto.setRole(chefFiliere.getRole());
            chefFiliereDto.setEmail(chefFiliere.getEmail());
            chefFiliereDto.setMdp(chefFiliere.getMdp());

            if (chefFiliere.getMods() != null) {
                chefFiliereDto.setModIds(chefFiliere.getMods().stream()
                        .map(mod -> mod.getId())
                        .collect(Collectors.toList()));
            } else {
                chefFiliereDto.setModIds(Collections.emptyList()); // or null, depending on your preference
            }
            // Map seanceIds
            if (chefFiliere.getSeances() != null) {
                chefFiliereDto.setSeancesId(chefFiliere.getSeances().stream()
                        .map(Seance::getId)
                        .collect(Collectors.toList()));
            } else {
                chefFiliereDto.setSeancesId(Collections.emptyList()); // or null, depending on your preference
            }
            return chefFiliereDto;
        }
        return null;
    }

    @Override
    public ChefFiliereDto findByCinAndMatricule(String cin, String matricule) {
        ChefFiliere chefFiliere = chefFiliereRepository.findByCinAndMatricule(cin, matricule);
        if (chefFiliere != null) {
            return ChefFiliereMapper.mapToChefFiliereDto(chefFiliere);
        }
        return null; // Or handle as per your application logic
    }
    }


