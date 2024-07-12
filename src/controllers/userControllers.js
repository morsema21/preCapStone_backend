const { registerQuery, loginUser } = require("../queries/userQuery");
const { bcrypt } = require("../share");
const { jwt } = require("../share");

const register = async (req, res) => {
  const token = await registerQuery(req.body);
  res.send(token);
};

// const login = async (req, res) => {
//   try {
//     const user = await loginUser(req.body.email, req.body.password);

//     res.send({ token });
//   } catch (error) {
//     console.log("Error");
//   }
// };

const login = async (req, res) => {
  const token = await loginUser(req.body.email, req.body.password);

  res.status(201).send({ token });
};

module.exports = {
  register,
  login,
};
