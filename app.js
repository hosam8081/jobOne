require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

const jobsRouter = require("./routes/jobs")
const authRouter = require("./routes/auth")
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

app.use(cors());
// app.use(express.static(path.join(__dirname, '../client/public')));

app.use(express.json());
// extra packages

app.use("/api/v1/jobs", jobsRouter)
app.use("/api/v1/auth", authRouter)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
// routes
app.get('/hello', (req, res) => {
  res.json({hello:"hosam"})
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
