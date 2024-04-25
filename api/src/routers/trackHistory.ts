import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", async (req, res, next) => {
  const tokenData = req.get("Authorization");

  if (!tokenData) {
    return res.status(401).send({error: "No token provided!"});
  }

  const [_, token] = tokenData.split(" ");

  try {
    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: "Unauthorized"});
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
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

export default trackHistoryRouter;