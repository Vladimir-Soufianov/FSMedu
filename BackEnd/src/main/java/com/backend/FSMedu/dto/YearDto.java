package com.backend.FSMedu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class YearDto {

    private Long id;
    private String nom;
    private LocalDate start;
    private LocalDate finish;
    private boolean active;

    // Constructors, getters, setters
}

