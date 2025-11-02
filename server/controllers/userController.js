import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "fellas_default_secret";
const USERS_PATH = path.resolve("server", "data", "users.json");

const readUsers = () => JSON.parse(fs.readFileSync(USERS_PATH, "utf-8"));
const writeUsers = (u) =>
  fs.writeFileSync(USERS_PATH, JSON.stringify(u, null, 2));

export const register = (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const users = readUsers();
    if (users.find((x) => x.email === email)) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = bcrypt.hashSync(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashed };
    users.push(newUser);
    writeUsers(users);
    // do not return password
    const { password: _p, ...safe } = newUser;
    res.status(201).json({ message: "Registered", user: safe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing token" });
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
