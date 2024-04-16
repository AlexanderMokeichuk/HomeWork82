import mongoose from "mongoose";

const Schema = mongoose.Schema;
const SingerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
},{
  versionKey: false,
});

const Singer  = mongoose.model('Singer', SingerSchema);

export default Singer;