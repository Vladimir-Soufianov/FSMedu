package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.SeanceDto;
import com.backend.FSMedu.service.SeanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seances")
public class SeanceController {

    private final SeanceService seanceService;

    public SeanceController(SeanceService seanceService) {
        this.seanceService = seanceService;
    }

    @PostMapping
    public ResponseEntity<SeanceDto> createSeance(@RequestBody SeanceDto seanceDto) {
        SeanceDto createdSeance = seanceService.createSeance(seanceDto);
        return new ResponseEntity<>(createdSeance, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeanceDto> getSeanceById(@PathVariable("id") long id) {
        SeanceDto seanceDto = seanceService.getSeanceById(id);
        return ResponseEntity.ok(seanceDto);
    }

    @GetMapping
    public ResponseEntity<List<SeanceDto>> getAllSeances() {
        List<SeanceDto> seanceDtos = seanceService.getAllSeances();
        return ResponseEntity.ok(seanceDtos);
    }

    @PostMapping("/{id}")
    public ResponseEntity<SeanceDto> updateOrCreateSeance(
            @PathVariable long id,
            @RequestBody SeanceDto seanceDto
    ) {
            SeanceDto updatedSeance = seanceService.updateSeance(id, seanceDto);
            return ResponseEntity.ok(updatedSeance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeance(@PathVariable("id") long id) {
        seanceService.deleteSeance(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{role}/{id}")
    public ResponseEntity<List<SeanceDto>> getSeancesByRoleAndId(
            @PathVariable String role,
            @PathVariable Long id
    ) {
        try {
            List<SeanceDto> seances = seanceService.getSeancesByRoleAndId(role, id);
            return ResponseEntity.ok(seances);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @GetMapping("/type/{type}")
    public ResponseEntity<List<SeanceDto>> getSeancesByType(@PathVariable String type) {
        try {
            List<SeanceDto> seances = seanceService.getSeancesByType(type);
            return ResponseEntity.ok(seances);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}




















