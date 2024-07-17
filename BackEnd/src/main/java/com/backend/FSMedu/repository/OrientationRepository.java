package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Orientation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface OrientationRepository extends JpaRepository<Orientation, Long> {
    Orientation findByCinAndMdp(String cin , String Mdp);
    Orientation  findByCinAndMatricule(String cin, String matricule);
}
