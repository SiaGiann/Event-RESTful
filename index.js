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

// Index action
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
      res.json(events)
    })
    .catch(err => {
      console.error(err)
      res.status(500)
      res.json({ message: "No events found!" })
    })
})

// View action
app.get('/events/:id', (req, res) => {
  const event = Event
    .findById(req.params.id) // to params.id antistoixei sto :id
    .then(event => {
      if (event) {
        res.json(event)
      } else {
        res.status(404)
        res.json({ message: "Event with specified id was not found!" })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500)
      res.json({ message: "Oops! Something went wrong!" })
    })
})

// Create action
app.post('/events', (req, res) => {
  const newEvent = req.body
  if (new Date(newEvent.start_date) > new Date() &&
    new Date(newEvent.end_date) > new Date(newEvent.start_date)
  ) {
    Event
      .create(newEvent)
      .then(event => {
        res.status(201)
        res.json(event)
      })
      .catch(err => {
        res.status(422)
        res.json({ message: err.message })
      })
  } else {
    res.status(406)
    res.json({ message: "Dates are not correctly defined... " })
  }
})

// Edit action
const patchOrPut = (req, res) => {
  Event
    .findById(req.params.id)
    .then(event => {
        return event.update(req.body)
    })
    .then(final => {
      res.json(final)
    })
    .catch(err => {
      res.status(500).send({ message: `Something went wrong`, err })
    })
}

app.put('/events/:id', patchOrPut)
app.patch('/events/:id', patchOrPut)

// Delete action
app.delete('/events/:id', (req, res) => {
  Event
    .findById(req.params.id)
    .then(event => {
      return event.destroy()
    })
    .then(final => {
      res.json({ message: "The event has been deleted successfully!" })
    })
    .catch(err => {
      res.status(500).send({ message: `Something went wrong`, err })
    })
})

app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
