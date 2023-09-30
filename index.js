const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const urlRouter = require("./routes/url");
const connectToDB = require("./connection");
const URL = require("./models/url");
require("dotenv").config();
connectToDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(`Mongo Error : ${err}`);
  });
app.use(express.json());
app.use(cors());
app.use("/url", urlRouter);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
});
app.listen(PORT, () => {
  console.log("App is listening");
});
