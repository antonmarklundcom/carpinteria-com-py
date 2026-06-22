/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // --- Renames (old slug → new slug) ---
      {
        source: "/placares-y-vestidores",
        destination: "/placares",
        permanent: true,
      },
      {
        source: "/machimbre-y-revestimientos",
        destination: "/machimbre",
        permanent: true,
      },
      {
        source: "/decks-y-pergolas",
        destination: "/pergolas-y-decks",
        permanent: true,
      },
      // --- Merges (two old slugs → one merged page) ---
      {
        source: "/ventanas-y-aberturas",
        destination: "/aberturas-de-madera",
        permanent: true,
      },
      {
        source: "/portones-de-madera",
        destination: "/aberturas-de-madera",
        permanent: true,
      },
      // --- Pages moved to obra.com.py / out of scope (avoid dead 404s) ---
      { source: "/quinchos", destination: "/servicios", permanent: true },
      {
        source: "/galerias-y-porches",
        destination: "/servicios",
        permanent: true,
      },
      { source: "/casas-de-madera", destination: "/servicios", permanent: true },
      {
        source: "/techos-de-madera",
        destination: "/machimbre",
        permanent: true,
      },
      {
        source: "/escaleras-de-madera",
        destination: "/muebles-a-medida",
        permanent: true,
      },
      {
        source: "/muebles-de-bano",
        destination: "/muebles-a-medida",
        permanent: true,
      },
      {
        source: "/durlock-y-cielorrasos",
        destination: "/machimbre",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
