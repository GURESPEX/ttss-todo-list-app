import { Hono } from "hono";
import todo from "./controllers/todo";
import user from "./controllers/user";
import { HTTPException } from "hono/http-exception";
import { Response } from "./utils/response";
import { cors } from "hono/cors";
import auth from "./controllers/auth";

const app = new Hono().basePath("/api");

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.route("/", auth);
app.route("/", todo);
app.route("/", user);

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(
      Response.baseBodyObject({
        message: error.message,
        status: error.status,
        success: false,
      }),
      error.status
    );
  }

  return c.json(
    Response.baseBodyObject({
      message: "Unknown exception",
      status: 500,
      success: false,
    }),
    500
  );
});

export default {
  port: 5001,
  fetch: app.fetch,
};
