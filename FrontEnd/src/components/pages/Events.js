import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../pagescss/carosel.css';
import dayjs from 'dayjs';

function Calendar({ onChange, value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={onChange} value={dayjs(value)} />
    </LocalizationProvider>
  );
}

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter events based on selected date or nearby dates
  const filteredEvents = events.filter((event) => {
    const eventDate = dayjs(event.date);
    const diffInDays = eventDate.diff(selectedDate, 'day');
    return Math.abs(diffInDays) <= 15; // Show events within 15 days of the selected date
  });

  // Sort events by date
  const sortedEvents = filteredEvents.sort((a, b) => dayjs(a.date).toDate() - dayjs(b.date).toDate());

  // Get the three most recent upcoming events
  const upcomingEvents = sortedEvents.slice(0, 3);

  return (
    <div style={{ display: 'flex', paddingTop: 20, backgroundColor: 'lightgrey' }}>
      <div style={{ height: '500px', width: '55vw', marginLeft: 20 }}>
        <h2>Événements</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {upcomingEvents.map((event, index) => (
            <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid black', borderRadius: 20, position: 'relative' }}>
              <h3 style={{ margin: '0' }}>{event.title}</h3>
              <p style={{ margin: '5px 0' }}>{event.description}</p>
              <p style={{ margin: '5px 0', fontStyle: 'italic' }}>Date: {dayjs(event.date).format('YYYY-MM-DD')}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ height: '500px', flex: '1', alignContent: 'center' }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
    </div>
  );
}

export default Events;
