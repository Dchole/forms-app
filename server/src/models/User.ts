import { Document, model, Schema } from "mongoose";

export interface IUserSchema extends Document {
  fullName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      min: 8,
      required: true
    }
  },
  { timestamps: true }
);

const UserModel = model<IUserSchema>("User", UserSchema);
export default UserModel;
