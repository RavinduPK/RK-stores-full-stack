// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --------------------- MONGODB CONNECTION ---------------------
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    console.log("MongoDB Connected to cbc-bc database");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// --------------------- USER SCHEMA & MODEL ---------------------
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// --------------------- ORDER SCHEMA & MODEL ---------------------
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
  const token = req.headers["authorization"]?.split(" ")[1]; // Expect "Bearer token"
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// --------------------- USER ROUTES ---------------------

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------- CONTACT ROUTE ---------------------
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message)
      return res.status(400).json({ error: "All fields are required" });

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

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
  try {
    const { name, price, selectedSize, selectedColor, email, phone, paymentMethod } = req.body;

    if (!name || !price || !selectedSize || !selectedColor || !email || !phone || !paymentMethod) {
      return res.status(400).json({ error: "All order details are required" });
    }

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
