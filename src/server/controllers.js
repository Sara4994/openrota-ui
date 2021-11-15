const { addWeeks } = require('date-fns')
const { google } = require('googleapis');
const path = require('path');
const credentials = require('./credentials.json');
const moment = require('moment');

const scopes = 'https://www.googleapis.com/auth/calendar';
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const calendar = google.calendar({ version: 'v3' })

const listEvents = (res) => {
  const tempEvents = [];
    calendar.events.list(
      {
        auth: auth,
        'calendarId': 'saravanabalajis94@gmail.com',
        'timeMin': new Date().toISOString(),
        'singleEvents': true,
        'maxResults': 25,
        'orderBy': 'startTime',
      },
      (err, val) => {
        if (err) {
          console.log(`The API returned an error: ${err}`)
        }
        console.log(val.data.items) // All data

        val.data.items.forEach(eventObj => {
          const temp = {}
          temp['className'] = "item-weekend";
          temp['title'] = eventObj.summary;
          temp['start'] = moment(eventObj.start.dateTime).format("x");
          temp['end'] = moment(eventObj.end.dateTime).format("x");
          temp['group'] = "1";
          temp['id'] = eventObj.id;
          tempEvents.push(temp);
        });
        res.send(tempEvents);
      },
    )
}
module.exports = controller = {
  getEvents: (req, res) => {
    console.log('called get')
    listEvents(res);
  },
  postEvents: (req, res) => {
    console.log('called post');
    const event = {
      'summary': 'Random Event!',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'Really great refreshments',
      'start': {
        'dateTime': '2021-11-15T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2021-11-17T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
       'saravanabalajis49@gmail.com'
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 24 * 60 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      }
    }
    calendar.events.insert({
      auth: auth,
      'calendarId': 'saravanabalajis94@gmail.com',
      'resource': event,
    }, (err, val) => {
      if(err) {
        console.log('error while adding event', err)
      }
      listEvents(res);
    })
    
  },
  updateEvents: (req, res) => {
    console.log('put called', req.body)
    calendar.events.get({auth: auth,"calendarId": 'saravanabalajis94@gmail.com', "eventId": req.body.eventId},
    (err, val) => {
      if(err) {
        console.log('error while updating', err)
      }
      console.log('val',val.data)
      const event = val.data;
      event.start.dateTime = moment(req.body.eventStart, "x").format("YYYY-MM-DDTHH:MM:SSZ") 
      event.end.dateTime = moment(req.body.eventEnd, "x").format("YYYY-MM-DDTHH:MM:SSZ") 
      console.log('event',event)
      calendar.events.patch({
        auth: auth,
        'calendarId': 'saravanabalajis94@gmail.com',
        'eventId': req.body.eventId,
        'resource': event
    });
    }
    );
    
  }
};