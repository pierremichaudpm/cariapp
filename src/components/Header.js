import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

const Header = ({
  currentLanguage,
  switchLanguage,
  scrollToSection,
  translations,
  onOpenFrenchTest,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langDropdownRef = useRef(null);
  const mobileLangDropdownRef = useRef(null);

  // Header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const langFlags = {
    fr: "FR",
    en: "EN",
    es: "ES",
    ar: "AR",
    ru: "RU",
    zh: "ZH",
    ht: "HT",
    ur: "UR",
    uk: "UK",
    tr: "TR",
    wo: "WO",
  };

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "ar", name: "العربية" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "ht", name: "Kreyòl" },
    { code: "ur", name: "اردو" },
    { code: "uk", name: "Українська" },
    { code: "tr", name: "Türkçe" },
    { code: "wo", name: "Wolof" },
  ];

  const t = translations[currentLanguage] || translations.fr;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdownOpen(false);
      }
      if (
        mobileLangDropdownRef.current &&
        !mobileLangDropdownRef.current.contains(event.target)
      ) {
        setMobileLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    switchLanguage(langCode);
    setLangDropdownOpen(false);
    setMobileLangDropdownOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="nav-container">
        <a
          href="#accueil"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("accueil");
          }}
          style={{ cursor: "pointer" }}
        >
          <img src="/images/newlogo.webp" alt="CARI St-Laurent" />
        </a>

        <div className="nav-right-group">
          <nav className="nav-desktop">
            <ul className="nav-menu">
              <li>
                <a
                  href="#besoins"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("besoins");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.needs}
                </a>
              </li>
              <li>
                <a
                  href="#activites"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("activites");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.activities}
                </a>
              </li>
              <li>
                <a
                  href="#ressources"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("ressources");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.news}
                </a>
              </li>
              <li>
                <a
                  href="#rdv"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("rdv");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.appointment}
                </a>
              </li>
              <li>
                <a
                  href="#equipe"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("equipe");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.team}
                </a>
              </li>
            </ul>
          </nav>

          <button className="btn-rdv-header" onClick={onOpenFrenchTest}>
            {t.hero.testFrench}
          </button>

          <div className="language-switcher" ref={langDropdownRef}>
            <div className="language-dropdown">
              <div className="lang-details">
                <button
                  className="lang-btn"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                >
                  <span id="currentLang">{langFlags[currentLanguage]}</span>
                  <Icon
                    name="globe"
                    size={18}
                    style={{ color: "white", marginLeft: "8px" }}
                  />
                </button>
                {langDropdownOpen && (
                  <div className="lang-menu">
                    <div className="lang-grid">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`lang-grid-item ${currentLanguage === lang.code ? "active" : ""}`}
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <span className="lang-grid-code">
                            {langFlags[lang.code]}
                          </span>
                          <span className="lang-grid-name">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-controls">
          <button className="btn-rdv-mobile" onClick={onOpenFrenchTest}>
            {t.hero.testFrench}
          </button>
          <div className="mobile-lang-switcher" ref={mobileLangDropdownRef}>
            <button
              className="lang-btn"
              onClick={() => setMobileLangDropdownOpen(!mobileLangDropdownOpen)}
            >
              <span>{langFlags[currentLanguage]}</span>
              <Icon
                name="globe"
                size={16}
                style={{ color: "white", marginLeft: "5px" }}
              />
            </button>
            {mobileLangDropdownOpen && (
              <div className="lang-menu mobile-lang-menu">
                <div className="lang-grid">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-grid-item ${currentLanguage === lang.code ? "active" : ""}`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <span className="lang-grid-code">
                        {langFlags[lang.code]}
                      </span>
                      <span className="lang-grid-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
