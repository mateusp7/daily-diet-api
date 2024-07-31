import { FastifyInstance, FastifyRequest } from "fastify";
import { knex } from "../database";
import { createMealBodySchema } from "../schemas/meals-create.schema";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({
        message: "Usuário não autenticado",
        status: 401,
      });
    }
  });

  app.post("/", async (request, reply) => {
    const { name, description, date_time, is_diet } =
      createMealBodySchema.parse(request.body);

    // @ts-ignore
    const userId = request.user.id;

    const [datePart, timePart] = date_time.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    const formattedDate = new Date(year, month - 1, day, hours, minutes);

    // const teste = new Intl.DateTimeFormat("pt-BR", {
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // }).format(formattedDate);

    // console.log("formattedDate", formattedDate);
    // console.log("INTL formattedDate", teste);

    const meal = {
      id: crypto.randomUUID(),
      name,
      description,
      date_time: formattedDate,
      is_diet,
      user_id: userId,
      created_at: new Date(),
    };

    await knex("meals").insert(meal);

    return reply.status(201).send({
      message: "Refeição criada com sucesso!",
      status: 201,
    });
  });

  app.get("/", async (request: FastifyRequest) => {
    const meals = await knex("meals").select();
    // @ts-ignore
    const userId = request.user?.id;

    return { meals };
  });
}
