import bycrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { knex } from "../database";
import { getUserByIdSchema } from "../schemas/user-id.schema";
import { createUserBodySchema } from "../schemas/user.schema";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const users = await knex("users").select();

    return { users };
  });

  app.get("/:id", async (request) => {
    const { id } = getUserByIdSchema.parse(request.params);

    const user = await knex("users").where("id", id).first();

    return { user };
  });

  app.post("/", async (request, reply) => {
    const { name, email, password } = createUserBodySchema.parse(request.body);

    const salts = 10;

    const hashedPassword = await bycrypt.hash(password, salts);

    await knex("users").insert({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    });

    return reply.status(201).send({
      message: "Usuário criado com sucesso!",
      status: 201,
    });
  });
}
