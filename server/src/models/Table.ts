import { Document } from "mongoose";
import { model, Schema } from "mongoose";

interface IFields {
  name: string;
  rules?: string[];
}

export interface ITableSchema extends Document {
  title: string;
  limit?: number;
  deadline?: string;
  disabled: boolean;
  fields: IFields[];
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
        rules: [
          {
            type: Schema.Types.ObjectId,
            ref: "Rules"
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

const TableModel = model<ITableSchema>("Table", TableSchema);
export default TableModel;
