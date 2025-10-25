// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // enable takeover mode
  typescript: { shim: false },

  ssr: true,
  runtimeConfig: {
    public: {
      HOST_NAME: process.env.HOSTNAME || "localhost",
      NODE_VERSION: process.env.NODE_VERSION,
    },
  },
  modules: ["nuxt-swiper", "@vueuse/nuxt", "@pinia/nuxt", "nuxt-scheduler"],
  nitro: {
    preset: "node-server",
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
      websocket: true,
    },
  },

  app: {
    head: {
      title: "Мягкие окна из гибкого ПВХ в Москве и области — Производство и монтаж под ключ",
      meta: [
        // --- Базовые мета ---
        {
          name: "description",
          content:
            "Производство и монтаж мягких окон из гибкого ПВХ под ключ. Замер, доставка и установка по Москве и Московской области. Гарантия 10 лет. Прозрачная пленка, доступные цены, качественные материалы.",
        },
        {
          name: "keywords",
          content:
            "мягкие окна, окна пвх, гибкие окна, мягкие окна под ключ, мягкие окна для веранды, мягкие окна для беседки, мягкие окна москва, установка мягких окон",
        },
        { name: "author", content: "Мягкие Окна" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#ffffff" },

        // --- Open Graph ---
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Мягкие окна из гибкого ПВХ" },
        { property: "og:locale", content: "ru_RU" },
        {
          property: "og:title",
          content: "Мягкие окна из гибкого ПВХ — Производство и монтаж под ключ",
        },
        {
          property: "og:description",
          content:
            "Изготавливаем и устанавливаем мягкие окна из гибкого ПВХ по индивидуальным размерам. Бесплатный замер, доставка, гарантия качества!",
        },
        { property: "og:url", content: "https://plenochnieokna.ru" },
        {
          property: "og:image",
          content: "https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
        },
        {
          property: "og:image:secure_url",
          content: "https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
        },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Мягкие окна из гибкого ПВХ — прозрачная защита для террасы и веранды",
        },

        // --- Facebook / Telegram / WhatsApp ---
        { property: "fb:app_id", content: "1234567890" },

        // --- Twitter Card ---
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Мягкие окна из гибкого ПВХ — Производство и монтаж под ключ",
        },
        {
          name: "twitter:description",
          content:
            "Изготавливаем и устанавливаем мягкие окна из гибкого ПВХ по индивидуальным размерам. Бесплатный замер, доставка, гарантия качества!",
        },
        {
          name: "twitter:image",
          content: "https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
        },
        { name: "twitter:image:alt", content: "Мягкие окна из гибкого ПВХ" },

        // --- VK ---
        {
          property: "vk:image",
          content: "https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
        },
        {
          property: "vk:title",
          content: "Мягкие окна из гибкого ПВХ — Производство и монтаж под ключ",
        },
        {
          property: "vk:description",
          content:
            "Производство и монтаж мягких окон из гибкого ПВХ по Москве и области. Бесплатный замер и гарантия качества!",
        },
      ],

      link: [
        { rel: "canonical", href: "https://plenochnieokna.ru" },
        { rel: "icon", type: "image/png", href: "/favicon/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
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
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Мягкие окна из гибкого ПВХ",
            image: "https://plenochnieokna.ru/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
            url: "https://plenochnieokna.ru",
            telephone: "+7-966-126-6606",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Москва",
              addressRegion: "Московская область",
              addressCountry: "RU",
            },
            openingHours: "Mo-Su 08:00-22:00",
            priceRange: "₽₽",
            description:
              "Производство и монтаж мягких окон из гибкого ПВХ по Москве и области. Быстро, надежно, с гарантией.",
            makesOffer: [
              {
                "@type": "Offer",
                name: "Мягкие окна для веранды",
                priceCurrency: "RUB",
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                name: "Монтаж мягких окон под ключ",
                priceCurrency: "RUB",
                availability: "https://schema.org/InStock",
              },
            ],
          }),
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
