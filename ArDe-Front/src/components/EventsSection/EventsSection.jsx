import React, { useEffect, useState } from 'react';
import './EventsSection.css';

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
      })
      .catch(err => {
        console.error('Error bringing events:', err);
      });
  }, []);


  return (
    <section className="events-section">
      <div className="overlay"></div>
      <div className="events-content">
        <h2>Próximos Eventos</h2>
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <p><strong>{event.title}:</strong> {event.description}</p>
            <p>{event.event_date} {event.event_time.slice(0, 5)} - {event.place}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
