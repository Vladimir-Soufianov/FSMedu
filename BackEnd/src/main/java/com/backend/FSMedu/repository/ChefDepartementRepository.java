package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.ChefDepartement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChefDepartementRepository extends JpaRepository<ChefDepartement,Long> {
ChefDepartement findByCinAndMdp(String cin , String mdp);
ChefDepartement  findByCinAndMatricule(String cin, String matricule);
}
