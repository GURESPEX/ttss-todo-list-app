import { Hono } from "hono";
import login from "./controllers/login";
import register from "./controllers/register";
import todo from "./controllers/todo";
import user from "./controllers/user";
import { HTTPException } from "hono/http-exception";
import { Response } from "./utils/response";

const app = new Hono().basePath("/api");

app.route("/", login);
app.route("/", register);
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

export default app;
