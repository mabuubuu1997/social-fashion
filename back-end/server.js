require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Socket.io

const http = require('http').createServer(app)

//Routes
app.use('/api', require("./routes/authRouter"));
app.use('/api', require("./routes/postRouter"));
app.use('/api', require("./routes/adminRouter"));
app.use('/api', require("./routes/userRouter"));

//Connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(
  URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

const port = process.env.PORT || 7000;
http.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
