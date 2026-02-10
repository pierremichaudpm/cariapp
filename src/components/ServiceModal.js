import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import FrenchLevelTest from "./cari/FrenchLevelTest";
import { X } from "lucide-react";

const ServiceModal = ({
  isOpen,
  onClose,
  service,
  translations,
  currentLanguage,
}) => {
  const [showFrenchTest, setShowFrenchTest] = useState(false);
  const t = translations[currentLanguage] || translations.fr;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const serviceData = t.services.cards[service.id];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label={t.aria?.closeModal || "Close modal"}
        >
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <Icon name={service.icon.replace("fa-", "")} size={32} />
          </div>
          <h2>{service.text}</h2>
        </div>

        <div className="modal-body">
          <p className="modal-description">{serviceData?.fullDescription}</p>

          {serviceData?.benefits && (
            <div className="modal-section">
              <h3>{t.services.modal.benefits}</h3>
              <ul className="modal-list">
                {serviceData.benefits.map((benefit, index) => (
                  <li key={index}>
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#6CBAC7" }}
                    ></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {serviceData?.details && (
            <div className="modal-section">
              <h3>{t.services.modal.details}</h3>
              <p>{serviceData.details}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {service.id === "french" ? (
            <>
              <button
                className="btn btn-secondary modal-cta-button"
                onClick={() => {
                  setShowFrenchTest(true);
                }}
                style={{ marginRight: "1rem" }}
              >
                {t.hero.testFrench}
              </button>
              <button
                className="btn btn-primary modal-cta-button"
                onClick={() => {
                  onClose();
                  const element = document.getElementById("rdv");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                {t.hero.letsTalk}
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary modal-cta-button"
              onClick={() => {
                onClose();
                const element = document.getElementById("rdv");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              {t.hero.letsTalk}
            </button>
          )}
        </div>
      </div>

      {showFrenchTest && (
        <FrenchLevelTest
          onClose={() => setShowFrenchTest(false)}
          onBookAppointment={() => {
            setShowFrenchTest(false);
            onClose();
            const element = document.getElementById("rdv");
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
        />
      )}
    </div>
  );
};

export default ServiceModal;
