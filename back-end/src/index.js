const express = require("express");
const app = express();
// require("dotenv").config();
const cors = require("cors");

const sequelize = require("./util/database");

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

const userRoute = require("./routes/todoItem");

app.use("/todoItem", userRoute);

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("test");
    app.listen(process.env.EXTERNAL_PORT || 3002);
  } catch (error) {
    console.error(error);
  }
})();
