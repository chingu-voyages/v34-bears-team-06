import nc from "next-connect";
import database from "utils/api/database"

const handler = nc();

handler.get(async (req, res) => {
  const { ResidentModel } = await database()
  const resident = await ResidentModel.find();
  res.json({ msg: "Residents list", resident })
});

handler.post(async(req, res) => {
  const { ResidentModel } = await database()
  const residentData = req.body;
  const newResident = await ResidentModel.insertOne(residentData);
  res.json({ msg: "Resident created", resident: newResident });
});

export default handler;