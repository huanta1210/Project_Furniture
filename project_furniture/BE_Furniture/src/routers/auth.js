import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  authFacebook,
  authGoogle,
  getAuth,
  loginUser,
  registerUser,
} from "../controllers/auth";
import dotenv from "dotenv";
dotenv.config();

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
    passport.authenticate("google", (err, user, profile) => {
      req.authInfo = profile;
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    const accessToken = req.authInfo;

    if (accessToken) {
      const token = jwt.sign(
        {
          _id: req.user._id,
          role: req.user.role,
          userName: req.user.userName,
          email: req.user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.redirect(`http://localhost:5173/google/callback?token=${token}`);
    } else {
      res.redirect("http://localhost:5173/google/login?error=token");
    }
  }
);

routerAuth.post("/login/google", authGoogle);

// router facebook
routerAuth.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
    authType: "reauthenticate",
  })
);

routerAuth.get(
  "/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, user, profile) => {
      req.authInfo = profile;
      req.user = user;

      next();
    })(req, res, next);
  },
  (req, res) => {
    const accessToken = req.authInfo;
    if (accessToken) {
      const token = jwt.sign(
        {
          _id: req.user._id,
          role: req.user.role,
          userName: req.user.userName,
          email: req.user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.redirect(`http://localhost:5173/facebook/callback?token=${token}`);
    } else {
      res.redirect("http://localhost:5173/facebook/login?error=token");
    }
  }
);
routerAuth.post("/login/facebook", authFacebook);

routerAuth.get("/get-auth", getAuth);

export default routerAuth;
