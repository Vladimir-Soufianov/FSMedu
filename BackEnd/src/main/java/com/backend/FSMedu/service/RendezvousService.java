package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.RendezvouDto;
import com.backend.FSMedu.entity.Rendezvous;

import java.util.List;

public interface RendezvousService {
    List<RendezvouDto> getAllRendezvous();
    RendezvouDto getRendezvousById(Long id);
    void deleteRendezvous(Long id);
    RendezvouDto updateRendezvous(Long id, RendezvouDto updatedRendezvousDto);
    RendezvouDto createRendezvous(RendezvouDto rendezvouDto);
    void acceptRendezvous(long id);
    void refuseRendezvous(long id);
    void sendEmail(String to, String subject, String text);
}
