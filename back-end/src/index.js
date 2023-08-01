const express = require("express");
const app = express();

const sequelize = require("./util/database");
const User = require("./models/todoItem");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  next();
});

const userRoute = require("./routes/todoItem");

app.use("/todoItem", userRoute);

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("test");
    app.listen(process.env.EXTERNAL_PORT || 3001);
  } catch (error) {
    console.error(error);
  }
})();
