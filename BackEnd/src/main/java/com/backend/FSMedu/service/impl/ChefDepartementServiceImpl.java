package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.ChefDepartementDto;
import com.backend.FSMedu.entity.ChefDepartement;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Seance;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.ChefDepartementMapper;
import com.backend.FSMedu.repository.ChefDepartementRepository;
import com.backend.FSMedu.repository.DepartementRepository;
import com.backend.FSMedu.repository.ModRepository;
import com.backend.FSMedu.service.ChefDepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChefDepartementServiceImpl implements ChefDepartementService {

    private final ChefDepartementRepository chefDepartementRepository;
    private final DepartementRepository departmentRepository;
    private final ModRepository modRepository;

    @Autowired
    public ChefDepartementServiceImpl(ChefDepartementRepository chefDepartementRepository,ModRepository modRepository,
                                      DepartementRepository departmentRepository) {
        this.chefDepartementRepository = chefDepartementRepository;
        this.departmentRepository = departmentRepository;
        this.modRepository=modRepository;
    }

    @Override
    public ChefDepartementDto getChefDepartementById(long id) {
        ChefDepartement chefDepartement = chefDepartementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chef Departement not found with id: " + id));
        return ChefDepartementMapper.mapToChefDepartementDto(chefDepartement);
    }

    @Override
    public ChefDepartementDto createChefDepartement(ChefDepartementDto chefDepartementDto) {
        // Map ChefDepartementDto to entity
        ChefDepartement chefDepartement = ChefDepartementMapper.mapToChefDepartement(chefDepartementDto);

        // Set department if departmentId is provided
        if (chefDepartementDto.getDepartmentId() != null) {
            chefDepartement.setDepartment(departmentRepository.findById(chefDepartementDto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + chefDepartementDto.getDepartmentId())));
        }

        if (chefDepartement.getMods() == null) {chefDepartement.setMods(new ArrayList<>());}
        for (Mod mod : chefDepartement.getMods()) {
            mod.setChefdep(chefDepartement);
        }
        ChefDepartement savedChefDepartement = chefDepartementRepository.save(chefDepartement);
        return ChefDepartementMapper.mapToChefDepartementDto(savedChefDepartement);
    }

    @Override
    @Transactional
    public ChefDepartementDto updateChefDepartement(long id, ChefDepartementDto chefDepartementDto) {
        ChefDepartement chefDepartement = chefDepartementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chef Departement not found with id: " + id));

        // Update fields from DTO to existing entity if not null
        if (chefDepartementDto.getNom() != null) {
            chefDepartement.setNom(chefDepartementDto.getNom());
        }
        if (chefDepartementDto.getPrenom() != null) {
            chefDepartement.setPrenom(chefDepartementDto.getPrenom());
        }
        if (chefDepartementDto.getCin() != null) {
            chefDepartement.setCin(chefDepartementDto.getCin());
        }
        if (chefDepartementDto.getMatricule() != null) {
            chefDepartement.setMatricule(chefDepartementDto.getMatricule());
        }
        if (chefDepartementDto.getRole() != null) {
            chefDepartement.setRole(chefDepartementDto.getRole());
        }
        if (chefDepartementDto.getEmail() != null) {
            chefDepartement.setEmail(chefDepartementDto.getEmail());
        }
        if (chefDepartementDto.getMdp() != null) {
            chefDepartement.setMdp(chefDepartementDto.getMdp());
        }

        // Update department if provided in DTO
        if (chefDepartementDto.getDepartmentId() != null) {
            chefDepartement.setDepartment(departmentRepository.findById(chefDepartementDto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + chefDepartementDto.getDepartmentId())));
        }

        // Update mods if provided in DTO
        if (chefDepartementDto.getModIds() != null && !chefDepartementDto.getModIds().isEmpty()) {
            List<Mod> mods = chefDepartementDto.getModIds().stream()
                    .map(modId -> {
                        Mod mod = modRepository.findById(modId)
                                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id: " + modId));
                        mod.setChefdep(chefDepartement); // Set chef department in Mod entity
                        return mod;
                    })
                    .collect(Collectors.toList());
            chefDepartement.setMods(mods);
        }

        ChefDepartement updatedChefDepartement = chefDepartementRepository.save(chefDepartement);
        return ChefDepartementMapper.mapToChefDepartementDto(updatedChefDepartement);
    }

    @Override
    public void deleteChefDepartement(long id) {
        ChefDepartement chefDepartement = chefDepartementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chef Departement not found with id: " + id));
        chefDepartementRepository.delete(chefDepartement);
    }

    @Override
    public List<ChefDepartementDto> getAllChefDepartements() {
        List<ChefDepartement> chefDepartements = chefDepartementRepository.findAll();
        return chefDepartements.stream()
                .map(ChefDepartementMapper::mapToChefDepartementDto)
                .collect(Collectors.toList());
    }

    @Override
    public ChefDepartementDto findByCinAndMdp(String cin, String mdp) {
        ChefDepartement chefDepartement = chefDepartementRepository.findByCinAndMdp(cin, mdp);
        if (chefDepartement != null) {
            ChefDepartementDto chefDepartementDto = new ChefDepartementDto();
            chefDepartementDto.setId(chefDepartement.getId());
            chefDepartementDto.setCin(chefDepartement.getCin());
            chefDepartementDto.setNom(chefDepartement.getNom());
            chefDepartementDto.setPrenom(chefDepartement.getPrenom());
            chefDepartementDto.setMatricule(chefDepartement.getMatricule());
            chefDepartementDto.setRole(chefDepartement.getRole());
            chefDepartementDto.setEmail(chefDepartement.getEmail());
            chefDepartementDto.setMdp(chefDepartement.getMdp());

            if (chefDepartement.getMods() != null) {
                chefDepartementDto.setModIds(chefDepartement.getMods().stream()
                        .map(Mod::getId)
                        .collect(Collectors.toList()));
            } else {
                chefDepartementDto.setModIds(Collections.emptyList()); // or null, depending on your preference
            }

            if (chefDepartement.getSeances() != null) {
                chefDepartementDto.setSeancesId(chefDepartement.getSeances().stream()
                        .map(Seance::getId)
                        .collect(Collectors.toList()));
            } else {
                chefDepartementDto.setSeancesId(Collections.emptyList()); // or null, depending on your preference
            }

            return chefDepartementDto;
        }
        return null;
    }

    @Override
    public ChefDepartementDto findByCinAndMatricule(String cin, String matricule) {
        ChefDepartement chefDepartement = chefDepartementRepository.findByCinAndMatricule(cin, matricule);
        if (chefDepartement != null) {
            return ChefDepartementMapper.mapToChefDepartementDto(chefDepartement);
        }
        return null; // Or handle as per your application logic
    }

    }

