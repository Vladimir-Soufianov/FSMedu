package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.DepartementDto;
import com.backend.FSMedu.dto.FiliereDto;
import com.backend.FSMedu.service.DepartementService;
import com.backend.FSMedu.service.FiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departements")
public class DepartementController {

    @Autowired
    private  DepartementService departementService;
    @Autowired
    private FiliereService filiereService;

    @Autowired
    public DepartementController(DepartementService departementService,FiliereService filiereService){
        this.departementService=departementService;
        this.filiereService=filiereService;
    }


    @PostMapping
    public ResponseEntity<DepartementDto> createDepartement(@RequestBody DepartementDto departementDto) {
        DepartementDto createdDepartement = departementService.createDepartement(departementDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartement);
    }

    @GetMapping("{id}")
    public ResponseEntity<DepartementDto> getDepartementById(@PathVariable Long id) {
        DepartementDto departementDto = departementService.getDepartementById(id);
        return ResponseEntity.ok(departementDto);
    }

    @GetMapping
    public ResponseEntity<List<DepartementDto>> getAllDepartements() {
        List<DepartementDto> departementDtos = departementService.getAllDepartements();
        return ResponseEntity.ok(departementDtos);
    }

    @PostMapping("{id}")
    public ResponseEntity<DepartementDto> updateDepartement(@PathVariable Long id, @RequestBody DepartementDto updatedDepartement) {
        DepartementDto updatedDepartementDto = departementService.updateDepartement(id, updatedDepartement);
        return ResponseEntity.ok(updatedDepartementDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteDepartement(@PathVariable Long id) {
        departementService.deleteDepartement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{departmentId}/filieres")
    public ResponseEntity<List<FiliereDto>> getAllFilieresByDepartmentId(@PathVariable Long departmentId) {
        List<FiliereDto> filieres = filiereService.getAllFiliereByDepartmentId(departmentId);
        return ResponseEntity.ok().body(filieres);
    }
}
