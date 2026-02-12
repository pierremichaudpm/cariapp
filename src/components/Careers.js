import React, { useState } from "react";
import Icon from "./Icon";

const jobs = [
  {
    id: 1,
    icon: "users",
    department: "accueil",
    type: "fullTime",
  },
  {
    id: 2,
    icon: "book-open",
    department: "francisation",
    type: "partTime",
  },
  {
    id: 3,
    icon: "heart",
    department: "communautaire",
    type: "fullTime",
  },
  {
    id: 4,
    icon: "star",
    department: "jeunesse",
    type: "contract",
  },
];

function Careers({ currentLanguage, translations }) {
  const [selectedJob, setSelectedJob] = useState(null);

  const t = translations[currentLanguage] || translations.fr;
  const c = t.careers || {};
  const types = c.type || {};
  const jobsT = c.jobs || [];

  const openModal = (job, index) => {
    setSelectedJob({ ...job, ...jobsT[index] });
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <section id="carrieres" className="careers-section">
        <div className="container">
          <h2 className="section-title">{c.title || "Carrières"}</h2>
          <p className="section-subtitle">
            {c.subtitle || "Rejoignez notre équipe"}
          </p>

          <div className="careers-grid">
            {jobs.map((job, idx) => {
              const jt = jobsT[idx] || {};
              return (
                <div
                  key={job.id}
                  className="career-card"
                  onClick={() => openModal(job, idx)}
                >
                  <div className="career-card-icon">
                    <Icon name={job.icon} size={24} />
                  </div>
                  <h3 className="career-card-title">
                    {jt.title || "Poste à pourvoir"}
                  </h3>
                  <p className="career-card-dept">
                    {jt.department || job.department}
                  </p>
                  <span className="career-card-type">
                    {types[job.type] || job.type}
                  </span>
                  <p className="career-card-excerpt">
                    {jt.excerpt || ""}
                  </p>
                  <span className="career-card-link">
                    {c.viewOffer || "Voir l'offre"} →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedJob && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}>
          <div className="modal-content career-modal-content">
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label={t.aria?.close || "Fermer"}
            >
              <Icon name="x" size={24} />
            </button>

            <div className="career-modal-body">
              <div className="career-modal-header">
                <div className="career-modal-icon">
                  <Icon name={selectedJob.icon} size={28} />
                </div>
                <div>
                  <h2 className="career-modal-title">
                    {selectedJob.title || "Poste"}
                  </h2>
                  <div className="career-modal-meta">
                    <span className="career-modal-dept">
                      {selectedJob.department}
                    </span>
                    <span className="career-modal-type">
                      {types[selectedJob.type] || selectedJob.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="career-modal-description">
                {selectedJob.description && selectedJob.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <a
                href="mailto:carist@cari.qc.ca"
                className="career-modal-cta"
              >
                {c.apply || "Postuler"}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Careers;
