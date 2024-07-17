package com.backend.FSMedu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DevoirDto {
    private long id;
    private long profId;
    private long chefDepartementId;
    private long chefFiliereId;
    private String title;
    private String fileUrl;
    private String description;
    private Long moduleId;
    private LocalDate fin;
}
