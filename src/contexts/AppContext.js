import React, { createContext, useContext, useState, useEffect } from "react";
import { loadTranslation } from "../translations";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("fr");
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load initial translation (French)
  useEffect(() => {
    const loadInitialTranslation = async () => {
      try {
        const translation = await loadTranslation("fr");
        setTranslations({ fr: translation });
        setIsLoading(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to load initial translation", error);
        }
        setIsLoading(false);
      }
    };
    loadInitialTranslation();
  }, []);

  const switchLanguage = async (lang) => {
    // If translation is already loaded, just switch
    if (translations[lang]) {
      setCurrentLanguage(lang);
      return;
    }

    // Load the new translation
    try {
      const translation = await loadTranslation(lang);
      setTranslations((prev) => ({ ...prev, [lang]: translation }));
      setCurrentLanguage(lang);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(`Failed to switch to language ${lang}`, error);
      }
    }
  };

  // Memoize the context value
  const value = React.useMemo(
    () => ({
      currentLanguage,
      switchLanguage,
      translations,
      t: translations[currentLanguage] || translations.fr || {},
      isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLanguage, translations, isLoading],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
