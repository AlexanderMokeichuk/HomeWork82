import bcrypt from "bcrypt";
import mongoose, {HydratedDocument, Schema} from "mongoose";
import {User, UserMethods, UserModel} from "../type";
import {randomUUID} from "crypto";

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<User, UserModel, UserMethods>({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<User>, username: string): Promise<boolean> {
        if (!this.isModified('username')) return true;

        const user: HydratedDocument<User> | null = await User.findOne({username});
        const userBoolean = Boolean(user);
        return !userBoolean;
      },
      message: 'This user is already registered!'
    },
  },
  token: {
    type: String,
    required: true,
  },
  role: {
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

const User = mongoose.model<User, UserModel>("User", UserSchema);

export default User;