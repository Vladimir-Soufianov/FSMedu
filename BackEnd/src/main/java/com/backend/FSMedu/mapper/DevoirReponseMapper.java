package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.DevoirReponseDto;
import com.backend.FSMedu.entity.Devoir;
import com.backend.FSMedu.entity.DevoirReponse;
import com.backend.FSMedu.entity.Student;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class DevoirReponseMapper {

    public static DevoirReponseDto mapToDevoirReponseDto(DevoirReponse reponse) {
        if (reponse == null) {
            return null;
        }

        DevoirReponseDto dto = new DevoirReponseDto();
        dto.setId(reponse.getId());

        if (reponse.getDevoir() != null) {
            dto.setDevoirId(reponse.getDevoir().getId());
        }

        if (reponse.getStudent() != null) {
            dto.setStudentId(reponse.getStudent().getId());
        }

        if (reponse.getFichierUrl() != null) {
            if (!reponse.getFichierUrl().startsWith("http")) {
                String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/files/")
                        .path(reponse.getFichierUrl())
                        .toUriString();
                dto.setFichierUrl(fileUrl);
                System.out.println("Constructed file URL in Mapper: " + fileUrl); // Debug log
            } else {
                dto.setFichierUrl(reponse.getFichierUrl());
                System.out.println("Using existing file URL in Mapper: " + reponse.getFichierUrl()); // Debug log
            }
        }

        return dto;
    }

    public static DevoirReponse mapToDevoirReponse(DevoirReponseDto dto) {
        if (dto == null) {
            return null;
        }

        DevoirReponse reponse = new DevoirReponse();
        reponse.setId(dto.getId());

        if (dto.getDevoirId() != 0) {
            Devoir devoir = new Devoir();
            devoir.setId(dto.getDevoirId());
            reponse.setDevoir(devoir);
        }

        if (dto.getStudentId() != 0) {
            Student student = new Student();
            student.setId(dto.getStudentId());
            reponse.setStudent(student);
        }
        reponse.setFichierUrl(dto.getFichierUrl());
        return reponse;
    }
}
