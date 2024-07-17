package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.CommentaireDto;
import com.backend.FSMedu.entity.Commentaire;
import com.backend.FSMedu.service.CommentaireService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {

    private CommentaireService commentaireService;
    public CommentaireController(CommentaireService commentaireService){
        this.commentaireService=commentaireService;
    }

    @PostMapping
    public ResponseEntity<CommentaireDto> createCommentaire(@RequestBody CommentaireDto commentaireDto){
        CommentaireDto savedCommentaire=commentaireService.createCommentaire(commentaireDto);
        return new ResponseEntity<>(savedCommentaire, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CommentaireDto>> getAllCommentaires(){
        List<CommentaireDto> commentaires=commentaireService.getAllCommentaires();
        return ResponseEntity.ok(commentaires);
    }

    @PostMapping("{id}")
    public ResponseEntity<CommentaireDto> updateCommentaire(@PathVariable("id") Long commentaireId ,@RequestBody CommentaireDto updatedCommentaire){
        CommentaireDto commentaireDto=commentaireService.updateCommentaire(commentaireId,updatedCommentaire);
        return ResponseEntity.ok(commentaireDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCommentaire(@PathVariable("id") Long commentaireId){
        commentaireService.deleteCommentaire(commentaireId);
        return ResponseEntity.ok("Deleted succefully");
    }

    @GetMapping("/{bookId}")
    public List<Commentaire> getCommentairesByBookId(@PathVariable Long bookId) {
        return commentaireService.getCommentairesByBookId(bookId);
    }


}
