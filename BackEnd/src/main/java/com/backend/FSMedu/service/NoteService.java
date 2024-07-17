package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.NoteDto;
import com.backend.FSMedu.entity.Note;

import java.util.List;

public interface NoteService {
    NoteDto createNote(NoteDto noteDto);
    NoteDto getNoteById(long id);
    List<NoteDto> getAllNotes();
    NoteDto updateNote(long id, NoteDto noteDto);
    void deleteNote(long id);
    List<NoteDto> getNotesByModId(Long modId);
    List<NoteDto> findNotesByStudentId(Long studentId);
}

