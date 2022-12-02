var express = require('express');
var router = express.Router();
var { ObjectId } = require('mongodb')

/* GET users listing. */
module.exports = function (db) {
  const User = db.collection('murid');

  router.get('/', async function (req, res, next) {
    try {
      const users = await User.find().toArray()
      res.json(users)
    } catch (err) {
      res.json({ err })
    }
  });

  // ADD
  router.post('/', async function (req, res, next) {
    try {
      const result = await User.insertOne(req.body)
      const user = await User.findOne({ _id: ObjectId(result.insertedId) })
      res.json(user)
    } catch (err) {
      res.json({ err })
    }
  });

  // EDIT
  router.put('/:id', async function (req, res, next) {
    try {
      const result = await User.findOneAndUpdate({
        _id: ObjectId(req.params.id)
      }, {
        $set: {
          name: req.body.name,
          address: req.body.address
        }
      }, {
        returnOriginal: false
      })
      res.json(result.value)
    } catch (err) {
      res.json({ err })
    }
  });

    // DELETE
    router.delete('/:id', async function (req, res, next) {
      try {
        const result = await User.findOneAndDelete({
          _id: ObjectId(req.params.id)
        })
        res.json(result.value)
      } catch (err) {
        res.json({ err })
      }
    });

  return router;
}
