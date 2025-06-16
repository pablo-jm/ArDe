import { describe, it, beforeEach, vi, expect } from 'vitest';
import { handleBuyOrders, handleDeleteOrders, handleCart } from './OrderServices';
import Swal from 'sweetalert2';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
    getPopup: vi.fn(),
    close: vi.fn(),
    showValidationMessage: vi.fn()
  }
}));

globalThis.fetch = vi.fn();


describe('handleBuyOrders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'test-token');
  });

  it('Show error if token doesnt exist', async () => {
    localStorage.removeItem('token');
    await handleBuyOrders(['1']);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Debes iniciar sesión para continuar.', 'error');
  });

  it('Performs PUT for each ID and displays success', async () => {
    fetch.mockResolvedValue({ ok: true });

    await handleBuyOrders(['1', '2']);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/orders/1',
      expect.objectContaining({ method: 'PUT' })
    );
    expect(Swal.fire).toHaveBeenCalledWith('Realizado', 'Pedido realizado correctamente.', 'success');
  });

  it('Show updating order error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error updating order' })
    });

    await handleBuyOrders(['1']);

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error updating order', 'error');
  });
});



describe('handleDeleteOrders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'test-token');
  });

  it('Show error if token doesnt exist', async () => {
    localStorage.removeItem('token');
    await handleDeleteOrders(['1']);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Debes iniciar sesión para continuar.', 'error');
  });

  it('Performs DELETE for each ID and displays success', async () => {
    fetch.mockResolvedValue({ ok: true });

    await handleDeleteOrders(['1', '2']);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/orders/1',
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(Swal.fire).toHaveBeenCalledWith('Eliminado', 'Pedido eliminado correctamente.', 'success');
  });

  it('Show deleting order error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error deleting order' })
    });

    await handleDeleteOrders(['1']);

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error deleting order', 'error');
  });
});



describe('handleCart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'test-token');
  });

  it('Show error if token doesnt exist', async () => {
    localStorage.removeItem('token');
    await handleCart();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Debes iniciar sesión para ver el carrito', 'error');
  });

  it('Show fetching error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'No autorizado' })
    });

    await handleCart();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'No autorizado', 'error');
  });

  it('Displays "Carrito vacío" if there no orders', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    await handleCart();
    expect(Swal.fire).toHaveBeenCalledWith('Carrito vacío', 'No tienes pedidos para comprar.', 'info');
  });

  it('Displays "Carrito vacío" if all works are sold', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, work: { state: 'sold' }, price: 20 }
      ]
    });

    await handleCart();
    expect(Swal.fire).toHaveBeenCalledWith('Carrito vacío', 'No tienes pedidos para comprar.', 'info');
  });

  it('Show modal if there are valid orders', async () => {
    const orders = [
      { id: 1, price: 100, work: { state: 'selling', title: 'Obra 1', image_url: '/img.jpg', dimensions: '30x40 cm' } }
    ];

    const mockPopup = document.createElement('div');
    mockPopup.querySelector = vi.fn().mockReturnValue(document.createElement('button'));

    Swal.getPopup.mockReturnValue(mockPopup);
    fetch.mockResolvedValueOnce({ ok: true, json: async () => orders });

    await handleCart();

    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Carrito',
      html: expect.stringContaining('Obra 1'),
      showConfirmButton: false
    }));
  });
});
