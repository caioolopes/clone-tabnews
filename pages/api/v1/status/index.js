import database from "../../../../infra/database.js";

async function status(request, response) {
  const resulta = await database.query("select 1 + 1 as sum;");
  console.log(resulta.rows);
  response.status(200).json({ chave: "São acima da media" });
}

export default status;
