package com.backend.FSMedu.service;
import com.backend.FSMedu.dto.DepartementDto;
import com.backend.FSMedu.entity.Filiere;

import java.util.List;

public interface DepartementService {
    DepartementDto createDepartement(DepartementDto departementDto);
    DepartementDto getDepartementById(long departementId);
    List<DepartementDto> getAllDepartements();
    DepartementDto updateDepartement(long departementId, DepartementDto updatedDepartement);
    void deleteDepartement(Long departementId);

}
