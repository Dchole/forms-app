declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "production" | "development" | "test";
    MONGODB_URI: string;
    MONGODB_LOCAL: string;
    JWT_ACCESS_TOKEN: string;
    JWT_REFRESH_TOKEN: string;
  }
}
