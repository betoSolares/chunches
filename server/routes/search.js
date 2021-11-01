import { Router } from "express";
import multer from "multer";

import { search } from "../controllers";
import { catchError } from "../utils";

const upload = multer({
  dest: `uploads`,
});

const router = new Router();

router.post(
  "/api/search",
  upload.single("image"),
  catchError(async (req, res) => {
    const { file } = req;
    const { code, json } = await search(file);
    res.status(code).json(json);
  })
);

export default router;
