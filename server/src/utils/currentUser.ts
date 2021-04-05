import { AuthenticationError } from "apollo-server-errors";
import { ExpressContext } from "apollo-server-express";
import { verify } from "jsonwebtoken";

const currentUser = (req: ExpressContext["req"]) => {
  const token = req.headers.authorization?.split(" ")[1] || "";

  if (!token) throw new AuthenticationError("Unauthenticated!");

  const payload: any = verify(token, process.env.JWT_ACCESS_TOKEN!);
  return payload.uid;
};

export default currentUser;
