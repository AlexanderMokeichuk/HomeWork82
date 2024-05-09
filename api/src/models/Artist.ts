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
    required: true,
  },
  description: String,
},{
  versionKey: false,
});

const Artist  = mongoose.model('Artist', ArtistSchema);

export default Artist;