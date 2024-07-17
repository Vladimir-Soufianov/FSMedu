package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.LessonDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.service.LessonService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


import com.backend.FSMedu.dto.LessonDto;
import com.backend.FSMedu.entity.Lesson;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.LessonMapper;
import com.backend.FSMedu.repository.LessonRepository;
import com.backend.FSMedu.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final ResourceLoader resourceLoader;

    @Autowired
    public LessonServiceImpl(LessonRepository lessonRepository, ResourceLoader resourceLoader) {
        this.lessonRepository = lessonRepository;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public List<LessonDto> getAllLessons() {
        return lessonRepository.findAll().stream()
                .map(LessonMapper::mapToLessonDto)
                .collect(Collectors.toList());
    }

    @Override
    public LessonDto getLessonById(long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));
        return LessonMapper.mapToLessonDto(lesson);
    }

    @Override
    @Transactional
    public LessonDto createLesson(LessonDto lessonDto, MultipartFile lessonFile) throws IOException {
        String fileUrl = storeFile(lessonFile);
        lessonDto.setFileUrl(fileUrl);
        Lesson lesson = LessonMapper.mapToLesson(lessonDto);
        lesson = lessonRepository.save(lesson);
        return LessonMapper.mapToLessonDto(lesson);
    }

    @Override
    @Transactional
    public LessonDto updateLesson(long id, LessonDto lessonDto, MultipartFile lessonFile) throws IOException {
        Lesson existingLesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));

        existingLesson.setType(lessonDto.getType());
        existingLesson.setTitle(lessonDto.getTitle());
        existingLesson.setDescription(lessonDto.getDescription());

        if (lessonFile != null && !lessonFile.isEmpty()) {
            String fileUrl = storeFile(lessonFile);
            existingLesson.setFileUrl(fileUrl);
        }

        Lesson updatedLesson = lessonRepository.save(existingLesson);

        return LessonMapper.mapToLessonDto(updatedLesson);
    }

    @Override
    @Transactional
    public void deleteLesson(long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));
        lessonRepository.delete(lesson);
    }

    @Override
    public String storeFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileName = System.currentTimeMillis() + extension;
        String relativePath = "static/files";
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
    public Mod getModuleByLessonId(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found with id: " + lessonId));
        return lesson.getModule();
    }

    @Override
    public List<LessonDto> getLessonsByModuleId(Long moduleId) {
        List<Lesson> lessons = lessonRepository.findByModuleId(moduleId);
        return lessons.stream()
                .map(LessonMapper::mapToLessonDto)
                .collect(Collectors.toList());
    }
}

