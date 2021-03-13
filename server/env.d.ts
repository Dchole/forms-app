declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    MONGODB_LOCAL: string;
    JWT_ACCESS_TOKEN: string;
    JWT_REFRESH_TOKEN: string;
  }
}
