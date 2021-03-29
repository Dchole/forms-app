import { Document, model, Schema } from "mongoose";

interface IFields extends Document {
  name: string;
  type: string;
}

interface IRow extends Document {
  fullName?: string;
  data: string[];
}

export interface ITableSchema extends Document {
  title: string;
  limit?: number;
  deadline?: string;
  disabled: boolean;
  fields: IFields[];
  rows: IRow[];
  admin: string;
}

const TableSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    limit: {
      type: Number
    },
    deadline: {
      type: Date
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fields: [
      {
        name: String,
        type: {
          type: String,
          enum: [
            "text",
            "long text",
            "boolean",
            "single choice",
            "multiple choice"
          ],
          default: "text"
        }
      }
    ],
    rows: [
      {
        fullName: String,
        data: {
          type: Schema.Types.Array,
          required: true
        }
      }
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  },
  { timestamps: true }
);

const TableModel = model<ITableSchema>("Table", TableSchema);
export default TableModel;
