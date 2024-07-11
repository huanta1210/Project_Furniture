import express from "express";
import passport from "passport";
import {
  authFacebook,
  authGoogle,
  loginUser,
  registerUser,
} from "../controllers/auth";

const routerAuth = express.Router();

routerAuth.post("/register", registerUser);
routerAuth.post("/login", loginUser);
// router google
routerAuth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
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
    res.redirect(`http://localhost:5173/login/google/${req.user?.id}`);
  }
);

routerAuth.post("/login/google", authGoogle);

// router facebook
routerAuth.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
    prompt: "select_account",
  })
);

routerAuth.get(
  "/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.user = profile;
      console.log(profile);
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`http://localhost:5173/login/facebook/${req.user?.id}`);
  }
);
routerAuth.post("/login/facebook", authFacebook);

export default routerAuth;
