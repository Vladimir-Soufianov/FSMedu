package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.ClubDto;
import com.backend.FSMedu.entity.Club;

public class ClubMapper {
    public static ClubDto mapToClubDto(Club club){
        return new ClubDto(
          club.getId(),
          club.getNom(),
          club.getStudents()
        );
    }

    public static Club mapToClub(ClubDto clubDto){
        return new Club(
          clubDto.getId(),
          clubDto.getNom(),
          clubDto.getStudents()
        );
    }
}
