package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.ProfDto;
import com.backend.FSMedu.service.ProfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profs")
public class ProfController {
    private ProfService profService;

    public ProfController(ProfService profService) {
        this.profService = profService;
    }

    @PostMapping
    public ResponseEntity<ProfDto> createProf(@RequestBody ProfDto profDto) {
        ProfDto savedProf = profService.createProf(profDto);
        return new ResponseEntity<>(savedProf, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProfDto> getProfById(@PathVariable("id") Long profId) {
        ProfDto profDto = profService.getProfById(profId);
        return ResponseEntity.ok(profDto);
    }

    @GetMapping
    public ResponseEntity<List<ProfDto>> getAllProfs() {
        List<ProfDto> profs = profService.getAllProfs();
        return ResponseEntity.ok(profs);
    }

    @PostMapping("{id}")
    public ResponseEntity<ProfDto> updateProf(@PathVariable("id") Long profId, @RequestBody ProfDto updatedProf) {
        ProfDto profDto = profService.updateProf(profId, updatedProf);
        return ResponseEntity.ok(profDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProf(@PathVariable("id") Long profId) {
        profService.deleteProf(profId);
        return ResponseEntity.ok("Deleted Successfully");
    }

    @DeleteMapping("{profId}/{modId}")
    public ResponseEntity<ProfDto> deleteModFromProf(@PathVariable Long profId, @PathVariable Long modId) {
        ProfDto updatedProf = profService.removeModFromProf(profId, modId);
        return ResponseEntity.ok(updatedProf);
    }


}
