const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

// Connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Support Desk API" });
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Set it to production, mate!" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
