import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import Icon from "./Icon";
import {
  useScrollReveal,
  useScrollRevealGroup,
} from "../hooks/useScrollReveal";

const Needs = ({ currentLanguage, translations, scrollToSection }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Services - All cards use the same unified multi-color design
  const needsCards = [
    {
      id: "welcome",
      icon: "fa-home",
      text: t.needs.cards.welcome,
    },
    {
      id: "oath",
      icon: "fa-scale",
      text: t.needs.cards.oath,
    },
    {
      id: "employment",
      icon: "fa-briefcase",
      text: t.needs.cards.employment,
    },
    {
      id: "french",
      icon: "fa-book-open",
      text: t.needs.cards.french,
    },
    {
      id: "family",
      icon: "fa-users",
      text: t.needs.cards.family,
    },
    {
      id: "women",
      icon: "fa-female",
      text: t.needs.cards.women,
    },
    {
      id: "taxes",
      icon: "fa-calculator",
      text: t.needs.cards.taxes,
    },
    {
      id: "volunteering",
      icon: "fa-hands-helping",
      text: t.needs.cards.volunteering,
    },
  ];

  const headerRef = useScrollReveal();
  const gridRef = useScrollRevealGroup();
  const ctaRef = useScrollReveal();

  const handleCardClick = (card) => {
    setSelectedService(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <>
      <section id="besoins" className="needs-section">
        <div className="container">
          <div className="section-header scroll-reveal" ref={headerRef}>
            <h2 className="section-title">{t.needs.title}</h2>
            <p className="section-subtitle">{t.needs.subtitle}</p>
            <p className="section-instruction">{t.needs.instruction}</p>
          </div>

          <div className="needs-grid" ref={gridRef}>
            {needsCards.map((card) => (
              <div
                key={card.id}
                className="need-card need-card-multicolor scroll-reveal-child"
                onClick={() => handleCardClick(card)}
                role="button"
                tabIndex={0}
                aria-label={`${t.aria?.learnMoreAbout || "Learn more about"} ${card.text}`}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(card);
                  }
                }}
              >
                <div className="need-icon-container">
                  <div className="need-icon">
                    <Icon name={card.icon.replace("fa-", "")} size={32} />
                  </div>
                  <div className="need-accent-bar"></div>
                </div>
                <h3 className="need-title">{card.text}</h3>
                <p className="need-description">
                  {t.services.cards[card.id]?.description || ""}
                </p>
                <div className="need-card-arrow">
                  <Icon name="arrow-right" size={20} />
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta scroll-reveal-scale" ref={ctaRef}>
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("rdv")}
            >
              {t.hero.letsTalk}
            </button>
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
        translations={translations}
        currentLanguage={currentLanguage}
      />
    </>
  );
};

export default Needs;
