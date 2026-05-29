import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthSchema from "../models/AuthSchema.mjs";

export default function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          // CHECK IF USER EXISTS
          let user = await AuthSchema.findOne({GoogleId: profile.id});

          // CREATE USER IF NOT EXISTS
          if (!user) {
            user = await AuthSchema.create({
              GoogleId: profile.id,
              FullName: profile.displayName,
              Email: profile.emails[0].value,
              Avatar: profile.photos[0].value,
            });
          }

          done(null, user);

        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}