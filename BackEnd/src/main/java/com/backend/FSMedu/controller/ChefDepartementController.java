package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.ChefDepartementDto;
import com.backend.FSMedu.service.ChefDepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chefdepartements")
public class ChefDepartementController {

    private final ChefDepartementService chefDepartementService;

    @Autowired
    public ChefDepartementController(ChefDepartementService chefDepartementService) {
        this.chefDepartementService = chefDepartementService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChefDepartementDto> getChefDepartementById(@PathVariable("id") long id) {
        ChefDepartementDto chefDepartementDto = chefDepartementService.getChefDepartementById(id);
        return ResponseEntity.ok(chefDepartementDto);
    }

    @PostMapping
    public ResponseEntity<ChefDepartementDto> createChefDepartement(@RequestBody ChefDepartementDto chefDepartementDto) {
        ChefDepartementDto createdChefDepartement = chefDepartementService.createChefDepartement(chefDepartementDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdChefDepartement);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ChefDepartementDto> updateChefDepartement(@PathVariable("id") long id, @RequestBody ChefDepartementDto chefDepartementDto) {
        ChefDepartementDto updatedChefDepartement = chefDepartementService.updateChefDepartement(id, chefDepartementDto);
        return ResponseEntity.ok(updatedChefDepartement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChefDepartement(@PathVariable("id") long id) {
        chefDepartementService.deleteChefDepartement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ChefDepartementDto>> getAllChefDepartements() {
        List<ChefDepartementDto> chefDepartements = chefDepartementService.getAllChefDepartements();
        return ResponseEntity.ok(chefDepartements);
    }
}
