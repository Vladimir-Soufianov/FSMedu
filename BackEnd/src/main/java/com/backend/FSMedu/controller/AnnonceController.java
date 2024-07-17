package com.backend.FSMedu.controller;

import com.backend.FSMedu.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import com.backend.FSMedu.dto.AnnonceDto;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService;

    @PostMapping
    public ResponseEntity<AnnonceDto> createAnnonce(@ModelAttribute AnnonceDto annonceDto,
                                                    @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            AnnonceDto createdAnnonce = annonceService.createAnnonce(annonceDto, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAnnonce);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping
    public ResponseEntity<List<AnnonceDto>> getAllAnnonces() {
        List<AnnonceDto> annonces = annonceService.getAllAnnonces();
        return ResponseEntity.ok(annonces);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnonceDto> getAnnonceById(@PathVariable Long id) {
        AnnonceDto annonce = annonceService.getAnnonceById(id);
        if (annonce != null) {
            return ResponseEntity.ok(annonce);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<AnnonceDto> updateAnnonce(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {

        AnnonceDto annonceDTO = new AnnonceDto();
        annonceDTO.setTitle(title);
        annonceDTO.setDescription(description);
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = annonceService.storeImage(imageFile);
            annonceDTO.setImageUrl(imageUrl);
        }
        AnnonceDto updatedAnnonce = annonceService.updateAnnonce(id, annonceDTO);
        return new ResponseEntity<>(updatedAnnonce, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
        annonceService.deleteAnnonce(id);
        return ResponseEntity.noContent().build();
    }
}
