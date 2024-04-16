import express from "express";
import Singer from "../models/ Singer";
import {imagesUpload} from "../multer";
import {SingerFront} from "../type";

const artistsRouter = express.Router();

artistsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({error: "Incorrect data"});
  }

  try {
    const postSinger: SingerFront = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
    };

    const singer = new Singer(postSinger);
    await singer.save();

    return res.send({
      ...postSinger,
      _id: singer._id
    });
  } catch (e) {
    next(e);
  }
});

artistsRouter.get("/", async (_req, res, next) => {
  try {
    const singer = await Singer.find();
    return res.send(singer);
  } catch (e) {
    next(e);
  }
});

export default artistsRouter;