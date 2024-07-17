package com.backend.FSMedu.mapper;
import com.backend.FSMedu.dto.DevoirDto;
import com.backend.FSMedu.entity.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class DevoirMapper {

        public static DevoirDto mapToDevoirDto(Devoir devoir) {
            DevoirDto dto = new DevoirDto();
            dto.setId(devoir.getId());
            dto.setTitle(devoir.getTitle());
            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/images/")
                    .path(devoir.getFileUrl())
                    .toUriString();
            dto.setFileUrl(fileUrl);
            dto.setDescription(devoir.getDescription());
            dto.setFin(devoir.getFin());
            // Map Prof
            if (devoir.getProf() != null) {
                dto.setProfId(devoir.getProf().getId());
            }

            // Map ChefDepartement
            if (devoir.getChefDepartement() != null) {
                dto.setChefDepartementId(devoir.getChefDepartement().getId());
            }

            // Map ChefFiliere
            if (devoir.getChefFiliere() != null) {
                dto.setChefFiliereId(devoir.getChefFiliere().getId());
            }

            // Map Module
            if (devoir.getModule() != null) {
                dto.setModuleId(devoir.getModule().getId());
            }
            return dto;
        }

        public static Devoir mapToDevoir(DevoirDto dto) {
            Devoir devoir = new Devoir();
            devoir.setId(dto.getId());
            devoir.setTitle(dto.getTitle());
            devoir.setFileUrl(dto.getFileUrl());
            devoir.setDescription(dto.getDescription());
            devoir.setFin(dto.getFin());

            if (dto.getProfId() != 0) {
                Prof prof = new Prof();
                prof.setId(dto.getProfId());
                devoir.setProf(prof);
            }
            if (dto.getChefDepartementId() != 0) {
                ChefDepartement chefDepartement = new ChefDepartement();
                chefDepartement.setId(dto.getChefDepartementId());
                devoir.setChefDepartement(chefDepartement);
            }
            if (dto.getChefFiliereId() != 0) {
                ChefFiliere chefFiliere = new ChefFiliere();
                chefFiliere.setId(dto.getChefFiliereId());
                devoir.setChefFiliere(chefFiliere);
            }

            // Map Module
            if (dto.getModuleId() != null) {
                Mod module = new Mod();
                module.setId(dto.getModuleId());
                devoir.setModule(module);
            }

            return devoir;
        }
    }


