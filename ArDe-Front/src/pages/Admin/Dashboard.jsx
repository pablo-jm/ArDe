import Swal from 'sweetalert2';
import Header from '../../components/Header/Header';
import './Dashboard.css'

const Dashboard = () => {

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
;
    if (!dimensions || !dimensionsRegex.test(dimensions)) {
      return 'Las dimensiones deben seguir el formato: 30x50 cm.';
    }

    return null;
  };


  const showCreateWorkModal = () => {
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
          icon: 'success',
          customClass: {
              title: 'sweet-title',
              popup: 'sweet-popup'
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


  const showUpdateWorkModal = async () => {

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
            icon: 'success',
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




  return (
    <div className="father-container">
      <Header />

      <div className="background-overlay" />

        <main className="content-wrapper">
          <div className="admin-panel">
            <nav>Panel de administración</nav>
            <button className="card-button" alt="Añadir obra" onClick={showCreateWorkModal}>Añadir obra</button>
            <button className="card-button" alt="Editar obra" onClick={showUpdateWorkModal}>Editar obra</button>
            <button className="card-button" alt="Editar eventos">Editar eventos</button>
          </div>
        </main>
    </div>
  );
};

export default Dashboard;