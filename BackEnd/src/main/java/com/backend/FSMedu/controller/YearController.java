package com.backend.FSMedu.controller;
import com.backend.FSMedu.dto.YearDto;
import com.backend.FSMedu.service.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/years")
public class YearController {

    @Autowired
    private final YearService yearService;

    @Autowired
    public YearController(YearService yearService) {
        this.yearService = yearService;
    }

    @PostMapping
    public ResponseEntity<YearDto> createYear(@RequestBody YearDto yearDto) {
        YearDto createdYear = yearService.createYear(yearDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdYear);
    }

    @GetMapping("{id}")
    public ResponseEntity<YearDto> getYearById(@PathVariable Long id) {
        YearDto yearDto = yearService.getYearById(id);
        return ResponseEntity.ok(yearDto);
    }

    @GetMapping
    public ResponseEntity<List<YearDto>> getAllYears() {
        List<YearDto> yearDtos = yearService.getAllYears();
        return ResponseEntity.ok(yearDtos);
    }

    @PostMapping("{id}")
    public ResponseEntity<YearDto> updateYear(@PathVariable Long id, @RequestBody YearDto updatedYear) {
        YearDto updatedYearDto = yearService.updateYear(id, updatedYear);
        return ResponseEntity.ok(updatedYearDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteYear(@PathVariable Long id) {
        yearService.deleteYear(id);
        return ResponseEntity.noContent().build();
    }
}

