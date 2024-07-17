package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.NoteDto;
import com.backend.FSMedu.entity.Mod;
import com.backend.FSMedu.entity.Note;
import com.backend.FSMedu.entity.Student;
import com.backend.FSMedu.entity.Year;
import com.backend.FSMedu.mapper.NoteMapper;
import com.backend.FSMedu.repository.ModRepository;
import com.backend.FSMedu.repository.NoteRepository;
import com.backend.FSMedu.repository.StudentRepository;
import com.backend.FSMedu.repository.YearRepository;
import com.backend.FSMedu.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final StudentRepository studentRepository;
    private final ModRepository modRepository;
    private final YearRepository yearRepository;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository,StudentRepository studentRepository
    ,ModRepository modRepository,YearRepository yearRepository) {
        this.noteRepository = noteRepository;
        this.studentRepository=studentRepository;
        this.modRepository=modRepository;
        this.yearRepository=yearRepository;
    }
    @Override
    public List<NoteDto> findNotesByStudentId(Long studentId) {
        List<Note> notes = noteRepository.findByStudentId(studentId);
        return notes.stream()
                .map(note -> new NoteDto(
                        note.getId(),
                        note.getStudent().getId(),
                        note.getMod().getId(),  // Extracting modId from associated Mod entity
                        note.getNote(),
                        note.getYear().getId()))  // Assuming Year ID is also needed
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NoteDto createNote(NoteDto noteDto) {
        Note note = new Note();

        note.setStudent(studentRepository.findById(noteDto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + noteDto.getStudentId())));
        note.setMod(modRepository.findById(noteDto.getModId())
                .orElseThrow(() -> new RuntimeException("Mod not found with id: " + noteDto.getModId())));
        note.setYear(yearRepository.findById(noteDto.getYearId())
                .orElseThrow(() -> new RuntimeException("Year not found with id: " + noteDto.getYearId())));
        note.setNote(noteDto.getNote());

        Note savedNote = noteRepository.save(note);
        return NoteMapper.mapToNoteDto(savedNote);
    }


    @Override
    @Transactional(readOnly = true)
    public NoteDto getNoteById(long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        return NoteMapper.mapToNoteDto(note);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteDto> getAllNotes() {
        List<Note> notes = noteRepository.findAll();
        return notes.stream()
                .map(NoteMapper::mapToNoteDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NoteDto updateNote(long id, NoteDto noteDto) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        // Update Note entity fields based on NoteDto
        if (noteDto.getStudentId() != null) {
            Student student = studentRepository.findById(noteDto.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));
            note.setStudent(student);
        }
        if (noteDto.getModId() != 0) {
            Mod mod = modRepository.findById(noteDto.getModId())
                    .orElseThrow(() -> new RuntimeException("Mod not found"));
            note.setMod(mod);
        }
        if (noteDto.getNote() != 0) {
            note.setNote(noteDto.getNote());
        }
        if (noteDto.getYearId() != null) {
            Year year = yearRepository.findById(noteDto.getYearId())
                    .orElseThrow(() -> new RuntimeException("Year not found"));
            note.setYear(year);
        }

        // Save and return updated Note entity
        Note updatedNote = noteRepository.save(note);
        return NoteMapper.mapToNoteDto(updatedNote);
    }


    @Override
    @Transactional
    public void deleteNote(long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        noteRepository.delete(note);
    }

    @Override
    public List<NoteDto> getNotesByModId(Long modId) {
        return noteRepository.findByModId(modId).stream()
                .map(note -> new NoteDto(note.getId(), note.getStudent().getId(), note.getMod().getId(), note.getNote(),note.getYear().getId()))
                .collect(Collectors.toList());
    }
}
