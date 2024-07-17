package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.QuestionDto;
import com.backend.FSMedu.entity.Question;

public class QuestionMapper {
    public static QuestionDto mapToQuestionDto (Question question){
        return new QuestionDto(
                question.getId(),
                question.getNom(),
                question.getPrenom(),
                question.getQst(),
                question.getResp(),
                question.getEmail()
        );
    }
    public static Question mapToQuestion(QuestionDto questionDto){
        return new Question(
                questionDto.getId(),
                questionDto.getNom(),
                questionDto.getPrenom(),
                questionDto.getQst(),
                questionDto.getResp(),
                questionDto.getEmail()
        );
    }
}
