import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import FrenchLevelTest from "./cari/FrenchLevelTest";
import { X, ChevronDown } from "lucide-react";

const AccordionSection = ({ section, isOpen, onToggle }) => {
  const itemCount = section.items?.length || 0;

  return (
    <div className={`accordion-section ${isOpen ? "open" : ""}`}>
      <button className="accordion-trigger" onClick={onToggle}>
        <div className="accordion-trigger-left">
          <span className="accordion-title">{section.title}</span>
          {itemCount > 0 && (
            <span className="accordion-count">
              {itemCount} {itemCount > 1 ? "services" : "service"}
            </span>
          )}
        </div>
        <ChevronDown size={20} className="accordion-chevron" />
      </button>
      <div className="accordion-content">
        <div className="accordion-inner">
          {section.description && (
            <p className="accordion-description">{section.description}</p>
          )}
          {section.items && (
            <div className="accordion-items">
              {section.items.map((item, i) => (
                <div key={i} className="accordion-item">
                  <div className="accordion-item-name">{item.name}</div>
                  {item.description && (
                    <div className="accordion-item-desc">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {section.metadata && (
            <div className="accordion-metadata">{section.metadata}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceModal = ({
  isOpen,
  onClose,
  service,
  translations,
  currentLanguage,
}) => {
  const [showFrenchTest, setShowFrenchTest] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const t = translations[currentLanguage] || translations.fr;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // On desktop, auto-expand first section
      if (window.innerWidth > 768) {
        setOpenSections({ 0: true });
      } else {
        setOpenSections({});
      }
    } else {
      document.body.style.overflow = "unset";
      setOpenSections({});
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const serviceData = t.services.cards[service.id];
  const hasSections = serviceData?.sections && serviceData.sections.length > 0;

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

          {hasSections ? (
            <>
              <div className="accordion-container">
                {serviceData.sections.map((section, index) => (
                  <AccordionSection
                    key={index}
                    section={section}
                    isOpen={!!openSections[index]}
                    onToggle={() => toggleSection(index)}
                  />
                ))}
              </div>

              {serviceData.contactInfo && (
                <div className="modal-contact-info">
                  {serviceData.contactInfo.phone && (
                    <span>
                      <a href={`tel:${serviceData.contactInfo.phone}`}>
                        {serviceData.contactInfo.phone}
                      </a>
                    </span>
                  )}
                  {serviceData.contactInfo.email && (
                    <span>
                      <a href={`mailto:${serviceData.contactInfo.email}`}>
                        {serviceData.contactInfo.email}
                      </a>
                    </span>
                  )}
                  {serviceData.contactInfo.note && (
                    <span>{serviceData.contactInfo.note}</span>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
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
            </>
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
