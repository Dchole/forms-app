import { MongoDataSource } from "apollo-datasource-mongodb";
import type {
  AddRowInput,
  DeleteRowInput,
  EditRowInput,
  TableInput,
  Table as ITable,
  Row
} from "../types/generated";
import type { ITableSchema, IRow } from "../../models/Table";

class Table extends MongoDataSource<ITableSchema> {
  tableReducer(table?: ITableSchema | null): ITable {
    if (!table) throw new Error("Something went wrong!");

    const { _id, title, fields, disabled, deadline, rows, limit } = table;
    return { _id, title, fields, disabled, deadline, rows, limit };
  }

  rowReducer(row?: IRow | null): Row {
    if (!row) throw new Error("Something went wrong!");

    const { _id, fullName, data } = row;
    return { _id, fullName, data };
  }

  async getTable(id: string) {
    const table = await this.findOneById(id);
    return this.tableReducer(table);
  }

  async getTables(limit: number = 10, skip: number = 0) {
    const tables = await this.model.find().limit(limit).skip(skip);
    return tables.map(table => this.tableReducer(table));
  }

  async createTable(props: TableInput & { admin: string }) {
    const createdTable = await this.model.create(props);

    return this.tableReducer(createdTable);
  }

  async deleteTable(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  async toggleDisableTable(id: string) {
    const table = await this.model.findById(id).select("disabled");

    if (!table) throw new Error("Something went wrong!");

    table.updateOne({ disabled: !table.disabled });
  }

  async addRow({ tableID, fullName, data }: AddRowInput) {
    const table = await this.model.findById(tableID).select("rows");

    if (!table) throw new Error("Something went wrong!");

    const updatedTable: ITableSchema = fullName
      ? await table.updateOne(
          { rows: [...table.rows, { fullName, data }] },
          { new: true }
        )
      : await table.updateOne(
          { rows: [...table.rows, { data }] },
          { new: true }
        );

    const rows = [...updatedTable.rows];

    const addedRow = rows.pop();

    return this.rowReducer(addedRow);
  }

  async editRow({ tableID, rowID, fullName, data }: EditRowInput) {
    const table = await this.model.findById(tableID).select("rows");

    if (!table) throw new Error("Something went wrong!");

    const updatedRows = table.rows.map(row => {
      if (row._id === rowID) {
        return fullName ? { ...row, fullName, data } : { ...row, data };
      }

      return row;
    }) as IRow[];

    const updatedTable: ITableSchema = await table.updateOne(
      { rows: updatedRows },
      { new: true }
    );
    const editedRow = updatedTable.rows.find(row => row._id === rowID);

    return this.rowReducer(editedRow);
  }

  async deleteRow({ tableID, rowID }: DeleteRowInput) {
    const table = await this.model.findById(tableID).select("rows");

    if (!table) throw new Error("Something went wrong!");

    const updatedRows = table.rows.filter(row => row._id !== rowID);
    const deletedRow = table.rows.find(row => row._id === rowID);

    table.updateOne({ rows: updatedRows }, { new: true });

    return this.rowReducer(deletedRow);
  }
}

export default Table;
