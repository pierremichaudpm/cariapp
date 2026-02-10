import React, { useState, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const MissionSimple = ({ currentLanguage, translations }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const contentRef = useScrollReveal();

  useEffect(() => {
    if (showHistoryModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showHistoryModal]);

  return (
    <>
      <section
        id="mission"
        className="mission-simple-section"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80)",
        }}
      >
        <div className="mission-simple-overlay"></div>

        <div className="mission-simple-content scroll-reveal" ref={contentRef}>
          <h2 className="mission-simple-tagline">
            {t.mission?.tagline || "La diversité nous rapproche"}
          </h2>

          <p className="mission-simple-statement">
            {t.mission?.statement ||
              "Le CARI St-Laurent est un organisme communautaire à but non lucratif qui a pour mission d'accueillir un(e) immigrant(e), l'aider à s'établir, à s'adapter et à s'intégrer que ce soit personnellement, en famille, socialement et/ou professionnellement à la société québécoise."}
          </p>

          <div className="mission-simple-values">
            {(
              t.mission?.values || [
                "Dévouement",
                "Confiance",
                "Tolérance",
                "Altruisme",
                "Solidarité",
                "Équité",
              ]
            ).map((value, index) => (
              <span key={index} className="mission-simple-value">
                {value}
              </span>
            ))}
          </div>

          <button
            className="mission-simple-cta"
            onClick={() => setShowHistoryModal(true)}
          >
            {t.mission?.historyCTA || "Notre histoire"}
          </button>
        </div>
      </section>

      {/* History Modal */}
      {showHistoryModal && (
        <div
          className="history-modal-overlay"
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            className="history-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="history-modal-close"
              onClick={() => setShowHistoryModal(false)}
            >
              ✕
            </button>

            <div className="history-modal-body">
              <div className="history-modal-image">
                <img
                  src="/images/cari-building.webp"
                  alt={t.mission?.buildingAlt || "Édifice CARI St-Laurent"}
                  onError={(e) => {
                    e.target.src = "/images/newlogo.webp";
                  }}
                />
              </div>

              <div className="history-modal-text">
                <h2>{t.mission?.historyTitle || "Notre histoire"}</h2>
                <p className="history-intro">
                  {t.mission?.historyIntro ||
                    "Le CARI St-Laurent est un organisme communautaire à but non lucratif..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MissionSimple;
