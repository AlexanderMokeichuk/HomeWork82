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
    duration: {
      type: String,
      required: true,
    },
    item: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);


const Track = model("Track", TrackSchema);

export default Track;