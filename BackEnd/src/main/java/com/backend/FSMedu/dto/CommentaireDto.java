package com.backend.FSMedu.dto;
import com.backend.FSMedu.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentaireDto {

    private long id;

    private String nom;

    private String prenom;

    private String cmmnt;

    private Long bookId;
}
