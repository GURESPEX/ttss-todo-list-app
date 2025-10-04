import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import UserRepository, { User } from "../../repositories/user";
import { Response } from "../../utils/response";
import z from "zod";
import dayjs from "dayjs";
import { decode, sign, verify } from "hono/jwt";
import env from "../../env";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import authMiddleware from "../../middlewares/authMiddleware";
import RevokedTokenStore from "../../utils/revoked-token";

const auth = new Hono();

auth.post("/register", async (c) => {
  const { data: payload, error } = z
    .object({
      username: z
        .string()
        .min(4)
        .max(32)
        .regex(/^[A-z0-9_.]+$/),
      password: z.string().min(8),
    })
    .safeParse(await c.req.json());

  if (error) {
    throw new HTTPException(400, { message: error.message });
  }

  const foundUser = await UserRepository.findByField(
    "username",
    payload.username
  );

  if (foundUser) {
    throw new HTTPException(400, { message: "This user already exist" });
  }

  const createdUser = await UserRepository.create({
    username: payload.username,
    hashed_password: Bun.password.hashSync(payload.password, {
      algorithm: "bcrypt",
      cost: 4,
    }),
  });

  const createdUserWithOutHashedPassword: Omit<User, "hashed_password"> = {
    id: createdUser.id,
    username: createdUser.username,
    created_at: createdUser.created_at,
    updated_at: createdUser.updated_at,
  };

  return c.json(
    Response.baseBodyObject({
      message: "Register success",
      result: createdUserWithOutHashedPassword,
      success: true,
      status: 200,
    }),
    200
  );
});

auth.post("/login", async (c) => {
  const { data: payload, error } = z
    .object({
      username: z
        .string()
        .min(4)
        .max(32)
        .regex(/^[A-z0-9_.]+$/),
      password: z.string().min(8),
    })
    .safeParse(await c.req.json());

  if (error) {
    throw new HTTPException(400, { message: error.message });
  }

  const foundUser = await UserRepository.findByField(
    "username",
    payload.username
  );

  if (!foundUser) {
    throw new HTTPException(400, { message: "User not found" });
  }

  const isPasswordValid = Bun.password.verifySync(
    payload.password,
    foundUser.hashed_password
  );

  if (!isPasswordValid) {
    throw new HTTPException(400, { message: "Password is invalid" });
  }

  const dateNow = dayjs();

  const refreshToken = await sign(
    {
      sub: foundUser.id,
      nbf: dateNow.unix(),
      iat: dateNow.unix(),
      exp: dateNow.add(1, "week").unix(),
    },
    env.REFRESH_TOKEN_SECRET,
    env.JWT_ALGORITHM
  );

  setCookie(c, "refresh-token", refreshToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    expires: dateNow.add(1, "week").toDate(),
  });

  const accessToken = await sign(
    {
      sub: foundUser.id,
      nbf: dateNow.unix(),
      iat: dateNow.unix(),
      exp: dateNow.add(30, "second").unix(),
    },
    env.ACCESS_TOKEN_SECRET,
    env.JWT_ALGORITHM
  );

  return c.json(
    Response.baseBodyObject({
      message: "Login success",
      result: {
        access_token: accessToken,
      },
      success: true,
      status: 200,
    }),
    200
  );
});

auth.post("/logout", authMiddleware, async (c) => {
  const accessToken = c.get("access_token");

  if (accessToken) {
    try {
      await verify(accessToken, env.ACCESS_TOKEN_SECRET, env.JWT_ALGORITHM);
      RevokedTokenStore.add(accessToken);
    } catch {}
  }

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

auth.post("/refresh", async (c) => {
  const refreshToken = getCookie(c, "refresh-token");

  if (!refreshToken) {
    throw new HTTPException(401, { message: "Refresh token not found" });
  }

  const revokedToken = RevokedTokenStore.get(refreshToken);

  if (revokedToken) {
    throw new HTTPException(401, {
      message: "Refresh token is expired or invalid",
    });
  }

  try {
    await verify(refreshToken, env.REFRESH_TOKEN_SECRET, env.JWT_ALGORITHM);
  } catch {
    throw new HTTPException(401, {
      message: "Refresh token is expired or invalid",
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
      exp: dateNow.add(30, "second").unix(),
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

export default auth;
