package com.backend.FSMedu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDto {
    private long id;

    private String nom;

    private String prenom;

    private String qst;

    private String resp;
    private String email;
}
