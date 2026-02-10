import React, { useState, useEffect, useRef } from "react";
import Icon from "./Icon";

const Testimonials = ({ currentLanguage, translations }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialIntervalRef = useRef(null);

  const images = [
    "/images/arabwoman.webp",
    "/images/blackman.webp",
    "/images/blackwomen.webp",
    "/images/asianwoman.webp",
    "/images/asianman.webp",
  ];

  const testimonialItems = t.testimonials?.items || [];
  const testimonials = testimonialItems.map((item, index) => ({
    id: index + 1,
    name: item.name,
    country: item.country,
    year: item.year,
    text: item.text,
    service: item.service,
    image: images[index] || images[0],
  }));

  // Auto-rotation
  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const pauseRotation = () => {
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
    }
  };

  const resumeRotation = () => {
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  return (
    <section id="temoignages" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.testimonialsSection.title}</h2>
          <p className="section-subtitle">{t.testimonialsSection.subtitle}</p>
        </div>

        <div
          className="testimonials-carousel"
          onMouseEnter={pauseRotation}
          onMouseLeave={resumeRotation}
        >
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${index === currentTestimonial ? "active" : ""}`}
              >
                <div className="testimonial-content">
                  <div className="testimonial-image">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="testimonial-text">
                    <div className="quote-icon">
                      <Icon name="quote-left" size={32} />
                    </div>
                    <p className="testimonial-quote">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-info">
                        {testimonial.country} •{" "}
                        {t.testimonials?.arrived || "Arrivée"}{" "}
                        {testimonial.year}
                      </p>
                      <span className="service-badge">
                        {testimonial.service}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="testimonial-nav prev"
            onClick={prevTestimonial}
            aria-label={t.aria?.previousTestimonial || "Previous testimonial"}
          >
            <Icon name="chevron-left" size={24} />
          </button>
          <button
            className="testimonial-nav next"
            onClick={nextTestimonial}
            aria-label={t.aria?.nextTestimonial || "Next testimonial"}
          >
            <Icon name="chevron-right" size={24} />
          </button>

          {/* Dots Indicators */}
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentTestimonial ? "active" : ""}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`${t.aria?.goToTestimonial || "Go to testimonial"} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
