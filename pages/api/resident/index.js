import connectDB from '../../../middleware/mongodb';
import Resident from '../../../models/resident';

async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      // Maybe return all the residents here.
      case "GET":
        res.json({ msg: "Residents API" });
        break;
      // Create a resident
      case "POST":
        const { body } = req;
        const newResident = await Resident.create(body);
        res.json({ msg: "Resident created", resident: newResident });
        break;

      // Method unavailable
      default:
        res.status(405).json({ error: "Method not allowed." });
    }
  } catch (error) {
    res.status(500).json({ error: error.name, msg: error.message, code: error.code });
  }
}

export default connectDB(handler);
