import mongoose, { connection } from "mongoose";
import { Resident, Test } from "models";

function extendDb(db) {
  const models = {
    ResidentModel: Resident,
    TestModel: Test,
  };
  return { db, ...models };
}

/**
 * Connects to MongoDB uri specified in `MONGODB_URI` env. variable
 */
export default async function database() {
  if (connection.readyState) {
    return extendDb(connection);
  }
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/eating-tracker",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  );
  console.log("Database connected");
  return extendDb(connection);
}
