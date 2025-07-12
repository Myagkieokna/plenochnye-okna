// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({


  devtools: { enabled: false },

  // enable takeover mode
  typescript: { shim: false },



  modules: ["nuxt-swiper", "@vueuse/nuxt", "@pinia/nuxt", "nuxt-scheduler"],
  nitro: {
    preset: "static", // Или другое, если необходимо
    routeRules: {
      "/api/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    },
    prerender: {
      // Pre-render the homepage
      routes: ["/"],
      // Then crawl all the links on the page
      crawlLinks: true,
    },
    experimental: {
      openAPI: true,
      websocket: true
    },
  },

  app: {
    head: {
      title: "Мягкие окна из ПВХ | Утепление и теплоизоляция для вашего дома",
      link: [
        // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://plenochnieokna.com" },
      ],
      meta: [
        {
          name: "description",
          content:
            "Мягкие окна и пленочные окна из ПВХ - отличный выбор для утепления и защиты вашего дома. Узнайте о преимуществах и особенностях ПВХ окон для дачи и террас.",
        },
        {
          name: "keywords",
          content:
            "мягкие окна, пленочные окна, окна из ПВХ, теплоизоляция, пластиковые окна, окна для дачи, окна для террасы, утепление окон, ПВХ окна",
        },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Мягкие окна" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          property: "og:title",
          content: "Мягкие, пленочные окна из ПВХ | Утепление и теплоизоляция для вашего дома",
        },
        {
          property: "og:description",
          content:
            "Мягкие, пленочные окна из ПВХ - лучший выбор для утепления вашего дома и дачи. Преимущества теплоизоляции, долговечности и легкости в обслуживании.",
        },
        {
          property: "og:image",
          content: "https://picloud.cc/images/9b7e0b37b66e1ed4ac250884e645b4d5.jpg",
        },
        { property: "og:url", content: "https://plenochnieokna.com" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:site_name", content: "Мягкие, пленочные окна из ПВХ" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Мягкие, пленочные окна из ПВХ | Утепление и теплоизоляция для вашего дома",
        },
        {
          name: "twitter:description",
          content:
            "Мягкие, пленочные окна из ПВХ для дачи и террас. Отличная теплоизоляция и защита от внешних факторов.",
        },
        {
          name: "twitter:image",
          content: "https://picloud.cc/images/9b7e0b37b66e1ed4ac250884e645b4d5.jpg",
        },
      ],
      script: [
        {
          innerHTML: `
            (function() {
              try {
                const savedTheme = localStorage.getItem('color-scheme');
                if (savedTheme === 'light' || savedTheme === 'dark') {
                  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
                  document.documentElement.setAttribute('color-scheme', savedTheme);
                } else {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.toggle('dark', prefersDark);
                  document.documentElement.setAttribute('color-scheme', prefersDark ? 'dark' : 'light');
                }
              } catch(e) {}
            })();
          `,
          type: "text/javascript",
        },
      ],
    },
    pageTransition: {
      name: "fade", // Ключевое имя перехода
      mode: "out-in", // Режим: "out-in" или "in-out"
      appear: true, // Включение анимации при первой загрузке страницы
      css: true, // Включение/отключение CSS-анимаций (для анимаций через JS установите false)
      duration: { enter: 400, leave: 400 }, // Продолжительность входа/выхода в мс
    },
  },

  compatibilityDate: "2024-07-15",
});
