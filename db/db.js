const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(`${process.env.DATABASE_CONNECTION_PATH}`)
  .then(() => console.log("Connection is successfull"))
  .catch((err) => console.log(`Connection is not successfully - ${err}`));
