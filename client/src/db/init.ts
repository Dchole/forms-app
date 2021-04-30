import Localbase from "localbase";

class Db {
  private db = new Localbase("forms");

  public get database() {
    return this.db;
  }
}

export default Db;
