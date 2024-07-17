package com.backend.FSMedu.mapper;

import com.backend.FSMedu.dto.EventDto;
import com.backend.FSMedu.entity.Event;

public class EventMapper {
    public static EventDto mapToEventDto(Event event) {
        EventDto eventDto = new EventDto();
        eventDto.setId(event.getId());
        eventDto.setTitle(event.getTitle());
        eventDto.setDescription(event.getDescription());
        eventDto.setDate(event.getDate());
        return eventDto;
    }

    public static Event mapToEvent(EventDto eventDto) {
        Event event = new Event();
        event.setId(eventDto.getId());
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setDate(eventDto.getDate());
        return event;
    }
}
