const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findByEmail,
  add
};

function find() {
  return db("users");
}

async function findByEmail(email) {
  let [results] = await db("users as u")
    .where({ "u.email": email })
    .join("roles as r", "r.id", "u.roleId")
    .select(
      "u.id as userId",
      "u.password",
      "u.firstName",
      "u.lastName",
      "u.email",
      "r.name as role"
    );

  return results;
}

async function add(values) {
  const [newUser] = await db("users")
    .insert(values)
    .returning("*");

  return newUser;
}
