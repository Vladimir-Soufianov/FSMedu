package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.DevoirReponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DevoirReponseRepository extends JpaRepository<DevoirReponse,Long> {
    List<DevoirReponse> findByDevoirId(Long devoirId);
    List<DevoirReponse> findByStudentId(Long studentId);
}
