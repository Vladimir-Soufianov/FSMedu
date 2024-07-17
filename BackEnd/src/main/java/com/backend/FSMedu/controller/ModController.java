package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.dto.SemestreDto;
import com.backend.FSMedu.service.ModService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mods")
public class ModController {

    private final ModService modService;

    @Autowired
    public ModController(ModService modService) {
        this.modService = modService;
    }

    @PostMapping
    public ResponseEntity<ModDto> createMod(@RequestBody ModDto modDto) {
        ModDto createdMod = modService.createMod(modDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMod);
    }

    @GetMapping("{id}")
    public ResponseEntity<ModDto> getModById(@PathVariable Long id) {
        ModDto modDto = modService.getModById(id);
        return ResponseEntity.ok(modDto);
    }

    @GetMapping
    public ResponseEntity<List<ModDto>> getAllMods() {
        List<ModDto> modDtos = modService.getAllMods();
        return ResponseEntity.ok(modDtos);
    }

    @PostMapping("{id}")
    public ResponseEntity<ModDto> updateMod(@PathVariable Long id, @RequestBody ModDto updatedMod) {
        ModDto updatedModDto = modService.updateMod(id, updatedMod);
        return ResponseEntity.ok(updatedModDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteMod(@PathVariable Long id) {
        modService.deleteMod(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/semestre")
    public ResponseEntity<SemestreDto> getSemestreByModId(@PathVariable Long id) {
        SemestreDto semestreDto = modService.getSemestreByModId(id);
        return ResponseEntity.ok(semestreDto);
    }

    @PostMapping("/{modId}/add/{studentId}")
    public ModDto addStudentToMod(@PathVariable Long modId, @PathVariable Long studentId) {
        return modService.addStudentToMod(modId, studentId);
    }
}
