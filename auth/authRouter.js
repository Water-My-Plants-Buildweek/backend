const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const secrets = require("./secrets");
// const authenticator = require("./authenticator");
const Users = require("./usersModel");
// const { update } = require("./usersModel");
const { isValid } = require("./authService");
// const db = require("../database/dbConfig");

const router = require("express").Router();

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users, jwt: req.jwt });
    })
    .catch((err) => res.send(err));
});

router.get("/userinfo", (req, res) => {
  const { username, phone } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ "u.username": username, "p.phone": phone })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);

          res.status(200).json({
            message: `${user.username},`,
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
            id: `${user.id}`,
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

router.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (changes.password) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(changes.password, rounds);

    changes.password = hash;
  }
  Users.findById(id)
    .then((user) => {
      if (user) {
        Users.update(id, changes)
          .then((updateUser) => {
            res.status(200).json({ updateUser });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Sorry, could not update user in database, API error",
            });
          });
      } else {
        res.status(404).json({
          message: "Please be sure to fill out all user requirements",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "did not work",
      });
    });
});

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
