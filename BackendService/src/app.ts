import express from "express";
import mongoose from "mongoose";
import router from "./routes";
const app = express();
const port = 3000;

app.use(express.json());

const connectionString =
  "mongodb+srv://Nimish:23O8oj4mLw8W0RIh@hackathoncluster.mnld5.mongodb.net/BackendData?retryWrites=true&w=majority";

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose
  .connect(connectionString, options)
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router());
