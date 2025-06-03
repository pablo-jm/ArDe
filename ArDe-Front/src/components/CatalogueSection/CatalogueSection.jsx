
import { useState, useEffect } from 'react';
import { handleWorkPreview } from '../../services/WorkServices';
import './CatalogueSection.css';

const CatalogueSection = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/works")
      .then(res => {
        if (!res.ok) throw new Error("Error loading works");
        return res.json();
      })
      .then(data => {
        setWorks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-message">Cargando obras...</p>;
  if (error) return <p className="status-message">Error: {error}</p>;
  if (works.length === 0) return <p className="status-message">No hay obras en este momento</p>;

return (
        <div className="catalogue-grid">
            {works.map(work => {
                if (!work || !work.title || !work.image_url) return null;
            return (
                <div key={work.id} className="work-card" onClick={() => handleWorkPreview(work)}>
                <img className="image-work" src={work.image_url} alt={work.title} />
                <h4>{work.title}</h4>
                </div>
            );
            })}
        </div>
        );
};

export default CatalogueSection;
