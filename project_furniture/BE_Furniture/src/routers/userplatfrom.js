import express from "express";
import passport from "passport";
import { authPlatfrom } from "../controllers/authPlatfrom";

const routerUserPlatform = express.Router();

routerUserPlatform.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

routerUserPlatform.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      console.log(profile);
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`http://localhost:8000/api/login/${req.user?.id}`);
  }
);

routerUserPlatform.post("/login", authPlatfrom);

export default routerUserPlatform;
