import { Hono } from "hono";
import { Response } from "../../utils/response";
import env from "../../env";
import { verify } from "hono/jwt";
import RevokedTokenStore from "../../utils/revoked-token";
import { deleteCookie, getCookie } from "hono/cookie";
import authMiddleware from "../../middlewares/authMiddleware";

const logout = new Hono();

logout.post("/logout", authMiddleware, async (c) => {
  const authorizationHeader = c.req.header("Authorization");

  if (authorizationHeader) {
    const [scheme, accessToken] = authorizationHeader.split(" ");

    if (scheme === "Bearer" && accessToken) {
      const isAccessTokenValid = await verify(
        accessToken,
        env.ACCESS_TOKEN_SECRET,
        env.JWT_ALGORITHM
      );

      if (isAccessTokenValid) {
        RevokedTokenStore.add(accessToken);
      }
    }
  }

  const refreshToken = getCookie(c, "refresh-token");

  if (refreshToken) {
    const isRefreshTokenValid = await verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,
      env.JWT_ALGORITHM
    );

    if (isRefreshTokenValid) {
      RevokedTokenStore.add(refreshToken);
    }
  }

  deleteCookie(c, "refresh-token");

  return c.json(
    Response.baseBodyObject({
      message: "Logout success",
      success: true,
      status: 200,
    }),
    200
  );
});

export default logout;
