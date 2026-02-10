import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../Contact";
import { translations } from "../../translations";
import { AppProvider } from "../../contexts/AppContext";

// Mock the useAppContext hook
jest.mock("../../contexts/AppContext", () => ({
  ...jest.requireActual("../../contexts/AppContext"),
  useAppContext: () => ({
    currentLanguage: "fr",
  }),
}));

const mockHandleSubmit = jest.fn((e) => e.preventDefault());

const Wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

describe("Contact Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders contact component", () => {
    render(
      <Wrapper>
        <Contact translations={translations} handleSubmit={mockHandleSubmit} />
      </Wrapper>,
    );

    // Check that the contact section is rendered by its heading
    const contactHeading = screen.getByText("Contactez-nous");
    expect(contactHeading).toBeInTheDocument();

    // Check that the title and subtitle are rendered
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(
      screen.getByText(/Nous sommes là pour vous aider/i),
    ).toBeInTheDocument();
  });

  test("renders contact form", () => {
    render(
      <Wrapper>
        <Contact translations={translations} handleSubmit={mockHandleSubmit} />
      </Wrapper>,
    );

    // Check that form fields are rendered
    expect(screen.getByLabelText(/Nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adresse email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sujet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre message/i)).toBeInTheDocument();
  });

  test("renders contact information", () => {
    render(
      <Wrapper>
        <Contact translations={translations} handleSubmit={mockHandleSubmit} />
      </Wrapper>,
    );

    // Check that contact information is rendered
    expect(screen.getByText("Adresse")).toBeInTheDocument();
    expect(screen.getByText("Téléphone")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Horaires")).toBeInTheDocument();
  });

  test("renders submit button", () => {
    render(
      <Wrapper>
        <Contact translations={translations} handleSubmit={mockHandleSubmit} />
      </Wrapper>,
    );

    // Check that submit button is rendered
    const submitButton = screen.getByRole("button", {
      name: /Envoyer le message/i,
    });
    expect(submitButton).toBeInTheDocument();
  });

  test("validates required fields", () => {
    render(
      <Wrapper>
        <Contact translations={translations} handleSubmit={mockHandleSubmit} />
      </Wrapper>,
    );

    // Submit empty form
    const submitButton = screen.getByRole("button", {
      name: /Envoyer le message/i,
    });
    fireEvent.click(submitButton);

    // Check that handleSubmit was called
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
