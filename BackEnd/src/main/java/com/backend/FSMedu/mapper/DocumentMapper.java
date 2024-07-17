package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.DocumentDto;
import com.backend.FSMedu.entity.Document;

public class DocumentMapper {
    public static DocumentDto mapToDocumentDto(Document document) {
        DocumentDto dto = new DocumentDto();
        dto.setId(document.getId());
        dto.setStudentId(document.getStudentId());
        dto.setDocumentType(document.getDocumentType());
        return dto;
    }

    public static Document mapToDocument(DocumentDto dto) {
        Document document = new Document();
        document.setId(dto.getId());
        document.setStudentId(dto.getStudentId());
        document.setDocumentType(dto.getDocumentType());
        return document;
    }
}
