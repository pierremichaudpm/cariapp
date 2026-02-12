import React, { useState, useEffect } from "react";
import Icon from "./Icon";

const TABS = [
  {
    id: "besoins",
    icon: "hands-helping",
    labelKey: "needs",
    bottomLabel: "services",
  },
  { id: "activites", icon: "calendar", labelKey: "activities" },
  { id: "ressources", icon: "book-open", labelKey: "news" },
  { id: "rdv", icon: "calendar-check", labelKey: "appointment" },
];

const BottomNav = ({ scrollToSection, currentLanguage, translations }) => {
  const [activeTab, setActiveTab] = useState("accueil");

  useEffect(() => {
    const sectionIds = TABS.map((tab) => tab.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveTab(visible[0].target.id);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-80px 0px -40% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const t = translations[currentLanguage] || translations.fr;

  return (
    <nav className="bottom-nav" aria-label="Navigation mobile">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`bottom-nav-item ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => {
            scrollToSection(tab.id);
            setActiveTab(tab.id);
          }}
        >
          <Icon name={tab.icon} size={24} />
          <span>
            {tab.bottomLabel
              ? t.nav[tab.bottomLabel] || t.nav[tab.labelKey]
              : t.nav[tab.labelKey]}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
