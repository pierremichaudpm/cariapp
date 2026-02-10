import React, { useState } from "react";
import Icon from "./Icon";
import {
  useScrollReveal,
  useScrollRevealGroup,
} from "../hooks/useScrollReveal";

const Activities = ({ currentLanguage, translations }) => {
  const [selectedFilter, setSelectedFilter] = useState("Tout voir");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = translations[currentLanguage] || translations.fr;

  const activities = [
    {
      id: "1",
      day: "07",
      month: "janv.",
      title: "Halte-garderie Arc-en-ciel",
      time: "08:45 - 15:30",
      location: "CARI St-Laurent",
      category: "Famille",
      description:
        "Vous participez à une activité ou une formation au CARI? Inscrivez votre enfant à la halte-garderie.",
      registrationUrl: "https://forms.office.com/r/diC18RZgfV",
    },
    {
      id: "2",
      day: "17",
      month: "janv.",
      title: "Halte-répit pour enfants avec besoins particuliers",
      time: "09:30 - 17:00",
      location: "CARI St-Laurent",
      category: "Famille",
      description:
        "L'OASIS est une halte-répit pensée pour vous, parents d'enfants ayant des besoins particuliers.",
      registrationUrl: "#",
    },
    {
      id: "3",
      day: "20",
      month: "janv.",
      title: "Espace parents - ateliers pour parents immigrants",
      time: "10:00 - 12:00",
      location: "CARI St-Laurent",
      category: "Accueil",
      description:
        "Rencontres conviviales pour échanger, apprendre et vous sentir soutenu.",
      registrationUrl: "#",
    },
    {
      id: "4",
      day: "21",
      month: "janv.",
      title: "Portfolio professionnel",
      time: "09:30 - 12:00",
      location: "EN PRÉSENTIEL",
      category: "Emploi",
      description:
        "Cet atelier vous accompagne pour réaliser votre portfolio professionnel.",
      registrationUrl: "#",
    },
    {
      id: "5",
      day: "23",
      month: "janv.",
      title: "Pratique du français",
      time: "10:00 - 12:00",
      location: "CARI St-Laurent",
      category: "Français",
      description:
        "Ateliers de conversation en français en petit groupe, adaptés à votre niveau.",
      registrationUrl: "#",
    },
    {
      id: "6",
      day: "22",
      month: "janv.",
      title: "Ateliers de couture pour les femmes",
      time: "13:00 - 15:00",
      location: "EN PRÉSENTIEL",
      category: "Femmes",
      description:
        "Série de 6 ateliers de couture pour apprendre les techniques de base.",
      registrationUrl: "#",
    },
  ];

  const moreActivities = [
    {
      id: "7",
      day: "02",
      month: "fév.",
      title: "Ateliers de conversation anglaise",
      time: "13:00 - 15:00",
      location: "EN PRÉSENTIEL",
      category: "Français",
      description:
        "Ateliers de conversation animés par des bénévoles passionnés.",
      registrationUrl: "https://forms.office.com/r/tcTjHpCUg0",
    },
    {
      id: "8",
      day: "03",
      month: "fév.",
      title: "Explorez les Secrets du Marché du Travail",
      time: "10:00 - 12:00",
      location: "En ligne via Teams",
      category: "Emploi",
      description:
        "Comprendre la différence entre culture des diplômes et culture des compétences.",
      registrationUrl: "#",
    },
    {
      id: "9",
      day: "05",
      month: "fév.",
      title: "L'IA Peut-Elle Remplacer Votre CV?",
      time: "10:00 - 12:00",
      location: "En ligne via Teams",
      category: "Emploi",
      description:
        "Apprenez à adapter votre CV pour les systèmes automatisés (IA).",
      registrationUrl: "#",
    },
    {
      id: "10",
      day: "07",
      month: "fév.",
      title: "Impôts 2025 - Séance d'information",
      time: "10:00 - 14:00",
      location: "CARI St-Laurent",
      category: "Accueil",
      description:
        "Comprendre les bases des impôts au Canada et bien vous préparer.",
      registrationUrl: "#",
    },
    {
      id: "11",
      day: "10",
      month: "fév.",
      title: "Réseau de contact : Booster votre carrière",
      time: "10:00 - 12:00",
      location: "En ligne via Teams",
      category: "Emploi",
      description:
        "Apprenez à identifier les bonnes personnes à contacter et développer votre réseau.",
      registrationUrl: "#",
    },
    {
      id: "12",
      day: "18",
      month: "fév.",
      title: "Soirée communautaire LGBTQ+",
      time: "18:00 - 20:00",
      location: "CARI St-Laurent",
      category: "Accueil",
      description:
        "Venez échanger, célébrer et vous amuser entre membres de la communauté.",
      registrationUrl: "#",
    },
  ];

  const filters = [
    t.activities.filters.all,
    t.activities.filters.welcome,
    t.activities.filters.french,
    t.activities.filters.employment,
    t.activities.filters.family,
    t.activities.filters.women,
  ];

  const filteredActivities =
    selectedFilter === t.activities.filters.all
      ? activities
      : activities.filter((activity) => activity.category === selectedFilter);

  const headerRef = useScrollReveal();
  const filtersRef = useScrollReveal();
  const gridRef = useScrollRevealGroup();
  const ctaRef = useScrollReveal();

  const filteredMoreActivities =
    selectedFilter === t.activities.filters.all
      ? moreActivities
      : moreActivities.filter(
          (activity) => activity.category === selectedFilter,
        );

  return (
    <>
      <section id="activites" className="activities-section">
        <div className="container">
          <div className="section-header scroll-reveal" ref={headerRef}>
            <h2 className="section-title">{t.activitiesSection.title}</h2>
            <p className="section-subtitle">{t.activitiesSection.subtitle}</p>
          </div>

          {/* Filter Pills */}
          <div
            className="activities-filters-compact scroll-reveal"
            ref={filtersRef}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-pill ${selectedFilter === filter ? "active" : ""}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Events Grid - Compact Design */}
          <div className="events-grid-compact" ref={gridRef}>
            {filteredActivities.map((event) => (
              <div
                key={event.id}
                className="event-card-compact scroll-reveal-child"
                data-category={event.category}
              >
                {/* Card Header */}
                <div className="event-card-header">
                  {/* Date Badge */}
                  <div className="event-date-container">
                    <div className="event-date-badge">
                      <span className="event-day">{event.day}</span>
                      <span className="event-month">{event.month}</span>
                    </div>
                    {/* Title */}
                    <h3 className="event-title-compact">{event.title}</h3>
                  </div>
                  {/* Category Tag */}
                  <span className="event-category-tag">{event.category}</span>
                </div>

                {/* Divider */}
                <div className="event-divider" />

                {/* Card Body */}
                <div className="event-card-body">
                  <div className="event-meta-compact">
                    <div className="event-meta-item">
                      <Icon name="clock" size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-meta-item">
                      <Icon name="map-marker-alt" size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={event.registrationUrl || "#"}
                    className="event-register-btn"
                    target={
                      event.registrationUrl &&
                      event.registrationUrl.startsWith("http")
                        ? "_blank"
                        : "_self"
                    }
                    rel={
                      event.registrationUrl &&
                      event.registrationUrl.startsWith("http")
                        ? "noopener noreferrer"
                        : ""
                    }
                  >
                    {t.activities.registerButton}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* More Events Button */}
          <div className="section-cta scroll-reveal-scale" ref={ctaRef}>
            <button
              className="btn-more-events"
              onClick={() => setIsModalOpen(true)}
            >
              {t.activities.moreEventsButton}
            </button>
          </div>
        </div>
      </section>

      {/* More Events Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content modal-events"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
              aria-label={t.aria?.closeModal || "Close modal"}
            >
              <Icon name="times" size={24} />
            </button>

            <div className="modal-header">
              <h2>{t.activitiesSection.allEvents}</h2>
            </div>

            <div className="modal-body">
              <div className="modal-events-list">
                {[...filteredActivities, ...filteredMoreActivities].map(
                  (event) => (
                    <div key={event.id} className="modal-event-item">
                      {/* Date */}
                      <div className="modal-event-date">
                        <span className="modal-event-day">{event.day}</span>
                        <span className="modal-event-month">{event.month}</span>
                      </div>

                      {/* Content */}
                      <div className="modal-event-content">
                        <h4 className="modal-event-title">{event.title}</h4>
                        <div className="modal-event-meta">
                          <span className="modal-meta-item">
                            <Icon name="clock" size={14} />
                            {event.time}
                          </span>
                          <span className="modal-meta-item">
                            <Icon name="map-marker-alt" size={14} />
                            {event.location}
                          </span>
                        </div>
                      </div>

                      {/* Category & CTA */}
                      <div className="modal-event-actions">
                        <span className="modal-category-tag">
                          {event.category}
                        </span>
                        <a
                          href={event.registrationUrl || "#"}
                          className="modal-register-link"
                          target={
                            event.registrationUrl &&
                            event.registrationUrl.startsWith("http")
                              ? "_blank"
                              : "_self"
                          }
                          rel={
                            event.registrationUrl &&
                            event.registrationUrl.startsWith("http")
                              ? "noopener noreferrer"
                              : ""
                          }
                        >
                          {t.activities.registerButton}
                          <Icon name="chevron-right" size={16} />
                        </a>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Activities;
