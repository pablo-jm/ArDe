import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './Home';

vi.mock('../../components/Header/Header', () => ({
  default: () => <div>Mocked Header</div>
}));

vi.mock('../../components/Footer/Footer', () => ({
  default: () => <div>Mocked Footer</div>
}));

vi.mock('../../components/EventsSection/EventsSection', () => ({
  default: () => <div>Mocked EventsSection</div>
}));

vi.mock('../../components/ContactSection/ContactSection', () => ({
  default: () => <div>Mocked ContactSection</div>
}));

describe('Home', () => {
  it('Renders static content and child components', () => {
    render(<Home />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
    expect(screen.getByText('Mocked EventsSection')).toBeInTheDocument();
    expect(screen.getByText('Mocked ContactSection')).toBeInTheDocument();

    expect(screen.getByAltText('Descripción de la imagen')).toHaveAttribute('src', expect.stringContaining('cloudinary'));
    expect(screen.getByText('Arte y Decoración')).toBeInTheDocument();
    expect(screen.getByText(/Una mirada artística/i)).toBeInTheDocument();
  });
});
