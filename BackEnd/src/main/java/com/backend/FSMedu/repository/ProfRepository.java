package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfRepository extends JpaRepository<Prof,Long> {
    Prof findByCinAndMdp(String cin , String Mdp);
    Prof  findByCinAndMatricule(String cin, String matricule);
}
