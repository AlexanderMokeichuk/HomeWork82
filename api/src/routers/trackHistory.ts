import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Album from "../models/Album";
import {AlbumArtistData} from "../type";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user!;

  try {
    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      artist: req.body.artist,
      datetime: new Date().toISOString(),
    });

    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

trackHistoryRouter.get("/", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user!;
  try {
    const trackHistory = await TrackHistory
      .find({user: user._id})
      .sort({date: -1})
      .populate({path: 'track', select: 'name'})
      .populate({path: 'artist', select: 'name'});

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;