const { route } = require("../share");
const { register, login, getUsers } = require("../controllers/userControllers");
const authenticateToken = require("../middleware/authMiddleware");

route.post("/register", register);
route.post("/login", login);
route.get("/users", authenticateToken, getUsers);
route.get("/");

module.exports = route;
