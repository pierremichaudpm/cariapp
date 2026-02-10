import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import { translations } from "../../translations";

// Create a set of default props to pass to the component
// This simulates how App.js uses the Header
const defaultProps = {
  currentLanguage: "fr",
  switchLanguage: jest.fn(),
  isMobileMenuOpen: false,
  toggleMobileMenu: jest.fn(),
  closeMobileMenu: jest.fn(),
  scrollToSection: jest.fn(),
  translations: translations,
};

describe("Header Component", () => {
  beforeEach(() => {
    // Clear mock history before each test
    jest.clearAllMocks();
  });

  test("renders header with logo", () => {
    render(<Header {...defaultProps} />);
    const logo = screen.getByAltText("CARI St-Laurent");
    expect(logo).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(<Header {...defaultProps} />);
    const t = translations.fr;

    // Use getAllByRole since links appear in both desktop and mobile menus
    expect(
      screen.getAllByRole("link", { name: t.nav.home })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: t.nav.needs })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Activités" })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: t.nav.talk })[0],
    ).toBeInTheDocument();
  });

  test("renders language selector and can be opened", () => {
    render(<Header {...defaultProps} />);

    // Find the language button by its visible text
    const langButton = screen.getByRole("button", { name: /FR/i });
    expect(langButton).toBeInTheDocument();

    // Click to open the dropdown
    fireEvent.click(langButton);

    // Check that the language options appear
    expect(
      screen.getByRole("button", { name: "Français" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toBeInTheDocument();
  });

  test("toggles mobile menu", () => {
    render(<Header {...defaultProps} />);

    // Find the mobile menu toggle using the data-testid
    const mobileToggle = screen.getByTestId("mobile-menu-toggle");
    fireEvent.click(mobileToggle);

    // Assert that the toggle function from props was called
    expect(defaultProps.toggleMobileMenu).toHaveBeenCalledTimes(1);
  });
});
