// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false }, // Disable devtools in production
  css: ["@/assets/styles/main.scss"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Inter: [400, 600], // Only load the weights we need
    },
    display: "swap",
    download: true,
    inject: true,
    preload: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables" as *;`,
        },
      },
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'naive-ui': ['naive-ui'],
            'vue-router': ['vue-router'],
            'vicons': ['@vicons/ionicons5']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'naive-ui']
    }
  },
  build: {
    transpile: ["naive-ui", "vueuc"],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    },
    // Enable page transitions for smoother navigation
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  // Improve performance with nitro optimizations
  nitro: {
    compressPublicAssets: true,
    minify: true,
    routeRules: {
      // Cache static assets for 1 week
      '/images/**': { headers: { 'cache-control': 'public, max-age=604800' } },
      '/logo.svg': { headers: { 'cache-control': 'public, max-age=604800' } }
    }
  },
  // Enable runtime config for better performance
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:4000/api' // Hardcoded for now
    }
  }
});
