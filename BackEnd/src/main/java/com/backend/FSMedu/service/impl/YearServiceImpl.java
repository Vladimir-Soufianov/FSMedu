package com.backend.FSMedu.service.impl;
import com.backend.FSMedu.dto.YearDto;
import com.backend.FSMedu.entity.Year;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.YearMapper;
import com.backend.FSMedu.repository.YearRepository;
import com.backend.FSMedu.service.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class YearServiceImpl implements YearService {

    private final YearRepository yearRepository;

    @Autowired
    public YearServiceImpl(YearRepository yearRepository) {
        this.yearRepository = yearRepository;
    }

    @Override
    public YearDto createYear(YearDto yearDto) {
        Year newYear = YearMapper.mapToYear(yearDto);

        // Find the currently active year, if any
        Year activeYear = yearRepository.findByActiveTrue();

        if (activeYear != null) {
            // Compare finish dates to determine activation of new year
            if (newYear.getFinish().isAfter(activeYear.getFinish())) {
                activeYear.setActive(false); // Deactivate the current active year
                yearRepository.save(activeYear);
                newYear.setActive(true); // Activate the new year
            } else {
                newYear.setActive(false); // If new year finish date is not after, keep it inactive
            }
        } else {
            newYear.setActive(true); // If no active year exists, activate the new year
        }

        // Save the new year entity
        Year savedYear = yearRepository.save(newYear);

        // Return the DTO representation of the saved year
        return YearMapper.mapToYearDto(savedYear);
    }

    @Override
    public YearDto getYearById(Long yearId) {
        Year year = yearRepository.findById(yearId)
                .orElseThrow(() -> new ResourceNotFoundException("Year not found with id: " + yearId));
        return YearMapper.mapToYearDto(year);
    }

    @Override
    public List<YearDto> getAllYears() {
        List<Year> years = yearRepository.findAll();
        return years.stream()
                .map(YearMapper::mapToYearDto)
                .collect(Collectors.toList());
    }

    @Override
    public YearDto updateYear(Long id, YearDto updatedYear) {
        Year year = yearRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Year not found with id: " +id));
        year.setId(updatedYear.getId() !=null ? updatedYear.getId() : year.getId());
        year.setNom(updatedYear.getNom() !=null ? updatedYear.getNom() : year.getNom());
        year.setStart(updatedYear.getStart()!=null ? updatedYear.getStart():year.getStart());
        year.setFinish(updatedYear.getFinish()!= null ? updatedYear.getFinish():year.getFinish());
        year.setActive(updatedYear.isActive() ? updatedYear.isActive() : year.isActive());


        Year updatedYearObj = yearRepository.save(year);
        return YearMapper.mapToYearDto(updatedYearObj);
    }

    @Override
    public void deleteYear(Long yearId) {
        if (!yearRepository.existsById(yearId)) {
            throw new ResourceNotFoundException("Year not found with id: " + yearId);
        }
        yearRepository.deleteById(yearId);
    }



}
