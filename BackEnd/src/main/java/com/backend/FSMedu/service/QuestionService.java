package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.QuestionDto;

import java.util.List;

public interface QuestionService {
    QuestionDto createQuestion(QuestionDto questionDto);
    QuestionDto updateQuestion(Long questionId,QuestionDto questionDto);
    void deleteQuestion(Long questionId);
    List<QuestionDto> getAllQuestions();
}
