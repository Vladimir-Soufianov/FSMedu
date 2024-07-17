package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.DevoirDto;
import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.dto.StudentDto;
import com.backend.FSMedu.entity.*;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.ModMapper;
import com.backend.FSMedu.mapper.StudentMapper;
import com.backend.FSMedu.repository.*;
import com.backend.FSMedu.service.StudentService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class StudentServiceImpl implements StudentService {
    private StudentRepository studentRepository;
    private ClubRepository clubRepository;
    private ModRepository modRepository;
    private NoteRepository noteRepository;
    private YearRepository yearRepository;
    private final JavaMailSender javaMailSender;
    private EmailService emailService;
    private FiliereRepository filiereRepository;
    private SemestreRepository semestreRepository;


    @Autowired
    public StudentServiceImpl(
            StudentRepository studentRepository,ClubRepository clubRepository,
            NoteRepository noteRepository, ModRepository modRepository,YearRepository yearRepository
    ,JavaMailSender javaMailSender,EmailService emailService,FiliereRepository filiereRepository
    ,SemestreRepository semestreRepository){
        this.studentRepository=studentRepository;
        this.clubRepository=clubRepository;
        this.modRepository=modRepository;
        this.noteRepository=noteRepository;
        this.yearRepository=yearRepository;
    this.javaMailSender=javaMailSender;
    this.emailService=emailService;
    this.filiereRepository=filiereRepository;
this.semestreRepository=semestreRepository;
    }

    @Override
    public StudentDto getStudentById(long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(student -> {
                    StudentDto studentDto = StudentMapper.mapToStudentDto(student);
                    studentDto.setClubIds(student.getClubs().stream().map(Club::getId).collect(Collectors.toList()));
                    studentDto.setModIds(student.getMods().stream().map(Mod::getId).collect(Collectors.toList()));
                    return studentDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StudentDto createStudent(StudentDto studentDto) {
        // Create Student entity from StudentDto
        Student student = StudentMapper.mapToStudent(studentDto);

        // Set student's mods
        if (studentDto.getModIds() != null && !studentDto.getModIds().isEmpty()) {
            List<Mod> mods = studentDto.getModIds().stream()
                    .map(modId -> modRepository.findById(modId)
                            .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id: " + modId)))
                    .collect(Collectors.toList());
            student.setMods(mods);

            if (studentDto.getFiliereIds() != null && !studentDto.getFiliereIds().isEmpty()) {
                List<Filiere> filieres = studentDto.getFiliereIds().stream()
                        .map(filiereId -> filiereRepository.findById(filiereId)
                                .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with ID: " + filiereId)))
                        .collect(Collectors.toList());
                student.setFilieres(filieres);
            }
            if (studentDto.getSemestreIds() != null && !studentDto.getSemestreIds().isEmpty()) {
                List<Semestre> semestres = studentDto.getSemestreIds().stream()
                        .map(semestreId -> semestreRepository.findById(semestreId)
                                .orElseThrow(() -> new ResourceNotFoundException("Semestre not found with ID: " + semestreId)))
                        .collect(Collectors.toList());
                student.setSemestres(semestres);
            }

            // Create and save notes for each mod
            for (Mod mod : mods) {
                Note note = new Note();
                note.setMod(mod);
                note.setStudent(student);
                note.setNote(-1); // Set a default note value, adjust as needed
                Note savedNote = noteRepository.save(note);
            }
        }

        // Save the student entity
        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }


    @Override
    @Transactional
    public StudentDto updateStudent(long id, StudentDto studentDto) {
        // Fetch the existing student entity by id
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        // Update fields if provided
        if (studentDto.getNom() != null) { existingStudent.setNom(studentDto.getNom()); }
        if (studentDto.getPrenom() != null) { existingStudent.setPrenom(studentDto.getPrenom()); }
        if (studentDto.getCin() != null) { existingStudent.setCin(studentDto.getCin()); }
        if (studentDto.getCne() != null) { existingStudent.setCne(studentDto.getCne()); }
        if (studentDto.getEmail() != null) { existingStudent.setEmail(studentDto.getEmail()); }
        if (studentDto.getEmail_aca() != null) { existingStudent.setEmail_aca(studentDto.getEmail_aca()); }
        if (studentDto.getMdp() != null) { existingStudent.setMdp(studentDto.getMdp()); }
        if (studentDto.getCe() != null) { existingStudent.setCe(studentDto.getCe()); }

        // Update clubs if provided
        if (studentDto.getClubIds() != null && !studentDto.getClubIds().isEmpty()) {
            List<Club> clubsToAdd = studentDto.getClubIds().stream()
                    .map(clubId -> clubRepository.findById(clubId)
                            .orElseThrow(() -> new ResourceNotFoundException("Club not found with id: " + clubId)))
                    .collect(Collectors.toList());

            clubsToAdd.forEach(club -> {
                if (!existingStudent.getClubs().contains(club)) {
                    existingStudent.getClubs().add(club);
                    club.getStudents().add(existingStudent);
                }
            });
        }

        // Update filieres if provided
        if (studentDto.getFiliereIds() != null && !studentDto.getFiliereIds().isEmpty()) {
            List<Filiere> filieresToAdd = studentDto.getFiliereIds().stream()
                    .map(filiereId -> filiereRepository.findById(filiereId)
                            .orElseThrow(() -> new ResourceNotFoundException("Filiere not found with ID: " + filiereId)))
                    .collect(Collectors.toList());

            existingStudent.getFilieres().addAll(filieresToAdd);
        }

        // Update semestres if provided
        if (studentDto.getSemestreIds() != null && !studentDto.getSemestreIds().isEmpty()) {
            List<Semestre> semestresToAdd = studentDto.getSemestreIds().stream()
                    .map(semestreId -> semestreRepository.findById(semestreId)
                            .orElseThrow(() -> new ResourceNotFoundException("Semestre not found with ID: " + semestreId)))
                    .collect(Collectors.toList());

            existingStudent.getSemestres().addAll(semestresToAdd);
        }

        // Update mods if provided
        if (studentDto.getModIds() != null && !studentDto.getModIds().isEmpty()) {
            List<Mod> modsToAdd = studentDto.getModIds().stream()
                    .map(modId -> modRepository.findById(modId)
                            .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id: " + modId)))
                    .collect(Collectors.toList());

            existingStudent.getMods().addAll(modsToAdd);

            // Fetch the year by its ID
            Long yearId = 1L; // Replace with the actual ID you want to use
            Year year = yearRepository.findById(yearId)
                    .orElseThrow(() -> new ResourceNotFoundException("Year not found with id: " + yearId));

            // Create and save notes for each mod
            modsToAdd.forEach(mod -> {
                Note note = new Note();
                note.setMod(mod);
                note.setStudent(existingStudent);
                note.setYear(yearRepository.findByActiveTrue()); // Set the year to the fetched year
                note.setNote(-1); // Set default note value, adjust as needed
                Note savedNote = noteRepository.save(note);
            });
        }

        Student updatedStudent = studentRepository.save(existingStudent);
        return StudentMapper.mapToStudentDto(updatedStudent);
    }

    @Override
    @Transactional
    public StudentDto replaceModuleForStudent(long studentId, long modIdToReplace, long newModId) {
        // Fetch the existing student entity by id
        Student existingStudent = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        // Fetch the module to replace
        Mod modToReplace = modRepository.findById(modIdToReplace)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + modIdToReplace));

        // Fetch the new module to replace with
        Mod newMod = modRepository.findById(newModId)
                .orElseThrow(() -> new ResourceNotFoundException("New Module not found with id: " + newModId));

        // Replace the module in the student's mods list
        List<Mod> studentMods = existingStudent.getMods();
        studentMods.remove(modToReplace); // Remove the old module
        studentMods.add(newMod); // Add the new module

        // Set the updated mods list to the student
        existingStudent.setMods(studentMods);

        // Save the updated student entity
        Student updatedStudent = studentRepository.save(existingStudent);

        return StudentMapper.mapToStudentDto(updatedStudent);
    }




    @Override
    public void deleteStudent(long id) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        if (studentOptional.isPresent()) {
            studentRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
    }

    @Override
    public StudentDto findByCeAndMdp(String ce, String mdp) {
        Student student = studentRepository.findByCeAndMdp(ce, mdp);

        if (student != null) {
            StudentDto studentDto = new StudentDto();
            studentDto.setId(student.getId());
            studentDto.setCe(student.getCe());
            studentDto.setMdp(student.getMdp());
            studentDto.setNom(student.getNom());
            studentDto.setPrenom(student.getPrenom());
            studentDto.setCin(student.getCin());
            studentDto.setCne(student.getCne());
            studentDto.setEmail(student.getEmail());
            studentDto.setEmail_aca(student.getEmail_aca());
            return studentDto;
        }
        return null;
    }

    @Override
    public List<StudentDto> getStudentsByModuleId(Long moduleId) {
        Mod mod = modRepository.findById(moduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Mod not found with id: " + moduleId));

        List<Student> students = studentRepository.findByMods(mod);
        return students.stream()
                .map(StudentMapper::mapToStudentDto)
                .collect(Collectors.toList());
    }

    @Override
    public void sendEmailToStudents(List<StudentDto> students, String subject, String message) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        try {
            for (StudentDto student : students) {
                helper.setTo(student.getEmail()); // Assuming StudentDTO has an email field
                helper.setSubject(subject);
                helper.setText(message);
                javaMailSender.send(mimeMessage);
            }
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email to students", e);
        }
    }
    @Override
    public Student getStudentByCinAndCe(String cin, String ce) {
        return studentRepository.findByCinAndCe(cin, ce);
    }

    public void sendEmailToStudentById(Long studentId, String subject, String message) throws MessagingException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with id: " + studentId));

        String email = student.getEmail();
        emailService.sendEmail(email, subject, message);
    }

    @Override
    public List<Long> findModuleIdsByStudentId(Long studentId) {
        return studentRepository.findModIdsById(studentId);
    }

    @Override
    public List<ModDto> findModsByStudentId(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        return student.getMods().stream()
                .map(this::mapToModDto)
                .collect(Collectors.toList());
    }
    private ModDto mapToModDto(Mod mod) {
        return ModMapper.mapToModDto(mod); // Utilize your existing mapper
    }

    @Override
    public List<ModDto> getModulesForStudent(Long studentId) {
        List<ModDto> studentMods = findModsByStudentId(studentId);
        List<ModDto> filteredMods = studentMods.stream()
                .filter(modDto -> isSemestrePlusTwo(modDto.getSemestreId(), studentId))
                .collect(Collectors.toList());
        return filteredMods;
    }
    private boolean isSemestrePlusTwo(Long semestreId, Long studentId) {
        List<ModDto> mods = findModsByStudentId(studentId);
        return mods.stream()
                .anyMatch(modDto -> modDto.getSemestreId().equals(semestreId + 2));
    }

}
