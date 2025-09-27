import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import UserRepository from "../../repositories/user";
import { getCookie } from "hono/cookie";
import dayjs from "dayjs";
import { decode, sign, verify } from "hono/jwt";
import env from "../../env";
import { Response } from "../../utils/response";
import RevokedTokenStore from "../../utils/revoked-token";

const refresh = new Hono();

refresh.post("/refresh", async (c) => {
  const refreshToken = getCookie(c, "refresh-token");

  if (!refreshToken) {
    throw new HTTPException(401, { message: "Refresh token not found" });
  }

  const revokedToken = RevokedTokenStore.get(refreshToken);

  if (revokedToken) {
    throw new HTTPException(401, {
      message: "Refresh token is exipred or invalid",
    });
  }

  const isRefreshTokenValid = verify(
    refreshToken,
    env.REFRESH_TOKEN_SECRET,
    env.JWT_ALGORITHM
  );

  if (!isRefreshTokenValid) {
    throw new HTTPException(401, {
      message: "Refresh token is exipred or invalid",
    });
  }

  const decodedRefreshToken = decode(refreshToken);

  if (!decodedRefreshToken.payload.sub) {
    throw new HTTPException(401, { message: "Subject is required" });
  }

  if (typeof decodedRefreshToken.payload.sub !== "string") {
    throw new HTTPException(401, { message: "Subject must be string" });
  }

  const foundUser = await UserRepository.findByField(
    "id",
    decodedRefreshToken.payload.sub
  );

  if (!foundUser) {
    throw new HTTPException(401, { message: "User not found" });
  }

  const dateNow = dayjs();

  const accessToken = await sign(
    {
      sub: foundUser.id,
      nbf: dateNow.unix(),
      iat: dateNow.unix(),
      exp: dateNow.add(5, "minute").unix(),
    },
    env.ACCESS_TOKEN_SECRET,
    env.JWT_ALGORITHM
  );

  return c.json(
    Response.baseBodyObject({
      message: "Refresh access token success",
      result: { access_token: accessToken },
      success: true,
      status: 200,
    }),
    200
  );
});

export default refresh;
