import pgpConstructor from "pg-promise";

const initOptions = {};

const pgp = pgpConstructor(initOptions);

export const db = pgp({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "nasko",
});
