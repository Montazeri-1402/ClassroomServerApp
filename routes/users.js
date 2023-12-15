const { v4: uuidv4 } = require('uuid');
var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datacollector = require('../data/datacollector');
datacollector.init();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // res.send(datacollector.users.getAll());
  const allUsers = await prisma.user.findMany();
  res.send(allUsers);
});

/* POST users listing. */
router.post('/', async function (req, res, next) {
  const user = req.body;
  // user.id = uuidv4();
  // datacollector.users.add(user);
  const userInDb = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
    },
  });
  res.send(userInDb);
});

/* DELETE user. */
router.delete('/', async function (req, res, next) {
  const { id } = req.query;
  datacollector.users.removeById(id);
  await datacollector.saveChanges();
  res.send({ status: "success" });
});

module.exports = router;
