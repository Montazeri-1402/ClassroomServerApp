const { v4: uuidv4 } = require('uuid');
var express = require('express');
var router = express.Router();

const datacollector = require('../data/datacollector');
datacollector.init();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(datacollector.users.getAll());
});

/* POST users listing. */
router.post('/', async function (req, res, next) {
  const user = req.body;
  user.id = uuidv4();
  datacollector.users.add(user);
  await datacollector.saveChanges();
  res.send(user);
});

/* DELETE user. */
router.delete('/', async function (req, res, next) {
  const { id } = req.query;
  datacollector.users.removeById(id);
  await datacollector.saveChanges();
  res.send({ status: "success" });
});

module.exports = router;
