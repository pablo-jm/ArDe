import Header from '../../components/Header/Header';
import { showCreateWorkModal, showUpdateWorkModal } from '../../utils/UpdateCreateWork';
import { showUpdateEventModal } from '../../utils/UpdateEvent';
import './Dashboard.css'

const Dashboard = () => {

  return (
    <div className="father-container">
      <Header />

      <div className="background-overlay" />

        <main className="content-wrapper">
          <div className="admin-panel">
            <nav>Panel de administración</nav>
            <button className="card-button" alt="Añadir obra" onClick={showCreateWorkModal}>Añadir obra</button>
            <button className="card-button" alt="Editar obra" onClick={showUpdateWorkModal}>Editar obra</button>
            <button className="card-button" alt="Editar eventos" onClick={showUpdateEventModal}>Editar eventos</button>
          </div>
        </main>
    </div>
  );
};

export default Dashboard;