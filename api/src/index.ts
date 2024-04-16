import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";

const app = express();

const port = 8000;
const localhost = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(express.static("./src/public"));

app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server running at ${localhost}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

void run();