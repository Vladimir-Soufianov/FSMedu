package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.InscriptionDto;
import com.backend.FSMedu.entity.Inscription;
import com.backend.FSMedu.entity.InscriptionStatus;
import com.backend.FSMedu.service.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
public class InscriptionController {

    private final InscriptionService inscriptionService;

    @Autowired
    public InscriptionController(InscriptionService inscriptionService) {
        this.inscriptionService = inscriptionService;
    }

    @PostMapping
    public ResponseEntity<InscriptionDto> createInscription(
            @ModelAttribute InscriptionDto inscriptionDto,
            @RequestParam("cinFile") MultipartFile cinFile,
            @RequestParam("imgFile") MultipartFile imgFile,
            @RequestParam("bacFile") MultipartFile bacFile) {

        InscriptionDto createdInscription = inscriptionService.createInscriptionWithFiles(inscriptionDto, cinFile, imgFile, bacFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdInscription);
    }

    @GetMapping
    public ResponseEntity<List<InscriptionDto>> getAllInscriptions() {
        List<InscriptionDto> inscriptions = inscriptionService.getAllInscriptions();
        return ResponseEntity.ok(inscriptions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscription(@PathVariable Long id) {
        inscriptionService.deleteInscription(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{inscriptionId}/update-status")
    public ResponseEntity<String> updateInscriptionStatus(
            @PathVariable Long inscriptionId,
            @RequestBody Inscription updatedInscriptionData) {
        try {
            inscriptionService.updateInscriptionStatus(inscriptionId, updatedInscriptionData.getStatus());
            return ResponseEntity.ok("Inscription status updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update inscription status: " + e.getMessage());
        }
    }
}
