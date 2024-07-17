package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.InscriptionDto;
import com.backend.FSMedu.entity.InscriptionStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface InscriptionService {
    InscriptionDto createInscriptionWithFiles(InscriptionDto inscriptionDto,
                                              MultipartFile cinFile,
                                              MultipartFile imgFile,
                                              MultipartFile bacFile);
    List<InscriptionDto> getAllInscriptions();
    void deleteInscription(Long id);
    String storeImage(MultipartFile file) throws IOException;
    void updateInscriptionStatus(Long inscriptionId, InscriptionStatus newStatus);
}

