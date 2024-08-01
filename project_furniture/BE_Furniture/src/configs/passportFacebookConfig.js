import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8000/api/auth/facebook/callback",
      profileFields: ["id", "name", "emails", "displayName"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existingUser = await User.findOne({
        facebookId: profile.id,
      });

      if (existingUser) {
        console.log("Existing user found");
        return cb(null, existingUser);
      } else {
        console.log("New user creation");
        const newUser = await User.create({
          facebookId: profile.id,
          userName: profile.displayName,
          email: profile.emails[0].value,
          photos: profile.photos[0].value,
          provider: profile.provider,
          isFacebookUser: true,
        });
        console.log("New user created:", newUser);
        return cb(null, newUser);
      }
    }
  )
);
