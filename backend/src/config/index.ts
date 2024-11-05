import "dotenv/config";

export const config = {
  PORT: 4000,
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
};
