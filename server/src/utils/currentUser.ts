import { AuthenticationError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";

const currentUser = (token: string) => {
  if (!token) throw new AuthenticationError("Unauthenticated!");

  const payload: any = verify(token, process.env.JWT_ACCESS_TOKEN!);
  return payload.uid;
};

export default currentUser;
