const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const username = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!username)
{
    throw Error("Database not configured. Set environment variables");
}

const url = `mongodb+srv://${username}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db("bubblebasket").collection("user");

function getUser(email)
{
    return userCollection.findOne({ email: email });
}

function getUserByToken(token)
{
    return userCollection.findOne({ token: token });
}

async function createUser(email, password)
{
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user object to send
    const user =
    {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
        cart: []
    };
    await userCollection.insertOne(user);

    return user;
}

async function addItemToUser(token, item)
{
    userCollection.updateOne(
        { token: token },
        { $push: { cart: item } }
    );
}

function getUserCart(token)
{
    return getUserByToken(token).cart;
}

module.exports = 
{ 
    addItemToUser, 
    getUserCart,
    getUser,
    getUserByToken,
    createUser
};