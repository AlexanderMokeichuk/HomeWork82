import {model, Schema} from "mongoose";
import {TrackFront} from "../type";

const TrackSchema = new Schema<TrackFront>(
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
    duration: String,
  },
  {
    versionKey: false,
  }
);

const Track = model("Track", TrackSchema);

export default Track;