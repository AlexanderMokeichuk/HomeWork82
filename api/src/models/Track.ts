import {Schema, Types, model} from "mongoose";
import Album from "./Album";

const TrackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Track = model("Track", TrackSchema);

export default Track;