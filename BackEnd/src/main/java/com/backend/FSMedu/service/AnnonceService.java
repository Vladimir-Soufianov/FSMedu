package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.AnnonceDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AnnonceService {
    List<AnnonceDto> getAllAnnonces();
    AnnonceDto getAnnonceById(Long id);
    AnnonceDto createAnnonce(AnnonceDto annonceDTO, MultipartFile imageFile) throws IOException;
    AnnonceDto updateAnnonce(Long id, AnnonceDto AnnonceDto);
    void deleteAnnonce(Long id);
    String storeImage(MultipartFile file) throws IOException;
}
