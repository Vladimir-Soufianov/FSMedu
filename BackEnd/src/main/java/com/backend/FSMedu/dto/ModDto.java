package com.backend.FSMedu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModDto {
    private long id;
    private String nom;
    private Long semestreId;
    private Long chefdepId;
    private Long cheffilId;
    private Long profId;
    private Long filiereId;
    private Set<Long> studentIds;
    private Set<Long> seanceIds;
}
