package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.ChefFiliereDto;
import com.backend.FSMedu.service.ChefFiliereService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chefFilieres")
public class ChefFiliereController {
    private ChefFiliereService chefFiliereService;

    public ChefFiliereController(ChefFiliereService chefFiliereService) {
        this.chefFiliereService = chefFiliereService;
    }

    @PostMapping
    public ResponseEntity<ChefFiliereDto> createChefFiliere(@RequestBody ChefFiliereDto chefFiliereDto) {
        ChefFiliereDto savedChefFiliere = chefFiliereService.createChefFiliere(chefFiliereDto);
        return new ResponseEntity<>(savedChefFiliere, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ChefFiliereDto> getChefFiliereById(@PathVariable("id") Long chefFiliereId) {
        ChefFiliereDto chefFiliereDto = chefFiliereService.getChefFiliereById(chefFiliereId);
        return ResponseEntity.ok(chefFiliereDto);
    }

    @GetMapping
    public ResponseEntity<List<ChefFiliereDto>> getAllChefFilieres() {
        List<ChefFiliereDto> chefFilieres = chefFiliereService.getAllChefFiliere();
        return ResponseEntity.ok(chefFilieres);
    }

    @PostMapping("{id}")
    public ResponseEntity<ChefFiliereDto> updateChefFiliere(@PathVariable("id") Long chefFiliereId, @RequestBody ChefFiliereDto updatedChefFiliere) {
        ChefFiliereDto chefFiliereDto = chefFiliereService.updateChefFiliere(chefFiliereId, updatedChefFiliere);
        return ResponseEntity.ok(chefFiliereDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteChefFiliere(@PathVariable("id") Long chefFiliereId) {
        chefFiliereService.deleteChefFiliere(chefFiliereId);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
