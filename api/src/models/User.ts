import bcrypt from "bcrypt";
import mongoose, {Schema} from "mongoose";
import {UserFront, UserMethods, UserModel} from "../type";

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFront, UserModel, UserMethods>({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  versionKey: false,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.method("checkPassword", async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

UserSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFront, UserModel>("User", UserSchema);

export default User;