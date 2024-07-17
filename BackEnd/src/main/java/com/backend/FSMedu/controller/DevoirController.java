package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.DevoirDto;
import com.backend.FSMedu.service.DevoirService;
import com.backend.FSMedu.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/devoirs")
public class DevoirController {

    private StudentService studentService;
    private DevoirService devoirService;

    @Autowired
    public DevoirController(DevoirService devoirService, StudentService studentService) {
        this.devoirService = devoirService;
        this.studentService = studentService;
    }


    @PostMapping
    public ResponseEntity<DevoirDto> createDevoir(@ModelAttribute DevoirDto devoirDto,
                                                  @RequestParam("devfile") MultipartFile devfile) {
        try {
            DevoirDto createdDevoir = devoirService.createDevoir(devoirDto, devfile);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDevoir);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DevoirDto>> getAllDevoirs() {
        List<DevoirDto> devoirs = devoirService.getAllDevoirs();
        return ResponseEntity.ok(devoirs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DevoirDto> getDevoirById(@PathVariable Long id) {
        DevoirDto devoir = devoirService.getDevoirById(id);
        if (devoir != null) {
            return ResponseEntity.ok(devoir);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<DevoirDto> updateDevoir(
            @PathVariable Long id,
            @ModelAttribute DevoirDto devoirDto,
            @RequestParam(value = "devfile", required = false) MultipartFile devfile) {
        try {
            DevoirDto updatedDevoir = devoirService.updateDevoir(id, devoirDto, devfile);
            return ResponseEntity.ok(updatedDevoir);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevoir(@PathVariable Long id) {
        devoirService.deleteDevoir(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<DevoirDto>> getDevoirsByModuleId(@PathVariable Long moduleId) {
        List<DevoirDto> devoirs = devoirService.findDevoirsByModuleId(moduleId);
        return ResponseEntity.ok(devoirs);
    }

}
