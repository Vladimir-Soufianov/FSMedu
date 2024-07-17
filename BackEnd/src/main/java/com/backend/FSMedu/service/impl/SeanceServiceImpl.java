package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.SeanceDto;
import com.backend.FSMedu.entity.Seance;
import com.backend.FSMedu.mapper.SeanceMapper;
import com.backend.FSMedu.repository.*;
import com.backend.FSMedu.service.SeanceService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeanceServiceImpl implements SeanceService {

    private final SeanceRepository seanceRepository;
    private final ProfRepository profRepository;
    private final ModRepository modRepository;
    private final ChefDepartementRepository chefDepartementRepository;
    private final ChefFiliereRepository chefFiliereRepository;

    @Autowired
    public SeanceServiceImpl(SeanceRepository seanceRepository,ChefDepartementRepository chefDepartementRepository,
                             ProfRepository profRepository,ChefFiliereRepository chefFiliereRepository,
                             ModRepository modRepository) {
        this.seanceRepository = seanceRepository;
        this.profRepository = profRepository;
        this.modRepository = modRepository;
        this.chefDepartementRepository=chefDepartementRepository;
        this.chefFiliereRepository=chefFiliereRepository;
    }

    @Override
    public SeanceDto createSeance(SeanceDto seanceDto) {
        Seance seance = new Seance();
        if(seanceDto.getStart()!=null){
            seance.setStart(seanceDto.getStart());
        }
        if(seanceDto.getFinish()!=null){
            seance.setFinish(seanceDto.getFinish());
        }
        if (seanceDto.getProfId() != null) {
            seance.setProf(profRepository.findById(seanceDto.getProfId())
                    .orElseThrow(() -> new RuntimeException("Prof not found")));
        }

        if (seanceDto.getModuleId() != null) {
            seance.setMod(modRepository.findById(seanceDto.getModuleId())
                    .orElseThrow(() -> new RuntimeException("Module not found")));
        }

        if (seanceDto.getChefdepid() != null) {
            seance.setChefdep(chefDepartementRepository.findById(seanceDto.getChefdepid())
                    .orElseThrow(() -> new RuntimeException("Chef Departement not found")));
        }
        if (seanceDto.getCheffilid() != null) {
            seance.setCheffil(chefFiliereRepository.findById(seanceDto.getCheffilid())
                    .orElseThrow(() -> new RuntimeException("Chef filiere not found")));
        }
        if(seanceDto.getLocal()!=null){
            seance.setLocal(seanceDto.getLocal());
        }
        // Determine the role based on which ID is not null
        if (seanceDto.getProfId() != null) {
            seance.setProf(profRepository.findById(seanceDto.getProfId())
                    .orElseThrow(() -> new RuntimeException("Prof not found")));
            seance.setRole("prof"); // Assuming "prof" is your string representation for Prof role
        } else if (seanceDto.getChefdepid() != null) {
            seance.setChefdep(chefDepartementRepository.findById(seanceDto.getChefdepid())
                    .orElseThrow(() -> new RuntimeException("Chef Departement not found")));
            seance.setRole("chefdep"); // Assuming "chefdep" is your string representation for Chef Departement role
        } else if (seanceDto.getCheffilid() != null) {
            seance.setCheffil(chefFiliereRepository.findById(seanceDto.getCheffilid())
                    .orElseThrow(() -> new RuntimeException("Chef filiere not found")));
            seance.setRole("cheffil"); // Assuming "cheffil" is your string representation for Chef Filiere role
        } else {
            throw new IllegalArgumentException("One of profId, chefdepid, or cheffilid must be provided.");
        }
        if (seanceDto.getSeanceType()!=null){
            seance.setSeanceType(seanceDto.getSeanceType());
        }
        Seance savedSeance = seanceRepository.save(seance);
        return SeanceMapper.mapToSeanceDto(savedSeance);
    }

    @Override
    public SeanceDto getSeanceById(long id) {
        Seance seance = seanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seance not found"));
        return SeanceMapper.mapToSeanceDto(seance);
    }

    @Override
    public List<SeanceDto> getAllSeances() {
        List<Seance> seances = seanceRepository.findAll();
        return seances.stream()
                .map(SeanceMapper::mapToSeanceDto)
                .collect(Collectors.toList());
    }

    @Override
    public SeanceDto updateSeance(long id, SeanceDto seanceDto) {
        Seance seance = seanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seance not found"));

        if (seanceDto.getStart() != null) {
            seance.setStart(seanceDto.getStart());
        }
        if (seanceDto.getFinish() != null) {
            seance.setFinish(seanceDto.getFinish());
        }
        if (seanceDto.getModuleId() != null) {
            seance.setMod(modRepository.findById(seanceDto.getModuleId())
                    .orElseThrow(() -> new RuntimeException("Module not found")));
        }

        // Check if at least one of profId, chefdepid, or cheffilid is provided
        if (seanceDto.getProfId() != null) {
            seance.setProf(profRepository.findById(seanceDto.getProfId())
                    .orElseThrow(() -> new RuntimeException("Prof not found")));
            seance.setRole("prof"); // Assuming "prof" is your string representation for Prof role
        } else if (seanceDto.getChefdepid() != null) {
            seance.setChefdep(chefDepartementRepository.findById(seanceDto.getChefdepid())
                    .orElseThrow(() -> new RuntimeException("Chef Departement not found")));
            seance.setRole("chefdep"); // Assuming "chefdep" is your string representation for Chef Departement role
        } else if (seanceDto.getCheffilid() != null) {
            seance.setCheffil(chefFiliereRepository.findById(seanceDto.getCheffilid())
                    .orElseThrow(() -> new RuntimeException("Chef filiere not found")));
            seance.setRole("cheffil"); // Assuming "cheffil" is your string representation for Chef Filiere role
        }

        if (seanceDto.getLocal() != null) {
            seance.setLocal(seanceDto.getLocal());
        }

        if (seanceDto.getSeanceType() != null) {
            seance.setSeanceType(seanceDto.getSeanceType());
        }

        Seance updatedSeance = seanceRepository.save(seance);
        return SeanceMapper.mapToSeanceDto(updatedSeance);
    }



    @Override
    public void deleteSeance(long id) {
        Seance seance = seanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seance not found"));
        seanceRepository.delete(seance);
    }

    @Override
    public List<SeanceDto> getSeancesByRoleAndId(String role, Long id) {
        List<Seance> seances;

        switch (role) {
            case "prof":
                seances = seanceRepository.findByProfId(id);
                break;
            case "chefdep":
                seances = seanceRepository.findByChefdepId(id);
                break;
            case "cheffil":
                seances = seanceRepository.findByCheffilId(id);
                break;
            default:
                throw new IllegalArgumentException("Invalid role: " + role);
        }

        return seances.stream()
                .map(SeanceMapper::mapToSeanceDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<SeanceDto> getSeancesByType(String type) {
        // Perform any necessary validation or logic here
        List<Seance> seances = seanceRepository.findBySeanceType(type);
        return seances.stream()
                .map(SeanceMapper::mapToSeanceDto)
                .collect(Collectors.toList());
    }
}
