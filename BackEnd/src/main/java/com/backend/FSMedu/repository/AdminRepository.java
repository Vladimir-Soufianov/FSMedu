package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {
    Admin findByCinAndMdp(String cin , String Mdp);
    Admin findByCinAndMatricule(String cin, String matricule);
}
