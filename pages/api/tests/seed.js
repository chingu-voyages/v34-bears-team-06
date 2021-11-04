import nc from "next-connect";
import Seed, { SeedEatingHistory, SeedMenu, getMealsByUniqueCode, getMealsAndSnack, getMenuDays } from "seeds/seed";

const handler = nc();

handler.get(async (req, res) => {
    const menu = await SeedMenu()
    res.json({ msg: "Success seeding menu", menu });
});

export default handler;
