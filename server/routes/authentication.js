import { Router } from "express";

import { login, signup } from "../controllers";
import { catchError } from "../utils";

const router = new Router();

router.post(
  "/api/login",
  catchError(async (req, res) => {
    const { body } = req;
    const { code, json } = await login(body);
    res.status(code).json(json);
  })
);

router.post(
  "/api/signup",
  catchError(async (req, res) => {
    const { body } = req;
    const { code, json } = await signup(body);
    res.status(code).json(json);
  })
);

export default router;
