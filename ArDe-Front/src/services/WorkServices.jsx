import Swal from 'sweetalert2';

const validateWorkData = ({ title, description, image_url, price, dimensions }) => {

    if (!title || title.length < 3 || title.length > 100) {
      return 'El título debe tener entre 3 y 100 caracteres.';
    }

    if (!description || description.length < 10 || description.length > 150) {
      return 'La descripción debe tener entre 10 y 150 caracteres.';
    }

    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!image_url || !urlRegex.test(image_url)) {
      return 'La URL de la imágen no es válida.';
    }

    if (!price || isNaN(price) || Number(price) < 1) {
      return 'El precio debe ser mayor que cero.';
    }

    const dimensionsRegex = /^\d{1,3}x\d{1,3}\s?cm$/;

    if (!dimensions || !dimensionsRegex.test(dimensions)) {
      return 'Las dimensiones deben seguir el formato: 30x50 cm.';
    }

    return null;
  };



  export const showCreateWorkModal = () => {
    Swal.fire({
      title: 'Añadir obra',
      html: `
        <input type="text" id="title" class="sweet-auth-input" placeholder="Título" required minlength="3" maxlength="150" style="width: 80%; padding: 6px; margin-bottom: 8px;">
        <textarea id="description" class="sweet-auth-input" placeholder="Descripción breve" rows="3" maxlength="500" style="width: 80%; padding: 6px; margin-bottom: 8px;"></textarea>
        <input type="url" id="image_url" class="sweet-auth-input" placeholder="URL de la imagen" required style="width: 80%; padding: 6px; margin-bottom: 8px;">
        <input type="number" id="price" class="sweet-auth-input" placeholder="Precio en €" required min="0" step="0.01" style="width: 80%; padding: 6px; margin-bottom: 8px;">
        <input type="text" id="dimensions" class="sweet-auth-input" placeholder="Dimensiones (formato: 50x70 cm)" required maxlength="100" style="width: 80%; padding: 6px; margin-bottom: 8px;">
      `,
      confirmButtonText: 'Añadir obra',
      confirmButtonColor: '#1a73e8',
      focusConfirm: false,
      backdrop: 'rgba(0, 0, 0, 0.7)',
      customClass: {
        container: 'sweet-container',
        popup: 'sweet-popup',
        title: 'sweet-title',
        confirmButton: 'sweet-button'
      },
      didOpen: () => {
        document.getElementById('title').focus();
      },
      preConfirm: async () => {
        const title = Swal.getPopup().querySelector('#title').value;
        const description = Swal.getPopup().querySelector('#description').value;
        const image_url = Swal.getPopup().querySelector('#image_url').value;
        const price = Swal.getPopup().querySelector('#price').value;
        const dimensions = Swal.getPopup().querySelector('#dimensions').value;
  
        const errorMessage = validateWorkData({ title, description, image_url, price, dimensions });
        if (errorMessage) {
          Swal.showValidationMessage(errorMessage);
          return false;
        }
  
        try {
          const token = localStorage.getItem('token');

          const response = await fetch('http://localhost:3000/works', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ title, description, image_url, price, dimensions })
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            Swal.showValidationMessage(data.message || 'Error al añadir la obra.');
            return false;
          }
  
          Swal.fire({
          title: 'Obra añadida con éxito',
          text: data.work.title,
          imageUrl: image_url,
          imageWidth: 150,
          imageHeight: 150,
          customClass: {
              title: 'sweet-title',
              popup: 'sweet-popup',
              confirmButton: 'sweet-button'
          }
          }).then(() => {
              window.location.reload();
          });
  
          return data;
  
        } catch (error) {
          Swal.showValidationMessage(error.message || 'Error de red o del servidor.');
          return false;
        }
      }
    });
  };



  export const showUpdateWorkModal = async () => {

    const token = localStorage.getItem('token');
  
    const response = await fetch('http://localhost:3000/works', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const works = await response.json();
    if (!Array.isArray(works) || works.length === 0) {
      return Swal.fire('No hay obras para editar.', '', 'info');
    }

    let selectedWork = works[0];

    const getOptionsHTML = () =>
      works.map(w => `<option value="${w.title}">${w.title}</option>`).join('');

    const updateFormFields = (work) => {
      Swal.getPopup().querySelector('#description').value = work.description;
      Swal.getPopup().querySelector('#image_url').value = work.image_url;
      Swal.getPopup().querySelector('#price').value = work.price;
      Swal.getPopup().querySelector('#dimensions').value = work.dimensions;
      Swal.getPopup().querySelector('#state').value = work.state;
    };

    
    await Swal.fire({
      title: 'Editar obra',
      html: `
        <div style="text-align: center;">
          <select id="work-select" class="sweet-auth-input" style="width: 80%; padding: 6px; margin-bottom: 8px;">
            ${getOptionsHTML()}
          </select>

          <textarea id="description" class="sweet-auth-input" placeholder="Descripción breve" rows="3"
            style="width: 80%; padding: 6px; margin-bottom: 8px;">${selectedWork.description}</textarea>

          <input type="url" id="image_url" class="sweet-auth-input" placeholder="URL de la imagen"
            value="${selectedWork.image_url}" style="width: 80%; padding: 6px; margin-bottom: 8px;">

          <input type="number" id="price" class="sweet-auth-input" placeholder="Precio en €"
            value="${selectedWork.price}" min="0" step="0.01" style="width: 80%; padding: 6px; margin-bottom: 8px;">

          <input type="text" id="dimensions" class="sweet-auth-input" placeholder="Dimensiones (ej: 50x70 cm)"
            value="${selectedWork.dimensions}" maxlength="100" style="width: 80%; padding: 6px; margin-bottom: 8px;">

          <select id="state" class="sweet-auth-input" style="width: 80%; padding: 6px; margin-bottom: 8px;">
            <option value="selling">En venta</option>
            <option value="sold">Vendida</option>
          </select>
        </div>
      `,
      confirmButtonText: 'Guardar cambios',
      confirmButtonColor: '#1a73e8',
      focusConfirm: false,
      backdrop: 'rgba(0, 0, 0, 0.7)',
      customClass: {
        container: 'sweet-container',
        popup: 'sweet-popup',
        title: 'sweet-title',
        confirmButton: 'sweet-button'
      },
      didOpen: () => {
        updateFormFields(selectedWork);
        const select = Swal.getPopup().querySelector('#work-select');
        select.addEventListener('change', (e) => {
          const selectedTitle = e.target.value;
          selectedWork = works.find(w => w.title === selectedTitle);
          updateFormFields(selectedWork);
        });
      },
      preConfirm: async () => {
        const description = Swal.getPopup().querySelector('#description').value.trim();
        const image_url = Swal.getPopup().querySelector('#image_url').value.trim();
        const price = Swal.getPopup().querySelector('#price').value.trim();
        const dimensions = Swal.getPopup().querySelector('#dimensions').value.trim();
        const state = Swal.getPopup().querySelector('#state').value;

        const errorMessage = validateWorkData({
          title: selectedWork.title,
          description,
          image_url,
          price,
          dimensions
        });
        if (errorMessage) {
          Swal.showValidationMessage(errorMessage);
          return false;
        }

        try {
          const updateResponse = await fetch(`http://localhost:3000/works/${encodeURIComponent(selectedWork.title)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              title: selectedWork.title,
              description,
              image_url,
              price,
              dimensions,
              state
            })
          });

          const data = await updateResponse.json();

          if (!updateResponse.ok) {
            Swal.showValidationMessage(data.message || 'Error al actualizar la obra.');
            return false;
          }

          await Swal.fire({
            title: data.message.includes('eliminada') ? 'Obra vendida' : 'Obra actualizada',
            text: data.message,
            imageUrl: image_url,
            imageWidth: 150,
            imageHeight: 150,
            customClass: {
              title: 'sweet-title',
              popup: 'sweet-popup'
            }
          });

          window.location.reload();
          return data;

        } catch (error) {
          Swal.showValidationMessage(error.message || 'Error de red o del servidor.');
          return false;
        }
      }
    });
  };



export const handleWorkPreview = async (work) => {
  await Swal.fire({
    html: `
      <div class="swal-container">
        <div class="swal-image-container">
          <img src="${work.image_url}" alt="${work.title}" />
        </div>
        <div class="swal-info-container">
          <div class="swal-title">${work.title}</div>
          <div class="swal-description">${work.description || ''}</div>
          <button id="btn-add" role="button" class="swal-add-btn">Añadir</button>
        </div>
      </div>
    `,
    customClass: {
      popup: 'swal-popup-custom'
    },
    showConfirmButton: false,
    didOpen: () => {
      const btnAdd = Swal.getPopup().querySelector('#btn-add');
      btnAdd.addEventListener('click', async () => {
        Swal.close();

        const { value: formValues } = await Swal.fire({
          title: 'Datos de envío',
          html: `
            <input id="ship_address" class="sweet-shipping-input" placeholder="Dirección de envío" />
            <input id="phone_number" class="sweet-shipping-input" placeholder="Teléfono" />
          `,
          confirmButtonText: 'Añadir',
          focusConfirm: false,
          backdrop: 'rgba(0, 0, 0, 0.5)',
          customClass: {
            container: 'sweet-shipping-container',
            popup: 'sweet-shipping-popup',
            title: 'sweet-shipping-title',
            confirmButton: 'sweet-shipping-button'
          },
          preConfirm: () => {
            const ship_address = Swal.getPopup().querySelector('#ship_address').value.trim();
            const phone_number = Swal.getPopup().querySelector('#phone_number').value.trim();

            if (!ship_address || ship_address.length < 10 || ship_address.length > 255) {
              Swal.showValidationMessage('La dirección de envío debe tener entre 10 y 255 caracteres.');
              return false;
            }

            const phoneRegex = /^[0-9+\-()\s]+$/;
            if (!phone_number || !phoneRegex.test(phone_number)) {
              Swal.showValidationMessage('El número de teléfono no es válido.');
              return false;
            }

            return { ship_address, phone_number };
          }
        });

        if (!formValues) return;

        try {
          const token = localStorage.getItem('token');
          if (!token) {
            return Swal.fire('Error', 'Debes iniciar sesión para añadir obras', 'error');
          }

          const userDataStr = localStorage.getItem('user');
          const userData = userDataStr ? JSON.parse(userDataStr) : null;
          const user_id = userData?.id;
          
          const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              user_id,
              work_id: work.id,
              ship_address: formValues.ship_address,
              phone_number: formValues.phone_number,
              price: work.price
            })
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Error creating order');
          }

          Swal.fire('Obra añadida', 'Añadido al carrito', 'success');

        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      });
    }
  });
};




