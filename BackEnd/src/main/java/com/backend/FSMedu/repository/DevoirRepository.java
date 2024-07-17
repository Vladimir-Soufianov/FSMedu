package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Devoir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DevoirRepository extends JpaRepository<Devoir,Long> {
    List<Devoir> findByModuleId(Long moduleId);

}
