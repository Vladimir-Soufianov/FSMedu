package com.backend.FSMedu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DevoirReponseDto {
    private long id;
    private long devoirId;
    private long studentId;
    private String fichierUrl;

}
