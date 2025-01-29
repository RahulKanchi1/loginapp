const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURL = process.env.URL;
const jwt_key = process.env.MYKEY;

let db;
app.use(express.json());
app.use(cors({ origin:  "http://localhost:3000", methods: ["GET", "POST"] }));

async function connectToMongo() {
  try {
    const client = new MongoClient(mongoURL ,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // Ensure TLS is enabled
});
    await client.connect();
    db = client.db("example");
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const logindata = db.collection("userdata");
    const existingUser = await logindata.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await logindata.insertOne({ email, password: hashedPassword });

    const token = jwt.sign({ email }, jwt_key, { expiresIn: "1h" });
    res.status(201).json({ token, message: "User created successfully" });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const logindata = db.collection("userdata");

    const user = await logindata.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, jwt_key, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error in /login route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
});
