import bycrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { knex } from "../database";
import { loginUserBodySchema } from "../schemas/user-create.schema";
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

    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    };

    await knex("users").insert(user);

    const token = app.jwt.sign({
      id: user.id,
      name,
      email,
      expiresIn: 60 * 60 * 24 * 7, // 1 semana
    });

    return reply.status(201).send({
      message: "Usuário criado com sucesso!",
      token,
      status: 201,
    });
  });

  app.post("/login", async (request, reply) => {
    // Pegar os dados do usuário
    const { email, password } = loginUserBodySchema.parse(request.body);

    // Verificar se o usuário existe no sistema
    const user = await knex("users").where("email", email).first();

    if (!user) {
      return reply.status(404).send({
        message: "Usuário não encontrado!",
        status: 404,
      });
    }

    // Verificar se a senha do usuário é correta
    const descryptedPassord = await bycrypt.compare(password, user.password);
    if (!descryptedPassord) {
      return reply.status(404).send({
        message: "Usuário ou senha estão incorretos!",
        status: 404,
      });
    }

    // Gero um token para o usuário
    const token = app.jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      expiresIn: 60 * 60 * 24 * 7, // 1 semana
    });

    return reply.status(200).send({
      message: `Seja bem vindo ao sistema! - ${user.name}`,
      token,
      status: 200,
    });
  });
}
