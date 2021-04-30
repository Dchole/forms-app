import { MongoDataSource } from "apollo-datasource-mongodb";
import type {
  AddRowInput,
  DeleteRowInput,
  EditRowInput,
  TableInput,
  Table as TTable,
  Row,
  Maybe
} from "../types/generated";
import type { ITableSchema, IRow } from "../../models/Table";
import { ForbiddenError } from "apollo-server-errors";

class Table extends MongoDataSource<ITableSchema> {
  tableReducer(table?: ITableSchema | null): TTable {
    if (!table) throw new Error("Something went wrong!");

    const {
      _id,
      title,
      fields,
      disabled,
      deadline,
      rows,
      target,
      draft
    } = table;

    return { _id, title, fields, disabled, deadline, rows, target, draft };
  }

  rowReducer(row?: Maybe<IRow>): Row {
    if (!row) throw new Error("Something went wrong!");

    const { _id, fullName, data, date } = row;
    return { _id, fullName, data, date };
  }

  async hasMore(admin: string, tables: TTable[]) {
    const allTables = await this.model.find({ admin }).select("_id");
    const cursor = tables[tables.length - 1];

    const indexOfCursor = allTables.findIndex(
      table => table._id.toString() === cursor._id.toString()
    );

    return indexOfCursor + 1 < allTables.length;
  }

  async countTables(admin: string) {
    return this.model.find({ admin }).countDocuments();
  }

  async getTable(id: string) {
    const table = await this.findOneById(id);
    return this.tableReducer(table);
  }

  async getTables(admin: string, limit = 6, page = 1, draft = false) {
    const tables = await this.model
      .find({ admin, draft })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort("-createdAt");

    return tables.map(table => this.tableReducer(table));
  }

  async createTable(props: TableInput & { admin: string }) {
    const createdTable = await this.model.create(props);

    return this.tableReducer(createdTable);
  }

  async deleteTable(id: string, admin: string) {
    const table = await this.findOneById(id);

    if (table?.admin !== admin)
      throw new ForbiddenError(
        "You don't have permission to delete this table"
      );

    return table.deleteOne();
  }

  async toggleDisableTable(id: string, admin: string) {
    const table = await this.model.findById(id).select("disabled");

    if (table?.admin !== admin)
      throw new ForbiddenError("You don't have permission for this action");

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

  async editRow({
    tableID,
    rowID,
    fullName,
    data,
    admin
  }: EditRowInput & { admin: string }) {
    const table = await this.model.findById(tableID).select("rows");
    if (!table) throw new Error(`Table with id ${tableID} doesn't exist`);

    if (table.admin !== admin)
      throw new ForbiddenError("You don't have permission to edit this data");

    const row = table.rows.find(row => String(row._id) === rowID);
    if (!row) throw new Error(`Row with id ${rowID} doesn't exist`);

    if (fullName) {
      row.fullName = fullName;
    }

    row.data = data;
    await table.save();

    return this.rowReducer(row);
  }

  async deleteRow({
    tableID,
    rowID,
    admin
  }: DeleteRowInput & { admin: string }) {
    const table = await this.model.findById(tableID).select("rows");
    if (!table) throw new Error(`Table with id ${tableID} doesn't exist`);

    if (table.admin !== admin)
      throw new ForbiddenError("You don't have permission to delete this data");

    const row = table.rows.find(row => String(row._id) === rowID);
    if (!row) throw new Error(`Row with id ${rowID} doesn't exist`);

    row.remove();
    await table.save();

    return this.rowReducer(row);
  }
}

export default Table;
