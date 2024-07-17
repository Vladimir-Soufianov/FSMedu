package com.backend.FSMedu.service;

import com.backend.FSMedu.dto.EventDto;

import java.util.List;

    public interface EventService{
    List<EventDto> getAllEvents();
        EventDto getEventById(Long id);
        EventDto createEvent(EventDto eventDto);
        EventDto updateEvent(Long id, EventDto eventDto);
        void deleteEvent(Long id);
    }