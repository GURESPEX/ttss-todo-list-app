import { Hono } from "hono";
import authMiddleware from "../../middlewares/authMiddleware";
import { Response } from "../../utils/response";
import UserRepository, { User } from "../../repositories/user";
import { HTTPException } from "hono/http-exception";
import z from "zod";

const user = new Hono();

user.get("/me", authMiddleware, async (c) => {
  const me = c.get("me");

  const foundUser = await UserRepository.findByField("id", me.id);

  if (!foundUser) {
    throw new HTTPException(400, { message: `User ID ${me.id} not found` });
  }

  const foundUserWithOutHashedPassword: Omit<User, "hashed_password"> = {
    id: foundUser.id,
    username: foundUser.username,
    created_at: foundUser.created_at,
    updated_at: foundUser.updated_at,
  };

  return c.json(
    Response.baseBodyObject({
      message: "Get user data success",
      result: foundUserWithOutHashedPassword,
      success: true,
      status: 200,
    }),
    200
  );
});

user.put("/me", authMiddleware, async (c) => {
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

  const me = c.get("me");

  const foundUser = await UserRepository.findByField("id", me.id);

  if (!foundUser) {
    throw new HTTPException(400, { message: `User ID ${me.id} not found` });
  }

  const updatedUser = await UserRepository.update({
    id: foundUser.id,
    username: payload.username,
    hashed_password: Bun.password.hashSync(payload.password, {
      algorithm: "bcrypt",
      cost: 4,
    }),
  });

  if (!updatedUser) {
    throw new HTTPException(400, { message: `User ID ${me.id} not found` });
  }

  const updatedUserWithOutHashedPassword: Omit<User, "hashed_password"> = {
    id: updatedUser.id,
    username: updatedUser.username,
    created_at: updatedUser.created_at,
    updated_at: updatedUser.updated_at,
  };

  return c.json(
    Response.baseBodyObject({
      message: "Update user data success",
      result: updatedUserWithOutHashedPassword,
      success: true,
      status: 200,
    }),
    200
  );
});

user.delete("/me", authMiddleware, async (c) => {
  const me = c.get("me");

  const foundUser = await UserRepository.findByField("id", me.id);

  if (!foundUser) {
    throw new HTTPException(400, { message: `User ID ${me.id} not found` });
  }

  const deletedUser = await UserRepository.deleteByField("id", me.id);

  if (!deletedUser) {
    throw new HTTPException(400, { message: `User ID ${me.id} not found` });
  }

  const deletedUserWithOutHashedPassword: Omit<User, "hashed_password"> = {
    id: deletedUser.id,
    username: deletedUser.username,
    created_at: deletedUser.created_at,
    updated_at: deletedUser.updated_at,
  };

  return c.json(
    Response.baseBodyObject({
      message: "Delete user data success",
      result: deletedUserWithOutHashedPassword,
      success: true,
      status: 200,
    }),
    200
  );
});

export default user;
