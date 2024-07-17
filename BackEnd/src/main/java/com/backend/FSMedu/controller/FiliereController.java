package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.FiliereDto;
import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.service.FiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/filieres")
public class FiliereController {

    private final FiliereService filiereService;

    @Autowired
    public FiliereController(FiliereService filiereService) {
        this.filiereService = filiereService;
    }

    @PostMapping
    public ResponseEntity<FiliereDto> createFiliere(@RequestBody FiliereDto filiereDto) {
        FiliereDto createdFiliere = filiereService.createFiliere(filiereDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFiliere);
    }

    @GetMapping("{id}")
    public ResponseEntity<FiliereDto> getFiliereById(@PathVariable Long id) {
        FiliereDto filiereDto = filiereService.getFiliereById(id);
        return ResponseEntity.ok(filiereDto);
    }

    @GetMapping
    public ResponseEntity<List<FiliereDto>> getAllFilieres() {
        List<FiliereDto> filiereDtos = filiereService.getAllFilieres();
        return ResponseEntity.ok(filiereDtos);
    }

    @PostMapping("{id}")
    public ResponseEntity<FiliereDto> updateFiliere(@PathVariable Long id, @RequestBody FiliereDto updatedFiliereDto) {
        FiliereDto updatedFiliere = filiereService.updateFiliere(id, updatedFiliereDto);
        return ResponseEntity.ok(updatedFiliere);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteFiliere(@PathVariable Long id) {
        filiereService.deleteFiliere(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{filiereId}/modules")
    public ResponseEntity<List<ModDto>> getAllModulesByFiliereId(@PathVariable Long filiereId) {
        List<ModDto> modules = filiereService.getAllModulesByFiliereId(filiereId);
        return new ResponseEntity<>(modules, HttpStatus.OK);
    }
}
