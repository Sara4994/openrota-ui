import React from 'react';
import { Button, PageSection, Title } from '@patternfly/react-core';
import { generateFakeData } from "./utils";
import TimelineComponent from './components/TimelineComponent/TimelineComponent';
import moment from 'moment';
import axios from 'axios';
import { Grid, GridItem } from '@patternfly/react-core';
declare global {
  interface Window { gapi: any; }
}

window.gapi = window.gapi || {};


const RoasterManagement: React.FC = () => {
  const [resources, setResources] = React.useState<any>([{
    bgColor: "#f4ed8d",
    id: "1",
    rightTitle: "Stamm",
    title: "Saravana",
    mail: 'saravanabalajis49@gmail.com'
},{
   bgColor: "#f4ed8d",
    id: "2",
    rightTitle: "Stamm",
    title: "Balaji",
    mail: 'saravanabalajis94@gmail.com'
}
]);
  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [candidates, setCandidates] = React.useState([]);

  const getEvents = () => {
    axios.get('http://localhost:4000/rotaCalendars/events/list')
      .then(res => {
        console.log(res);
        setCandidates([...res.data])
      })
  }

  React.useEffect(() => {
    getEvents()
    // gapi.load('client:auth2', () => {
    //   console.log('loaded client')

    //   gapi.client.init({
    //     apiKey: API_KEY,
    //     clientId: CLIENT_ID,
    //     discoveryDocs: DISCOVERY_DOCS,
    //     scope: SCOPES,
    //   })

    //   gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    //   gapi.auth2.getAuthInstance().signIn()
    //     .then(() => {

    //       // get events
    //       gapi.client.calendar.events.list({
    //         'calendarId': '@redhat.com',
    //         'timeMin': (new Date()).toISOString(),
    //         'showDeleted': false,
    //         'singleEvents': true,
    //         'maxResults': 25,
    //         'orderBy': 'startTime',
    //       }).then(response => {
    //         const events = response.result.items
    //         console.log(events)
    //         const eventTemp: any = [];
    //         events.forEach(eventObj => {
    //           const temp = {}
    //           temp['className'] = "item-weekend";
    //           temp['title'] = eventObj.summary;
    //           temp['start'] = moment(eventObj.start.dateTime).format("x");
    //           temp['end'] = moment(eventObj.end.dateTime).format("x");
    //           temp['group'] = "1";
    //           temp['id'] = Math.random();

    //           eventTemp.push(temp);
    //         });
    //         setCandidates(eventTemp);
    //       });
    //     })
    //     .then(error => console.log('error', error))
    // })
  }, [])

  const handleClick = () => {
    axios.post('http://localhost:4000/rotaCalendars/events/insert')
    .then(res => {
      console.log(res)
      setCandidates([...res.data])
    })
    // gapi.load('client:auth2', () => {
    //   console.log('loaded client')

    //   gapi.client.init({
    //     apiKey: API_KEY,
    //     clientId: CLIENT_ID,
    //     discoveryDocs: DISCOVERY_DOCS,
    //     scope: SCOPES,
    //   })

    //   gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    //   gapi.auth2.getAuthInstance().signIn()
    //     .then(() => {

    //       const event = {
    //         'summary': 'Random Event!',
    //         'location': '800 Howard St., San Francisco, CA 94103',
    //         'description': 'Really great refreshments',
    //         'start': {
    //           'dateTime': '2021-10-09T09:00:00-07:00',
    //           'timeZone': 'America/Los_Angeles'
    //         },
    //         "role": "writer",
    //         "scope": {
    //           "type": "user",
    //           "value": "sasriniv@redhat.com"
    //         },
    //         'end': {
    //           'dateTime': '2021-10-09T17:00:00-07:00',
    //           'timeZone': 'America/Los_Angeles'
    //         },
    //         'recurrence': [
    //           'RRULE:FREQ=DAILY;COUNT=2'
    //         ],
    //         'attendees': [
    //           { 'email': 'saravanabalajis49@gmail.com' },
    //           { 'email': 'adkhan@redhat.com' }
    //         ],
    //         'reminders': {
    //           'useDefault': false,
    //           'overrides': [
    //             { 'method': 'email', 'minutes': 24 * 60 },
    //             { 'method': 'popup', 'minutes': 10 }
    //           ]
    //         }
    //       }

    //       const request = gapi.client.calendar.events.insert({
    //         'calendarId': 'sasriniv@redhat.com',
    //         'resource': event,
    //       })

    //       request.execute(event => {
    //         console.log(event)
    //         window.open(event.htmlLink)
    //       })


    //       /*
    //           Uncomment the following block to get events
    //       */

    //       // get events
    //       gapi.client.calendar.events.list({
    //         'calendarId': 'sasriniv@redhat.com',
    //         'timeMin': (new Date()).toISOString(),
    //         'showDeleted': false,
    //         'singleEvents': true,
    //         'maxResults': 25,
    //         'orderBy': 'startTime'
    //       }).then(response => {
    //         const events = response.result.items
    //         console.log('EVENTS: ', events)
    //         const eventTemp: any = [];
    //         events.forEach(eventObj => {
    //           const temp = {}
    //           temp['className'] = "item-weekend";
    //           temp['title'] = eventObj.summary;
    //           temp['start'] = moment(eventObj.start.dateTime).format("x");
    //           temp['end'] = moment(eventObj.end.dateTime).format("x");
    //           temp['group'] = "1";
    //           temp['id'] = Math.random();

    //           eventTemp.push(temp);
    //         });
    //         setCandidates(eventTemp)
    //       })



    //     })
    //     .then(error => console.log('error', error))
    // })
  }
  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">
        Roaster Management
      </Title>
      <Grid>
      <GridItem span={11}>
        </GridItem>
        <GridItem span={1}>
        <Button onClick={handleClick}>Add event</Button>
        </GridItem>
        <GridItem span={12}>
        <TimelineComponent 
          calendarEvents={calendarEvents} 
          candidates={candidates} 
          setCandidates={setCandidates} 
          resources={resources} 
          setResources={setResources}/>
          </GridItem>
      </Grid>
    </PageSection>
  );
};

export default RoasterManagement;
