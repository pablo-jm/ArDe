import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Dashboard from './Dashboard';

// Mocks inline dentro de vi.mock (sin usar variables fuera)
vi.mock('../../components/Header/Header', () => ({
  default: () => <div>Mocked Header</div>
}));

vi.mock('../../services/WorkServices', () => {
  return {
    showCreateWorkModal: vi.fn(),
    showUpdateWorkModal: vi.fn()
  };
});

vi.mock('../../services/EventServices', () => {
  return {
    showUpdateEventModal: vi.fn()
  };
});

// Importar los mocks después de mockear los módulos
import { showCreateWorkModal, showUpdateWorkModal } from '../../services/WorkServices';
import { showUpdateEventModal } from '../../services/EventServices';

describe('Dashboard', () => {
  it('Renders header and buttons', () => {
    render(<Dashboard />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Panel de administración')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Añadir obra/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Editar obra/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Editar eventos/i })).toBeInTheDocument();
  });

  it('Calls showCreateWorkModal when "Añadir obra" is clicked', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByRole('button', { name: /Añadir obra/i }));
    expect(showCreateWorkModal).toHaveBeenCalled();
  });

  it('Calls showUpdateWorkModal when "Editar obra" is clicked', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByRole('button', { name: /Editar obra/i }));
    expect(showUpdateWorkModal).toHaveBeenCalled();
  });

  it('Calls showUpdateEventModal when "Editar eventos" is clicked', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByRole('button', { name: /Editar eventos/i }));
    expect(showUpdateEventModal).toHaveBeenCalled();
  });
});
