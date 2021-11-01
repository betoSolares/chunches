import { spawn } from "child_process";
import fs from "fs";

import { SEARCH_ENDPOINT, SEARCH_KEY } from "../config";

const pythonPromise = (args) => {
  return new Promise((resolve, reject) => {
    const python = spawn("python", [`${__dirname}/search.py`, ...args]);

    python.stdout.on("data", (data) => {
      resolve(data.toString());
    });

    python.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });
};

const search = async (file) => {
  const { path } = file;

  const python = await pythonPromise([SEARCH_ENDPOINT, SEARCH_KEY, path]);
  const data = JSON.parse(python);

  await fs.promises.unlink(file.path);

  return {
    code: 200,
    json: {
      message: "Ok",
      data,
    },
  };
};

export default search;
