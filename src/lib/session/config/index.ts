"server only";
import { SessionOptions } from "iron-session";

const SECRET_COOKIE_PASSWORD = process.env.SECRET_COOKIE_PASSWORD;

if (!SECRET_COOKIE_PASSWORD) {
  throw new Error(
    "SECRET_COOKIE_PASSWORD is not set, please set in environment variables"
  );
}

export const sessionOptions: SessionOptions = {
  password: SECRET_COOKIE_PASSWORD,
  cookieName: "siwe",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
    maxAge: 7200,
    httpOnly: true,
  },
};
