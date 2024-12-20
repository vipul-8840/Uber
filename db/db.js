const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.DB_Connect)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });
}

module.exports = connectToDb;
