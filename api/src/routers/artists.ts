import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistApi, ArtistFront} from "../type";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.post("/", auth, imagesUpload.single("image"),  async (req, res, next) => {
  try {

    const postArtist = {
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

artistsRouter.patch("/:id/togglePublished", auth, permit(["admin"]), async (req, res, next) => {
  const {id} = req.params;
  try {
    const artist = await Artist.findById({_id: id});

    if (!artist) return res.status(400).send({error: "Not found artist!"});

    artist.isPublished = !artist.isPublished;
    await artist.save();
    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistsRouter.delete("/:id", auth, permit(["admin"]), async (req, res, next) => {
  const id = req.params.id;
  try {

    const artist = await Artist.findOne({_id: id});
    if (!artist) {
      return res.status(404).send({error: "Not found artist!"});
    }

    await Artist.findOneAndDelete({_id: id});
    return res.send({ message: 'Deleted!', id: id });
  } catch (e) {
    next();
  }
});

export default artistsRouter;