import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistApi, ArtistFront} from "../type";

const artistsRouter = express.Router();

artistsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({error: "Incorrect data"});
  }

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