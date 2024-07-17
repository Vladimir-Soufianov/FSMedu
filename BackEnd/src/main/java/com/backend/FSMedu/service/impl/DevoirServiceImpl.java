package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.DevoirDto;
import com.backend.FSMedu.entity.*;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.DevoirMapper;
import com.backend.FSMedu.repository.*;
import com.backend.FSMedu.service.DevoirService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DevoirServiceImpl implements DevoirService {
    private final DevoirRepository devoirRepository;
    private ModRepository moduleRepository;
    private ProfRepository profRepository;
    private ChefDepartementRepository chefDepartementRepository;
    private ChefFiliereRepository chefFiliereRepository;
    private final ResourceLoader resourceLoader;

    @Autowired
    public DevoirServiceImpl(DevoirRepository devoirRepository,
                             ModRepository moduleRepository, ProfRepository profRepository,
                             ChefDepartementRepository chefDepartementRepository,
                             ChefFiliereRepository chefFiliereRepository,
                             ResourceLoader resourceLoader) {
        this.devoirRepository = devoirRepository;
        this.moduleRepository = moduleRepository;
        this.profRepository = profRepository;
        this.chefDepartementRepository = chefDepartementRepository;
        this.chefFiliereRepository = chefFiliereRepository;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public DevoirDto createDevoir(DevoirDto devoirDto, MultipartFile devfile) throws IOException {
        String fileName = storeFile(devfile);
        devoirDto.setFileUrl(fileName);
        Devoir devoir = DevoirMapper.mapToDevoir(devoirDto);
        devoir = devoirRepository.save(devoir);
        return DevoirMapper.mapToDevoirDto(devoir);
    }



    @Override
    public String storeFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileName = System.currentTimeMillis() + extension;
        String relativePath = "static/images";
        String absolutePath = "src/main/resources/" + relativePath;
        File directory = new File(absolutePath);
        if (!directory.exists()) {
            directory.mkdirs(); // Create directories if they don't exist
        }
        String filePath = absolutePath + File.separator + fileName;
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());
        return fileName;
    }

    @Override
    public void deleteDevoir(long id) {
        // Find the Devoir entity by id
        Devoir devoir = devoirRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Devoir not found with id: " + id));

        // Delete related entities manually, if needed
        // Example: Delete Prof entity
        if (devoir.getProf() != null) {
            profRepository.delete(devoir.getProf());
        }

        // Example: Delete ChefDepartement entity
        if (devoir.getChefDepartement() != null) {
            chefDepartementRepository.delete(devoir.getChefDepartement());
        }

        // Example: Delete ChefFiliere entity
        if (devoir.getChefFiliere() != null) {
            chefFiliereRepository.delete(devoir.getChefFiliere());
        }

        // Example: Delete Module entity
        if (devoir.getModule() != null) {
            moduleRepository.delete(devoir.getModule());
        }

        // Now delete the Devoir entity itself
        devoirRepository.delete(devoir);
    }

    @Override
    public DevoirDto getDevoirById(long id) {
        Devoir devoir = devoirRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Devoir not found with id: " + id));
        return DevoirMapper.mapToDevoirDto(devoir);
    }

    @Override
    public List<DevoirDto> getAllDevoirs() {
        return devoirRepository.findAll().stream()
                .map(DevoirMapper::mapToDevoirDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DevoirDto updateDevoir(long id, DevoirDto devoirDto, MultipartFile devfile) throws IOException {
        Optional<Devoir> devoirOptional = devoirRepository.findById(id);
        if (!devoirOptional.isPresent()) {
            // Handle entity not found
            return null;
        }

        Devoir existingDevoir = devoirOptional.get();

        // Update fields based on DevoirDto
        if (devoirDto.getProfId() != 0) {
            Prof prof = profRepository.findById(devoirDto.getProfId()).orElse(null);
            existingDevoir.setProf(prof);
        }
        if (devoirDto.getChefDepartementId() != 0) {
            ChefDepartement chefDepartement = chefDepartementRepository.findById(devoirDto.getChefDepartementId()).orElse(null);
            existingDevoir.setChefDepartement(chefDepartement);
        }
        if (devoirDto.getChefFiliereId() != 0) {
            ChefFiliere chefFiliere = chefFiliereRepository.findById(devoirDto.getChefFiliereId()).orElse(null);
            existingDevoir.setChefFiliere(chefFiliere);
        }
        if (devoirDto.getModuleId() != null) {
            Mod module = moduleRepository.findById(devoirDto.getModuleId()).orElse(null);
            existingDevoir.setModule(module);}
            if (devoirDto.getTitle() != null) {
                existingDevoir.setTitle(devoirDto.getTitle());
            }
            if (devfile != null) {
                String fileName = storeFile(devfile);
                existingDevoir.setFileUrl(fileName);
            }
            if (devoirDto.getDescription() != null) {
                existingDevoir.setDescription(devoirDto.getDescription());
            }
            if (devoirDto.getFin() != null) {
                existingDevoir.setFin(devoirDto.getFin());
            }

            // Save the updated entity
            existingDevoir = devoirRepository.save(existingDevoir);

            return DevoirMapper.mapToDevoirDto(existingDevoir);
        }




    @Override
    public List<DevoirDto> findDevoirsByModuleId(Long moduleId) {
        List<Devoir> devoirs = devoirRepository.findByModuleId(moduleId);
        return devoirs.stream()
                .map(DevoirMapper::mapToDevoirDto)
                .collect(Collectors.toList());
    }

    }
