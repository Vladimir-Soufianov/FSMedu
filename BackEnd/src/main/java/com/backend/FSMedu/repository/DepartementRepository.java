package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Department;
import com.backend.FSMedu.entity.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepartementRepository extends JpaRepository<Department,Long> {

}
