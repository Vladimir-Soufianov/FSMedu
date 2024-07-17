package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.ClubDto;
import java.util.List;

public interface ClubService {
    ClubDto createClub(ClubDto clubDto);
    ClubDto getClubById(long clubId);
    List<ClubDto> getAllClubs();
    ClubDto updateClub(Long clubId , ClubDto updatedClub);
    void deleteClub(Long clubId);
    void removeStudentFromClub(Long studentId, Long clubId);
}
