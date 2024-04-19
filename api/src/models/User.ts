import bcrypt from "bcrypt";
import mongoose, {Schema} from "mongoose";
import {UserFront, UserMethods, UserModel} from "../type";
import {randomUUID} from "crypto";

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
  token: {
    type: String,
    required: true,
  }
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

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFront, UserModel>("User", UserSchema);

export default User;