package com.backend.FSMedu.repository;
import com.backend.FSMedu.dto.StudentDto;
import com.backend.FSMedu.entity.Filiere;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    Student findByCeAndMdp(String ce, String mdp);
    List<Student> findByMods(Mod mod);
    List<Long> findModIdsById(Long studentId);
    List<Student> findByMods(List<Long> moduleIds);
    List<Filiere> findFilieresById(Long studentId);
    Student findByCinAndCe(String cin, String ce);

}
