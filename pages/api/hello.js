import nc from "next-connect";

const handler = nc();

handler.get((req, res) => {
  res.json({ msg: "Hello"})
});

export default handler;