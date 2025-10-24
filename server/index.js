// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import Contact from "./models/Contact.js";

dotenv.config();
const app = express();

// --------------------- MIDDLEWARE ---------------------
app.use(cors());
app.use(express.json());
app.use(helmet()); // Security headers

// Rate limiter: limit repeated requests to auth endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: "Too many requests from this IP, please try later.",
});
app.use("/login", limiter);
app.use("/register", limiter);

// --------------------- MONGODB CONNECTION ---------------------
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    console.log("MongoDB Connected to database");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// --------------------- SCHEMAS & MODELS ---------------------
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  price: String,
  selectedSize: String,
  selectedColor: String,
  email: String,
  phone: String,
  paymentMethod: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// --------------------- AUTH MIDDLEWARE ---------------------
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// --------------------- USER ROUTES ---------------------
// Registration
app.post(
  "/register",
  [
    body("name").isLength({ min: 3 }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 12); // stronger hashing
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.json({ message: "Registration successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Login
app.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h", algorithm: "HS256" }
      );

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
    const handleLogin = async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token); // save JWT
    window.location.href = "/dashboard"; // go to dashboard
  } else {
    alert(data.error || "Login failed");
  }
};
  }
  

  
);

// --------------------- CONTACT ROUTE ---------------------
app.post(
  "/contact",
  [
    body("name").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("phone").trim().escape(),
    body("message").trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, phone, message } = req.body;
      const newContact = new Contact({ name, email, phone, message });
      await newContact.save();
      res.json({ message: "Your message has been sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }


  
);

// --------------------- PROFILE ROUTE ---------------------
app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------- ORDER ROUTES ---------------------
app.post("/orders", authMiddleware, async (req, res) => {
  const { name, price, selectedSize, selectedColor, email, phone, paymentMethod } = req.body;
  if (!name || !price || !selectedSize || !selectedColor || !email || !phone || !paymentMethod)
    return res.status(400).json({ error: "All order details are required" });

  try {
    const newOrder = new Order({
      userId: req.user.id,
      name,
      price,
      selectedSize,
      selectedColor,
      email,
      phone,
      paymentMethod,
      status: "Pending",
    });
    await newOrder.save();
    res.json({ message: "Order saved successfully!", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});



