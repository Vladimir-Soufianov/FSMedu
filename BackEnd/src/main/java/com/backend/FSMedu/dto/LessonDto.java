package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Lessontype;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LessonDto {
    private long id;
    private Lessontype type;
    private String fileUrl;
    private String title;
    private String description;
    private Long moduleId;
}
