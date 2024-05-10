import express from "express";
import {TrackApi, TrackFront} from "../type";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.post("/", auth, async (req, res, next) => {
  try {
    const trackPost = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      item: parseInt(req.body.item),
    };

    const track = new Track(trackPost);
    await track.save();

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

tracksRouter.get("/", async (req, res, next) => {
  const query = req.query.album as string;

  try {
    if (query) {
      if (!mongoose.Types.ObjectId.isValid(query)) {
        return res.status(422).send({error: "Not found album!!"});
      }
      const albumTracks = await Track.find({album: query}).sort({item: 1});
      return res.send(albumTracks);
    }

    const tracks: TrackApi[] = await Track.find();
    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.patch("/:id/togglePublished", auth, permit(["admin"]), async (req, res, next) => {
  const {id} = req.params;

  try {

    const track = await Track.findById({_id: id});

    if (!track) return res.status(400).send({error: "Not found track!"});

    track.isPublished = !track.isPublished;
    await track.save();
    return res.send(track);
  } catch (e) {
    next(e);
  }
});

tracksRouter.delete("/:id", auth, permit(["admin"]), async (req, res, next) => {
  const id = req.params.id;
  try {

    const track = await Track.findOne({_id: id});
    if (!track) {
      return res.status(404).send({error: "Not found track!"});
    }

    await Track.findOneAndDelete({_id: id});
    return res.send({message: "Deleted!", id: id});
  } catch (e) {
    next();
  }
});


export default tracksRouter;