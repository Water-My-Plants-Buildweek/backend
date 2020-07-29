const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("./secrets");
const authenticator = require("./authenticator");
const Users = require("./usersModel");
const { isValid } = require("./authService");
const db = require("../database/dbConfig");

const router = require("express").Router();

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users, jwt: req.jwt });
    })
    .catch((err) => res.send(err));
});

router.put("/user", userValidation, authenticator, (req, res) => {
  const credentials = req.body;
  const { username } = jwt.verify(req.headers.authorization, secrets.secret);
  db("users")
    .select("username")
    .where({ username: username })
    .first()
    .then((id) => {
      credentials.password = bcrypt.hashSync(credentials.password, 10);
      db("users")
        .update(credentials)
        .where(username)
        .then((data) => {
          data
            ? res.status(201).json({ message: "User updated succesfully" })
            : res.status(500).json({ message: "User couldnt be updated" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Error updating user" });
        });
    });
});

// router.put("/user", userValidation, authenticator, (req, res) => {
//   const { username, password } = req.body;

// });

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password should be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ "u.username": username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);

          res.status(200).json({
            message: `Welcome ${user.username}`,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the passwrod should be alphanuemric",
    });
  }
});

function userValidation(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(403).send({
      message: "Validation Error, userame or passord is incorrect",
    });
  }
  next();
}

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET || "thisIsOurSecret";

  const options = {
    expiresIn: "3d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
