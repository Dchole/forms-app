import { Document, model, Schema } from "mongoose";

type EFieldType =
  | "SHORT_TEXT"
  | "LONG_TEXT"
  | "NUMBER"
  | "BOOLEAN"
  | "SELECT_ONE"
  | "MULTIPLE_SELECT"
  | "TIME"
  | "DATE"
  | "TIME_DATE";

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
  target?: number;
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
    target: {
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
            "SHORT_TEXT",
            "LONG_TEXT",
            "NUMBER",
            "BOOLEAN",
            "SELECT_ONE",
            "MULTIPLE_SELECT",
            "TIME",
            "DATE",
            "TIME_DATE"
          ],
          default: "SHORT_TEXT"
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
