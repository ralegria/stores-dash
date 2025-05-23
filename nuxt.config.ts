// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/styles/main.scss"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Roboto: true, // This will include all available weights and styles for Roboto
      Inter: [200, 400, 700], // Specify specific weights for Inter
      "Open Sans": {
        // You can use objects for more advanced configurations
        wght: [300, 400, 700],
        ital: [400], // Include italic style for weight 400
      },
      Montserrat: true,
    },
    display: "swap", // Recommended for better performance (controls font loading behavior)
    // Optional: download fonts locally for self-hosting (can improve performance in some cases)
    // download: true,
    // inject: true, // Injects the font link directly into the <head>
  },
});
