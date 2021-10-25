import { sign } from "jsonwebtoken";

import { TOKEN_SECRET } from "../config";

const createToken = (userId, username) => {
  return sign({ userId, username }, TOKEN_SECRET, { expiresIn: "30d" });
};

export default createToken;
