import express from "express";
import path from "path";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname+'/../build/client')));
} else {
  app.use(express.static(path.join(__dirname+'/../client')));
}

app.get("/api/hola", (_, res) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  res.json({ date, time });
});

app.get('*', (_, res) => {
  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    console.log(path.join(__dirname+'/../build/client/index.html'));
    res.sendFile(path.join(__dirname+'/../build/client/index.html'));
  } else {
    res.sendFile(path.join(__dirname+'/../client/index.html'));
  }
});

app.listen(process.env.PORT || 3000);
