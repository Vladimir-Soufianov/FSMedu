package com.backend.FSMedu.service.impl;

import com.backend.FSMedu.dto.RendezvouDto;
import com.backend.FSMedu.entity.Rendezvous;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.RendezvousMapper;
import com.backend.FSMedu.repository.RendezvousRepository;
import com.backend.FSMedu.service.RendezvousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RendezvousServiceImpl implements RendezvousService {

    RendezvousRepository rendezvousRepository;
    private JavaMailSender mailSender;

    @Autowired
    RendezvousServiceImpl(RendezvousRepository rendezvousRepository,JavaMailSender mailSender){
        this.rendezvousRepository=rendezvousRepository;
        this.mailSender=mailSender;
    }

    @Override
    public RendezvouDto createRendezvous(RendezvouDto rendezvouDto) {
        Rendezvous rendezvous= RendezvousMapper.mapToRendezvous(rendezvouDto);
        Rendezvous savedRendezvous=rendezvousRepository.save(rendezvous);
        return RendezvousMapper.mapToRendezvousDto(savedRendezvous);
    }

    @Override
    public List<RendezvouDto> getAllRendezvous() {
        List<Rendezvous> rendezvousList = rendezvousRepository.findAll();
        return rendezvousList.stream()
                .map(RendezvousMapper::mapToRendezvousDto)
                .collect(Collectors.toList());
    }


    @Override
    public RendezvouDto getRendezvousById(Long id) {
        Rendezvous rendezvous = rendezvousRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rendezvous not found with id: " + id));

        return RendezvousMapper.mapToRendezvousDto(rendezvous);
    }


    @Override
    public void deleteRendezvous(Long id) {
        rendezvousRepository.deleteById(id);
    }



    @Override
    public RendezvouDto updateRendezvous(Long id, RendezvouDto updatedRendezvousDto) {
        Rendezvous existingRendezvous = rendezvousRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rendezvous not found with id: " + id));

        // Update fields based on the provided DTO
        if (updatedRendezvousDto.getNom() != null) {
            existingRendezvous.setNom(updatedRendezvousDto.getNom());
        }
        if (updatedRendezvousDto.getPrenom() != null) {
            existingRendezvous.setPrenom(updatedRendezvousDto.getPrenom());
        }
        if (updatedRendezvousDto.getEmail() != null) {
            existingRendezvous.setEmail(updatedRendezvousDto.getEmail());
        }
        if (updatedRendezvousDto.getDate() != null) {
            existingRendezvous.setDate(updatedRendezvousDto.getDate());
        }

        Rendezvous updatedRendezvous = rendezvousRepository.save(existingRendezvous);
        return RendezvousMapper.mapToRendezvousDto(updatedRendezvous);
    }

    @Override
    public void acceptRendezvous(long id) {
        RendezvouDto rendezvous = getRendezvousById(id);
        sendEmail(rendezvous.getEmail(), "Rendez-vous ", "Votre rendez-vous est accepté !");
        deleteRendezvous(id);
    }

    @Override
    public void refuseRendezvous(long id) {
        RendezvouDto rendezvous = getRendezvousById(id);
        sendEmail(rendezvous.getEmail(), "Rendez-vous", "Nous excusons mais votre rendez-vous est refusé");
        deleteRendezvous(id);
    }

    @Override
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}



