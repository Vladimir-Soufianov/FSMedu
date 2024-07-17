package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.CommentaireDto;
import com.backend.FSMedu.entity.Book;
import com.backend.FSMedu.entity.Commentaire;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.CommentaireMapper;
import com.backend.FSMedu.repository.BookRepository;
import com.backend.FSMedu.repository.CommentaireRepository;
import com.backend.FSMedu.service.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentaireServiceImpl implements CommentaireService {
    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public CommentaireDto createCommentaire(CommentaireDto commentaireDto) {
        Book book = bookRepository.findById(commentaireDto.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        Commentaire commentaire = CommentaireMapper.mapToCommentaire(commentaireDto);
        commentaire.setBook(book);
        Commentaire savedCommentaire = commentaireRepository.save(commentaire);
        return CommentaireMapper.mapToCommentaireDto(savedCommentaire);
    }


    @Override
    public CommentaireDto getCommentaireById(Long id) {
        Commentaire commentaire = commentaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commentaire not found"));
        return CommentaireMapper.mapToCommentaireDto(commentaire);
    }

    @Override
    public CommentaireDto updateCommentaire(Long commentaireId , CommentaireDto updatedCommentaire){
        Commentaire commentaire=commentaireRepository.findById(
                commentaireId).orElseThrow(
                ()->new ResourceNotFoundException("Commentaire non existant")
                );
        if (updatedCommentaire.getNom() != null) {
            commentaire.setNom(updatedCommentaire.getNom());
        }
        if (updatedCommentaire.getPrenom() != null) {
            commentaire.setPrenom(updatedCommentaire.getPrenom());
        }
        if (updatedCommentaire.getCmmnt() != null) {
            commentaire.setCmmnt(updatedCommentaire.getCmmnt());
        }

        Commentaire updatedCommentaireObj = commentaireRepository.save(commentaire);
        return CommentaireMapper.mapToCommentaireDto(updatedCommentaireObj);
    }

    @Override
    public void deleteCommentaire(Long commentaireId) {
        Commentaire commentaire=commentaireRepository.findById(
                commentaireId).orElseThrow(
                ()->new ResourceNotFoundException("Commentaire non existant")
        );
        commentaireRepository.deleteById(commentaireId);
    }

    @Override
    public List<CommentaireDto> getAllCommentaires(){
        List<Commentaire> commentaires=commentaireRepository.findAll();
        return commentaires.stream().map(
                (commentaire) ->CommentaireMapper.mapToCommentaireDto(commentaire)
        ).collect(Collectors.toList());
    }

    @Autowired
    public CommentaireServiceImpl(CommentaireRepository commentaireRepository){
        this.commentaireRepository=commentaireRepository;
    }

    @Override
    public List<Commentaire> getCommentairesByBookId(Long bookId) {
        return commentaireRepository.findByBookId(bookId);
    }








}
