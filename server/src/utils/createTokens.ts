import { sign } from "jsonwebtoken";

export const createAccessToken = (uid: string) =>
  sign({ uid }, process.env.JWT_ACCESS_TOKEN!, { expiresIn: "10m" });

export const createRefreshToken = (uid: string) =>
  sign({ uid }, process.env.JWT_REFRESH_TOKEN!, { expiresIn: "7d" });
