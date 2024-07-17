package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Student;
import com.backend.FSMedu.entity.Year;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoteDto {
    private Long id;
    private Long studentId;
    private long modId;
    private int note;
    private Long yearId;
}
