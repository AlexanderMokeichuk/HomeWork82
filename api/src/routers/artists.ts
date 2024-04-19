import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistApi, ArtistFront} from "../type";
import mongoose from "mongoose";

const artistsRouter = express.Router();

artistsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  try {
    const postArtist: ArtistFront = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
    };

    const artist = new Artist(postArtist);
    await artist.save();

    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

artistsRouter.get("/", async (_req, res, next) => {
  try {
    const artists: ArtistApi[] = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

export default artistsRouter;