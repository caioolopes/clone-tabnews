import database from "infra/database";
import { ValidationError } from "infra/errors.js";

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);
  await validateUniquename(userInputValues.username);

  const neWUser = await runInsertQuery(userInputValues);
  return neWUser;

  async function validateUniqueEmail(email) {
    const results = await database.query({
      text: `
       SELECT 
       email
       FROM
         users
       WHERE
         LOWER(email) = LOWER($1)
          
        ;`,
      values: [email],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar o cadastro.",
      });
    }
  }

  async function validateUniquename(username) {
    const results = await database.query({
      text: `
       SELECT 
       username
       FROM
         users
       WHERE
         LOWER(username) = LOWER($1)
          
        ;`,
      values: [username],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "O nome usuario informado já está sendo utilizado.",
        action: "Utilize outro nome usuario para realizar o cadastro.",
      });
    }
  }

  async function runInsertQuery(userInputValues) {
    const results = await database.query({
      text: `
        INSERT INTO 
          users (username, email, password) 
        VALUES 
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });

    return results.rows[0];
  }
}
const user = {
  create,
};

export default user;
