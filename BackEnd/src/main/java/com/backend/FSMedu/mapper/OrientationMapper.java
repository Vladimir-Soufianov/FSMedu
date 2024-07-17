package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.OrientationDto;
import com.backend.FSMedu.entity.Orientation;

public class OrientationMapper {

    public static OrientationDto mapToOrientationDto(Orientation orientation){
        return new OrientationDto(
                orientation.getId(),
                orientation.getNom(),
                orientation.getPrenom(),
                orientation.getCin(),
                orientation.getMatricule(),
                orientation.getRole(),
                orientation.getEmail(),
                orientation.getMdp()
        );
    }

    public static Orientation mapToOrientation(OrientationDto orientationDto){
        return new Orientation(
                orientationDto.getId(),
                orientationDto.getNom(),
                orientationDto.getPrenom(),
                orientationDto.getCin(),
                orientationDto.getMatricule(),
                orientationDto.getRole(),
                orientationDto.getEmail(),
                orientationDto.getMdp()
        );
    }
}
