package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.YearDto;

import java.util.List;

public interface YearService {

    YearDto createYear(YearDto yearDto);

    YearDto getYearById(Long id);

    List<YearDto> getAllYears();

    YearDto updateYear(Long id, YearDto yearDto);

    void deleteYear(Long id);
}
