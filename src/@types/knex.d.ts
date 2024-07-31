declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: string;
    };
    meals: {
      id: string;
      name: string;
      description: string;
      date_time: string;
      is_diet: boolean;
      user_id: string;
      created_at: string;
    };
  }
}
