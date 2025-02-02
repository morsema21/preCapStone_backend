const {
  registerQuery,
  loginUser,
  updateUserById,
  getSingleUser,
  deleteUserById,
  getAllUsers,
} = require("../queries/userQuery");
const { bcrypt } = require("../share");
const { jwt } = require("../share");

const register = async (req, res) => {
  const token = await registerQuery(req.body);
  res.send({ token });
};

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
    const user = await deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).send("not found");
    }
    res.send(console.log("success"));
  } catch (error) {
    res.status(500).send("delete error");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await updateUserById(
      req.params.id,
      req.body.firstName,
      req.body.LastName,
      req.body.email,
      req.body.password
    );
    if (!user) {
      return res.status(404).send("not found");
    }
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).send("update error");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getSingleUser(req.params.id);
    if (!user) {
      return res.status(404).send("not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("single user error");
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};
