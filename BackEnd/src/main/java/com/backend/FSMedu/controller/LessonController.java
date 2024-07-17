package com.backend.FSMedu.controller;
import com.backend.FSMedu.dto.LessonDto;
import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.backend.FSMedu.mapper.ModMapper.mapToModDto;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonService lessonService;

    @Autowired
    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public ResponseEntity<List<LessonDto>> getAllLessons() {
        List<LessonDto> lessons = lessonService.getAllLessons();
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonDto> getLessonById(@PathVariable("id") Long id) {
        LessonDto lesson = lessonService.getLessonById(id);
        return ResponseEntity.ok(lesson);
    }

    @PostMapping
    public ResponseEntity<LessonDto> createLesson(@ModelAttribute LessonDto lessonDto,
                                                  @RequestParam(value = "lessonFile", required = false) MultipartFile lessonFile) throws IOException {
        LessonDto createdLesson = lessonService.createLesson(lessonDto, lessonFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLesson);
    }

    @PostMapping("/{id}")
    public ResponseEntity<LessonDto> updateLesson(@PathVariable("id") Long id,
                                                  @ModelAttribute LessonDto lessonDto,
                                                  @RequestParam(value = "lessonFile", required = false) MultipartFile lessonFile) throws IOException {
        LessonDto updatedLesson = lessonService.updateLesson(id, lessonDto, lessonFile);
        return ResponseEntity.ok(updatedLesson);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable("id") Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{lessonId}/module")
    public ResponseEntity<ModDto> getModuleByLessonId(@PathVariable Long lessonId) {
        Mod mod = lessonService.getModuleByLessonId(lessonId);
        if (mod != null) {
            ModDto modDto = mapToModDto(mod); // Map Mod entity to ModDto
            return ResponseEntity.ok(modDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<LessonDto>> getLessonsByModuleId(@PathVariable Long moduleId) {
        List<LessonDto> lessons = lessonService.getLessonsByModuleId(moduleId);
        return ResponseEntity.ok(lessons);
    }
}
