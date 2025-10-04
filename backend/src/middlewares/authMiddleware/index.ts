import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { decode, verify } from "hono/jwt";
import env from "../../env";
import UserRepository, { User } from "../../repositories/user";
import RevokedTokenStore from "../../utils/revoked-token";

type Variables = {
  me: User;
  access_token: string;
};

const authMiddleware = createMiddleware<{ Variables: Variables }>(
  async (c, next) => {
    const authorizationHeader = c.req.header("Authorization");

    if (!authorizationHeader) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const [scheme, accessToken] = authorizationHeader.split(" ");

    if (scheme !== "Bearer") {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    if (!accessToken) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const revokedToken = RevokedTokenStore.get(accessToken);

    if (revokedToken) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    try {
      await verify(accessToken, env.ACCESS_TOKEN_SECRET, env.JWT_ALGORITHM);
    } catch {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const decodedAccessToken = decode(accessToken);

    if (!decodedAccessToken.payload.sub) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    if (typeof decodedAccessToken.payload.sub !== "string") {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const foundUser = await UserRepository.findByField(
      "id",
      decodedAccessToken.payload.sub
    );

    if (!foundUser) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    c.set("me", foundUser);
    c.set("access_token", accessToken);

    await next();
  }
);

export default authMiddleware;
