# Events RESTful API using ExpressJs

Write a full RESTful API for **Events**. That means ALL RESTful actions.

## Event

An Event has a title, start date, end date, description.

### Creating Events

  * When events get created, they need to start in the future
  * Event start dates must be before the end date.

### Getting All Events

  * GET /events returns only future events
  * GET /events returns only the title and dates of an event
