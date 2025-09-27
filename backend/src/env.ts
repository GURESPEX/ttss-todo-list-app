import { SignatureAlgorithm } from "hono/utils/jwt/jwa";

export default {
  ACCESS_TOKEN_SECRET: "access-token-secret" as string,
  REFRESH_TOKEN_SECRET: "refresh-token-secret" as string,
  JWT_ALGORITHM: "RS256" as SignatureAlgorithm,
} as const;
