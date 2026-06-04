// src/utils/generateToken.js
// Utility function to generate a JWT (JSON Web Token) for authentication

import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  // Sign the token with:
  // - userId as the payload (what we store inside the token)
  // - JWT_SECRET as the key to sign it (kept secret on server)
  // - Expiration of 30 days
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
