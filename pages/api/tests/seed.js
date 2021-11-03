import nc from "next-connect";
import database from "utils/api/database";
import mongoose from "mongoose";
import Seed from "seeds/seed";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await Seed();
    res.json({ msg: "Success seeding database" });
  } catch (err) {
    res.json({ msg: "Error seeding database", err });
  }
});

export default handler;
