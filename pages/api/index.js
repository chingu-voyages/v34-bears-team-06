import nc from "next-connect";

const handler = nc();

handler.get((req, res) => {
  res.json({
    msg: "Welcome to the API.",
  });
});

export default handler;
