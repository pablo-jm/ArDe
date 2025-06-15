import Swal from 'sweetalert2';

export const validateEventData = ({ title, description, event_time, event_date, place }) => {

    if (!title || title.length < 3 || title.length > 100) {
      return 'El título debe tener entre 3 y 100 caracteres.';
    }

    if (!description || description.length < 10 || description.length > 150) {
      return 'La descripción debe tener entre 10 y 150 caracteres.';
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!event_time || !timeRegex.test(event_time)) {
      return 'El formato de la hora no es válido.';
    }

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!event_date || !dateRegex.test(event_date)) {
      return 'El formato de la fecha no es válido.';
    }

    if (!place || place.length < 3 || place.length > 50) {
      return 'El nombre del lugar debe tener entre 3 y 50 caracteres.';
    }

    return null;
  };


  export const showUpdateEventModal = async () => {

    const token = localStorage.getItem('token');
  
    const response = await fetch('http://localhost:3000/events', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const events = await response.json();
    if (!Array.isArray(events) || events.length === 0) {
      return Swal.fire('No hay eventos para editar.', '', 'info');
    }

    let selectedEvent = events[0];

    const getOptionsHTML = () =>
      events.map(e => `<option value="${e.title}">${e.title}</option>`).join('');

    const updateFormFields = (event) => {
      Swal.getPopup().querySelector('#title').value = event.title;
      Swal.getPopup().querySelector('#description').value = event.description;
      Swal.getPopup().querySelector('#event_time').value = event.event_time;
      Swal.getPopup().querySelector('#event_date').value = event.event_date;
      Swal.getPopup().querySelector('#place').value = event.place;
    };

    
    const result = await Swal.fire({
      title: 'Editar evento',
      html: `
        <div style="text-align: center;">
          <select id="event-select" class="sweet-auth-input" style="width: 80%; padding: 6px; margin-bottom: 8px;">
            ${getOptionsHTML()}
          </select>

          <input type="title" id="title" class="sweet-auth-input" placeholder="Title"
            value="${selectedEvent.title || ''}" style="width: 80%; padding: 6px; margin-bottom: 8px;">

          <textarea id="description" class="sweet-auth-input" placeholder="Descripción breve" rows="3"
            style="width: 80%; padding: 6px; margin-bottom: 8px;">${selectedEvent.description || ''}</textarea>

          <input type="time" id="event_time" class="sweet-auth-input" placeholder="Hora (HH:mm)" value="${selectedEvent.event_time || ''}" 
            style="width: 80%; padding: 6px; margin-bottom: 8px;">

          <input type="date" id="event_date" class="sweet-auth-input" placeholder="Fecha (YYYY-MM-DD)" value="${selectedEvent.event_date || ''}" 
            style="width: 80%; padding: 6px; margin-bottom: 8px;">

          <input type="" id="place" class="sweet-auth-input" placeholder="Lugar del evento"
            value="${selectedEvent.place || ''}" style="width: 80%; padding: 6px; margin-bottom: 8px;">

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
        updateFormFields(selectedEvent);
        const select = Swal.getPopup().querySelector('#event-select');
          select.addEventListener('change', (e) => {
            const selectedTitle = e.target.value;
            selectedEvent = events.find(e => e.title === selectedTitle);
            updateFormFields(selectedEvent);
          });
      },
      preConfirm: async () => {
        const description = Swal.getPopup().querySelector('#description').value.trim();
        const event_time = Swal.getPopup().querySelector('#event_time').value.trim();
        const event_date = Swal.getPopup().querySelector('#event_date').value.trim();
        const place = Swal.getPopup().querySelector('#place').value.trim();

        const errorMessage = validateEventData({
          title: selectedEvent.title,
          description,
          event_time,
          event_date,
          place
        });
        if (errorMessage) {
          Swal.showValidationMessage(errorMessage);
          return false;
        }

        try {
          const updateResponse = await fetch(`http://localhost:3000/events/${encodeURIComponent(selectedEvent.title)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              title: selectedEvent.title,
              description,
              event_time,
              event_date,
              place
            })
          });

          const data = await updateResponse.json();

          if (!updateResponse.ok) {
            Swal.showValidationMessage(data.message || 'Error al actualizar el evento.');
            return false;
          }

          return data;

        } catch (error) {
          Swal.showValidationMessage(error.message || 'Error de red o del servidor.');
          return false;
        }
      }
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: 'Evento actualizado',
        text: selectedEvent.title,
        icon: 'success',
        customClass: {
          title: 'sweet-title',
          popup: 'sweet-popup'
        }
      });
    }

  };