import nc from "next-connect";
import database from "utils/api/database"

const handler = nc();

/**
 * UPDATE EATING HISTORY ENTRY
 * Pass historyId and amount_eaten in the body
 */
handler.put(async (req, res) => {
  const { ResidentModel } = await database()
  const { rid } = req.query
  const { historyId, amount_eaten} = req.body

  const filter = {
    _id: rid,
    "eating_history._id": historyId
  }

  const update = {
    $set: {
      "eating_history.$.amount_eaten": amount_eaten,
    }
  }

  const resident = await ResidentModel.findOneAndUpdate(filter, update, {new: true})
  res.json({ msg: "Resident updated", resident })
});

export default handler;