import { AuthenticationError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";

const currentUser = (token: string) => {
  // if (!token) throw new AuthenticationError("Unauthenticated!");
  return "6069b9eeaf57310ad9ff883a";
  // const payload: any = verify(token, process.env.JWT_ACCESS_TOKEN!);
  // return payload.uid;
};

export default currentUser;
