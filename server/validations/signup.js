import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().min(1).max(100).trim().required(),
  lastname: Joi.string().min(1).max(100).trim().required(),
  email: Joi.string().min(5).max(50).lowercase().trim().required(),
  password: Joi.string()
    .min(8)
    .max(72)
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message(
      "Password must contain one uppercase letter, one lowercase letter and one digit"
    )
    .required(),
});

export default signupSchema;
