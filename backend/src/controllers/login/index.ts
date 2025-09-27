import { Hono } from "hono";
import z from "zod";
import { HTTPException } from "hono/http-exception";
import UserRepository from "../../repositories/user";
import { setCookie } from "hono/cookie";
import dayjs from "dayjs";
import { sign } from "hono/jwt";
import env from "../../env";
import { Response } from "../../utils/response";

const login = new Hono();

login.post("/login", async (c) => {
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
    env.ACCESS_TOKEN_SECRET,
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
      exp: dateNow.add(5, "minute").unix(),
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

export default login;
