package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.OrientationDto;
import com.backend.FSMedu.entity.Orientation;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.OrientationMapper;
import com.backend.FSMedu.repository.OrientationRepository;
import com.backend.FSMedu.service.OrientationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrientationServiceImpl implements OrientationService {
    private OrientationRepository orientationRepository;

    @Override
    public OrientationDto createOrientation(OrientationDto orientationDto) {
        Orientation orientation = OrientationMapper.mapToOrientation(orientationDto);
        Orientation savedOrientation = orientationRepository.save(orientation);
        return OrientationMapper.mapToOrientationDto(savedOrientation);
    }

    @Override
    public OrientationDto getOrientationById(Long orientationId) {
        Orientation orientation = orientationRepository.findById(orientationId)
                .orElseThrow(() -> new ResourceNotFoundException("Orientation not found"));
        return OrientationMapper.mapToOrientationDto(orientation);
    }

    @Override
    public List<OrientationDto> getAllOrientations() {
        List<Orientation> orientations = orientationRepository.findAll();
        return orientations.stream()
                .map(OrientationMapper::mapToOrientationDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrientationDto updateOrientation(Long orientationId, OrientationDto updatedOrientationDto) {
        Orientation orientation = orientationRepository.findById(orientationId)
                .orElseThrow(() -> new ResourceNotFoundException("Orientation not found"));

        orientation.setNom(updatedOrientationDto.getNom() != null ? updatedOrientationDto.getNom() : orientation.getNom());
        orientation.setPrenom(updatedOrientationDto.getPrenom() != null ? updatedOrientationDto.getPrenom() : orientation.getPrenom());
        orientation.setCin(updatedOrientationDto.getCin() != null ? updatedOrientationDto.getCin() : orientation.getCin());
        orientation.setMatricule(updatedOrientationDto.getMatricule() != null ? updatedOrientationDto.getMatricule() : orientation.getMatricule());
        orientation.setRole(updatedOrientationDto.getRole() != null ? updatedOrientationDto.getRole() : orientation.getRole());
        orientation.setEmail(updatedOrientationDto.getEmail() != null ? updatedOrientationDto.getEmail() : orientation.getEmail());
        orientation.setMdp(updatedOrientationDto.getMdp() != null ? updatedOrientationDto.getMdp() : orientation.getMdp());


        Orientation updatedOrientation = orientationRepository.save(orientation);
        return OrientationMapper.mapToOrientationDto(updatedOrientation);
    }

    @Override
    public void deleteOrientation(Long orientationId) {
        Orientation orientation = orientationRepository.findById(orientationId)
                .orElseThrow(() -> new ResourceNotFoundException("Orientation not found"));
        orientationRepository.deleteById(orientationId);
    }

    @Override
    public OrientationDto findByCinAndMdp(String cin, String Mdp) {
        Orientation orientation = orientationRepository.findByCinAndMdp(cin, Mdp);
        if (orientation != null) {
            OrientationDto orientationDto = new OrientationDto();
            orientationDto.setId(orientation.getId());
            orientationDto.setNom(orientation.getNom());
            orientationDto.setPrenom(orientation.getPrenom());
            orientationDto.setCin(orientation.getCin());
            orientationDto.setMatricule(orientation.getMatricule());
            orientationDto.setRole(orientation.getRole());
            orientationDto.setEmail(orientation.getEmail());
            orientationDto.setMdp(orientation.getMdp());
            return orientationDto;
        }
        return null;
    }

    @Override
    public OrientationDto findByCinAndMatricule(String cin, String matricule) {
        Orientation orientation = orientationRepository.findByCinAndMatricule(cin, matricule);
        if (orientation != null) {
            return OrientationMapper.mapToOrientationDto(orientation);
        }
        return null; // Or handle as per your application logic
    }


    @Autowired
    public OrientationServiceImpl(OrientationRepository orientationRepository) {
        this.orientationRepository = orientationRepository;
    }
}
