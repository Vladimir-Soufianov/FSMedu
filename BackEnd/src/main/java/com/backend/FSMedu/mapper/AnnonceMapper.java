package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.AnnonceDto;
import com.backend.FSMedu.entity.Annonce;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class AnnonceMapper {
    public static AnnonceDto mapToAnnonceDto(Annonce Annonce) {
        if (Annonce == null) {
            return null;
        }

        AnnonceDto dto = new AnnonceDto();
        dto.setId(Annonce.getId());
        dto.setTitle(Annonce.getTitle());
        dto.setDescription(Annonce.getDescription());

        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(Annonce.getImageUrl())
                .toUriString();
        dto.setImageUrl(imageUrl);
        return dto;
    }

    public static Annonce mapToAnnonce(AnnonceDto dto) {
        Annonce Annonce = new Annonce();
        Annonce.setId(dto.getId());
        Annonce.setTitle(dto.getTitle());
        Annonce.setDescription(dto.getDescription());
        Annonce.setImageUrl(dto.getImageUrl());
        return Annonce;
    }
}
