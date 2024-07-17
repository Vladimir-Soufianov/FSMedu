package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.*;
import com.backend.FSMedu.service.*;
import com.backend.FSMedu.service.impl.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/emp")
@RestController
public class EmpController {
    @Autowired
    private ChefDepartementService chefDepartementService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private ChefFiliereService chefFiliereService;

    @Autowired
    private OrientationService orientationService;

    @Autowired
    private ProfService profService;

    @Autowired
    private EmailService emailService;


    @GetMapping
    public Map<String, List<?>> getAllEmployees() {
        Map<String, List<?>> employees = new HashMap<>();
        employees.put("chefDepartements", chefDepartementService.getAllChefDepartements());
        employees.put("admins", adminService.getAllAdmins());
        employees.put("chefFilieres", chefFiliereService.getAllChefFiliere());
        employees.put("orientations", orientationService.getAllOrientations());
        employees.put("profs", profService.getAllProfs());
        return employees;
    }


    @PostMapping("/forgot")
    public ResponseEntity<?> login(@RequestParam("cin") String cin,
                                   @RequestParam("matricule") String matricule) throws MessagingException {
        // Attempt to authenticate as Admin
        AdminDto adminDto = adminService.findByCinAndMatricule(cin, matricule);
        if (adminDto != null) {
            String email = adminDto.getEmail(); // Assuming getEmail() method exists in AdminDto
            String password = adminDto.getMdp(); // Assuming getPassword() method exists in AdminDto
            sendPasswordByEmail(email, password);
            return ResponseEntity.ok(adminDto);
        }

        // Attempt to authenticate as Chef Filiere
        ChefFiliereDto chefFiliereDto = chefFiliereService.findByCinAndMatricule(cin, matricule);
        if (chefFiliereDto != null) {
            String email = chefFiliereDto.getEmail(); // Assuming getEmail() method exists in ChefFiliereDto
            String password = chefFiliereDto.getMdp(); // Assuming getPassword() method exists in ChefFiliereDto
            sendPasswordByEmail(email, password);
            return ResponseEntity.ok(chefFiliereDto);
        }

        // Attempt to authenticate as Chef Departement
        ChefDepartementDto chefDepartementDto = chefDepartementService.findByCinAndMatricule(cin, matricule);
        if (chefDepartementDto != null) {
            String email = chefDepartementDto.getEmail(); // Assuming getEmail() method exists in ChefDepartementDto
            String password = chefDepartementDto.getMdp(); // Assuming getPassword() method exists in ChefDepartementDto
            sendPasswordByEmail(email, password);
            return ResponseEntity.ok(chefDepartementDto);
        }

        // Attempt to authenticate as Orientation
        OrientationDto orientationDto = orientationService.findByCinAndMatricule(cin, matricule);
        if (orientationDto != null) {
            String email = orientationDto.getEmail(); // Assuming getEmail() method exists in OrientationDto
            String password = orientationDto.getMdp(); // Assuming getPassword() method exists in OrientationDto
            sendPasswordByEmail(email, password);
            return ResponseEntity.ok(orientationDto);
        }

        // Attempt to authenticate as Prof
        ProfDto profDto = profService.findByCinAndMatricule(cin, matricule);
        if (profDto != null) {
            String email = profDto.getEmail(); // Assuming getEmail() method exists in ProfDto
            String password = profDto.getMdp(); // Assuming getPassword() method exists in ProfDto
            sendPasswordByEmail(email, password);
            return ResponseEntity.ok(profDto);
        }

        // If no user is authenticated, return unauthorized
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    private void sendPasswordByEmail(String email, String password) throws MessagingException {
        String subject = "Récupération de mot de passe";
        String message = "Votre mot de passe est : " + password;
        emailService.sendEmail(email, subject, message);
    }


}
