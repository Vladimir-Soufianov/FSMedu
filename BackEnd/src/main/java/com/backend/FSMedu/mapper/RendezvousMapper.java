package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.RendezvouDto;
import com.backend.FSMedu.entity.Rendezvous;

public class RendezvousMapper {
    public static RendezvouDto mapToRendezvousDto(Rendezvous rendezvous){
        return new RendezvouDto(
                rendezvous.getId(),
                rendezvous.getNom(),
                rendezvous.getPrenom(),
                rendezvous.getEmail(),
                rendezvous.getDate()
        );
    }

    public static Rendezvous mapToRendezvous(RendezvouDto rendezvouDto){
        return new Rendezvous(
                rendezvouDto.getId(),
                rendezvouDto.getNom(),
                rendezvouDto.getPrenom(),
                rendezvouDto.getEmail(),
                rendezvouDto.getDate()
        );
    }
}
