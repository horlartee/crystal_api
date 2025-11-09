// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfIb9g9CmETfExZ8Al9HRFflTrms-DLv4&libraries=places",
          async: true,
          crossorigin: "anonymous",
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",
          async: true,
          type: "application/javascript",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
        // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ],
    },
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      // flutterwavePublicKey: process.env.FLUTTERWAVE_PUBLIC_KEY,
      paymentServiceUrl: process.env.PAYMENT_SERVICE_URL,
      paymentLinkGenerationClientId:
        process.env.PAYMENT_LINK_GENERATION_CLIENT_ID,
      webUrl: process.env.WEB_URL,
    },
  },
});
