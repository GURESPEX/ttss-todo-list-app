import { Hono } from "hono";
import z from "zod";
import { HTTPException } from "hono/http-exception";
import UserRepository, { User } from "../../repositories/user";
import { Response } from "../../utils/response";

const register = new Hono();

register.post("/register", async (c) => {
  const { data: payload, error } = z
    .object({
      username: z
        .string()
        .max(32)
        .regex(/^[A-z0-9_.]+$/),
      password: z.string().min(8),
    })
    .safeParse(c.req.json());

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
    username: createdUser.id,
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

export default register;
