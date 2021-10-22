import nc from "next-connect";
import database from "utils/api/database"
import mongoose from "mongoose";

const handler = nc();

handler.get(async (req, res) => {
  const { ResidentModel } = await database()
  const { query } = req
  const resident = await ResidentModel.find(query);
  res.json({ msg: "Residents list", resident })
});

handler.post(async(req, res) => {
  const { ResidentModel } = await database()
  const residentData = req.body;
  const newResident = await ResidentModel.create(residentData);
  console.log("successful")
  res.json({ msg: "Resident created", resident: newResident });
});

export default handler;