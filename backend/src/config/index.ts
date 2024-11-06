import "dotenv/config";

if (!process.env.JWT_KEY) {
  throw new Error("PASSWORD_SALT must be define");
}
if (!process.env.COOKIE_SECRET) {
  throw new Error("COOKIE_SECRET must be define");
}
if (!process.env.EMAIL_ACCESS_KEY) {
  throw new Error("EMAIL_ACCESS_KEY must be define");
}
if (!process.env.EMAIL_ADDRESS) {
  throw new Error("EMAIL_ADDRESS must be define");
}

if (!process.env.POSTGRES_USER) {
  throw new Error("POSTGRES_USER must be define");
}
if (!process.env.POSTGRES_PASSWORD) {
  throw new Error("POSTGRES_PASSWORD must be define");
}
if (!process.env.POSTGRES_DATABASE) {
  throw new Error("POSTGRES_DATABASE must be define");
}
if (!process.env.POSTGRES_PORT) {
  throw new Error("POSTGRES_PORT must be define");
}
if (!process.env.POSTGRES_DB) {
  throw new Error("POSTGRES_DB must be define");
}
if (!process.env.POSTGRES_HOST) {
  throw new Error("POSTGRES_HOST must be define");
}

export const config = {
  PORT: Number(process.env.PORT),
  PROD: Boolean(process.env.NODE_ENV),
  BASE_URL: Boolean(process.env.NODE_ENV) ? "https://ProductionDomainUrl.com" : "http://localhost",
  MAIL: {
    FROM: "noreply@emailverifyee.com",
    SERVICE: "Gmail",
    HOST: "smtp.gmail.com",
    SECURE: true,
    PORT: 465,
    AUTH: {
      USER: process.env.EMAIL_ADDRESS,
      PASS: process.env.EMAIL_ACCESS_KEY,
    },
  },
  POSTGRES: {
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DATABASE: process.env.POSTGRES_DATABASE,
    PORT: Number(process.env.POSTGRES_PORT),
    HOST: process.env.POSTGRES_HOST,
    SSL: false,
  },
};
