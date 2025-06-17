// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/styles/main.scss"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap", // Recommended for better performance (controls font loading behavior)
    // Optional: download fonts locally for self-hosting (can improve performance in some cases)
    // download: true,
    // inject: true, // Injects the font link directly into the <head>
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables" as *;`,
        },
      },
    },
  },
  build: {
    transpile: ["naive-ui", "vueuc"],
  },
});
