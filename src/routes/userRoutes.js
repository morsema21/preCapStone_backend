const { route } = require("../share");
const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");
const authenticateToken = require("../middleware/authMiddleware");

route.post("/register", register);
route.post("/login", login);
route.get("/users", authenticateToken, getUsers);
route.get("/");
route.delete("/users/:id", authenticateToken, deleteUser);
route.put("/users/:id", authenticateToken, updateUser);

module.exports = route;
