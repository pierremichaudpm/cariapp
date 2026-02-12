import React from "react";
import Icon from "./Icon";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Appointment = ({
  currentLanguage,
  translations,
  selectedService,
  handleServiceSelect,
  handleSubmit,
}) => {
  const t = translations[currentLanguage] || translations.fr;

  const consultationTypes = {
    welcome: t.needs.cards.welcome,
    oath: t.needs.cards.oath,
    employment: t.needs.cards.employment,
    french: t.needs.cards.french,
    family: t.needs.cards.family,
    women: t.needs.cards.women,
    taxes: t.needs.cards.taxes,
    volunteering: t.needs.cards.volunteering,
  };

  const timeSlots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
  ];

  const headerRef = useScrollReveal();
  const cardRef = useScrollReveal();

  const serviceDetails = {
    welcome: { icon: <Icon name="home" size={20} /> },
    oath: { icon: <Icon name="scale" size={20} /> },
    employment: { icon: <Icon name="briefcase" size={20} /> },
    french: { icon: <Icon name="book-open" size={20} /> },
    family: { icon: <Icon name="users" size={20} /> },
    women: { icon: <Icon name="female" size={20} /> },
    taxes: { icon: <Icon name="calculator" size={20} /> },
    volunteering: { icon: <Icon name="hands-helping" size={20} /> },
  };

  return (
    <section id="rdv" className="appointment-section">
      <div className="container">
        <div className="section-header scroll-reveal" ref={headerRef}>
          <h2 className="section-title">{t.appointment.title}</h2>
          <p className="section-subtitle">{t.appointment.subtitle}</p>
        </div>

        <div className="appointment-container">
          <div className="appointment-steps">
            <div className="step-indicator">
              <span className="step-number active">1</span>
              <span className="step-label">{t.appointment.steps.yourNeed}</span>
            </div>
            <div className="step-line"></div>
            <div className="step-indicator">
              <span className="step-number">2</span>
              <span className="step-label">{t.appointment.steps.yourInfo}</span>
            </div>
            <div className="step-line"></div>
            <div className="step-indicator">
              <span className="step-number">3</span>
              <span className="step-label">
                {t.appointment.steps.confirmation}
              </span>
            </div>
          </div>

          <div className="appointment-card scroll-reveal" ref={cardRef}>
            <div className="service-grid">
              {Object.entries(consultationTypes).map(([id, label]) => {
                const details = serviceDetails[id];
                return (
                  <button
                    key={id}
                    type="button"
                    className={`service-btn ${selectedService === id ? "selected" : ""}`}
                    onClick={() => handleServiceSelect(id)}
                  >
                    <div className="service-icon-wrapper">{details.icon}</div>
                    <span className="service-name">{label}</span>
                    {selectedService === id && (
                      <span className="service-check">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className="walkin-notice"
              style={{
                background: "linear-gradient(135deg, #f0f7f6 0%, #e8f4f8 100%)",
                border: "1px solid #6CBAC7",
                borderRadius: "12px",
                padding: "16px 20px",
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Icon
                name="info-circle"
                size={20}
                style={{ color: "#6CBAC7", flexShrink: 0 }}
              />
              <p style={{ margin: 0, fontSize: "14px", color: "#263164" }}>
                {t.appointment?.walkInNotice ||
                  "Pas besoin de rendez-vous pour l'accueil et l'assermentation"}
              </p>
            </div>

            {selectedService === "oath" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  background: "#f8fffe",
                  borderRadius: "12px",
                  border: "1px dashed #6CBAC7",
                }}
              >
                <Icon
                  name="scale"
                  size={48}
                  style={{ color: "#6CBAC7", marginBottom: "16px" }}
                />
                <h3 style={{ color: "#263164", marginBottom: "12px" }}>
                  {t.services?.cards?.oath?.title || "Assermentation"}
                </h3>
                <p
                  style={{
                    color: "#555",
                    fontSize: "15px",
                    maxWidth: "500px",
                    margin: "0 auto 16px",
                  }}
                >
                  {t.appointment?.walkInServiceMessage ||
                    "L'assermentation est un service sans rendez-vous. Présentez-vous directement au CARI St-Laurent."}
                </p>
                <p
                  style={{
                    color: "#263164",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  <Icon
                    name="clock"
                    size={16}
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  {t.appointment?.walkInHours ||
                    "Lundi au vendredi, 8h30 à 17h00"}
                </p>
                <p style={{ color: "#263164" }}>
                  <Icon
                    name="map-marker-alt"
                    size={16}
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  774, boul. Décarie, bureau 300, Saint-Laurent
                </p>
              </div>
            ) : (
              <form
                id="appointmentForm"
                className="appointment-form"
                onSubmit={handleSubmit}
              >
                <div className="form-cols">
                  <div className="form-group">
                    <label htmlFor="appointmentName">
                      {t.appointment.form.name} *
                    </label>
                    <input
                      type="text"
                      id="appointmentName"
                      name="name"
                      required
                      placeholder={t.appointment.form.namePlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentPhone">
                      {t.appointment.form.phone} *
                    </label>
                    <input
                      type="tel"
                      id="appointmentPhone"
                      name="phone"
                      required
                      placeholder={t.appointment.form.phonePlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentEmail">
                      {t.appointment.form.email} *
                    </label>
                    <input
                      type="email"
                      id="appointmentEmail"
                      name="email"
                      required
                      placeholder={t.appointment.form.emailPlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentStatus">
                      {t.appointment.form.immigrationStatus} *
                    </label>
                    <select
                      id="appointmentStatus"
                      name="immigrationStatus"
                      required
                    >
                      <option value="">
                        {t.appointment.form.selectStatus}
                      </option>
                      {(t.appointment.form.statusOptions || []).map(
                        (option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentDate">
                      {t.appointment.form.date} *
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      name="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentTime">
                      {t.appointment.form.time} *
                    </label>
                    <select id="appointmentTime" name="time" required>
                      <option value="">{t.appointment.form.selectTime}</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="appointmentMessage">
                      {t.appointment.form.message}
                    </label>
                    <textarea
                      id="appointmentMessage"
                      name="message"
                      rows="3"
                      placeholder={t.appointment.form.messagePlaceholder}
                    ></textarea>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    {t.appointment.form.submit}
                  </button>
                  <p className="form-note">
                    <Icon name="info-circle" size={16} />
                    {t.appointment.form.confirmationNote}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
