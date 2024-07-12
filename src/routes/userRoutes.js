const { route } = require("../share");
const { register, login } = require("../controllers/userControllers");

route.post("/register", register);
route.post("/login", login);

route.get("/");

module.exports = route;
