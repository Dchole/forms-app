import { connect, Mongoose } from "mongoose";

console.log(typeof import("mongoose"));

let db: Mongoose;

export async function startDatabase() {
  connect(
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_LOCAL!
      : process.env.MONGODB_URI!,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
    .then(res => {
      db = res;
      console.log("Connected to DB ✅");
    })
    .catch(err => console.log(err));
}

export async function stopDatabase() {
  db.disconnect();
}
