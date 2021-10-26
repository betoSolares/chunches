import { compare } from "bcryptjs";

import { db } from "../config";
import { createToken, validate } from "../utils";
import { loginSchema } from "../validations";

const login = async (body) => {
  await validate(loginSchema, body);

  const { email, password } = body;

  const { rowCount, rows } = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (rowCount !== 1) {
    const error = new Error("Invalid email or password");
    error.status = 400;
    throw error;
  }

  const user = rows[0];
  const equals = await compare(password, user.password);

  if (!equals) {
    const error = new Error("Invalid email or password");
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

export default login;
