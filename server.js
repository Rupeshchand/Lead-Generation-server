import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedUrls = ["http://localhost:5173", "https://lead-generation-coral.vercel.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedUrls.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.post("/api/submit-lead", async (req, res) => {
  const { name, email, company, message } = req.body;

  //Name validation
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: "Enter valid name" });
  }

  //Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if(!email || !emailRegex.test(email)){
    return res.status(400).json({message: "Enter valid email"})
  }
  try {
    await axios.post(process.env.N8N_WEBHOOK_URL, {
      name,
      email,
      company,
      message,
    });
    res.status(200).json({ message: "Data submitted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Failed to send lead data to n8n" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
