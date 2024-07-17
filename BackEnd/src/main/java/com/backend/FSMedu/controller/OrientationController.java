package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.OrientationDto;
import com.backend.FSMedu.service.OrientationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orientations")
public class OrientationController {
    private final OrientationService orientationService;

    public OrientationController(OrientationService orientationService) {
        this.orientationService = orientationService;
    }

    @PostMapping
    public ResponseEntity<OrientationDto> createOrientation(@RequestBody OrientationDto orientationDto) {
        OrientationDto savedOrientation = orientationService.createOrientation(orientationDto);
        return new ResponseEntity<>(savedOrientation, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<OrientationDto> getOrientationById(@PathVariable("id") Long orientationId) {
        OrientationDto orientationDto = orientationService.getOrientationById(orientationId);
        return ResponseEntity.ok(orientationDto);
    }

    @GetMapping
    public ResponseEntity<List<OrientationDto>> getAllOrientations() {
        List<OrientationDto> orientations = orientationService.getAllOrientations();
        return ResponseEntity.ok(orientations);
    }

    @PostMapping("{id}")
    public ResponseEntity<OrientationDto> updateOrientation(@PathVariable("id") Long orientationId, @RequestBody OrientationDto updatedOrientationDto) {
        OrientationDto orientationDto = orientationService.updateOrientation(orientationId, updatedOrientationDto);
        return ResponseEntity.ok(orientationDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOrientation(@PathVariable("id") Long orientationId) {
        orientationService.deleteOrientation(orientationId);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
