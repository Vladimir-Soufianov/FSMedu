package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.dto.StudentDto;
import com.backend.FSMedu.entity.Student;
import jakarta.mail.MessagingException;

import java.util.List;

public interface StudentService {
    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentById(long studentId);

    List<StudentDto> getAllStudents();

    StudentDto updateStudent(long id, StudentDto studentDto);

    void deleteStudent(long studentId);

    StudentDto findByCeAndMdp(String ce, String mdp);

    List<StudentDto> getStudentsByModuleId(Long moduleId);

    void sendEmailToStudents(List<StudentDto> students, String subject, String message);

    void sendEmailToStudentById(Long studentId, String subject, String message) throws MessagingException;

    List<Long> findModuleIdsByStudentId(Long studentId);

    List<ModDto> findModsByStudentId(Long studentId);
    List<ModDto> getModulesForStudent(Long studentId);
    StudentDto replaceModuleForStudent(long studentId, long modIdToReplace, long newModId);
    Student getStudentByCinAndCe(String cin, String ce);
}
