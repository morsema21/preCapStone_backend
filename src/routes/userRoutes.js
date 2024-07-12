const { route } = require("../share")
const {register} = require("../controllers/userControllers")

route.post("/register", register);

module.exports = route;