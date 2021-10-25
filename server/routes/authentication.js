import { Router } from "express";

import { signup } from "../controllers";
import { catchError } from "../utils";

const router = new Router();

router.post(
  "/api/login",
  catchError(async (_, res) => {
    res.json({ message: "Ok" });
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
