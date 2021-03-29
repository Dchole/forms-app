import { MongoDataSource } from "apollo-datasource-mongodb";
import type {
  AddRowInput,
  DeleteRowInput,
  EditRowInput,
  TableInput
} from "../types/generated";
import type { ITableSchema } from "../../models/Table";

class Table extends MongoDataSource<ITableSchema> {
  async getTable(id: string) {
    return this.findOneById(id);
  }

  async getTables(limit: number = 10, skip: number = 0) {
    return this.model.find().limit(limit).skip(skip);
  }

  async createTable(props: TableInput & { admin: string }) {
    return this.model.create(props);
  }

  async deleteTable(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  async addRow({ tableID, fullName, data }: AddRowInput) {
    const table = await this.findOneById(tableID);

    if (!table) throw new Error("Something went wrong!");

    fullName
      ? table.updateOne({ rows: [...table.rows, { fullName, data }] })
      : table.updateOne({ rows: [...table.rows, { data }] });

    return { fullName, data };
  }

  async editRow({ tableID, rowID, fullName, data }: EditRowInput) {
    const table = await this.findOneById(tableID);

    if (!table) throw new Error("Something went wrong!");

    const updatedRows = table.rows.map(row => {
      if (row._id === rowID) {
        return fullName ? { fullName, data } : { data };
      }

      return row;
    });

    table.updateOne({ rows: updatedRows });

    return updatedRows;
  }

  async deleteRow({ tableID, rowID }: DeleteRowInput) {
    const table = await this.findOneById(tableID);

    if (!table) throw new Error("Something went wrong!");

    const updatedRows = table.rows.filter(row => row._id !== rowID);
    table.updateOne({ rows: updatedRows });

    return updatedRows;
  }
}

export default Table;
