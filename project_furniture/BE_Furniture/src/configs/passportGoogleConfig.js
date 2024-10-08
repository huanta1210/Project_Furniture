import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          googleId: profile.id,
        });

        if (existingUser) {
          console.log("Existing user found");
          return done(null, existingUser, accessToken);
        } else {
          console.log("New user creation");
          const newUser = await User.create({
            googleId: profile.id,
            userName: profile.displayName,
            email: profile.emails[0].value,
            photos: profile.photos[0].value,
            provider: profile.provider,
            isGoogleUser: true,
          });
          return done(null, newUser, accessToken);
        }
      } catch (error) {
        console.error("Error during authentication", error);
        return done(error, null);
      }
    }
  )
);
