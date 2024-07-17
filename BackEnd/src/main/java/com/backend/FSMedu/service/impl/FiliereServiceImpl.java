package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.FiliereDto;
import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.entity.Department;
import com.backend.FSMedu.entity.Filiere;
import com.backend.FSMedu.entity.ChefFiliere;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.FiliereMapper;
import com.backend.FSMedu.mapper.ModMapper;
import com.backend.FSMedu.repository.ChefFiliereRepository;
import com.backend.FSMedu.repository.DepartementRepository;
import com.backend.FSMedu.repository.FiliereRepository;
import com.backend.FSMedu.repository.ModRepository;
import com.backend.FSMedu.service.FiliereService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FiliereServiceImpl implements FiliereService {

    private final FiliereRepository filiereRepository;
    private final DepartementRepository departmentRepository;
    private final ChefFiliereRepository chefFiliereRepository;
    private final ModRepository modRepository;


    public FiliereServiceImpl(FiliereRepository filiereRepository,
                              DepartementRepository departmentRepository,
                              ChefFiliereRepository chefFiliereRepository,
                              ModRepository modRepository) {
        this.filiereRepository = filiereRepository;
        this.departmentRepository = departmentRepository;
        this.chefFiliereRepository = chefFiliereRepository;
        this.modRepository = modRepository;
    }

    @Override
    @Transactional
    public FiliereDto createFiliere(FiliereDto filiereDto) {
        Filiere filiere = new Filiere();
        filiere.setNom(filiereDto.getNom());
        // Set Department if provided
        if (filiereDto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(filiereDto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found with ID: " + filiereDto.getDepartmentId()));
            filiere.setDepartment(department);
        }
        // Set ChefFiliere if provided
        if (filiereDto.getChefFiliereId() != null) {
            ChefFiliere chefFiliere = chefFiliereRepository.findById(filiereDto.getChefFiliereId())
                    .orElseThrow(() -> new RuntimeException("ChefFiliere not found with ID: " + filiereDto.getChefFiliereId()));
            filiere.setChefFiliere(chefFiliere);
        }
        // Set Modules if provided
        if (filiereDto.getModuleIds() != null) {
            Set<Mod> modules = new HashSet<>();
            for (Long moduleId : filiereDto.getModuleIds()) {
                Mod module = modRepository.findById(moduleId)
                        .orElseThrow(() -> new RuntimeException("Module not found with ID: " + moduleId));
                modules.add(module);
            }
            filiere.setMods(modules);
        }
        Filiere savedFiliere = filiereRepository.save(filiere);
        return FiliereMapper.mapToFiliereDto(savedFiliere);
    }


    @Override
    public FiliereDto getFiliereById(long id) {
        Filiere filiere = filiereRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Filiere not found"));
        return FiliereMapper.mapToFiliereDto(filiere);
    }

    @Override
    public List<FiliereDto> getAllFilieres() {
        return filiereRepository.findAll().stream()
                .map(FiliereMapper::mapToFiliereDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FiliereDto updateFiliere(long id, FiliereDto filiereDto) {
        Filiere filiere = filiereRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with id: " + id));

        // Update fields from DTO if not null
        if (filiereDto.getNom() != null) {
            filiere.setNom(filiereDto.getNom());
        }

        // Set Department if provided
        if (filiereDto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(filiereDto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + filiereDto.getDepartmentId()));
            filiere.setDepartment(department);
        }

        // Set ChefFiliere if provided
        if (filiereDto.getChefFiliereId() != null) {
            ChefFiliere chefFiliere = chefFiliereRepository.findById(filiereDto.getChefFiliereId())
                    .orElseThrow(() -> new ResourceNotFoundException("ChefFiliere not found with id: " + filiereDto.getChefFiliereId()));
            chefFiliere.setFiliere(filiere); // Establish bidirectional relationship
            filiere.setChefFiliere(chefFiliere);
            chefFiliereRepository.save(chefFiliere); // Ensure ChefFiliere is saved with updated filiereId
        }

        // Update modules if provided
        if (filiereDto.getModuleIds() != null) {
            Set<Mod> mods = filiereDto.getModuleIds().stream()
                    .map(modId -> modRepository.findById(modId)
                            .orElseThrow(() -> new ResourceNotFoundException("Mod not found with ID: " + modId)))
                    .collect(Collectors.toSet());
            filiere.setMods(mods);
        } else {
            filiere.setMods(new HashSet<>()); // Clear mods if not provided
        }

        Filiere updatedFiliere = filiereRepository.save(filiere);
        return FiliereMapper.mapToFiliereDto(updatedFiliere);
    }


    @Override
    public void deleteFiliere(long id) {
        Filiere filiere = filiereRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Filiere not found"));
        filiereRepository.delete(filiere);
    }

    @Override
    public List<FiliereDto> getAllFiliereByDepartmentId(Long departmentId) {
        List<Filiere> filieres = filiereRepository.findByDepartmentId(departmentId);
        return filieres.stream()
                .map(FiliereMapper::mapToFiliereDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ModDto> getAllModulesByFiliereId(Long filiereId) {
        // Fetch Filiere entity by its ID
        Filiere filiere = filiereRepository.findById(filiereId)
                .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with id: " + filiereId));

        List<Long> moduleIds = filiere.getMods().stream()
                .map(Mod::getId)
                .collect(Collectors.toList());

        List<Mod> modules = modRepository.findAllById(moduleIds);
        List<ModDto> modDtos = modules.stream()
                .map(ModMapper::mapToModDto)
                .collect(Collectors.toList());

        return modDtos;
    }

}
