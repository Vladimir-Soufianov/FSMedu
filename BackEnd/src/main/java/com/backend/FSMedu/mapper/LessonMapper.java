package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.LessonDto;
import com.backend.FSMedu.entity.Lesson;
import com.backend.FSMedu.entity.Mod;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class LessonMapper {

    public static LessonDto mapToLessonDto(Lesson lesson) {
        LessonDto lessonDto = new LessonDto();
        lessonDto.setId(lesson.getId());
        lessonDto.setType(lesson.getType());

        // Check if the fileUrl is already a full URL; if not, construct it
        if (lesson.getFileUrl() != null) {
            if (!lesson.getFileUrl().startsWith("http")) {
                String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/files/")
                        .path(lesson.getFileUrl())
                        .toUriString();
                lessonDto.setFileUrl(fileUrl);
                System.out.println("Constructed file URL in Mapper: " + fileUrl); // Debug log
            } else {
                lessonDto.setFileUrl(lesson.getFileUrl());
                System.out.println("Using existing file URL in Mapper: " + lesson.getFileUrl()); // Debug log
            }
        }

        lessonDto.setTitle(lesson.getTitle());
        lessonDto.setDescription(lesson.getDescription());
        if (lesson.getModule() != null) {
            lessonDto.setModuleId(lesson.getModule().getId());
        }
        return lessonDto;
    }

    public static Lesson mapToLesson(LessonDto lessonDto) {
        Lesson lesson = new Lesson();
        lesson.setId(lessonDto.getId());
        lesson.setType(lessonDto.getType());
        // Use lessonDto.getFileUrl() directly assuming it's the relative path
        lesson.setFileUrl(lessonDto.getFileUrl());
        lesson.setTitle(lessonDto.getTitle());
        lesson.setDescription(lessonDto.getDescription());

        if (lessonDto.getModuleId() != null) {
            Mod module = new Mod();
            module.setId(lessonDto.getModuleId());
            lesson.setModule(module);
        }
        return lesson;
    }
}

