import { Hono } from "hono";
import login from "./controllers/login";
import logout from "./controllers/logout";
import register from "./controllers/register";
import todo from "./controllers/todo";
import user from "./controllers/user";
import { HTTPException } from "hono/http-exception";
import { Response } from "./utils/response";
import { cors } from "hono/cors";
import refresh from "./controllers/refresh";

const app = new Hono().basePath("/api");

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.route("/", login);
app.route("/", logout);
app.route("/", register);
app.route("/", refresh);
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
