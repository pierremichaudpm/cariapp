import React from "react";
import Icon from "./Icon";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Appointment = ({
  currentLanguage,
  translations,
  selectedService,
  handleServiceSelect,
  handleSubmit,
  services,
}) => {
  const t = translations[currentLanguage] || translations.fr;

  const consultationTypes = {
    welcome: t.appointment.consultationTypes.welcome,
    french: t.appointment.consultationTypes.french,
    employment: t.appointment.consultationTypes.employment,
    family: t.appointment.consultationTypes.family,
    women: t.appointment.consultationTypes.women,
    volunteering: t.appointment.consultationTypes.volunteering,
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
    welcome: { icon: <Icon name="home" size={24} />, color: "blue" },
    french: { icon: <Icon name="book-open" size={24} />, color: "orange" },
    employment: { icon: <Icon name="briefcase" size={24} />, color: "blue" },
    family: { icon: <Icon name="users" size={24} />, color: "orange" },
    women: { icon: <Icon name="female" size={24} />, color: "blue" },
    volunteering: {
      icon: <Icon name="hands-helping" size={24} />,
      color: "orange",
    },
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
              {services.map((service) => {
                const details = serviceDetails[service.id];
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`service-btn ${selectedService === service.id ? "selected" : ""}`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="service-icon-wrapper">{details.icon}</div>
                    <span className="service-name">
                      {consultationTypes[service.id]}
                    </span>
                    {selectedService === service.id && (
                      <span className="service-check">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

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
                    <option value="">{t.appointment.form.selectStatus}</option>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
