import { Hono } from "hono";
import authMiddleware from "../../middlewares/authMiddleware";
import z from "zod";
import { HTTPException } from "hono/http-exception";
import { Response } from "../../utils/response";
import TodoRepository from "../../repositories/todo";

const todo = new Hono();

todo.get("/todos", authMiddleware, async (c) => {
  const me = c.get("me");

  const foundTodos = await TodoRepository.findAllByField("id", me.id);

  return c.json(
    Response.baseBodyObject({
      message: `Get ${foundTodos.length} todos success`,
      result: foundTodos,
      success: true,
      status: 200,
    }),
    200
  );
});

todo.get("/todos/:id", authMiddleware, async (c) => {
  const { data: id, error } = z.string().safeParse(c.req.param().id);

  if (error) {
    throw new HTTPException(400, { message: error.message });
  }

  const foundTodo = await TodoRepository.findByField("id", id);

  if (!foundTodo) {
    throw new HTTPException(400, { message: `Todo ID ${id} not found` });
  }

  const me = c.get("me");

  if (foundTodo.user_id !== me.id) {
    throw new HTTPException(403, {
      message: `You don't have permission to access this todo`,
    });
  }

  return c.json(
    Response.baseBodyObject({
      message: "Get todo success",
      result: foundTodo,
      success: true,
      status: 200,
    }),
    200
  );
});

todo.post("/todos", authMiddleware, async (c) => {
  const { data: payload, error } = z
    .object({
      title: z.string().optional(),
      content: z.string(),
    })
    .safeParse(c.req.json());

  if (error) {
    throw new HTTPException(400, { message: error.message });
  }

  const me = c.get("me");

  const createdTodo = await TodoRepository.create({
    ...payload,
    user_id: me.id,
  });

  return c.json(
    Response.baseBodyObject({
      message: "Create todo success",
      result: createdTodo,
      success: true,
      status: 200,
    }),
    200
  );
});

todo.put("/todos/:id", authMiddleware, async (c) => {
  const { data: payload, error } = z
    .object({
      id: z.string(),
      title: z.string().optional(),
      content: z.string(),
      is_done: z.boolean(),
    })
    .safeParse({ id: c.req.param().id });

  if (error) {
    throw new HTTPException(400, { message: error.message });
  }

  const foundTodo = await TodoRepository.findByField("id", payload.id);

  if (!foundTodo) {
    throw new HTTPException(400, {
      message: `Todo ID ${payload.id} not found`,
    });
  }

  const me = c.get("me");

  if (foundTodo.user_id !== me.id) {
    throw new HTTPException(403, {
      message: `You don't have permission to update this todo`,
    });
  }

  const updatedTodo = await TodoRepository.update({
    ...payload,
    user_id: me.id,
  });

  if (!updatedTodo) {
    throw new HTTPException(400, {
      message: `Todo ID ${payload.id} not found`,
    });
  }

  return c.json(
    Response.baseBodyObject({
      message: "Update todo success",
      result: updatedTodo,
      success: true,
      status: 200,
    }),
    200
  );
});

todo.delete("/todos/:id", authMiddleware, async (c) => {
  const { data: id, error } = z.string().safeParse({ id: c.req.param().id });

  if (error) {
    throw new HTTPException(400, { message: error.message });
  }

  const foundTodo = await TodoRepository.findByField("id", id);

  if (!foundTodo) {
    throw new HTTPException(400, {
      message: `Todo ID ${id} not found`,
    });
  }

  const me = c.get("me");

  if (foundTodo.user_id !== me.id) {
    throw new HTTPException(403, {
      message: `You don't have permission to update this todo`,
    });
  }

  const deletedTodo = await TodoRepository.deleteByField("id", id);

  if (!deletedTodo) {
    throw new HTTPException(400, {
      message: `Todo ID ${id} not found`,
    });
  }

  return c.json(
    Response.baseBodyObject({
      message: "Delete todo success",
      result: deletedTodo,
      success: true,
      status: 200,
    }),
    200
  );
});

export default todo;
