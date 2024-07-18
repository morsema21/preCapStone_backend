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
  const returnObject = {token, email}
  return returnObject;
};

const loginUser = async (email, password) => {
  console.log("Login:", email, password);
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  console.log("user:", user);

  if (!user) {
    throw new Error("No user found.");
  }
  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error("Invalid login");
  }
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.WEB_TOKEN
  );
  console.log("Token:", token);
  const returnObject = {token, email}
  return returnObject;
};

const getAllUsers = async () => {
  return await prisma.users.findMany();
};

const deleteUserById = async (id) => {
  return await prisma.users.delete({
    where: {
      id,
    },
  });
};

const getSingleUser = async (id) => {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
};

const updateUserById = async (id, firstName, LastName, email, password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return await prisma.users.update({
    where: { id },
    data: {
      firstName,
      LastName,
      email,
      password: hashPassword,
    },
  });
};

module.exports = {
  registerQuery,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getSingleUser,
};
