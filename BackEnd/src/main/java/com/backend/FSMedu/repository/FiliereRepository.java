package com.backend.FSMedu.repository;

import com.backend.FSMedu.dto.ModDto;
import com.backend.FSMedu.entity.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    List<Filiere> findByDepartmentId(Long departmentId);
    List<ModDto> findByModsId(Long moduleId);
}
