import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { formatDate } from "../helpers/format-date";
import { createMealBodySchema } from "../schemas/meal-create.schema";
import { getMealByIdSchema } from "../schemas/meal-id.schema";
import { updateMealBodySchema } from "../schemas/meal-update.schema";

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

  app.get("/:id", async (request, reply) => {
    const { id } = getMealByIdSchema.parse(request.params);

    // @ts-ignore
    const userId = request.user?.id;
    const meal = await knex("meals")
      .where({
        user_id: userId,
        id: id,
      })
      .select()
      .first();

    const formattedDate = formatDate(meal.date_time);

    const formattedMeal = {
      ...meal,
      date_time: formattedDate,
      is_diet: meal.is_diet === 1 ? true : false,
    };

    return reply.status(200).send({
      meal: formattedMeal,
      status: 200,
    });
  });

  app.get("/", async (request, reply) => {
    // @ts-ignore
    const userId = request.user?.id;
    const meals = await knex("meals").where("user_id", userId).select();

    const allMeals = meals.map((meal) => ({
      ...meal,
      date_time: formatDate(meal.date_time),
      is_diet: meal.is_diet === 1 ? true : false,
    }));

    return reply.status(200).send({
      meals: allMeals,
      status: 200,
    });
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = getMealByIdSchema.parse(request.params);

    // @ts-ignore
    const userId = request.user?.id;

    const meal = await knex("meals")
      .where({
        user_id: userId,
        id,
      })
      .select()
      .first();

    if (!meal) {
      return reply.status(404).send({
        message: "Refeição não encontrada!",
        status: 404,
      });
    }

    await knex("meals").where("id", id).del();

    reply.status(200).send({
      message: "Refeição excluída com sucesso!",
      status: 200,
    });
  });

  app.patch("/:id", async (request, reply) => {
    // Recuperar os dados do usuário
    // @ts-ignore
    const userId = request.user?.id;
    const { id } = getMealByIdSchema.parse(request.params);

    // Verificar se a refeição pertence ao usuário
    const meal = await knex("meals")
      .where({
        user_id: userId,
        id,
      })
      .select()
      .first();

    if (!meal) {
      return reply.status(404).send({
        message: "Refeição não encontrada!",
        status: 404,
      });
    }
    // Fazer a atualização da refeição
    const dataToUpdate = updateMealBodySchema.parse(request.body);

    let formattedDate;
    let updatedMeal;

    if (dataToUpdate.date_time) {
      const [datePart, timePart] = dataToUpdate.date_time.split(" ");
      const [day, month, year] = datePart.split("/").map(Number);
      const [hours, minutes] = timePart.split(":").map(Number);

      formattedDate = new Date(year, month - 1, day, hours, minutes);
      updatedMeal = {
        ...dataToUpdate,
        date_time: formattedDate,
      };
    }

    updatedMeal = {
      ...dataToUpdate,
      ...updatedMeal,
    };

    await knex("meals").where("id", id).update(updatedMeal);

    return reply.status(200).send({
      message: "Refeição atualizada com sucesso!",
      status: 200,
    });
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
}
