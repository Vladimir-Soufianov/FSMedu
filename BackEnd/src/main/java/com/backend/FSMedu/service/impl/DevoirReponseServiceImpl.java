package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.DevoirReponseDto;
import com.backend.FSMedu.entity.Devoir;
import com.backend.FSMedu.entity.DevoirReponse;
import com.backend.FSMedu.entity.Student;
import com.backend.FSMedu.mapper.DevoirReponseMapper;
import com.backend.FSMedu.repository.DevoirReponseRepository;
import com.backend.FSMedu.repository.DevoirRepository;
import com.backend.FSMedu.repository.StudentRepository;
import com.backend.FSMedu.service.DevoirReponseService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DevoirReponseServiceImpl implements DevoirReponseService {

    private DevoirReponseRepository repository;
    private DevoirRepository devoirRepository;
    private final ResourceLoader resourceLoader;
    private StudentRepository studentRepository;

    @Autowired
   public DevoirReponseServiceImpl(DevoirReponseRepository repository,
                                               DevoirRepository devoirRepository,
                                               ResourceLoader resourceLoader,
                                               StudentRepository studentRepository ){
         this.devoirRepository=devoirRepository;
         this.repository=repository;
         this.resourceLoader=resourceLoader;
         this.studentRepository=studentRepository;
     }

    @Override
    public List<DevoirReponseDto> getReponsesByDevoir(Long devoirId) {
        return repository.findByDevoirId(devoirId)
                .stream()
                .map(DevoirReponseMapper::mapToDevoirReponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DevoirReponseDto> getReponsesByStudent(Long studentId) {
        return repository.findByStudentId(studentId)
                .stream()
                .map(DevoirReponseMapper::mapToDevoirReponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DevoirReponseDto> getAllReponses() {
        return repository.findAll()
                .stream()
                .map(DevoirReponseMapper::mapToDevoirReponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public DevoirReponseDto getReponseById(Long id) {
        Optional<DevoirReponse> reponseOpt = repository.findById(id);
        return reponseOpt.map(DevoirReponseMapper::mapToDevoirReponseDto).orElse(null);
    }

    @Override
    public DevoirReponseDto saveReponse(DevoirReponseDto dto, MultipartFile devfile) throws IOException {
        // Map DTO to entity
        DevoirReponse reponse = DevoirReponseMapper.mapToDevoirReponse(dto);

        // Save file and update entity with file URL if file exists
        if (devfile != null && !devfile.isEmpty()) {
            String fileName = storeFile(devfile); // This method should return the full file URL
            reponse.setFichierUrl(fileName); // Update entity with file URL
        }

        // Validate and save DevoirReponse entity
        Optional<Devoir> devoirOpt = devoirRepository.findById(dto.getDevoirId());
        Optional<Student> studentOpt = studentRepository.findById(dto.getStudentId());
        if (devoirOpt.isPresent() && studentOpt.isPresent()) {
            reponse.setDevoir(devoirOpt.get());
            reponse.setStudent(studentOpt.get());
            DevoirReponse savedReponse = repository.save(reponse);
            return DevoirReponseMapper.mapToDevoirReponseDto(savedReponse);
        } else {
            throw new IllegalArgumentException("Invalid devoirId or studentId");
        }
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

        // Construct and return the full file URL
        String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(fileName)
                .toUriString();
        return fileUrl;
    }



    @Override
    public DevoirReponseDto updateReponse(long id, DevoirReponseDto reponseDto, MultipartFile devfile) throws IOException {
        Optional<DevoirReponse> reponseOptional = repository.findById(id);
        if (!reponseOptional.isPresent()) {
            // Handle entity not found
            return null;
        }

        DevoirReponse existingReponse = reponseOptional.get();

        // Update fields from DTO
        if (reponseDto.getDevoirId() != 0) {
            Devoir devoir = devoirRepository.findById(reponseDto.getDevoirId()).orElse(null);
            existingReponse.setDevoir(devoir);
        }
        if (reponseDto.getStudentId() != 0) {
            Student student = studentRepository.findById(reponseDto.getStudentId()).orElse(null);
            existingReponse.setStudent(student);
        }
        if (reponseDto.getFichierUrl() != null) {
            existingReponse.setFichierUrl(reponseDto.getFichierUrl());
        }
        if (devfile != null && !devfile.isEmpty()) {
            String fileName = storeFile(devfile); // Store file and get its name or path
            existingReponse.setFichierUrl(fileName); // Set only the file name or path, not a full URL
            System.out.println("Stored file name: " + fileName); // Debug log
        }

        // Save updated entity
        existingReponse = repository.save(existingReponse);

        DevoirReponseDto updatedDto = DevoirReponseMapper.mapToDevoirReponseDto(existingReponse);
        System.out.println("Updated DTO: " + updatedDto.getFichierUrl()); // Debug log

        return updatedDto;
    }


    @Override
    public void deleteReponse(Long id) {
        repository.deleteById(id);
    }
}
