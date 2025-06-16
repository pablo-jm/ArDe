import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Shop from './Shop';

vi.mock('../../components/Header/Header', () => ({
  default: () => <div>Mocked Header</div>
}));

vi.mock('../../components/Footer/Footer', () => ({
  default: () => <div>Mocked Footer</div>
}));

vi.mock('../../components/ContactSection/ContactSection', () => ({
  default: () => <div>Mocked ContactSection</div>
}));

vi.mock('../../components/CatalogueSection/CatalogueSection', () => ({
  default: () => <div>Mocked CatalogueSection</div>
}));

describe('Shop', () => {
  it('renders main sections and components', () => {
    render(<Shop />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
    expect(screen.getByText('Mocked ContactSection')).toBeInTheDocument();
    expect(screen.getByText('Mocked CatalogueSection')).toBeInTheDocument();

    expect(screen.getByText('Tienda')).toBeInTheDocument();
  });
});
