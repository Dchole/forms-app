import { Document, model, Schema } from "mongoose";

type TFieldType =
  | "text"
  | "long text"
  | "boolean"
  | "single choice"
  | "multiple choice";

export interface IRulesSchema extends Document {
  fieldType: TFieldType;
  message?: string;
}

const RulesSchema = new Schema({
  fieldType: {
    type: String,
    enum: ["text", "long text", "boolean", "single choice", "multiple choice"],
    default: "text"
  },
  message: String
});

export default model<IRulesSchema>("Rule", RulesSchema);
