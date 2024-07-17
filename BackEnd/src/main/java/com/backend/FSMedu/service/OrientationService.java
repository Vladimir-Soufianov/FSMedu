package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.OrientationDto;
import com.backend.FSMedu.entity.Orientation;

import java.util.List;

public interface OrientationService {
    OrientationDto createOrientation(OrientationDto orientationDto);
    OrientationDto getOrientationById(Long orientationId);
    List<OrientationDto> getAllOrientations();
    OrientationDto updateOrientation(Long orientationId, OrientationDto updatedOrientation);
    void deleteOrientation(Long orientationId);
    OrientationDto findByCinAndMdp(String cin , String Mdp);
    OrientationDto findByCinAndMatricule(String cin, String matricule);
}
