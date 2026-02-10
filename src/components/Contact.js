import React from "react";
import Icon from "./Icon";

const Contact = ({ currentLanguage, translations, handleSubmit }) => {
  const t = translations[currentLanguage] || translations.fr;

  const subjects = [
    t.contact.subjects?.general || "Demande générale",
    t.contact.subjects?.info || "Demande d'information",
    t.contact.subjects?.appointment || "Prise de rendez-vous",
    t.contact.subjects?.french || "Cours de français",
    t.contact.subjects?.employment || "Emploi",
    t.contact.subjects?.family || "Services familiaux",
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            <form
              id="contactForm"
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="contactName">{t.contact.form.name}</label>
                <input
                  type="text"
                  id="contactName"
                  name="name"
                  required
                  placeholder={t.contact.form.name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">{t.contact.form.email}</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="email"
                  required
                  placeholder={t.contact.form.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactSubject">{t.contact.form.subject}</label>
                <select id="contactSubject" name="subject" required>
                  <option value="">{t.contact.form.subject}</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage">{t.contact.form.message}</label>
                <textarea
                  id="contactMessage"
                  name="message"
                  rows="5"
                  required
                  placeholder={t.contact.form.message}
                ></textarea>
              </div>

              <div className="form-submit">
                <button type="submit" className="btn btn-primary">
                  {t.contact.form.submit}
                </button>
              </div>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-section">
              <div className="info-header">
                <div className="info-icon">
                  <Icon name="map-marker-alt" size={24} />
                </div>
                <h3>{t.contact.info.addressLabel}</h3>
              </div>
              <p className="info-text">{t.contact.info.address}</p>
            </div>

            <div className="info-section">
              <div className="info-header">
                <div className="info-icon">
                  <Icon name="phone" size={24} />
                </div>
                <h3>{t.contact.info.phoneLabel}</h3>
              </div>
              <p className="info-text">{t.contact.info.phone}</p>
            </div>

            <div className="info-section">
              <div className="info-header">
                <div className="info-icon">
                  <Icon name="envelope" size={24} />
                </div>
                <h3>{t.contact.info.emailLabel}</h3>
              </div>
              <p className="info-text">{t.contact.info.email}</p>
            </div>

            <div className="info-section">
              <div className="info-header">
                <div className="info-icon">
                  <Icon name="clock" size={24} />
                </div>
                <h3>{t.contact.info.hoursLabel}</h3>
              </div>
              <div className="info-text">
                <p>
                  <strong>Bureau :</strong> {t.contact.info.hours}
                </p>
                <p>
                  <strong>Francisation :</strong> {t.contact.info.frenchHours}
                </p>
              </div>
            </div>

            <div className="info-section">
              <div className="info-header">
                <div className="info-icon">
                  <Icon name="subway" size={24} />
                </div>
                <h3>{t.contact.info.accessLabel}</h3>
              </div>
              <div className="info-text">
                <p>{t.contact.info.metro}</p>
                <p>{t.contact.info.bus}</p>
                <p>{t.contact.info.parking}</p>
              </div>
            </div>

            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-icon">
                  <Icon name="map" size={24} />
                </div>
                <p>{t.contact.mapText}</p>
                <a
                  href="https://maps.google.com/?q=774+boulevard+Décarie,+Saint-Laurent,+QC+H4L+3L5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  {t.contact.viewGoogleMaps}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
