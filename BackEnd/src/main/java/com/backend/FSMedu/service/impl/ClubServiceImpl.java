package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.ClubDto;
import com.backend.FSMedu.entity.Club;
import com.backend.FSMedu.entity.Student;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.ClubMapper;
import com.backend.FSMedu.repository.ClubRepository;
import com.backend.FSMedu.repository.StudentRepository;
import com.backend.FSMedu.service.ClubService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClubServiceImpl implements ClubService {
    private ClubRepository clubRepository ;
   private  StudentRepository studentRepository;

    @Override
    public ClubDto createClub(ClubDto clubDto){
        Club club= ClubMapper.mapToClub(clubDto);
        Club savedClub= clubRepository.save(club);
        return ClubMapper.mapToClubDto(savedClub);
    }

    @Override
    public ClubDto getClubById(long clubId){
        Club club =clubRepository.findById(clubId)
                .orElseThrow(()->new ResourceNotFoundException(
                        "Pas de club"
                        )
                );
        return ClubMapper.mapToClubDto(club);
    }

    @Override
    public List<ClubDto> getAllClubs() {
        List<Club> clubs = clubRepository.findAll();
        return clubs.stream().map(
                (club) -> ClubMapper.mapToClubDto(club))
                        .collect(Collectors.toList()) ;
    }

    @Override
    public ClubDto updateClub(Long clubId, ClubDto updatedClub) {
        Club club=clubRepository.findById(
        clubId).orElseThrow(
                ()->new ResourceNotFoundException("Club non existant")
        );
        if (updatedClub.getNom() != null) {
            club.setNom(updatedClub.getNom());
        }
        if (updatedClub.getStudents() != null) {
            club.setStudents(updatedClub.getStudents());
        }

        Club updatedClubObj=clubRepository.save(club);
        return ClubMapper.mapToClubDto(updatedClubObj);
    }

    @Override
    public void deleteClub(Long clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(
                ()->new ResourceNotFoundException("Club non existant")
        );
        clubRepository.deleteById((clubId));
    }
    @Override
    @Transactional
    public void removeStudentFromClub(Long studentId, Long clubId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new ResourceNotFoundException("Club not found with id: " + clubId));
        if (!club.getStudents().contains(student)) {
            throw new ResourceNotFoundException("Student with id " + studentId + " is not associated with club with id " + clubId);
        }
        club.getStudents().remove(student);
        student.getClubs().remove(club);
    }


    @Autowired
    public ClubServiceImpl(ClubRepository clubRepository, StudentRepository studentRepository){
        this.clubRepository=clubRepository;
        this.studentRepository=studentRepository;
    }

}
