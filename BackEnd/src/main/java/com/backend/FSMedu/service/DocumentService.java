package com.backend.FSMedu.service;
import com.backend.FSMedu.dto.DocumentDto;
import java.util.List;

public interface DocumentService {

    DocumentDto createDocument(DocumentDto documentDto);
    DocumentDto getDocumentById(Long id);
    List<DocumentDto> getAllDocuments();
    void deleteDocument(Long id);
    DocumentDto updateDocument(Long id, DocumentDto documentDto);
}
