package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Seance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeanceRepository extends JpaRepository<Seance , Long > {
    List<Seance> findByProfId(Long profId);
    List<Seance> findByChefdepId(Long chefdepId);
    List<Seance> findByCheffilId(Long cheffilId);
    List<Seance> findBySeanceType(String type);
}
