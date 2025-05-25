import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthButton from './AuthButton';
import Swal from 'sweetalert2';
import { BrowserRouter } from 'react-router-dom';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
    close: vi.fn()
  }
}));

describe('AuthButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('HandleLoginClick called clicking', () => {
    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(button);

    expect(Swal.fire).toHaveBeenCalled();
  });

  it('Login menu form has email and password fields', () => {
    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(button);

    const config = Swal.fire.mock.calls[0][0];

    expect(config.title).toBe('Iniciar Sesión');
    expect(config.html).toMatch(/input.*type="email"/i);
    expect(config.html).toMatch(/input.*type="password"/i);
    expect(config.confirmButtonText).toBe('Iniciar sesión');
  });



  it('ShowRegisterModal called clicking on "Crear cuenta"', () => {
    Swal.fire.mockImplementationOnce((config) => {
      const registerLink = document.createElement('a');
      registerLink.id = 'register-link';
      document.body.appendChild(registerLink);

      if (config.didOpen) {
        config.didOpen();
        const event = new Event('click', { bubbles: true });
        registerLink.dispatchEvent(event);
      }

      document.body.removeChild(registerLink);
    });

    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(button);

    expect(Swal.fire).toHaveBeenCalledTimes(2);
    expect(Swal.fire.mock.calls[1][0].title).toBe('Crear una Cuenta');
  });
});
