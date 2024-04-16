import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  singer: {
    type: Schema.Types.ObjectId,
    ref: 'Singer',
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  image: String || null,
},{
  versionKey: false,
});

const Album  = mongoose.model('Album', AlbumSchema);

export default Album;
