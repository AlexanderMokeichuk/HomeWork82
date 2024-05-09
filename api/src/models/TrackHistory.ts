import {model, Schema} from "mongoose";
import {TrackHistory} from "../type";

const TrackHistorySchema = new Schema<TrackHistory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
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