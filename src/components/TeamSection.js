import React, { useRef, useState, useCallback } from "react";

const teamMembers = [
  {
    name: "Marie-Claire Dubois",
    department: "direction",
    quote:
      "Chaque personne qui franchit notre porte porte en elle un potentiel immense.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    name: "Amadou Diallo",
    department: "accueil",
    quote: "Le premier sourire fait toute la différence dans un nouveau pays.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Sofia Chen",
    department: "francisation",
    quote: "La langue est la clé qui ouvre toutes les portes de l'intégration.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
  {
    name: "Carlos Rivera",
    department: "emploi",
    quote: "Trouver un emploi ici, c'est retrouver sa dignité et sa confiance.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
  {
    name: "Fatima Al-Hassan",
    department: "femmes",
    quote:
      "Ensemble, nous brisons l'isolement et construisons des ponts entre les cultures.",
    image:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=600&q=80",
  },
  {
    name: "Jean-Pierre Tremblay",
    department: "jeunesse",
    quote:
      "Les jeunes d'aujourd'hui sont les leaders de demain, peu importe leur origine.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  },
  {
    name: "Linh Nguyen",
    department: "communautaire",
    quote: "La diversité est notre plus grande richesse collective.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
  {
    name: "Hassan Youssef",
    department: "hommes",
    quote: "Parler de ses défis, c'est déjà commencer à les surmonter.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
  },
];

const CARD_WIDTH = 320;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;

function TeamSection({ currentLanguage, translations }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const t = translations[currentLanguage] || translations.fr;
  const teamT = t.team || {};
  const departments = teamT.departments || {};

  const team = teamMembers.map((m) => ({
    ...m,
    role: departments[m.department] || m.department,
  }));

  const scrollToIndex = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, teamMembers.length - 1));
    el.scrollTo({ left: clamped * STEP, behavior: "smooth" });
    setActiveIndex(clamped);
  }, []);

  const handleScroll = useCallback((e) => {
    const target = e.currentTarget;
    const idx = Math.round(target.scrollLeft / STEP);
    setActiveIndex((prev) => {
      const next = Math.max(0, Math.min(idx, teamMembers.length - 1));
      return next !== prev ? next : prev;
    });
  }, []);

  return (
    <section id="equipe" className="team-section">
      <div className="team-container">
        <h2 className="section-title">{teamT.title || "Notre équipe"}</h2>
        <p className="section-subtitle">
          {teamT.subtitle || "Des professionnels dévoués à votre intégration"}
        </p>

        <div ref={scrollRef} className="team-carousel" onScroll={handleScroll}>
          {team.map((m, idx) => (
            <article key={idx} className="team-card">
              <div className="team-card-image">
                <img src={m.image} alt={m.name} />
              </div>
              <div className="team-card-quote-hint">"</div>
              <div className="team-card-overlay">
                <div className="team-card-quote">
                  <span className="team-card-quote-mark">"</span>
                  <p>{m.quote}</p>
                </div>
              </div>
              <div className="team-card-info">
                <h3>{m.name}</h3>
                <p className="team-card-role">{m.role}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="team-controls">
          {team.map((_, i) => (
            <button
              key={i}
              className={`team-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Membre ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
