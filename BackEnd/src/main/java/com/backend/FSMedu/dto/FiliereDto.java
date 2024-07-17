package com.backend.FSMedu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FiliereDto {
    private long id;
    private String nom;
    private Long departmentId;
    private Long chefFiliereId;
    private List<Long> moduleIds;

}
