import "server-only";
import { SECRET_COOKIE_PASSWORD } from "@/lib/constants.server";
import { SessionOptions } from "iron-session";

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
