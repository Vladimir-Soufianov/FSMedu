package com.backend.FSMedu.service.impl;
import com.backend.FSMedu.dto.DocumentDto;
import com.backend.FSMedu.entity.Document;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.DocumentMapper;
import com.backend.FSMedu.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.FSMedu.service.DocumentService;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;

    }

    @Override
    public DocumentDto getDocumentById(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));
        return DocumentMapper.mapToDocumentDto(document);
    }

    @Override
    public List<DocumentDto> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();
        return documents.stream()
                .map(DocumentMapper::mapToDocumentDto)
                .collect(Collectors.toList());
    }

    @Override
    public DocumentDto createDocument(DocumentDto documentDto) {
        Document document = DocumentMapper.mapToDocument(documentDto);
        Document savedDocument = documentRepository.save(document);
        return DocumentMapper.mapToDocumentDto(savedDocument);
    }

    @Override
    public DocumentDto updateDocument(Long id, DocumentDto documentDto) {
        Document existingDocument = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        // Update each field separately based on what is provided in documentDto

        // Update documentType if provided
        if (documentDto.getDocumentType() != null) {
            existingDocument.setDocumentType(documentDto.getDocumentType());
        }

        // Update studentId if provided
        if (documentDto.getStudentId() != null) {
            existingDocument.setStudentId(documentDto.getStudentId());
        }

        // Add more fields to update as needed

        // Save the updated document entity
        Document updatedDocument = documentRepository.save(existingDocument);

        // Return the updated DocumentDto
        return DocumentMapper.mapToDocumentDto(updatedDocument);
    }

    @Override
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}

