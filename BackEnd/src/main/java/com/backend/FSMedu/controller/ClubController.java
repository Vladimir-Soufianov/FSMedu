package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.ClubDto;
import com.backend.FSMedu.service.ClubService;
import com.backend.FSMedu.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {
    private ClubService clubService ;
    private StudentService studentService;

    public ClubController(ClubService clubService,StudentService studentService){
        this.clubService=clubService;
        this.studentService=studentService;
    }

    @PostMapping
    public ResponseEntity<ClubDto> createClub(@RequestBody ClubDto clubDto){
        ClubDto savedClub = clubService.createClub(clubDto);
        return new ResponseEntity<>(savedClub, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ClubDto> getClubById(@PathVariable("id") Long clubId){
        ClubDto clubDto=clubService.getClubById(clubId);
        return ResponseEntity.ok(clubDto);
    }

    @GetMapping
    public ResponseEntity<List<ClubDto>> getAllClubs(){
        List<ClubDto> clubs=clubService.getAllClubs();
        return ResponseEntity.ok(clubs);
    }

    @PostMapping("{id}")
    public ResponseEntity<ClubDto> updateClub(@PathVariable("id") Long clubId ,  @RequestBody ClubDto updatedClub){
        ClubDto clubDto = clubService.updateClub(clubId,updatedClub);
        return ResponseEntity.ok(clubDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteClub(@PathVariable("id") Long clubId){
        clubService.deleteClub(clubId);
        return ResponseEntity.ok("Deleted succesfully");
    }

    @DeleteMapping("{clubId}/{studentId}")
    public ResponseEntity<String> removeStudentFromClub(@PathVariable Long studentId, @PathVariable Long clubId) {
        clubService.removeStudentFromClub(studentId, clubId);
        return ResponseEntity.ok("Deleted successfully");
    }
















}
