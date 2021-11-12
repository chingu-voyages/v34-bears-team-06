import nc from "next-connect";
import database from "utils/api/database"

const handler = nc();

/**
 * GET RESIDENT
 */
handler.get(async (req, res) => {
  const { ResidentModel } = await database()
  const { rid, populate } = req.query
  let resident;
  if (populate) {
    resident = await ResidentModel.findById(rid).populate("eating_history.mealId");
  } else {
    resident = await ResidentModel.findById(rid);
  }
  res.json({ msg: "Resident retrieved", resident })
});

/**
 * DELETE RESIDENT
 */
handler.delete(async (req, res) => {
  const { ResidentModel } = await database()
  const { rid } = req.query
  const resident = await ResidentModel.findByIdAndDelete(rid)
  res.json({ msg: "Resident deleted", resident })
});

/**
 * UPDATE RESIDENT
 * send residentData in the body
 */
handler.put(async (req, res) => {
  const { ResidentModel } = await database()
  const { rid } = req.query
  const residentData = req.body

  let eatingHistory = residentData.eating_history
  if (eatingHistory) {
    // Simply converts it to an array if it isn't
    eatingHistory = eatingHistory instanceof Array ? eatingHistory : [eatingHistory]
    delete residentData.eating_history
  }

  const update = {
    $set: residentData,
    $push: { eating_history: {$each: eatingHistory || [] } }
  }

  const resident = await ResidentModel.findByIdAndUpdate(rid, update, {new: true})
  res.json({ msg: "Resident updated", resident })
});

export default handler;