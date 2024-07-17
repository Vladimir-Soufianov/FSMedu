package com.backend.FSMedu.mapper;
import com.backend.FSMedu.dto.YearDto;
import com.backend.FSMedu.entity.Year;
import org.springframework.stereotype.Component;


public class YearMapper {

    public static YearDto mapToYearDto(Year year) {
        return new YearDto(
                year.getId(),
                year.getNom(),
                year.getStart(),
                year.getFinish(),
                year.isActive()
        );
    }

    public static Year mapToYear(YearDto yearDto) {
        Year year = new Year();
        year.setNom(yearDto.getNom());
        year.setStart(yearDto.getStart());
        year.setFinish(yearDto.getFinish());
        year.setActive(yearDto.isActive());
        return year;
    }

}

