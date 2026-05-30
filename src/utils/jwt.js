import jwt from "jsonwebtoken";

const generateToken = (id, email) => {
  // Keep the token payload small and expire sessions after one hour.
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export default generateToken
