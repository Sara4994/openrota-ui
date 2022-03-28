import React from 'react';
import Box from '@mui/material/Box';
import TimelineComponent from './components/TimelineComponent';
import PageTitle from '@app/components/PageTitle/PageTitle';

const RoasterManagement: React.FC = () => {
  const [resources, setResources] = React.useState<any>([{
    bgColor: "#f4ed8d",
    id: "1",
    rightTitle: "Stamm",
    title: "Saravana Srinivasan",
    mail: 'saravanabalajis94@gmail.com'
  }, {
    bgColor: "#f4ed8d",
    id: "2",
    rightTitle: "Stamm",
    title: "John Snow",
    mail: 'saravanabalajis49@gmail.com'
  }, {
    bgColor: "#f4ed8d",
    id: "3",
    rightTitle: "Stamm",
    title: "Harry Potter",
    mail: 'saravanabalajis04@gmail.com'
  }
  ]);

  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [candidates, setCandidates] = React.useState([]);

  return (
    <>
    <PageTitle title={"Calendars"} />
      <TimelineComponent
          calendarEvents={calendarEvents}
          candidates={candidates}
          setCandidates={setCandidates}
          resources={resources}
          setResources={setResources} />
    </>
  )
};

export default RoasterManagement;
