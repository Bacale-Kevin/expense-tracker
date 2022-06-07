const model = require("../models/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//POST register user
const signup = async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  if (username === "" || password === "")
    return res.json({ error: "empty fields are not allowed" });

  let existingUser;
  try {
    existingUser = await model.User.findOne({ username });
  } catch (error) {
    console.log(error);
  }

  if (existingUser)
    return res.status(400).send("This user already exist please login instead" );

  const hashedPassword = bcrypt.hashSync(password);
  const user = new model.User({
    username,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }

  return res.status(201).json({ message: user });
};

//POST login user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;

  try {
    existingUser = await model.User.findOne({ username });
  } catch (error) {
    return new Error(err);
  }

  if (!existingUser) return res.status(400).json({ error: "Invalid login credentials" });

  const passwordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!passwordCorrect) return res.status(400).json({ error: "Invalid login credentials" });

  //generate jwt
  const token = jwt.sign({ id: existingUser._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "30s",
  });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true, // not accessible throw javascript
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Successfully login", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;

  const token = cookies.split("=")[1];
  console.log(token);

  if (!token) return res.status(404).json({ error: "No token found" });

  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(400).json({ error: "Invalid token" });

    req.id = user.id;
  });

  //move to the get user function
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;

  let user;

  try {
    user = await model.User.findById(userId, "-password");
  } catch (error) {
    return new Error(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

const refreshToken = (req, res, next) => {};

module.exports = {
  signup,
  login,
  verifyToken,
  getUser,
  refreshToken,
};
