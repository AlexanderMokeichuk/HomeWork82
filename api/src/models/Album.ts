import mongoose from "mongoose";
import {AlbumFront} from "../type";

const Schema = mongoose.Schema;
const AlbumSchema = new Schema<AlbumFront>({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  image: {
    type: String || null,
    required: true,
  },
},{
  versionKey: false,
});

const Album  = mongoose.model('Album', AlbumSchema);

export default Album;
