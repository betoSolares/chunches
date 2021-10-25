import express from "express";
import path from "path";

import { PORT, STATIC_PATH } from "./config";
import { authentication, internalError, notFound, staticRoute } from "./routes";

const app = express();
const staticPath = path.join(__dirname, STATIC_PATH);

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authentication);
app.use(staticRoute);
app.use(notFound);
app.use(internalError);

app.listen(PORT);
