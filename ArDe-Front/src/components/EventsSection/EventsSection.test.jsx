import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EventsSection from './EventsSection';

describe('EventsSection', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    globalThis.fetch = vi.fn();
  });


  it('Renderize "Próximos Eventos" title', () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(<EventsSection />);
    expect(screen.getByText(/Próximos Eventos/i)).toBeDefined();
  });


  it('Renderize received events', async () => {
    const mockEvents = [
      {
        title: 'Evento 1',
        description: 'Descripción 1',
        event_date: '2025-07-01',
        event_time: '18:30:00',
        place: 'Lugar 1',
      },
      {
        title: 'Evento 2',
        description: 'Descripción 2',
        event_date: '2025-08-15',
        event_time: '20:00:00',
        place: 'Lugar 2',
      },
    ];

    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    });

    render(<EventsSection />);

    await waitFor(() => {
      mockEvents.forEach(event => {
        expect(screen.getByText(new RegExp(event.title, 'i'))).toBeDefined();
        expect(screen.getByText(new RegExp(event.description, 'i'))).toBeDefined();

        const timeShort = event.event_time.slice(0, 5);
        const datePlaceText = `${event.event_date} ${timeShort} - ${event.place}`;
        expect(screen.getByText(datePlaceText)).toBeDefined();
      });
    });
  });


  it('Caught fetch error', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    globalThis.fetch.mockRejectedValue(new Error('Fetch error'));

    render(<EventsSection />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error bringing events:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
