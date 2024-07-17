package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.InscriptionDto;
import com.backend.FSMedu.entity.Inscription;
import com.backend.FSMedu.entity.InscriptionStatus;
import com.backend.FSMedu.entity.Student;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.InscriptionMapper;
import com.backend.FSMedu.repository.InscriptionRepository;
import com.backend.FSMedu.repository.StudentRepository;
import com.backend.FSMedu.service.InscriptionService;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
public class InscriptionServiceImpl implements InscriptionService {

    private final InscriptionRepository inscriptionRepository;
    private final StudentRepository studentRepository;
    private final EmailService emailService;

    @Autowired
    public InscriptionServiceImpl(InscriptionRepository inscriptionRepository,StudentRepository studentRepository
    ,EmailService emailService) {
        this.inscriptionRepository = inscriptionRepository;
        this.studentRepository=studentRepository;
        this.emailService=emailService;
    }

    @Override
    public InscriptionDto createInscriptionWithFiles(InscriptionDto inscriptionDto,
                                                     MultipartFile cinFile,
                                                     MultipartFile imgFile,
                                                     MultipartFile bacFile) {
        String cinName= null;
        try {
            cinName = storeImage(cinFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String imgName = null;
        try {
            imgName = storeImage(imgFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String bacName= null;
        try {
            bacName = storeImage(bacFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        inscriptionDto.setImgUrl(imgName);
        inscriptionDto.setCinUrl(cinName);
        inscriptionDto.setBacUrl(bacName);
        inscriptionDto.setStatus(InscriptionStatus.PENDING);
        Inscription inscription=InscriptionMapper.mapToEntity(inscriptionDto);
        inscription=inscriptionRepository.save(inscription);
        return InscriptionMapper.mapToDto(inscription);

    }



    @Override
    public String storeImage(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileName = System.currentTimeMillis() + extension;

        String relativePath = "static/images"; // Ensure correct relative path
        String absolutePath = "src/main/resources/" + relativePath; // Absolute path based on project structure

        File directory = new File(absolutePath);
        if (!directory.exists()) {
            directory.mkdirs(); // Create directories if they don't exist
        }

        String filePath = absolutePath + File.separator + fileName;
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());
        return fileName;
    }

    @Override
    public List<InscriptionDto> getAllInscriptions() {
        return inscriptionRepository.findAll().stream()
                .map(InscriptionMapper::mapToDto)
                .collect(Collectors.toList())
                ;
    }

    @Override
    public void deleteInscription(Long id) {
        Inscription inscription=inscriptionRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Inscription non trouve "));
    }

    @Override
    @Transactional
    public void updateInscriptionStatus(Long inscriptionId, InscriptionStatus newStatus) {
        Inscription inscription = inscriptionRepository.findById(inscriptionId)
                .orElseThrow(() -> new EntityNotFoundException("Inscription not found with id: " + inscriptionId));

        inscription.setStatus(newStatus);
        inscriptionRepository.save(inscription);

        if (newStatus == InscriptionStatus.ACCEPTED) {
            createNewStudent(inscription.getNom(),
                    inscription.getPrenom(),
                    inscription.getCin(),
                    inscription.getCne(),
                    inscription.getEmail());
        }
        else if (newStatus == InscriptionStatus.REJECTED) {
            sendRejectionEmail(inscription.getEmail(), inscription.getNom(), inscription.getPrenom());
        }
    }
    private void sendRejectionEmail(String toEmail, String nom, String prenom) {
        String subject = "Demande d'inscription";
        String text = "Salut" + prenom + " " + nom + ",\n\n" +
                "Nous regrettons de vous informer que votre demande d'inscription a été refusée.\n\n" +
                "Cordialement,\n" +
                "L'équipe FSMedu";

        try {
            emailService.sendEmail(toEmail, subject, text);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
            // You might want to throw a custom exception or log the error
        }
    }


    private void createNewStudent(String nom, String prenom, String cin, String cne, String email) {
        // Generate a random CE (code etudiant)
        String ce = generateRandomCe();

        // Generate a random password
        String password = generateRandomPassword();

        // Generate academic email
        String emailAca = generateAcaEmail(nom, prenom);

        // Create new Student entity
        Student student = new Student();
        student.setNom(nom);
        student.setPrenom(prenom);
        student.setCin(cin);
        student.setCne(cne);
        student.setEmail(email);
        student.setCe(ce);
        student.setMdp(password);
        student.setEmail_aca(emailAca);

        // Save student in the database
        studentRepository.save(student);

        // Send email with password and CE to the student
        sendPasswordByEmail(email, nom, prenom, password, ce);
    }


    private void sendPasswordByEmail(String toEmail, String nom, String prenom, String password, String ce) {
        String subject = "Demande d'inscription";
        String text = "Salut" + prenom + " " + nom + ",\n\n" +
                "Nous avons bien reçu votre demande d'inscription.\n\n" +
                "Votre mot de passe : " + password + "\n" +
                "Votre code etudiant : " + ce + "\n\n" +
                "Merci de bien vouloir conserver ces informations .\n\n" +
                "Bienvenue à la faculté !\n\n" +
                "Cordialement,\n" +
                "L'équipe FSMedu";

        try {
            emailService.sendEmail(toEmail, subject, text);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
            // You might want to throw a custom exception or log the error
        }
    }

    // Method to generate academic email based on name and surname
    private String generateAcaEmail(String nom, String prenom) {
        return nom.toLowerCase() + "." + prenom.toLowerCase() + "@edu.umi.ac.ma";
    }

    // Method to generate a random CE (code etudiant)
    private String generateRandomCe() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    // Method to generate a random password (example implementation)
    private String generateRandomPassword() {
        // Implement your random password generation logic here
        // Example implementation generating a 9-character random string
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-";
        StringBuilder password = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 9; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }

        return password.toString();
    }

}
