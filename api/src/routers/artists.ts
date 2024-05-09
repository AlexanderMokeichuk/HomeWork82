import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistApi, ArtistFront} from "../type";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Album from "../models/Album";
import albumsRouter from "./albums";

const artistsRouter = express.Router();

artistsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
  try {
    const postArtist: ArtistFront = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
      isPublished: false,
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

artistsRouter.delete('/:id', auth, async (req, res, next) => {
  const id = req.params.id;
  const user = (req as RequestWithUser).user!;
  try {

    const album = await Artist.find({_id: id});

    if (user.role === "administrator") {
      await Artist.findOneAndDelete({_id: id});
      return res.send({ message: 'Deleted!', id: id });
    }


    return res.status(403).send({ error: "Access is denied!!" });
  } catch (e) {
    next();
  }
});

export default artistsRouter;