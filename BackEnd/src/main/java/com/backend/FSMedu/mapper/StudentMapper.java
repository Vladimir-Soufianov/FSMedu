package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.StudentDto;
import com.backend.FSMedu.entity.*;

import java.util.stream.Collectors;


public class StudentMapper {
    public static StudentDto mapToStudentDto(Student student){
        StudentDto studentDto =new StudentDto();
        studentDto.setId(student.getId());
        studentDto.setNom(student.getNom());
        studentDto.setPrenom(student.getPrenom());
        studentDto.setCin(student.getCin());
        studentDto.setCne(student.getCne());
        studentDto.setEmail(student.getEmail());
        studentDto.setEmail_aca(student.getEmail_aca());
        studentDto.setMdp(student.getMdp());
        studentDto.setCe(student.getCe());
        studentDto.setClubIds(student.getClubs().stream().map(Club::getId).collect(Collectors.toList()));
        studentDto.setModIds(student.getMods().stream().map(Mod::getId).collect(Collectors.toList()));
        studentDto.setFiliereIds(student.getFilieres().stream().map(Filiere::getId).collect(Collectors.toList()));
        studentDto.setSemestreIds(student.getSemestres().stream().map(Semestre::getId).collect(Collectors.toList()));
        return studentDto;

    }

    public static Student mapToStudent(StudentDto studentDto) {
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setNom(studentDto.getNom());
        student.setPrenom(studentDto.getPrenom());
        student.setCin(studentDto.getCin());
        student.setCne(studentDto.getCne());
        student.setEmail(studentDto.getEmail());
        student.setEmail_aca(studentDto.getEmail_aca());
        student.setMdp(studentDto.getMdp());
        student.setCe(studentDto.getCe());
        return student;
    }

}
