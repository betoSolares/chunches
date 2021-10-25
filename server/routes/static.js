import { Router } from "express";
import path from "path";

import { STATIC_PATH } from "../config";

const html = path.join(__dirname, "..", STATIC_PATH, "index.html");
const router = new Router();

router.get("*", (_, res) => {
  res.sendFile(html);
});

export default router;
