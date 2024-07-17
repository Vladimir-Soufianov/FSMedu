package com.backend.FSMedu.service.impl;
import com.backend.FSMedu.dto.EventDto;
import com.backend.FSMedu.entity.Event;
import com.backend.FSMedu.exception.ResourceNotFoundException;
import com.backend.FSMedu.mapper.EventMapper;
import com.backend.FSMedu.repository.EventRepository;
import com.backend.FSMedu.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository){
        this.eventRepository=eventRepository;
    }

    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(EventMapper::mapToEventDto)
                .collect(Collectors.toList());
    }

    public EventDto getEventById(Long id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            return EventMapper.mapToEventDto(optionalEvent.get());
        } else {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
    }

    public EventDto createEvent(EventDto eventDto) {
        Event event = EventMapper.mapToEvent(eventDto);
        Event savedEvent = eventRepository.save(event);
        return EventMapper.mapToEventDto(savedEvent);
    }

    public EventDto updateEvent(Long id, EventDto eventDto) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isEmpty()) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        Event existingEvent = optionalEvent.get();
        if (eventDto.getTitle() != null) {
            existingEvent.setTitle(eventDto.getTitle());
        }
        if (eventDto.getDescription() != null) {
            existingEvent.setDescription(eventDto.getDescription());
        }
        if (eventDto.getDate() != null) {
            existingEvent.setDate(eventDto.getDate());
        }
        Event updatedEvent = eventRepository.save(existingEvent);
        return EventMapper.mapToEventDto(updatedEvent);
    }


    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
}