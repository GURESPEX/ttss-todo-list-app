export default {
  BASE_URL: import.meta.env.BASE_URL,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  MODE: import.meta.env.MODE as "development" | "production",
  SSR: import.meta.env.SSR,

  API_URL: import.meta.env.VITE_API_URL as string,
} as const;
