import nc from "next-connect";
import database from "utils/api/database";
import mongoose from "mongoose";

const handler = nc();

handler.get(async (req, res) => {
  const { MenuModel } = await database();
  const { query } = req;
  const menus = await MenuModel.find(query);
  res.json({ msg: "Menus list", menus });
});

handler.post(async (req, res) => {
  const { MenuModel } = await database();
  const menuData = req.body;
  const menu = await MenuModel.create(menuData);
  res.json({ msg: "Menu created", menu });
});

export default handler;
