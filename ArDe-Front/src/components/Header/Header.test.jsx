import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './Header';

const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  
  it("Show logo correctly", () => {
    render(<Header />, { wrapper: Wrapper });

    const logo = screen.getByAltText('ARDE logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://res.cloudinary.com/df9wuyrbg/image/upload/v1747152138/Logo_ARDE_pab1ao.svg');
  });


  it("Show waited navigation links without Login", () => {
    render(<Header />, { wrapper: Wrapper });

    expect(screen.getByText('Tienda')).toBeInTheDocument();

    const contactLinks = screen.queryAllByText(/Contacto/i);
    const contactLinkHome = contactLinks.find(link => link.getAttribute('href') === '#home-contact-section');
    expect(contactLinkHome).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });


  it("Shows user menu when user is logged in", async () => {
    localStorage.setItem('user', JSON.stringify({ fullName: 'Juan' }));

    render(<Header />, { wrapper: Wrapper });

    const userName = await screen.findByText(/Juan/i);
    expect(userName).toBeInTheDocument();

    fireEvent.click(userName);

    const logoutButton = await screen.findByRole('button', { name: /Cerrar sesión/i });
    expect(logoutButton).toBeInTheDocument();
  });


  it("Calls logout handler on logout button click", async () => {
    localStorage.setItem('user', JSON.stringify({ fullName: 'Juan' }));
    localStorage.setItem('token', 'fake-token');

    render(<Header />, { wrapper: Wrapper });

    const userName = await screen.findByText(/Juan/i);
    fireEvent.click(userName);

    const logoutButton = await screen.findByRole("button", { name: /Cerrar sesión/i });
    expect(logoutButton).toBeInTheDocument();

    vi.spyOn(Swal, 'fire').mockResolvedValueOnce({ isConfirmed: true });

    delete window.location;
    window.location = { href: '' };

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem('user')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
      expect(window.location.href).toBe('/');
    });

    Swal.fire.mockRestore();
  });


  it("Renders logo link to admin dashboard if user is admin", () => {
    localStorage.setItem('user', JSON.stringify({ role: 'admin', fullName: 'Admin' }));

    render(<Header />, { wrapper: Wrapper });

    const logoLink = screen.getByRole('link', { name: /ARDE logo/i });
    expect(logoLink.closest('a')).toHaveAttribute('href', '/admin/dashboard');
  });


  it("Shows cart icon if user is logged in and path is /shop", () => {
    localStorage.setItem('user', JSON.stringify({ fullName: 'Juan' }));
    
    const ShopWrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/shop']}>
        {children}
      </MemoryRouter>
    );

    const { container } = render(<Header />, { wrapper: ShopWrapper });

    const cartIcon = container.querySelector('.cart-icon');
    expect(cartIcon).toBeInTheDocument();
    
    const cartWrapper = container.querySelector('.cart-icon-wrapper');
    expect(cartWrapper).toBeInTheDocument();
    
    expect(screen.queryByText('Tienda')).not.toBeInTheDocument();
  });


  it("Contact link points to correct section based on path", () => {
    const HomeWrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/']}>
        {children}
      </MemoryRouter>
    );

    const { unmount } = render(<Header />, { wrapper: HomeWrapper });
    
    const contactLinksHome = screen.queryAllByText(/Contacto/i);
    const contactLinkHome = contactLinksHome.find(link => link.getAttribute('href') === '#home-contact-section');
    expect(contactLinkHome).toBeInTheDocument();

    unmount();

    const ShopWrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/shop']}>
        {children}
      </MemoryRouter>
    );

    render(<Header />, { wrapper: ShopWrapper });
    
    const contactLinksShop = screen.queryAllByText(/Contacto/i);
    const contactLinkShop = contactLinksShop.find(link => link.getAttribute('href') === '#shop-contact-section');
    expect(contactLinkShop).toBeInTheDocument();
  });


  it("Opens profile modal and buttons are present", async () => {
    localStorage.setItem('user', JSON.stringify({ fullName: 'Juan', email: 'juan@mail.com' }));

    render(<Header />, { wrapper: Wrapper });

    const userName = await screen.findByText(/Juan/i);
    fireEvent.click(userName);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Cerrar sesión/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Mis pedidos/i })).toBeInTheDocument();
      expect(screen.getByText(/Puedes eliminar tu cuenta aquí/i)).toBeInTheDocument();
    });
  });


  it("handleMyOrders calls Swal.fire with orders", async () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ fullName: 'Juan' }));

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          work: { title: 'Obra 1', image_url: '/image1.jpg' },
          ship_address: 'Calle Falsa 123',
          phone_number: '123456789',
          price: 100
        }
      ]
    });
    
    globalThis.fetch = mockFetch;

    const swalSpy = vi.spyOn(Swal, 'fire').mockImplementation(() => Promise.resolve());

    render(<Header />, { wrapper: Wrapper });

    const userName = await screen.findByText(/Juan/i);
    fireEvent.click(userName);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Mis pedidos/i })).toBeInTheDocument();
    });

    const ordersButton = screen.getByRole('button', { name: /Mis pedidos/i });
    fireEvent.click(ordersButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/orders/user/me', {
        headers: {
          Authorization: 'Bearer fake-token',
        }
      });
      expect(swalSpy).toHaveBeenCalled();
    }, { timeout: 3000 });

    swalSpy.mockRestore();
    globalThis.fetch.mockRestore();
  });


  it("handleMyOrders shows error Swal on fetch failure", async () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ fullName: 'Juan' }));

    const swalSpy = vi.spyOn(Swal, 'fire').mockResolvedValue();
    const fetchSpy = vi.fn().mockRejectedValue(new Error('Network error'));
    globalThis.fetch = fetchSpy;

    try {
      render(<Header />, { wrapper: Wrapper });

      const userName = await screen.findByText(/Juan/i);
      fireEvent.click(userName);

      const ordersButton = screen.getByRole('button', { name: /Mis pedidos/i });
      fireEvent.click(ordersButton);

      await waitFor(() => {
        expect(swalSpy).toHaveBeenCalledWith('Error', 'Network error', 'error');
      });

    } finally {
      swalSpy.mockRestore();
      fetchSpy.mockRestore();
      localStorage.clear();
    }
  });
});