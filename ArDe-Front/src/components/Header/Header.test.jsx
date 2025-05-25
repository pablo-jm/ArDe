import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';


const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Muestra el logo correctamente", () => {
    render(<Header />, { wrapper: Wrapper });

    const logo = screen.getByAltText('ARDE logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg');
  });

  it("Muestra los enlaces de navegación esperados sin usuario logueado", () => {
    render(<Header />, { wrapper: Wrapper });

    expect(screen.getByText('Tienda')).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });
});
