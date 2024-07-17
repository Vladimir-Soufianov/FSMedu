package com.backend.FSMedu.repository;

import com.backend.FSMedu.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByModId(Long modId);
    List<Note> findByStudentId(Long studentId);
}
