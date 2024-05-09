import express from "express";
import {TrackApi, TrackFront} from "../type";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Album from "../models/Album";
import artistsRouter from "./artists";

const tracksRouter = express.Router();

tracksRouter.post("/", auth, async (req, res, next) => {
  try {
    const trackPost: TrackFront = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      item: req.body.item,
      isPublished: false,
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

tracksRouter.get('/', async (req, res, next) => {
  const query = req.query.album as string;

  try {
    if (query) {
      if (!mongoose.Types.ObjectId.isValid(query)) {
        return res.status(422).send({ error: 'Not found album!!' });
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

tracksRouter.delete('/:id', auth, async (req, res, next) => {
  const id = req.params.id;
  const user = (req as RequestWithUser).user!;
  try {

    const album = await Track.find({_id: id});

    if (user.role === "administrator") {
      await Track.findOneAndDelete({_id: id});
      return res.send({ message: 'Deleted!', id: id });
    }


    return res.status(403).send({ error: "Access is denied!!" });
  } catch (e) {
    next();
  }
});


export default tracksRouter;