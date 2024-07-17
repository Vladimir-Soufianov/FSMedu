package com.backend.FSMedu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SemestreDto {
    private long id;
    private String nom;
    private LocalDate start;
    private LocalDate finish;
    private long yearId;
    private List<Long> modIds;
}