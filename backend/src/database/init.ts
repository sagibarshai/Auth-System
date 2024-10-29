import { Pool } from "pg";
import { createUsersTableIfNotExists } from "./tables/users";

export const pgClient = new Pool({
  user: "postgres",
  password: "postgres",
  database: "MeetAround",
  port: 5432,
  host: "db",
  ssl: false,
});
pgClient.on("connect", async () => {
  await createUsersTableIfNotExists();
});
