require("dotenv").config();
const express = require("express");
const app = express();
const connecDB = require("./config/db");
const userRouter = require("./routes/user.route");
const PORT = process.env.PORT;
connecDB();

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running is ${PORT}`);
});
