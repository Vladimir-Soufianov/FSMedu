package com.backend.FSMedu.controller;
import com.backend.FSMedu.dto.NoteDto;
import com.backend.FSMedu.entity.Note;
import com.backend.FSMedu.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<NoteDto> createNote(@RequestBody NoteDto noteDto) {
        NoteDto createdNote = noteService.createNote(noteDto);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<NoteDto> getNoteById(@PathVariable("id") long id) {
        NoteDto noteDto = noteService.getNoteById(id);
        return ResponseEntity.ok(noteDto);
    }

    @GetMapping
    public ResponseEntity<List<NoteDto>> getAllNotes() {
        List<NoteDto> noteDtos = noteService.getAllNotes();
        return ResponseEntity.ok(noteDtos);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<NoteDto>> getNotesByStudentId(@PathVariable Long studentId) {
        List<NoteDto> notes = noteService.findNotesByStudentId(studentId);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }


    @PostMapping("{id}")
    public ResponseEntity<NoteDto> updateNote(@PathVariable("id") long id, @RequestBody NoteDto noteDto) {
        NoteDto updatedNote = noteService.updateNote(id, noteDto);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/mods/{modId}")
    public List<NoteDto> getNotesByModId(@PathVariable Long modId) {
        return noteService.getNotesByModId(modId);
    }

}













