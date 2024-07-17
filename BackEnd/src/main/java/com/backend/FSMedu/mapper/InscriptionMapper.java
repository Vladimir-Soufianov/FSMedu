package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.InscriptionDto;
import com.backend.FSMedu.entity.Inscription;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


public class InscriptionMapper {

    public  static InscriptionDto mapToDto(Inscription inscription) {
        InscriptionDto Dto = new InscriptionDto();
        Dto.setId(inscription.getId());
        Dto.setNom(inscription.getNom());
        Dto.setPrenom(inscription.getPrenom());
        Dto.setEmail(inscription.getEmail());
        Dto.setCne(inscription.getCne());
        Dto.setTelephone(inscription.getTelephone());
        Dto.setCin(inscription.getCin());
        Dto.setRegion(inscription.getRegion());
        Dto.setAnnebac(inscription.getAnnebac());
        Dto.setFiliere(inscription.getFiliere());
        Dto.setCinUrl(getImageUrl(inscription.getCinUrl()));
        Dto.setImgUrl(getImageUrl(inscription.getImgUrl()));
        Dto.setBacUrl(getImageUrl(inscription.getBacUrl()));
        Dto.setStatus(inscription.getStatus());
        return Dto;
    }

    private static String getImageUrl(String relativePath) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(relativePath)
                .toUriString();
    }

    public static Inscription mapToEntity(InscriptionDto Dto) {
        Inscription inscription = new Inscription();
        inscription.setId(Dto.getId());
        inscription.setNom(Dto.getNom());
        inscription.setPrenom(Dto.getPrenom());
        inscription.setEmail(Dto.getEmail());
        inscription.setCne(Dto.getCne());
        inscription.setTelephone(Dto.getTelephone());
        inscription.setCin(Dto.getCin());
        inscription.setRegion(Dto.getRegion());
        inscription.setAnnebac(Dto.getAnnebac());
        inscription.setFiliere(Dto.getFiliere());
        inscription.setCinUrl(Dto.getCinUrl());
        inscription.setImgUrl(Dto.getImgUrl());
        inscription.setBacUrl(Dto.getBacUrl());
        inscription.setStatus(Dto.getStatus());
        return inscription;
    }
}
