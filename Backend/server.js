const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

dotenv.config({
  path: "./config.env",
});

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", IndexRoute);

app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;
JWT_SECRET_KEY =
  "dded0950b34057de3bc5510bc81835ac570164a144936b72a1e7074f0f8027b1";

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error : ${err}`);

  server.close(() => process.exit(1));
});

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
