const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://eniebietntah_db_user:WOZEfcKiigOB81WY@cluster0.jblh8of.mongodb.net/?appName=Cluster0')
  .then(() => {
    console.log("MongoDB connected 🟢")

    app.listen(PORT, () => {
      console.log("Server running on port", PORT)
    })
  })
  .catch(err => console.log("MongoDB error:", err))

const kittySchema = new mongoose.Schema({ name: String })
const Kitten = mongoose.models.Kitten || mongoose.model('Kitten', kittySchema)

app.get("/api/server/status", (req, res) => {
  res.json({ msg: "Server is up and ready" })
})

app.post("/api/submit-cat", async (req, res) => {
  try {
    const catName = req.body.catName

    console.log("Received from form:", catName) 

    const kitty = new Kitten({ name: catName })
    await kitty.save()

    res.send(`Cat "${catName}" saved successfully 🐱`)
  } catch (err) {
    console.log(err)
    res.status(500).send("Something broke")
  }
})