package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.*;
import com.backend.FSMedu.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private ChefDepartementService chefDepartementService;
    @Autowired
    private ChefFiliereService chefFiliereService;
    @Autowired
    private OrientationService orientationService;
    @Autowired
    private ProfService profService;

    public LoginController(AdminService adminService, ChefDepartementService chefDepartementService, ChefFiliereService chefFiliereService, OrientationService orientationService, ProfService profService) {
        this.studentService =studentService;
        this.adminService = adminService;
        this.chefDepartementService = chefDepartementService;
        this.chefFiliereService = chefFiliereService;
        this.orientationService = orientationService;
        this.profService = profService;
    }

   @PostMapping("/student")
   public ResponseEntity studentLogin(@RequestParam("ce") String ce,
                                      @RequestParam("mdp") String mdp) {
       StudentDto studentDto = studentService.findByCeAndMdp(ce, mdp);
       if (studentDto != null) {
           return ResponseEntity.ok(studentDto); // You can return any success message or data here
       } else {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
       }
   }

    @PostMapping("/personnel")
    public ResponseEntity<?> login(@RequestParam("cin") String cin,
                                   @RequestParam("mdp") String mdp) {
        // Attempt to authenticate as Admin
        AdminDto adminDto = adminService.findByCinAndMdp(cin, mdp);
        if (adminDto != null) {
            return ResponseEntity.ok(adminDto);
        }
        // Attempt to authenticate as Chef Filiere
        ChefFiliereDto chefFiliereDto = chefFiliereService.findByCinAndMdp(cin, mdp);
        if (chefFiliereDto != null) {
            return ResponseEntity.ok(chefFiliereDto);
        }
        ChefDepartementDto chefDepartementDto = chefDepartementService.findByCinAndMdp(cin, mdp);
        if (chefDepartementDto != null) {
            return ResponseEntity.ok(chefDepartementDto);
        }

        // Attempt to authenticate as Orientation
        OrientationDto orientationDto = orientationService.findByCinAndMdp(cin, mdp);
        if (orientationDto != null) {
            return ResponseEntity.ok(orientationDto);
        }

        // Attempt to authenticate as Prof
        ProfDto profDto = profService.findByCinAndMdp(cin, mdp);
        if (profDto != null) {
            return ResponseEntity.ok(profDto);
        }

        // If no user is authenticated, return unauthorized
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }



}

