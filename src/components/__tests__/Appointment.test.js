import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Appointment from "../Appointment";
import { translations } from "../../translations";

const mockServices = [
  { id: "welcome", icon: <i className="fas fa-home"></i> },
  { id: "french", icon: <i className="fas fa-book-open"></i> },
  { id: "employment", icon: <i className="fas fa-briefcase"></i> },
];

// Create a set of default props to pass to the component
const defaultProps = {
  currentLanguage: "fr",
  translations: translations,
  selectedService: "welcome",
  handleServiceSelect: jest.fn(),
  handleSubmit: jest.fn((e) => e.preventDefault()),
  services: mockServices,
};

describe("Appointment Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock date to prevent test failure tomorrow
    jest
      .spyOn(global.Date.prototype, "toISOString")
      .mockReturnValue("2026-01-29T12:00:00.000Z");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders appointment component with title", () => {
    render(<Appointment {...defaultProps} />);
    const t = translations.fr;

    expect(screen.getByText(t.appointment.title)).toBeInTheDocument();
    expect(screen.getByText(t.appointment.subtitle)).toBeInTheDocument();
  });

  test("renders service selection buttons", () => {
    render(<Appointment {...defaultProps} />);
    const t = translations.fr;

    expect(
      screen.getByText(t.appointment.consultationTypes.welcome),
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.appointment.consultationTypes.french),
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.appointment.consultationTypes.employment),
    ).toBeInTheDocument();
  });

  test("renders form fields with correct labels", () => {
    render(<Appointment {...defaultProps} />);

    // Check that form fields are rendered with the correct French labels
    expect(screen.getByLabelText(/Nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Courriel/i)).toBeInTheDocument(); // Corrected label
    expect(screen.getByLabelText(/Date souhaitée/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Heure/i)).toBeInTheDocument(); // Corrected label
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  test("calls handleSubmit when form is submitted", () => {
    render(<Appointment {...defaultProps} />);

    const submitButton = screen.getByRole("button", {
      name: /Confirmer le rendez-vous/i,
    });
    fireEvent.click(submitButton);

    // Check that the handleSubmit function from props was called
    expect(defaultProps.handleSubmit).toHaveBeenCalledTimes(1);
  });
});
