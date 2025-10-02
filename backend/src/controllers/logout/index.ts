import { Hono } from "hono";
import { Response } from "../../utils/response";
import env from "../../env";
import { verify } from "hono/jwt";
import RevokedTokenStore from "../../utils/revoked-token";
import { deleteCookie, getCookie } from "hono/cookie";
import authMiddleware from "../../middlewares/authMiddleware";

const logout = new Hono();

logout.post("/logout", authMiddleware, async (c) => {
  const accessToken = c.get("access_token");

  RevokedTokenStore.add(accessToken);

  const refreshToken = getCookie(c, "refresh-token");

  if (refreshToken) {
    try {
      await verify(refreshToken, env.REFRESH_TOKEN_SECRET, env.JWT_ALGORITHM);
      RevokedTokenStore.add(refreshToken);
    } catch {}
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
