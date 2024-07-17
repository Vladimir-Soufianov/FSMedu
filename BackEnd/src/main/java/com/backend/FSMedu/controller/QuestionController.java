package com.backend.FSMedu.controller;

import com.backend.FSMedu.dto.QuestionDto;
import com.backend.FSMedu.service.QuestionService;
import com.backend.FSMedu.service.impl.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    private EmailService emailService;

    public QuestionController(QuestionService questionService,EmailService emailService){
        this.questionService=questionService;
        this.emailService=emailService;
    }

    @PostMapping
    public ResponseEntity<QuestionDto> createQuestion(@RequestBody QuestionDto questionDto){
        QuestionDto savedQuestion=questionService.createQuestion(questionDto);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<QuestionDto>> getAllQuestions(){
        List<QuestionDto> questions=questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }


    @PostMapping("/{id}")
    public ResponseEntity<QuestionDto> updateQuestion(@PathVariable Long id, @RequestBody QuestionDto updatedQuestion) throws MessagingException {
        // Update the question in the database
        QuestionDto updatedQuestionDto = questionService.updateQuestion(id, updatedQuestion);

        // Send the email with the response
        emailService.sendEmail(updatedQuestion.getEmail(), "Reponse a votre question", updatedQuestion.getResp());

        return ResponseEntity.ok(updatedQuestionDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable("id") Long questionId){
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok("Deleted succefully");
    }

}
