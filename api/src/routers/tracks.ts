import express from "express";
import {TrackApi, TrackFront} from "../type";
import Track from "../models/Track";
import mongoose from "mongoose";

const tracksRouter = express.Router();

tracksRouter.post("/", async (req, res, next) => {
  if (!req.body.name || !req.body.album || !req.body.duration) {
    return res.status(400).json({error: "Incorrect data"});
  }
  try {
    const trackPost: TrackFront = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
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
      const albumTracks: TrackApi[] = await Track.find({album: query});
      return res.send(albumTracks);
    }

    const tracks: TrackApi[] = await Track.find();
    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});


export default tracksRouter;