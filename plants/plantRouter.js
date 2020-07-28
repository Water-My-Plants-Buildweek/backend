const express = require("express")
const Plants = require("./plantModel")
const db = require("../database/dbConfig")

const router = express.Router()

router.get("/", (req, res) => {
  db("plants")
    .then((plants) => {
      res.json(plants)
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve plants" })
    })
})

router.get("/:id", (req, res) => {
  const { id } = req.params

  Plants.findById(id)
    .then((plant) => {
      if (plant) {
        res.json(plant)
      } else {
        res.status(404).json({
          message: "Could not find plant with given id.",
        })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get Plants" })
    })
})

router.post('/', async (req, res) => {
  const plantsData = req.body
  try {
    await Plants.add(plantsData)
    const newPlants = await Plants.find()

    res.json(newPlants)
  } catch (error) {
    res.status(500).json({ message: "Failed to create new post" })
  }
})



router.put("/:id", (req, res) => {
  const { id } = req.params
  const changes = req.body

  Plants.findById(id)
    .then((plant) => {
      if (plant) {
        Plants.update(changes, id).then((updatedPlant) => {
          res.json(updatedPlant)
        })
      } else {
        res.status(404).json({
          message: "Could not find plant with given id",
        })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update plant" })
    })
})
router.delete("/:id", (req, res) => {
  const { id } = req.params

  Plants.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({
          removed: deleted,
          message: "successfully deleted plant!",
        })
      } else {
        res.status(404).json({
          message: "Could not find plant with given id",
        })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete plant" })
    })
})

module.exports = router
