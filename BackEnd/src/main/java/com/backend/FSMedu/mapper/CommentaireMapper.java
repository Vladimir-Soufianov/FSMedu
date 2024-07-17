package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.CommentaireDto;
import com.backend.FSMedu.entity.Commentaire;

public class CommentaireMapper {
    public static CommentaireDto mapToCommentaireDto(Commentaire commentaire){
        CommentaireDto commentaireDto = new CommentaireDto();
        commentaireDto.setId(commentaire.getId());
        commentaireDto.setNom(commentaire.getNom());
        commentaireDto.setPrenom(commentaire.getPrenom());
        commentaireDto.setCmmnt(commentaire.getCmmnt());
        if (commentaire.getBook() != null) {
            commentaireDto.setBookId(commentaire.getBook().getId());
        }
        return commentaireDto;
    }
    public static Commentaire mapToCommentaire(CommentaireDto commentaireDto){
        Commentaire commentaire = new Commentaire();
        commentaire.setId(commentaireDto.getId());
        commentaire.setNom(commentaireDto.getNom());
        commentaire.setPrenom(commentaireDto.getPrenom());
        commentaire.setCmmnt(commentaireDto.getCmmnt());
        return commentaire;
    }
}
