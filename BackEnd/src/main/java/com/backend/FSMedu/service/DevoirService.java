package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.DevoirDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DevoirService {
    DevoirDto createDevoir(DevoirDto devoirDto, MultipartFile imageFile) throws IOException;
    DevoirDto getDevoirById(long id);
    List<DevoirDto> getAllDevoirs();
    DevoirDto updateDevoir(long id, DevoirDto devoirDto, MultipartFile devfile) throws IOException;
    String storeFile(MultipartFile file) throws IOException  ;
    void deleteDevoir(long id);

    List<DevoirDto> findDevoirsByModuleId(Long moduleId);

}
