import {model, Schema} from "mongoose";
import {TrackHistoryFront} from "../type";

const TrackHistorySchema = new Schema<TrackHistoryFront>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  }
},{
  versionKey: false,
});

const TrackHistory = model("TrackHistory", TrackHistorySchema);

export default TrackHistory;