import { Document, model, Schema } from "mongoose";

type EFieldType =
  | "TEXT"
  | "LONG_TEXT"
  | "NUMBER"
  | "BOOLEAN"
  | "SINGLE_CHOICE"
  | "MULTIPLE_SELECT";

export interface IField extends Document {
  name: string;
  type: EFieldType;
}

export interface IRow extends Document {
  fullName?: string;
  data: string[];
  date: string;
}

export interface ITableSchema extends Document {
  title: string;
  limit?: number;
  deadline?: string;
  disabled: boolean;
  fields: IField[];
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
        name: {
          type: String,
          required: true
        },
        type: {
          type: String,
          enum: [
            "TEXT",
            "LONG_TEXT",
            "NUMBER",
            "BOOLEAN",
            "SINGLE_CHOICE",
            "MULTIPLE_SELECT"
          ],
          default: "TEXT"
        }
      }
    ],
    rows: [
      {
        fullName: String,
        data: {
          type: Schema.Types.Array,
          required: true
        },
        date: {
          type: Schema.Types.Date,
          default: Date.now
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
