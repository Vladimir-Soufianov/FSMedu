package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.DevoirReponseDto;
import com.backend.FSMedu.service.DevoirReponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/reponses")
public class DevoirReponseController {

    @Autowired
    private DevoirReponseService devoirReponseService;

    @GetMapping("/{id}")
    public ResponseEntity<DevoirReponseDto> getReponseById(@PathVariable("id") Long id) {
        DevoirReponseDto reponseDto = devoirReponseService.getReponseById(id);
        if (reponseDto != null) {
            return ResponseEntity.ok(reponseDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/devoir/{devoirId}")
    public ResponseEntity<List<DevoirReponseDto>> getReponsesByDevoir(@PathVariable("devoirId") Long devoirId) {
        List<DevoirReponseDto> reponses = devoirReponseService.getReponsesByDevoir(devoirId);
        return ResponseEntity.ok(reponses);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<DevoirReponseDto>> getReponsesByStudent(@PathVariable("studentId") Long studentId) {
        List<DevoirReponseDto> reponses = devoirReponseService.getReponsesByStudent(studentId);
        return ResponseEntity.ok(reponses);
    }

    @GetMapping
    public ResponseEntity<List<DevoirReponseDto>> getAllReponses() {
        List<DevoirReponseDto> reponses = devoirReponseService.getAllReponses();
        return ResponseEntity.ok(reponses);
    }

    @PostMapping
    public ResponseEntity<DevoirReponseDto> saveReponse(@ModelAttribute DevoirReponseDto reponseDto,
                                                        @RequestParam("devfile") MultipartFile devfile) throws IOException {
        DevoirReponseDto savedReponse = devoirReponseService.saveReponse(reponseDto, devfile);

        // Check if the response and file are valid
        if (savedReponse != null && devfile != null && !devfile.isEmpty()) {
            // Store the file and get the file URL
            String fileUrl = devoirReponseService.storeFile(devfile);

            // Update the DTO with the file URL
            savedReponse.setFichierUrl(fileUrl);
        }

        // Return the saved response DTO with HTTP status 201 Created
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReponse);
    }


    @PostMapping("/{id}")
    public ResponseEntity<DevoirReponseDto> updateReponse(
            @PathVariable("id") Long id,
            @ModelAttribute DevoirReponseDto reponseDto,
            @RequestParam(value = "devfile", required = false) MultipartFile devfile) throws IOException {
        try{
            DevoirReponseDto updatedReponse = devoirReponseService.updateReponse(id, reponseDto, devfile);
            return ResponseEntity.ok(updatedReponse);
        }
        catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReponse(@PathVariable("id") Long id) {
        devoirReponseService.deleteReponse(id);
        return ResponseEntity.noContent().build();
    }
}
