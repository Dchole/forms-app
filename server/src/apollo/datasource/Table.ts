import { MongoDataSource } from "apollo-datasource-mongodb";
import type {
  AddRowInput,
  DeleteRowInput,
  EditRowInput,
  TableInput,
  Table as ITable,
  Row,
  Maybe
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

  async getTables(limit = 10, skip = 0) {
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

    table.disabled = !table.disabled;
    await table.save();

    return table.disabled;
  }

  async addRow({ tableID, fullName, data }: AddRowInput) {
    const table = await this.model.findById(tableID).select("rows");
    if (!table) throw new Error("Something went wrong!");

    const newRow = fullName ? { fullName, data } : { data };

    table.rows.push(newRow as IRow);
    await table.save();

    const addedRow = table.rows[table.rows.length - 1];

    return this.rowReducer(addedRow);
  }

  async editRow({ tableID, rowID, fullName, data }: EditRowInput) {
    const table = await this.model.findById(tableID).select("rows");
    if (!table) throw new Error(`Table with id ${tableID} doesn't exist`);

    const row = table.rows.find(row => String(row._id) === rowID);
    if (!row) throw new Error(`Row with id ${rowID} doesn't exist`);

    if (fullName) {
      row.fullName = fullName;
    }

    row.data = data;
    await table.save();

    return this.rowReducer(row);
  }

  async deleteRow({ tableID, rowID }: DeleteRowInput) {
    const table = await this.model.findById(tableID).select("rows");
    if (!table) throw new Error(`Table with id ${tableID} doesn't exist`);

    const row = table.rows.find(row => String(row._id) === rowID);
    if (!row) throw new Error(`Row with id ${rowID} doesn't exist`);

    row.remove();
    await table.save();

    return this.rowReducer(row);
  }
}

export default Table;
