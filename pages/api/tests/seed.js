
import nc from "next-connect";
import { SeedExistingMenu } from "seeds/seed";

const handler = nc();

handler.get(async (req, res) => {
    // The function is called here
    const menu = await SeedExistingMenu()
    res.json({ msg: "Success seeding menu", menu });
});

export default handler;
