package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.dto.StudentDto;
import com.backend.FSMedu.entity.Student;
import com.backend.FSMedu.service.StudentService;
import com.backend.FSMedu.service.impl.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private StudentService studentService;
    private final EmailService emailService;

    public StudentController(StudentService studentService,EmailService emailService){
        this.studentService=studentService;
        this.emailService=emailService;
    }

    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto){
        StudentDto savedStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long studentId) {
        StudentDto studentDto = studentService.getStudentById(studentId);
        return ResponseEntity.ok(studentDto);
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents(){
        List<StudentDto> students=studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @PostMapping("{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId , @RequestBody StudentDto updatedStudent){
        StudentDto studentDto = studentService.updateStudent(studentId,updatedStudent);
        return ResponseEntity.ok(studentDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") Long studentId){
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("Deleted succesfully");
    }

    @GetMapping("/module/{moduleId}")
    public List<StudentDto> getStudentsByModuleId(@PathVariable Long moduleId) {
        return studentService.getStudentsByModuleId(moduleId);
    }

    @PostMapping("/email/module/{moduleId}")
    public void sendEmailsToStudents(@PathVariable Long moduleId,
                                     @RequestParam String subject,
                                     @RequestParam String message) {
        List<StudentDto> students = studentService.getStudentsByModuleId(moduleId);
        studentService.sendEmailToStudents(students, subject, message);
    }

    @PostMapping("/email/{studentId}")
    public ResponseEntity<String> sendEmailToStudent(
            @PathVariable Long studentId,
            @RequestParam("subject") String subject,
            @RequestParam("message") String message) {
        try {
            studentService.sendEmailToStudentById(studentId, subject, message);
            return ResponseEntity.ok("Email sent successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Failed to send email: " + e.getMessage());
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }

    @GetMapping("/{studentId}/mods")
    public ResponseEntity<List<ModDto>> getModsByStudentId(@PathVariable Long studentId) {
        List<ModDto> mods = studentService.findModsByStudentId(studentId);
        return ResponseEntity.ok(mods);
    }

    @GetMapping("/{studentId}/filtered-mods")
    public ResponseEntity<List<ModDto>> getFilteredModsForStudent(@PathVariable Long studentId) {
        try {
            List<ModDto> filteredMods = studentService.getModulesForStudent(studentId);
            return new ResponseEntity<>(filteredMods, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{studentId}/replaceModule/{modIdToReplace}/{newModId}")
    public ResponseEntity<StudentDto> replaceModule(
            @PathVariable("studentId") Long studentId,
            @PathVariable("modIdToReplace") Long modIdToReplace,
            @PathVariable("newModId") Long newModId) {
            StudentDto updatedStudent = studentService.replaceModuleForStudent(studentId, modIdToReplace, newModId);
            return ResponseEntity.ok(updatedStudent);

    }
    @GetMapping("/forgot")
    public ResponseEntity<?> getStudentByCinAndCe(@RequestParam String cin, @RequestParam String ce) {
        Student student = studentService.getStudentByCinAndCe(cin, ce);
        if (student != null) {
            // Generate or fetch student's password securely (for demonstration, let's assume it's fetched securely)
            String password = student.getMdp();

            // Send email with password
            sendPasswordByEmail(student.getEmail(), student.getNom(), student.getPrenom(), password, student.getCe());

            return ResponseEntity.ok("Password sent to student's email.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found with cin: " + cin + " and ce: " + ce);
        }
    }

    private void sendPasswordByEmail(String toEmail, String nom, String prenom, String password, String ce) {
        String subject = "Réinitialisation de mot de passe";
        String text = "Bonjour " + prenom + " " + nom + ",\n\n" +
                "Votre nouveau mot de passe est : " + password + "\n\n" +
                "Merci de ne pas partager votre mot de passe avec d'autres personnes.\n\n" +
                "Cordialement,\n" +
                "L'équipe FSMedu";

        try {
            emailService.sendEmail(toEmail, subject, text);
        } catch (Exception e) {
            // Handle email sending exception
            e.printStackTrace();
            // You might want to throw a custom exception or log the error
        }
    }
}
