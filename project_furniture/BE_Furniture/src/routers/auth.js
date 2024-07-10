import express from "express";
import passport from "passport";
import { authPlatfrom, loginUser, registerUser } from "../controllers/auth";

const routerAuth = express.Router();

routerAuth.post("/register", registerUser);
routerAuth.post("/login", loginUser);

routerAuth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

routerAuth.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      console.log(profile);
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`http://localhost:8000/api/auth/logins/${req.user?.id}`);
  }
);

routerAuth.post("/logins", authPlatfrom);

export default routerAuth;
