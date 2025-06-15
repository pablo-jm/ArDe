import { describe, it, expect } from 'vitest';
import { validateEventData } from './EventServices';

describe('validateEventData', () => {
  it('debe retornar null si los datos son válidos', () => {
    const result = validateEventData({
      title: 'Evento válido',
      description: 'Descripción válida para un evento',
      event_time: '14:30',
      event_date: '2025-06-30',
      place: 'Sala de Conferencias'
    });

    expect(result).toBeNull();
  });

  it('retorna error si el título es muy corto', () => {
    const result = validateEventData({
      title: 'A',
      description: 'Descripción válida para un evento',
      event_time: '14:30',
      event_date: '2025-06-30',
      place: 'Lugar válido'
    });

    expect(result).toBe('El título debe tener entre 3 y 100 caracteres.');
  });

  it('retorna error si la hora es inválida', () => {
    const result = validateEventData({
      title: 'Título válido',
      description: 'Descripción válida',
      event_time: '25:99',
      event_date: '2025-06-30',
      place: 'Lugar válido'
    });

    expect(result).toBe('El formato de la hora no es válido.');
  });

  it('retorna error si la fecha es inválida', () => {
    const result = validateEventData({
      title: 'Título válido',
      description: 'Descripción válida',
      event_time: '14:30',
      event_date: '2025-13-01',
      place: 'Lugar válido'
    });

    expect(result).toBe('El formato de la fecha no es válido.');
  });

  it('retorna error si la descripción es demasiado corta', () => {
    const result = validateEventData({
      title: 'Título válido',
      description: 'Corta',
      event_time: '14:30',
      event_date: '2025-06-30',
      place: 'Lugar válido'
    });

    expect(result).toBe('La descripción debe tener entre 10 y 150 caracteres.');
  });

  it('retorna error si el lugar es muy largo', () => {
    const result = validateEventData({
      title: 'Título válido',
      description: 'Descripción válida',
      event_time: '14:30',
      event_date: '2025-06-30',
      place: 'L'.repeat(51)
    });

    expect(result).toBe('El nombre del lugar debe tener entre 3 y 50 caracteres.');
  });
});
