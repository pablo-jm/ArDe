import Header from '../../components/Header/Header';
import { showCreateWorkModal, showUpdateWorkModal } from '../../services/WorkServices';
import { showUpdateEventModal } from '../../services/EventServices';
import './Dashboard.css'

const Dashboard = () => {

  return (
    <div className="dashboard-father-container">
      <Header />
      
      <div className="dashboard-background-overlay" />

        <main className="dashboard-content-wrapper">
          <div className="dashboard-admin-panel">
            <nav>Panel de administración</nav>
            <button className="card-button" alt="Añadir obra" role="button" onClick={showCreateWorkModal}>Añadir obra</button>
            <button className="card-button" alt="Editar obra" role="button" onClick={showUpdateWorkModal}>Editar obra</button>
            <button className="card-button" alt="Editar eventos" role="button" onClick={showUpdateEventModal}>Editar eventos</button>
          </div>
        </main>
    </div>
  );
};

export default Dashboard;