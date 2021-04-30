import { IValues } from "../components/CreateTableForm/Reducer";
import Db from "./init";

class Draft extends Db {
  private collection = this.database.collection("drafts");

  async getDrafts() {
    return this.collection.get({ keys: true });
  }

  async getDraft(key: string) {
    return this.collection.doc(key).get();
  }

  async saveDraft(key: string, values: IValues): Promise<string> {
    return this.collection.add(values, key);
  }

  public updateDraft(key: string, values: IValues) {
    return this.collection.doc(key).set(values);
  }

  public deleteDraft(key: string) {
    this.collection.doc(key).delete();
  }
}

export default Draft;
