package com.backend.FSMedu.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RendezvouDto {
    private long id;
    private String nom;
    private String  prenom;
    private String email;
    private LocalDateTime date;
}
