import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import "./styles/main.css";
import { useAppContext } from "./contexts/AppContext";
import { getHeroSlides } from "./constants/heroSlides";
import { services } from "./constants/services";
import { LanguageSelectorWrapper } from "./components/cari/LanguageSelector";
import {
  ParallaxStatsSection,
  ParallaxCTASection,
} from "./components/cari/ParallaxBreathing";
import MissionSimple from "./components/MissionSimple";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Hero from "./components/Hero";
import Needs from "./components/Needs";
import Icon from "./components/Icon";
import FrenchLevelTest from "./components/cari/FrenchLevelTest";
import TeamSection from "./components/TeamSection";
import Careers from "./components/Careers";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
// Lazy load below-the-fold components
const Activities = lazy(() => import("./components/Activities"));
const News = lazy(() => import("./components/News"));
const Appointment = lazy(() => import("./components/Appointment"));
const CARIChatbot = lazy(() => import("./components/cari-chatbot"));

function App() {
  const {
    currentLanguage,
    switchLanguage: switchLanguageContext,
    translations,
    isLoading,
  } = useAppContext();
  const [chatOpen, setChatOpen] = useState(false);
  const [currentHero, setCurrentHero] = useState(0);
  const [selectedService, setSelectedService] = useState("welcome");
  const [showFrenchTest, setShowFrenchTest] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatPulsing, setChatPulsing] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const heroIntervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Stop chat pulse after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => setChatPulsing(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  // Track mobile breakpoint
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configure status bar for Android (overlay mode for safe-area-inset)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: "#00000000" });
      // Get actual status bar height and set as CSS variable
      StatusBar.getInfo()
        .then((info) => {
          // On Android, status bar is typically 24-48px
          // Set a CSS variable as fallback since env(safe-area-inset-top) may not work
          const height = info.height || 40;
          document.documentElement.style.setProperty(
            "--status-bar-height",
            `${height}px`,
          );
        })
        .catch(() => {
          // Fallback: assume 40px for Android status bar
          document.documentElement.style.setProperty(
            "--status-bar-height",
            "40px",
          );
        });
    } else {
      document.documentElement.style.setProperty("--status-bar-height", "0px");
    }
  }, []);

  // Generate hero slides dynamically based on current language
  const heroSlides = React.useMemo(() => {
    if (!translations || !translations.fr) return [];
    const t = translations[currentLanguage] || translations.fr;
    return getHeroSlides(t);
  }, [translations, currentLanguage]);

  // Language switching
  const switchLanguage = (lang) => {
    switchLanguageContext(lang);
  };

  // Hero carousel functions
  const showHero = (index) => {
    if (index >= 0 && index < heroSlides.length) {
      setCurrentHero(index);
    }
  };

  const nextHeroSlide = React.useCallback(() => {
    setCurrentHero((prev) => (prev + 1) % 5);
    // Reset interval to prevent immediate auto-advance after manual interaction
    if (heroIntervalRef.current) {
      clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setCurrentHero((prev) => (prev + 1) % 5);
        }
      }, 5000);
    }
  }, []);

  const prevHeroSlide = React.useCallback(() => {
    setCurrentHero((prev) => (prev - 1 + 5) % 5);
    // Reset interval to prevent immediate auto-advance after manual interaction
    if (heroIntervalRef.current) {
      clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setCurrentHero((prev) => (prev + 1) % 5);
        }
      }, 5000);
    }
  }, []);

  // Hero carousel auto-rotation - robust implementation
  useEffect(() => {
    // Don't start if still loading
    if (isLoading) {
      return;
    }

    // Clear any existing interval first
    if (heroIntervalRef.current) {
      clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = null;
    }

    // Use a single interval that checks pause state internally
    // This prevents race conditions from multiple intervals
    heroIntervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentHero((prev) => (prev + 1) % 5);
      }
    }, 5000);

    // Handle tab visibility - reset timer when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isPausedRef.current) {
        // Tab is visible again, restart with fresh interval
        if (heroIntervalRef.current) {
          clearInterval(heroIntervalRef.current);
        }
        heroIntervalRef.current = setInterval(() => {
          if (!isPausedRef.current) {
            setCurrentHero((prev) => (prev + 1) % 5);
          }
        }, 5000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (heroIntervalRef.current) {
        clearInterval(heroIntervalRef.current);
        heroIntervalRef.current = null;
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isLoading]);

  // Simple pause/resume using ref flag - no interval manipulation
  const pauseHeroRotation = React.useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeHeroRotation = React.useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // Touch gestures for hero carousel
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    if (touchEndXRef.current < touchStartXRef.current - 50) {
      nextHeroSlide();
    }
    if (touchEndXRef.current > touchStartXRef.current + 50) {
      prevHeroSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextHeroSlide();
      }
      if (e.key === "ArrowLeft") {
        prevHeroSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextHeroSlide, prevHeroSlide]);

  // Service selection
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const successMessage =
      translations[currentLanguage]?.success?.appointment ||
      translations.fr.success.appointment;
    alert(successMessage);
  };

  // Smooth scrolling
  const scrollToSection = (sectionId) => {
    if (sectionId === "accueil") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = window.innerWidth <= 768 ? 69 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Chat toggle
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  // Show loading state while translations load
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>{translations.fr?.loading || "Loading..."}</div>
      </div>
    );
  }

  return (
    <LanguageSelectorWrapper
      onLanguageChange={(lang) => {
        switchLanguage(lang);
      }}
    >
      <div className="App">
        <Header
          currentLanguage={currentLanguage}
          switchLanguage={switchLanguage}
          scrollToSection={scrollToSection}
          translations={translations}
          onOpenFrenchTest={() => setShowFrenchTest(true)}
        />

        <main>
          <Hero
            heroSlides={heroSlides}
            currentHero={currentHero}
            showHero={showHero}
            nextHeroSlide={nextHeroSlide}
            prevHeroSlide={prevHeroSlide}
            pauseHeroRotation={pauseHeroRotation}
            resumeHeroRotation={resumeHeroRotation}
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
            currentLanguage={currentLanguage}
            translations={translations}
            scrollToSection={scrollToSection}
            showFrenchTest={showFrenchTest}
            setShowFrenchTest={setShowFrenchTest}
          />

          <ParallaxStatsSection
            title={
              (translations[currentLanguage] || translations.fr).parallax
                .statsTitle
            }
            subtitle={
              (translations[currentLanguage] || translations.fr).parallax
                .statsSubtitle
            }
            stats={[
              {
                value: "7,000",
                label: (translations[currentLanguage] || translations.fr)
                  .parallax.stats.peopleHelped,
              },
              {
                value: "95",
                label: (translations[currentLanguage] || translations.fr)
                  .parallax.stats.languagesSpoken,
              },
              {
                value: "128",
                label: (translations[currentLanguage] || translations.fr)
                  .parallax.stats.countries,
              },
              {
                value: "35",
                label: (translations[currentLanguage] || translations.fr)
                  .parallax.stats.yearsOfService,
              },
            ]}
          />

          <Needs
            currentLanguage={currentLanguage}
            translations={translations}
            scrollToSection={scrollToSection}
          />

          <MissionSimple
            currentLanguage={currentLanguage}
            translations={translations}
          />

          <Suspense fallback={<div style={{ minHeight: "400px" }}></div>}>
            <Activities
              currentLanguage={currentLanguage}
              translations={translations}
            />

            <News
              currentLanguage={currentLanguage}
              translations={translations}
            />

            <ParallaxCTASection
              title={
                (translations[currentLanguage] || translations.fr).promotions
                  ?.slides?.[0]?.title || "La diversité nous rapproche"
              }
              subtitle={
                (translations[currentLanguage] || translations.fr).promotions
                  ?.slides?.[0]?.description ||
                "Depuis plus de 30 ans, le CARI accompagne les personnes immigrantes dans leur intégration personnelle, sociale et professionnelle au Québec."
              }
              imageUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=80"
              primaryButton={{
                label:
                  (translations[currentLanguage] || translations.fr).mission
                    ?.historyCTA || "Notre histoire",
                onClick: () => {
                  setShowHistory(true);
                  document.body.style.overflow = "hidden";
                },
              }}
            />

            <Appointment
              currentLanguage={currentLanguage}
              translations={translations}
              selectedService={selectedService}
              handleServiceSelect={handleServiceSelect}
              handleSubmit={handleAppointmentSubmit}
              services={services}
            />
          </Suspense>

          <TeamSection
            currentLanguage={currentLanguage}
            translations={translations}
          />

          <Careers
            currentLanguage={currentLanguage}
            translations={translations}
          />
        </main>

        <div
          className={`chat-toggle ${chatOpen ? "active" : ""} ${chatPulsing && !chatOpen ? "pulsing" : ""}`}
          onClick={toggleChat}
        >
          <div className="chat-icon">
            <Icon name="message-circle" size={26} strokeWidth={2.5} />
          </div>
          <span className="chat-label">
            {(translations[currentLanguage] || translations.fr).chatbot
              ?.title || "Assistante CARI"}
          </span>
        </div>

        {!chatOpen && (
          <div className="chat-bubble-hint">
            {(translations[currentLanguage] || translations.fr).chatbot
              ?.bubbleHint || "Besoin d'aide? Écrivez-moi!"}
          </div>
        )}

        {chatOpen && (
          <>
            <div
              className="chat-backdrop"
              onClick={toggleChat}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 1000,
                backdropFilter: "blur(2px)",
              }}
            />
            <Suspense fallback={null}>
              <CARIChatbot onClose={toggleChat} language={currentLanguage} />
            </Suspense>
          </>
        )}

        <BottomNav
          scrollToSection={scrollToSection}
          currentLanguage={currentLanguage}
          translations={translations}
        />

        <footer className="footer">
          <div className="footer-layout">
            <div className="footer-partners">
              <span className="footer-partners-title">Nos partenaires</span>
              <div className="footer-partners-logos">
                <img
                  src="/images/partners/quebec.svg"
                  alt="Gouvernement du Québec"
                  className="footer-partner-logo"
                />
                <img
                  src="/images/partners/centraide.svg"
                  alt="Centraide du Grand Montréal"
                  className="footer-partner-logo"
                />
                <img
                  src="/images/partners/montreal.svg"
                  alt="Ville de Montréal"
                  className="footer-partner-logo"
                  style={{ height: "90px" }}
                />
                <img
                  src="/images/partners/saint-laurent.png"
                  alt="Arrondissement de Saint-Laurent"
                  className="footer-partner-logo"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <img
                  src="/images/partners/canada.svg"
                  alt="Gouvernement du Canada"
                  className="footer-partner-logo"
                  style={{ height: "24px" }}
                />
              </div>
            </div>
            <div className="footer-info-row">
              <div className="footer-logo">
                <img src="/images/logo-footer.webp" alt="CARI St-Laurent" />
              </div>
              <div className="footer-contact-inline">
                {isMobile ? (
                  <a
                    href="https://maps.google.com/?q=774+boulevard+Décarie,+Bureau+300,+Saint-Laurent,+QC+H4L+3L5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-row footer-contact-link"
                  >
                    <div className="footer-icon-circle">
                      <Icon name="map-marker-alt" size={16} />
                    </div>
                    <span>774 boul. Décarie, Bureau 300</span>
                  </a>
                ) : (
                  <div
                    className="footer-contact-row footer-contact-link"
                    onClick={() => setShowAddressModal(true)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="footer-icon-circle">
                      <Icon name="map-marker-alt" size={16} />
                    </div>
                    <span>774 boul. Décarie, Bureau 300</span>
                  </div>
                )}
                {isMobile ? (
                  <a
                    href="tel:+15147482007"
                    className="footer-contact-row footer-contact-link"
                  >
                    <div className="footer-icon-circle">
                      <Icon name="phone" size={16} />
                    </div>
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.phone || "(514) 748-2007"}
                    </span>
                  </a>
                ) : (
                  <div className="footer-contact-row">
                    <div className="footer-icon-circle">
                      <Icon name="phone" size={16} />
                    </div>
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.phone || "(514) 748-2007"}
                    </span>
                  </div>
                )}
                <div className="footer-contact-row">
                  <div className="footer-icon-circle">
                    <Icon name="clock" size={16} />
                  </div>
                  <span>
                    {(translations[currentLanguage] || translations.fr).contact
                      ?.info?.hours || "Lun-Ven 9h-12h, 12h30-16h30"}
                  </span>
                </div>
              </div>
            </div>
            <div className="footer-bottom-row">
              <span>
                {
                  (translations[currentLanguage] || translations.fr).footer
                    .copyright
                }
              </span>
              <span className="footer-separator">|</span>
              <span>
                {
                  (translations[currentLanguage] || translations.fr).footer
                    .tagline
                }
              </span>
            </div>
          </div>
        </footer>

        {showAddressModal && (
          <div
            className="address-modal-overlay"
            onClick={() => setShowAddressModal(false)}
          >
            <div className="address-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="address-modal-close"
                onClick={() => setShowAddressModal(false)}
              >
                <Icon name="x" size={20} />
              </button>
              <div className="address-modal-content">
                <div className="address-modal-map">
                  <iframe
                    title="CARI St-Laurent"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.5!2d-73.6724!3d45.5017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc918b3e7e1f6f7%3A0x7e5e5e5e5e5e5e5e!2s774%20Bd%20D%C3%A9carie%2C%20Saint-Laurent%2C%20QC%20H4L%203L5!5e0!3m2!1sfr!2sca!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="address-modal-info">
                  <img
                    src="/images/newlogo.webp"
                    alt="CARI St-Laurent"
                    className="address-modal-logo"
                  />
                  <div className="address-modal-detail">
                    <Icon name="map-marker-alt" size={18} />
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.address ||
                        "774 boulevard Décarie, Bureau 300, Saint-Laurent H4L 3L5"}
                    </span>
                  </div>
                  <div className="address-modal-detail">
                    <Icon name="phone" size={18} />
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.phone || "(514) 748-2007"}
                    </span>
                  </div>
                  <div className="address-modal-detail">
                    <Icon name="clock" size={18} />
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.hours || "Lun-Ven 9h-12h, 12h30-16h30"}
                    </span>
                  </div>
                  <hr className="address-modal-divider" />
                  <h4>
                    {(translations[currentLanguage] || translations.fr).contact
                      ?.info?.accessLabel || "Accès"}
                  </h4>
                  <div className="address-modal-detail">
                    <Icon name="subway" size={18} />
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.metro ||
                        "Métro : Du Collège (ligne orange)"}
                    </span>
                  </div>
                  <div className="address-modal-detail">
                    <Icon name="map" size={18} />
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.bus || "Bus : 17, 64, 121, 368"}
                    </span>
                  </div>
                  <div className="address-modal-detail">
                    <Icon name="map-marker-alt" size={18} />
                    <span>
                      {(translations[currentLanguage] || translations.fr)
                        .contact?.info?.parking ||
                        "Stationnement gratuit sur place"}
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=774+boulevard+Décarie,+Bureau+300,+Saint-Laurent,+QC+H4L+3L5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary address-modal-btn"
                  >
                    {(translations[currentLanguage] || translations.fr).contact
                      ?.viewGoogleMaps || "Ouvrir dans Google Maps"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {showFrenchTest && (
          <FrenchLevelTest
            onClose={() => setShowFrenchTest(false)}
            onBookAppointment={() => {
              setShowFrenchTest(false);
              scrollToSection("rdv");
            }}
          />
        )}

        {showHistory &&
          (() => {
            const t = translations[currentLanguage] || translations.fr;
            const closeHistory = () => {
              setShowHistory(false);
              document.body.style.overflow = "";
            };
            return (
              <div
                className="history-modal-overlay"
                onClick={(e) => {
                  if (e.target === e.currentTarget) closeHistory();
                }}
              >
                <div className="history-modal-content">
                  <button
                    className="history-modal-close"
                    onClick={closeHistory}
                    aria-label="Fermer"
                  >
                    ✕
                  </button>
                  <div className="history-modal-body">
                    <img
                      src="/images/newlogo.webp"
                      alt="CARI St-Laurent"
                      className="history-modal-logo"
                    />
                    <h2 className="history-modal-text">
                      {t.mission?.historyTitle || "Notre histoire"}
                    </h2>
                    <p className="history-intro">
                      {t.mission?.historyIntro || ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
      </div>
    </LanguageSelectorWrapper>
  );
}

export default App;
