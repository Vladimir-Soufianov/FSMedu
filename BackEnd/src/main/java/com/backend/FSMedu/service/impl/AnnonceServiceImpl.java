package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.AnnonceDto;
import com.backend.FSMedu.entity.Annonce;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.AnnonceMapper;
import com.backend.FSMedu.repository.AnnonceRepository;
import com.backend.FSMedu.service.AnnonceService;
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
public class AnnonceServiceImpl implements AnnonceService {

    private final AnnonceRepository annonceRepository;
    private final ResourceLoader resourceLoader;

    @Autowired
    public AnnonceServiceImpl(AnnonceRepository annonceRepository,ResourceLoader resourceLoader) {
        this.annonceRepository = annonceRepository;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public AnnonceDto createAnnonce(AnnonceDto annonceDTO, MultipartFile imageFile) throws IOException {
        String fileName = storeImage(imageFile);
        annonceDTO.setImageUrl(fileName);
        Annonce annonce = AnnonceMapper.mapToAnnonce(annonceDTO);
        annonce = annonceRepository.save(annonce);
        return AnnonceMapper.mapToAnnonceDto(annonce);
    }

    @Override
    public String storeImage(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileName = System.currentTimeMillis() + extension;

        String relativePath = "static/images"; // Ensure correct relative path

        String absolutePath = "src/main/resources/" + relativePath; // Absolute path based on project structure

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
    public List<AnnonceDto> getAllAnnonces() {
        return annonceRepository.findAll().stream()
                .map(AnnonceMapper::mapToAnnonceDto)
                .collect(Collectors.toList());
    }

    @Override
    public AnnonceDto getAnnonceById(Long id) {
        Annonce annonce = annonceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annonce not found with id: " + id));
        return AnnonceMapper.mapToAnnonceDto(annonce);
    }

    @Override
    public AnnonceDto updateAnnonce(Long id, AnnonceDto annonceDTO) {
        Optional<Annonce> optionalAnnonce = annonceRepository.findById(id);
        if (optionalAnnonce.isEmpty()) {
            throw new ResourceNotFoundException("Annonce not found with id: " + id);
        }
        Annonce existingAnnonce = optionalAnnonce.get();
        if (annonceDTO.getTitle() != null) {
            existingAnnonce.setTitle(annonceDTO.getTitle());
        }
        if (annonceDTO.getDescription() != null) {
            existingAnnonce.setDescription(annonceDTO.getDescription());
        }
        if (annonceDTO.getImageUrl() != null) {
            existingAnnonce.setImageUrl(annonceDTO.getImageUrl());
        }
        existingAnnonce = annonceRepository.save(existingAnnonce);
        return AnnonceMapper.mapToAnnonceDto(existingAnnonce);
    }

    @Override
    public void deleteAnnonce(Long id) {
        Annonce annonce = annonceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annonce not found with id: " + id));
        annonceRepository.delete(annonce);
    }
}
