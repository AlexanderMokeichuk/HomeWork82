import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompositionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

const Composition = mongoose.model("Composition", CompositionSchema);

export default Composition;