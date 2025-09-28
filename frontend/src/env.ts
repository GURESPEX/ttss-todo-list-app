export default {
  IS_DEVELOPMENT_MODE: import.meta.env.DEV,
  IS_PRODUCTION_MODE: import.meta.env.PROD,
  MODE: import.meta.env.MODE as "development" | "production",
  API_URL: "http://localhost:5001/api",
} as const;
