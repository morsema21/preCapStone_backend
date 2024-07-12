const { bcrypt, prisma, jwt } = require("../share");
const registerQuery = async ({ firstName, LastName, email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.users.create({
    data: {
      firstName,
      LastName,
      email,
      password: hashPassword,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
    },
    process.env.WEB_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const loginUser = async (email, password) => {
  console.log("test", email, password);
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  console.log("user:", user);

  //   if (!user) {
  //     return "No user found.";
  //   }
  const passwordValid = await bcrypt.compare(password, user.password);

  // if (!passwordValid) {
  //   return res.status(401).send("Invalid login");
  // }
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.WEB_TOKEN
  );
  console.log("Token:", token);
  return token;
};

const getAllUsers = async () => {
  return await prisma.users.findMany();
};

const getUser = async (id) => {
    return await prisma.users.findUnique({
        where: {
            id,
        }
    });
}

module.exports = {
  registerQuery,
  loginUser,
  getAllUsers,
  getUser,
};
