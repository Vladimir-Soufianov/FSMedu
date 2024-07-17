package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.DepartementDto;
import com.backend.FSMedu.entity.ChefDepartement;
import com.backend.FSMedu.entity.Department;
import com.backend.FSMedu.entity.Filiere;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.DepartementMapper;
import com.backend.FSMedu.repository.ChefDepartementRepository;
import com.backend.FSMedu.repository.DepartementRepository;
import com.backend.FSMedu.repository.FiliereRepository;
import com.backend.FSMedu.service.DepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartementServiceImpl implements DepartementService {

    private DepartementRepository departementRepository;
    private FiliereRepository filiereRepository;
    private  ChefDepartementRepository chefDepartementRepository;
    @Autowired
   public DepartementServiceImpl(DepartementRepository departementRepository,FiliereRepository filiereRepository,
                                 ChefDepartementRepository chefDepartementRepository) {
        this.departementRepository = departementRepository;
        this.chefDepartementRepository = chefDepartementRepository;
    this.filiereRepository=filiereRepository;
    }

    @Override
    public DepartementDto createDepartement(DepartementDto departementDto) {
        Department departement = new Department();
        departement.setNom(departementDto.getNom());

        ChefDepartement chefDepartement = chefDepartementRepository.findById(departementDto.getChefdepid())
                .orElseThrow(() -> new ResourceNotFoundException("ChefDepartement not found with id: " + departementDto.getChefdepid()));
        departement.setChefDepartement(chefDepartement);

        if (departementDto.getFilieres() != null && !departementDto.getFilieres().isEmpty()) {
            List<Filiere> filieres = new ArrayList<>();
            for (Long filiereId : departementDto.getFilieres()) {
                Filiere filiere = filiereRepository.findById(filiereId)
                        .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with id: " + filiereId));
                filiere.setDepartment(departement); // Set the department for the filiere
                filieres.add(filiere);
            }
            departement.setFilieres(filieres);
        }

        Department savedDepartement = departementRepository.save(departement);
        return DepartementMapper.mapToDepartementDto(savedDepartement);
    }

    @Override
    public DepartementDto getDepartementById(long departementId) {
        Department departement = departementRepository.findById(departementId)
                .orElseThrow(() -> new ResourceNotFoundException("Departement not found"));
        return DepartementMapper.mapToDepartementDto(departement);
    }

    @Override
    public List<DepartementDto> getAllDepartements() {
        List<Department> departements = departementRepository.findAll();
        return departements.stream()
                .map(DepartementMapper::mapToDepartementDto)
                .collect(Collectors.toList());
    }

    @Override
    public DepartementDto updateDepartement(long id, DepartementDto departementDto) {
        Department existingDepartement = departementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departement not found with id: " + id));
        if (departementDto.getNom() != null) {
            existingDepartement.setNom(departementDto.getNom());
        }
        if (departementDto.getChefdepid() != 0) {
            ChefDepartement chefDepartement = chefDepartementRepository.findById(departementDto.getChefdepid())
                    .orElseThrow(() -> new ResourceNotFoundException("ChefDepartement not found with id: " + departementDto.getChefdepid()));
            existingDepartement.setChefDepartement(chefDepartement);
        }
        if (departementDto.getFilieres() != null && !departementDto.getFilieres().isEmpty()) {
            List<Filiere> filieres = new ArrayList<>();
            for (Long filiereId : departementDto.getFilieres()) {
                Filiere filiere = filiereRepository.findById(filiereId)
                        .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with id: " + filiereId));
                filiere.setDepartment(existingDepartement); // Set the department for the filiere
                filieres.add(filiere);
            }
            existingDepartement.setFilieres(filieres);
        }

        Department updatedDepartement = departementRepository.save(existingDepartement);
        return DepartementMapper.mapToDepartementDto(updatedDepartement);
    }


    @Override
    public void deleteDepartement(Long departementId) {
        Department departement = departementRepository.findById(departementId)
                .orElseThrow(() -> new ResourceNotFoundException("Departement not found"));
        departementRepository.delete(departement);
    }


}
