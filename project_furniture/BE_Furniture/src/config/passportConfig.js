import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import UserPlatfrom from "../models/UserPlatfrom";
import User from "../models/User";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auths/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (profile?.id) {
          const existingUser = await UserPlatfrom.findOne({
            googleId: profile.id,
          });
          console.log(existingUser);
          if (existingUser) {
            const user = await User.findOne({
              userplatforms: existingUser._id,
            });

            if (user) {
              return done(null, user);
            } else {
              console.error("User not found for existing UserPlatform");
              return done(null, false, {
                message: "User not found for existing UserPlatform",
              });
            }
          } else {
            const newUserPlatform = await UserPlatfrom.create({
              googleId: profile.id,
              displayName: profile.displayName,
              names: profile.name,
              emails: profile.emails.value,
              photos: profile.photos.value,
              provider: profile.provider,
            });
            console.log(newUserPlatform);
            const newUser = await User.findByIdAndUpdate(
              { _id: newUserPlatform.userId },
              { $addToSet: { userplatfroms: newUserPlatform._id } },
              { new: true }
            );
            console.log("New user created");
            return done(null, newUser);
          }
        }
      } catch (error) {
        console.error("Error during authentication", error);
        return done(error, null);
      }
    }
  )
);
