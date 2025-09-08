const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/usersRouter");
const chatRouter = require("./routes/chatRouter");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/chat", chatRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: "Error: " + err.message });
});

app.listen(8000, () => console.log("Listening on port 8000."));
