package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.ProfDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Prof;
import com.backend.FSMedu.entity.Seance;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.ProfMapper;
import com.backend.FSMedu.repository.ModRepository;
import com.backend.FSMedu.repository.ProfRepository;
import com.backend.FSMedu.repository.SeanceRepository;
import com.backend.FSMedu.service.ProfService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfServiceImpl implements ProfService {

    private final ProfRepository profRepository;
    private final ProfMapper profMapper;
    private final ModRepository modRepository;
    private final SeanceRepository seanceRepository;

    public ProfServiceImpl(ProfRepository profRepository, ProfMapper profMapper,
                       ModRepository modRepository, SeanceRepository seanceRepository) {
        this.profRepository = profRepository;
        this.profMapper = profMapper;
        this.modRepository = modRepository;
        this.seanceRepository = seanceRepository;
    }

    @Override
    public ProfDto createProf(ProfDto profDto) {
        Prof prof = new Prof();
        prof.setNom(profDto.getNom());
        prof.setPrenom(profDto.getPrenom());
        prof.setCin(profDto.getCin());
        prof.setMatricule(profDto.getMatricule());
        prof.setRole(profDto.getRole());
        prof.setEmail(profDto.getEmail());
        prof.setMdp(profDto.getMdp());

        Prof savedProf = profRepository.save(prof);

        // Update mods with the profId
        if (profDto.getModIds() != null && !profDto.getModIds().isEmpty()) {
            List<Mod> modsToUpdate = modRepository.findAllById(profDto.getModIds());
            modsToUpdate.forEach(mod -> mod.setProf(savedProf));
            modRepository.saveAll(modsToUpdate);
        }

        return ProfMapper.mapToProfDto(savedProf);
    }



    @Override
    public ProfDto getProfById(Long profId) {
        Prof prof = profRepository.findById(profId)
                .orElseThrow(() -> new ResourceNotFoundException("Prof not found with id: " + profId));
        return ProfMapper.mapToProfDto(prof);
    }

    @Override
    public List<ProfDto> getAllProfs() {
        List<Prof> profs = profRepository.findAll();
        return profs.stream()
                .map(ProfMapper::mapToProfDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProfDto updateProf(Long profId, ProfDto updatedProf) {
        Prof existingProf = profRepository.findById(profId)
                .orElseThrow(() -> new ResourceNotFoundException("Prof not found with id: " + profId));

        // Update basic fields if provided
        if (updatedProf.getNom() != null) { existingProf.setNom(updatedProf.getNom()); }
        if (updatedProf.getPrenom() != null) { existingProf.setPrenom(updatedProf.getPrenom()); }
        if (updatedProf.getCin() != null) { existingProf.setCin(updatedProf.getCin()); }
        if (updatedProf.getMatricule() != null) { existingProf.setMatricule(updatedProf.getMatricule()); }
        if (updatedProf.getRole() != null) { existingProf.setRole(updatedProf.getRole()); }
        if (updatedProf.getEmail() != null) { existingProf.setEmail(updatedProf.getEmail()); }
        if (updatedProf.getMdp() != null) { existingProf.setMdp(updatedProf.getMdp()); }

        // Update mods if provided
        if (updatedProf.getModIds() != null && !updatedProf.getModIds().isEmpty()) {
            List<Mod> mods = updatedProf.getModIds().stream()
                    .map(modId -> modRepository.findById(modId)
                            .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id: " + modId)))
                    .peek(mod -> mod.setProf(existingProf)) // Set the prof for each mod
                    .collect(Collectors.toList());
            existingProf.setMods(mods);
        }

        // Update seances if provided
        if (updatedProf.getSeanceIds() != null && !updatedProf.getSeanceIds().isEmpty()) {
            List<Seance> seances = updatedProf.getSeanceIds().stream()
                    .map(seanceId -> seanceRepository.findById(seanceId)
                            .orElseThrow(() -> new ResourceNotFoundException("Seance not found with id: " + seanceId)))
                    .peek(seance -> seance.setProf(existingProf)) // Set the prof for each seance
                    .collect(Collectors.toList());
            existingProf.setSeances(seances);
        }

        Prof savedProf = profRepository.save(existingProf);
        return ProfMapper.mapToProfDto(savedProf);
    }

    @Override
    public void deleteProf(Long profId) {
        Prof prof = profRepository.findById(profId)
                .orElseThrow(() -> new ResourceNotFoundException("Prof not found with id: " + profId));
        profRepository.delete(prof);
    }
    @Override
    @Transactional
    public ProfDto removeModFromProf(Long profId, Long modId) {
        Prof prof = profRepository.findById(profId)
                .orElseThrow(() -> new ResourceNotFoundException("Prof not found with id: " + profId));

        Mod mod = modRepository.findById(modId)
                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id: " + modId));

        if (!prof.getMods().contains(mod)) {
            throw new IllegalArgumentException("Mod with id " + modId + " is not associated with Prof with id " + profId);
        }
        prof.getMods().remove(mod);
        mod.setProf(null);
        Prof savedProf = profRepository.save(prof);
        return ProfMapper.mapToProfDto(savedProf);
    }

    @Override
    public ProfDto findByCinAndMatricule(String cin, String matricule) {
        Prof prof = profRepository.findByCinAndMatricule(cin, matricule);
        if (prof != null) {
            return ProfMapper.mapToProfDto(prof);
        }
        return null; // Or handle as per your application logic
    }



    @Override
    public ProfDto findByCinAndMdp(String cin, String mdp) {
        Prof prof = profRepository.findByCinAndMdp(cin, mdp);
        if (prof != null) {
            ProfDto profDto = new ProfDto();
            profDto.setId(prof.getId());
            profDto.setCin(prof.getCin());
            profDto.setNom(prof.getNom());
            profDto.setPrenom(prof.getPrenom());
            profDto.setMatricule(prof.getMatricule());
            profDto.setRole(prof.getRole());
            profDto.setEmail(prof.getEmail());
            profDto.setMdp(prof.getMdp());

            if (prof.getMods() != null) {
                profDto.setModIds(prof.getMods().stream()
                        .map(mod -> mod.getId())
                        .collect(Collectors.toList()));
            } else {
                profDto.setModIds(Collections.emptyList()); // or null, depending on your preference
            }
            if (prof.getSeances() != null) {
                profDto.setSeanceIds(prof.getSeances().stream()
                        .map(seance -> seance.getId())
                        .collect(Collectors.toList()));
            } else {
                profDto.setSeanceIds(Collections.emptyList()); // or null, depending on your preference
            }
            return profDto;
        }

        return null;
    }
}



