package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.NoteDto;
import com.backend.FSMedu.entity.Note;

public class NoteMapper {

    public static NoteDto mapToNoteDto(Note note) {
        NoteDto noteDto = new NoteDto();
        noteDto.setId(note.getId());
        noteDto.setStudentId(note.getStudent().getId());
        noteDto.setModId(note.getMod().getId());
        noteDto.setYearId(note.getYear().getId());
        noteDto.setNote(note.getNote());
        return noteDto;
    }

    public static Note mapToNote(NoteDto noteDto) {
        Note note = new Note();
        note.setId(noteDto.getId());
        return note;
    }
}
