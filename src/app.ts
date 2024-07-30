import fastify from "fastify";
import { usersRoutes } from "./routes/users";
import jwt from "@fastify/jwt";
import { env } from "./env";


export const app = fastify();

app.register(jwt, {
  secret: env.SECRET_JWT
});
app.register(usersRoutes, {
  prefix: "/users",
});
