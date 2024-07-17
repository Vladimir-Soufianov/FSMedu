package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.SeanceDto;
import com.backend.FSMedu.entity.Seance;

public class SeanceMapper {

    public static SeanceDto mapToSeanceDto(Seance seance) {
        SeanceDto seanceDto = new SeanceDto();
        seanceDto.setId(seance.getId());
        seanceDto.setStart(seance.getStart());
        seanceDto.setFinish(seance.getFinish());
        if (seance.getProf() != null) {
            seanceDto.setProfId(seance.getProf().getId());
        }
        if (seance.getMod() != null) {
            seanceDto.setModuleId(seance.getMod().getId());
        }
        if (seance.getChefdep() != null) {
            seanceDto.setChefdepid(seance.getChefdep().getId());
        }
        if (seance.getCheffil() != null) {
            seanceDto.setCheffilid(seance.getCheffil().getId());
        }
        seanceDto.setLocal(seance.getLocal());
        seanceDto.setRole(seance.getRole());
        seanceDto.setSeanceType(seance.getSeanceType());
        return seanceDto;
    }

    public static Seance mapToSeance(SeanceDto seanceDto) {
        Seance seance = new Seance();
        seance.setId(seanceDto.getId());
        seance.setStart(seanceDto.getStart());
        seance.setFinish(seanceDto.getFinish());
        // Set other fields similarly
        seance.setRole(seanceDto.getRole());
        seance.setSeanceType(seanceDto.getSeanceType());
        return seance;
    }
}
