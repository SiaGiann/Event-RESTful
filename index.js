const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const { Op } = require('sequelize');


const port = process.env.PORT || 3030

const app = express()
  .use(cors())
  .use(bodyParser.json())

const { Event } = db

app.get('/', (req, res) => {
  res.json({message: "Hello!"})
})

app.get('/events', (req, res) => {
  const events = Event
    .findAll({
      attributes: ['title', 'start_date', 'end_date'],
      where: {
        start_date: {
          [Op.gt]: new Date()
        }
      }
    })
    .then(events => {
      console.log(events)
      res.json(events)
    })
    .catch(err => {
      console.error(err)
      res.status(500)
      res.json({ message: "No events found!"})
    })
})

app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
