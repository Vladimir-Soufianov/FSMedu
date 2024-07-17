package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.DevoirReponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DevoirReponseService {
    List<DevoirReponseDto> getReponsesByDevoir(Long devoirId);
    List<DevoirReponseDto> getReponsesByStudent(Long studentId);
    List<DevoirReponseDto> getAllReponses();
    DevoirReponseDto getReponseById(Long id);
    DevoirReponseDto saveReponse(DevoirReponseDto dto,MultipartFile devFile) throws IOException;
    DevoirReponseDto updateReponse(long id, DevoirReponseDto reponseDto, MultipartFile devfile) throws IOException;
    void deleteReponse(Long id);
    String storeFile(MultipartFile file) throws IOException;

}
