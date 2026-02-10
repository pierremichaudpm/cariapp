import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppProvider, useAppContext } from "../AppContext";

// Test component to consume context
const TestComponent = () => {
  const {
    currentLanguage,
    isMobileMenuOpen,
    chatOpen,
    currentHero,
    selectedService,
    setLanguage,
    toggleMobileMenu,
    closeMobileMenu,
    toggleChat,
    setCurrentHero,
    setSelectedService,
  } = useAppContext();

  return (
    <div>
      <div data-testid="current-language">{currentLanguage}</div>
      <div data-testid="mobile-menu-open">{isMobileMenuOpen.toString()}</div>
      <div data-testid="chat-open">{chatOpen.toString()}</div>
      <div data-testid="current-hero">{currentHero}</div>
      <div data-testid="selected-service">{selectedService}</div>

      <button onClick={() => setLanguage("en")} data-testid="set-language-en">
        Set Language EN
      </button>
      <button onClick={toggleMobileMenu} data-testid="toggle-mobile-menu">
        Toggle Mobile Menu
      </button>
      <button onClick={closeMobileMenu} data-testid="close-mobile-menu">
        Close Mobile Menu
      </button>
      <button onClick={toggleChat} data-testid="toggle-chat">
        Toggle Chat
      </button>
      <button onClick={() => setCurrentHero(2)} data-testid="set-current-hero">
        Set Current Hero
      </button>
      <button onClick={() => setSelectedService("french")} data-testid="set-selected-service">
        Set Selected Service
      </button>
    </div>
  );
};

describe("AppContext", () => {
  test("provides default values", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("fr");
    expect(screen.getByTestId("mobile-menu-open")).toHaveTextContent("false");
    expect(screen.getByTestId("chat-open")).toHaveTextContent("false");
    expect(screen.getByTestId("current-hero")).toHaveTextContent("0");
    expect(screen.getByTestId("selected-service")).toHaveTextContent("welcome");
  });

  test("updates language", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByTestId("set-language-en"));
    expect(screen.getByTestId("current-language")).toHaveTextContent("en");
  });

  test("toggles mobile menu", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByTestId("toggle-mobile-menu"));
    expect(screen.getByTestId("mobile-menu-open")).toHaveTextContent("true");
  });

  test("closes mobile menu", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // First open the menu
    fireEvent.click(screen.getByTestId("toggle-mobile-menu"));
    expect(screen.getByTestId("mobile-menu-open")).toHaveTextContent("true");

    // Then close it
    fireEvent.click(screen.getByTestId("close-mobile-menu"));
    expect(screen.getByTestId("mobile-menu-open")).toHaveTextContent("false");
  });

  test("toggles chat", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByTestId("toggle-chat"));
    expect(screen.getByTestId("chat-open")).toHaveTextContent("true");
  });

  test("sets current hero", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByTestId("set-current-hero"));
    expect(screen.getByTestId("current-hero")).toHaveTextContent("2");
  });

  test("sets selected service", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByTestId("set-selected-service"));
    expect(screen.getByTestId("selected-service")).toHaveTextContent("french");
  });
});
