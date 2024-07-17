package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.ChefFiliere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChefFiliereRepository extends JpaRepository<ChefFiliere,Long> {
ChefFiliere findByCinAndMdp(String cin , String Mdp);
ChefFiliere  findByCinAndMatricule(String cin, String matricule);
}
