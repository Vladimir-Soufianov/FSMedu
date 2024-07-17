package com.backend.FSMedu.service.impl;
import com.backend.FSMedu.dto.QuestionDto;
import com.backend.FSMedu.entity.Question;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.QuestionMapper;
import com.backend.FSMedu.repository.QuestionRepository;
import com.backend.FSMedu.service.QuestionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    private QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl (QuestionRepository questionRepository){
        this.questionRepository=questionRepository;
    }

    @Override
    public QuestionDto createQuestion(QuestionDto questionDto) {
        Question question= QuestionMapper.mapToQuestion(questionDto);
        Question savedQuestion=questionRepository.save(question);
        return QuestionMapper.mapToQuestionDto(savedQuestion);
    }

    @Transactional
    @Override
    public QuestionDto updateQuestion(Long questionId, QuestionDto updatedQuestion) {
        Question question=questionRepository.findById(
                questionId).orElseThrow(
                ()->new ResourceNotFoundException("Question non existant")
        );
        if (updatedQuestion.getNom() != null) {
            question.setNom(updatedQuestion.getNom());
        }

        if (updatedQuestion.getPrenom() != null) {
            question.setPrenom(updatedQuestion.getPrenom());
        }

        if (updatedQuestion.getQst() != null) {
            question.setQst(updatedQuestion.getQst());
        }
        if (updatedQuestion.getResp() != null) {
            question.setResp(updatedQuestion.getResp());
        }
        if (updatedQuestion.getEmail() != null) {
            question.setEmail(updatedQuestion.getEmail());
        }

        Question updatedQuestionObj=questionRepository.save(question);
        return QuestionMapper.mapToQuestionDto(updatedQuestionObj);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        Question question=questionRepository.findById(
                questionId).orElseThrow(
                ()->new ResourceNotFoundException("Question non existant")
        );
        questionRepository.deleteById(questionId);
    }

    @Override
    public List<QuestionDto> getAllQuestions() {
        List<Question> questions=questionRepository.findAll();
        return questions.stream().map(
                (question) ->QuestionMapper.mapToQuestionDto(question)
        ).collect(Collectors.toList());
    }
}
