import Header from '../../components/Header/Header';
import { showCreateWorkModal, showUpdateWorkModal } from '../../services/UpdateCreateWork';
import { showUpdateEventModal } from '../../services/UpdateEvent';
import './Dashboard.css'

const Dashboard = () => {

  return (
    <div className="dashboard-father-container">
      <Header />
      
      <div className="dashboard-background-overlay" />

        <main className="dashboard-content-wrapper">
          <div className="dashboard-admin-panel">
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