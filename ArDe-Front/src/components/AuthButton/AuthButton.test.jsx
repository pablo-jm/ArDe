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

const mockNavigate = vi.fn();

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


  it('Show LogIn button', () => {
    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toBeDefined();
  });


  it('Not call swal.close making click on the button', () => {
    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(button);

    expect(Swal.close).not.toHaveBeenCalled();
  });
});


describe('Auth logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
    Swal.getPopup = vi.fn();
    Swal.showValidationMessage = vi.fn();
  });

  it('Muestra mensaje si email o contraseña están vacíos', async () => {
    Swal.getPopup.mockReturnValue({
      querySelector: vi.fn(() => ({ value: '' })) // ambos vacíos
    });

    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    const config = Swal.fire.mock.calls[0][0];
    await config.preConfirm();

    expect(Swal.showValidationMessage).toHaveBeenCalledWith(
      'Por favor, ingresa usuario y contraseña.'
    );
  });

  it('Redirige a admin/dashboard si el usuario es admin', async () => {
    Swal.getPopup.mockReturnValue({
      querySelector: vi.fn((selector) => {
        if (selector === '#email') return { value: 'admin@example.com' };
        if (selector === '#password') return { value: 'adminpass' };
      })
    });

    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockNavigate
      };
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'fakeToken',
        user: { role: 'admin' }
      })
    });

    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    const config = Swal.fire.mock.calls[0][0];
    await config.preConfirm();

    expect(localStorage.getItem('token')).toBe('fakeToken');
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: '¡Bienvenid@, Admin!',
        icon: 'success'
      })
    );
  });

  it('Muestra error del servidor si login falla', async () => {
      Swal.getPopup.mockReturnValue({
        querySelector: vi.fn((selector) => {
          if (selector === '#email') return { value: 'user@example.com' };
          if (selector === '#password') return { value: 'password123' };
          return null;
        })
    });

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciales inválidas' })
    });

    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    const config = Swal.fire.mock.calls[0][0];
    await config.preConfirm();

    expect(Swal.showValidationMessage).toHaveBeenCalledWith(
      'Credenciales inválidas'
    );
  });

  it('Muestra error de red si fetch lanza excepción', async () => {
    Swal.getPopup.mockReturnValue({
      querySelector: vi.fn((selector) => {
        if (selector === '#email') return { value: 'user@example.com' };
        if (selector === '#password') return { value: 'password123' };
        return null;
      })
    });

    fetch.mockRejectedValueOnce(new Error('Falló la red'));

    render(
      <BrowserRouter>
        <AuthButton />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    const config = Swal.fire.mock.calls[0][0];
    await config.preConfirm();

    expect(Swal.showValidationMessage).toHaveBeenCalledWith(
      'Falló la red'
    );
  });
});
