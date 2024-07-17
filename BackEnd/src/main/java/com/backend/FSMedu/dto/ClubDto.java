package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClubDto {
    private long id;

    private String nom;

    private List<Student> students;

}
