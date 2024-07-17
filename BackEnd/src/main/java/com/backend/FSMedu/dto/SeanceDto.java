package com.backend.FSMedu.dto;

import com.backend.FSMedu.entity.Prof;
import com.backend.FSMedu.entity.SeanceType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeanceDto {
    private long id;
    private LocalDateTime start;
    private LocalDateTime finish;
    private Long profId;
    private Long moduleId;
    private String local;
    private Long cheffilid;
    private Long chefdepid;
    private String role;
    private SeanceType seanceType;
}
