package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.CommentaireDto;
import com.backend.FSMedu.entity.Commentaire;
import jakarta.transaction.Transactional;

import java.util.List;

public interface CommentaireService {
    CommentaireDto createCommentaire(CommentaireDto commentaireDto);
    CommentaireDto getCommentaireById(Long id);
    CommentaireDto updateCommentaire(Long commentaireId, CommentaireDto commentaireDto);
    void deleteCommentaire(Long commentaireId);
    List<CommentaireDto> getAllCommentaires();
    List<Commentaire> getCommentairesByBookId(Long bookId);
}
