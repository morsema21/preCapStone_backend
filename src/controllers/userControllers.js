const { registerQuery, loginUser } = require("../queries/userQuery");
const { bcrypt } = require("../share");
const { jwt } = require("../share");
const { getAllUsers, getUser } = require("../queries/userQuery");

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

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    console.log(req.params.id);
    res.status(200).send("delete successful");
  } catch (error) {
    res.status(500).send("delete error");
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
};
