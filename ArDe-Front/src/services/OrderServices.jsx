import Swal from 'sweetalert2';

const handleBuyOrders = async (orderIds) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return Swal.fire('Error', 'Debes iniciar sesión para continuar.', 'error');
  }

  try {
    for (const id of orderIds) {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ state: 'Paid' })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Error updating order ${id}`);
      }
    }

    Swal.fire('Realizado', 'Pedido realizado correctamente.', 'success');
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};

const handleDeleteOrders = async (orderIds) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return Swal.fire('Error', 'Debes iniciar sesión para continuar.', 'error');
  }

  try {
    for (const id of orderIds) {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Error deleting order ${id}`);
      }
    }

    Swal.fire('Eliminado', 'Pedido eliminado correctamente.', 'success');
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};

export const handleCart = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return Swal.fire('Error', 'Debes iniciar sesión para ver el carrito', 'error');
  }

  try {
    const response = await fetch('http://localhost:3000/orders/user/me/unpaid', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const orders = await response.json();

    if (!response.ok) {
      return Swal.fire('Error', orders.message || 'No se pudieron obtener los pedidos.', 'error');
    }

    if (orders.length === 0) {
      return Swal.fire('Carrito vacío', 'No tienes pedidos pendientes de pago.', 'info');
    }

    const orderItemsHtml = orders.map(order => 
      `<label class="cart-item-label" style="display:flex; align-items:center; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" class="cart-item-checkbox" data-order-id="${order.id}" style="margin-right: 10px;"/>
        <div style="display:flex; align-items:center; gap: 15px;">
          <div style="width: 60px; height: 60px; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
            <img src="${order.work?.image_url || ''}" alt="${order.work?.title || ''}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <div style="font-weight: bold;">${order.work?.title || 'Sin título'}</div>
            <div style="font-size: 12px; color: #666;">${order.work?.dimensions || ''}</div>
          </div>
          <div style="margin-left: auto; font-weight: bold;">${order.price}€</div>
        </div>
      </label>`
    ).join('');

    await Swal.fire({
      title: 'Carrito',
      html: 
        `<div style="max-height: 300px; overflow-y: auto; padding-right: 10px; margin-bottom: 20px;">
          ${orderItemsHtml}
        </div>
        <div style="display: flex; justify-content: space-between; gap: 10px;">
          <button id="buy-btn" class="swal2-confirm swal2-styled" style="flex: 1;">Comprar</button>
          <button id="delete-btn" class="swal2-cancel swal2-styled" style="flex: 1;">Eliminar</button>
        </div>`
      ,
      showConfirmButton: false,
      showCancelButton: false,
      width: 600,
      customClass: {
        popup: 'sweet-popup',
        title: 'sweet-title'
      },
      didOpen: () => {
        const buyBtn = Swal.getPopup().querySelector('#buy-btn');
        const deleteBtn = Swal.getPopup().querySelector('#delete-btn');

        buyBtn.addEventListener('click', () => {
          const selectedIds = Array.from(Swal.getPopup().querySelectorAll('.cart-item-checkbox:checked'))
            .map(input => input.getAttribute('data-order-id'));
          if (selectedIds.length === 0) {
            Swal.showValidationMessage('Selecciona al menos un pedido para comprar.');
            return;
          }

          Swal.close();
          handleBuyOrders(selectedIds);
        });

        deleteBtn.addEventListener('click', () => {
          const selectedIds = Array.from(Swal.getPopup().querySelectorAll('.cart-item-checkbox:checked'))
            .map(input => input.getAttribute('data-order-id'));
          if (selectedIds.length === 0) {
            Swal.showValidationMessage('Selecciona al menos un pedido para eliminar.');
            return;
          }

          Swal.close();
          handleDeleteOrders(selectedIds);
        });
      }
    });

  } catch (error) {
    Swal.fire('Error', error.message || 'Error getting cart.', 'error');
  }
};