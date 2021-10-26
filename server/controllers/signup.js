import { hash } from "bcryptjs";

import { db } from "../config";
import { createToken, validate } from "../utils";
import { signupSchema } from "../validations";

const signup = async (body) => {
  await validate(signupSchema, body);

  const { name, lastname, email, password } = body;

  const { rowCount } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (rowCount !== 0) {
    const error = new Error("Email alredy in use");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await hash(password, 12);

  const userQuery = await db.query(
    "INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, email",
    [name, lastname, email, hashedPassword]
  );
  const user = userQuery.rows[0];

  if (userQuery.rows.length !== 1) {
    const error = new Error("Error inserting in the database");
    error.status = 400;
    throw error;
  }

  const token = createToken(user.user_id, user.email);

  return {
    code: 200,
    json: {
      message: "Ok",
      token,
    },
  };
};

export default signup;
