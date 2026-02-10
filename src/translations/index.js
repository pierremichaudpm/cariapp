// Translation loader with dynamic imports
export const loadTranslation = async (language) => {
  try {
    const translation = await import(`./${language}.json`);
    return translation.default;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `Failed to load translation for ${language}, falling back to French`,
        error,
      );
    }
    // Fallback to French if the language file doesn't exist
    const fr = await import("./fr.json");
    return fr.default;
  }
};

// Available languages
export const availableLanguages = [
  "fr",
  "en",
  "es",
  "ar",
  "ru",
  "zh",
  "pt",
  "ht",
  "vi",
  "tl",
  "ur",
  "uk",
];
