package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.LessonDto;
import com.backend.FSMedu.entity.Mod;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LessonService {
    LessonDto createLesson(LessonDto lessonDto, MultipartFile lessonFile) throws IOException;
    LessonDto getLessonById(long id);
    List<LessonDto> getAllLessons();
    LessonDto updateLesson(long id, LessonDto lessonDto, MultipartFile lessonFile) throws IOException;
    String storeFile(MultipartFile file) throws IOException;
    void deleteLesson(long id);
    Mod getModuleByLessonId(Long lessonId);
    List<LessonDto> getLessonsByModuleId(Long moduleId);
    }