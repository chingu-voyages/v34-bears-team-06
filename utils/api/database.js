import mongoose, { connection } from "mongoose";
import { Resident, Test, Menu, Meal } from "models";

function extendDb(db) {
  const models = {
    ResidentModel: Resident,
    TestModel: Test,
    MenuModel: Menu,
    MealModel: Meal,
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
    }
  );
  console.log("Database connected");
  return extendDb(connection);
}
