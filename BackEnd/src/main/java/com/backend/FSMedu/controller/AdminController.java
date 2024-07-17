package com.backend.FSMedu.controller;
import com.backend.FSMedu.dto.AdminDto;
import com.backend.FSMedu.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {
    private AdminService adminService;
    public AdminController(AdminService adminService){
        this.adminService=adminService;
    }

    @PostMapping
    public ResponseEntity<AdminDto> createAdmin(@RequestBody AdminDto adminDto){
        AdminDto savedAdmin=adminService.createAdmin(adminDto);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<AdminDto> getAdminById(@PathVariable("id") Long adminId){
        AdminDto adminDto =adminService.getAdminById(adminId);
        return ResponseEntity.ok(adminDto);
    }
    @GetMapping
    public ResponseEntity<List<AdminDto>> getAllAdmins(){
        List<AdminDto> admins=adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @PostMapping("{id}")
    public ResponseEntity<AdminDto> updateAdmin(@PathVariable("id") Long adminId, @RequestBody AdminDto updatedAdmin){
        AdminDto adminDto=adminService.updateAdmin(adminId,updatedAdmin);
        return ResponseEntity.ok(adminDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable("id") Long adminId){
        adminService.deleteAdmin(adminId);
        return ResponseEntity.ok("Deleted Succesfully");
    }






























}
