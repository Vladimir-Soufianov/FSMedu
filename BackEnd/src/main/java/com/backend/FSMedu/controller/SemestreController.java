package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.SemestreDto;
import com.backend.FSMedu.service.SemestreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semestres")
public class SemestreController {

    private final SemestreService semestreService;

    @Autowired
    public SemestreController(SemestreService semestreService) {
        this.semestreService = semestreService;
    }

    @PostMapping
    public ResponseEntity<SemestreDto> createSemestre(@RequestBody SemestreDto semestreDto) {
        SemestreDto createdSemestre = semestreService.createSemestre(semestreDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSemestre);
    }

    @GetMapping("{id}")
    public ResponseEntity<SemestreDto> getSemestreById(@PathVariable Long id) {
        SemestreDto semestreDto = semestreService.getSemestreById(id);
        return ResponseEntity.ok(semestreDto);
    }

    @GetMapping
    public ResponseEntity<List<SemestreDto>> getAllSemestres() {
        List<SemestreDto> semestreDtos = semestreService.getAllSemestres();
        return ResponseEntity.ok(semestreDtos);
    }

    @PostMapping("{id}")
    public ResponseEntity<SemestreDto> updateSemestre(@PathVariable Long id, @RequestBody SemestreDto updatedSemestreDto) {
        SemestreDto updatedSemestre = semestreService.updateSemestre(id, updatedSemestreDto);
        return ResponseEntity.ok(updatedSemestre);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteSemestre(@PathVariable Long id) {
        semestreService.deleteSemestre(id);
        return ResponseEntity.noContent().build();
    }
}
