const { bcrypt, prisma, jwt } = require("../share")
const registerQuery = async ({ firstName, LastName, email, password}) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const registerUser = await prisma.user.create({
        data: {
            firstName,
            LastName,
            email,
            password: hashPassword
        },
    })

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
}

module.exports = {
    registerQuery
}