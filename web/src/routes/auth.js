import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * POST /api/login
 * (Note: we write "/login" here because the router is mounted at "/api")
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email & password required" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT user_id, full_name, email, password_hash FROM users WHERE email = ? AND is_active = 1 LIMIT 1",
      [email]
    );
    if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const u = rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { uid: u.user_id, email: u.email, name: u.full_name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: u.user_id, name: u.full_name, email: u.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
