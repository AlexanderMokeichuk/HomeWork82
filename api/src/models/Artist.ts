import mongoose from "mongoose";
import {ArtistFront} from "../type";

const Schema = mongoose.Schema;
const ArtistSchema = new Schema<ArtistFront>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String || null,
  },
  description: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
},{
  versionKey: false,
});

const Artist  = mongoose.model('Artist', ArtistSchema);

export default Artist;