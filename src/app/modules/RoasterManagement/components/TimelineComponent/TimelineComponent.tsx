import React from 'react';
import moment from "moment";
import { TimelineKeys } from '../../constants';
import Timeline, { TimelineHeaders, DateHeader } from "react-calendar-timeline";
import 'react-calendar-timeline/lib/Timeline.css';
import axios from 'axios';


const TimelineComponent = ({ calendarEvents, candidates, setCandidates, resources, setResources }) => {


    const [visibleTimeStart, setVisibleTimeStart] = React.useState(
        moment()
            .startOf('week')
            .valueOf()
    );
    const [visibleTimeEnd, setVisibleTimeEnd] = React.useState(
        moment().
            startOf('day')
            .add(1, 'day')
            .valueOf()
    );
    const [unit, setUnit] = React.useState<string>('day');
    const [scrolling, setScrolling] = React.useState<boolean>(false);
    const timelineRef = React.useRef(null)

    console.log('candidates', candidates)

    const handleItemMove = (itemId, dragTime, newGroupOrder) => {
        console.log('item', itemId, dragTime, newGroupOrder)
        const group = resources[newGroupOrder];
        const filterCandidate = candidates.find(obj => obj.id === itemId);
        setCandidates(candidates.map(candidate =>
            candidate.id === itemId
                ? Object.assign({}, candidate, {
                    start: dragTime,
                    end: dragTime + (candidate.end - candidate.start),
                    group: group.id
                })
                : candidate
        ));
        const payload = {
            eventId: filterCandidate.id,
            eventStart: dragTime,
            eventEnd: dragTime + (filterCandidate.end - filterCandidate.start)
        }
        axios.put('http://localhost:4000/rotaCalendars/events/update', payload).then((res) => console.log(res))


        console.log("Moved", itemId, dragTime, newGroupOrder);
    };

    const handleItemResize = (itemId, time, edge) => {
        const filterCandidate = candidates.find(obj => obj.id === itemId);
        setCandidates(candidates.map(candidate =>
            candidate.id === itemId
                ? Object.assign({}, candidate, {
                    start: edge === "left" ? time : candidate.start,
                    end: edge === "left" ? candidate.end : time
                })
                : candidate
        ));
        const payload = {
            eventId: filterCandidate.id,
            eventStart: edge === "left" ? time : filterCandidate.start,
            eventEnd: edge === "left" ? filterCandidate.end : time
        }
        axios.put('http://localhost:4000/rotaCalendars/events/update', payload).then((res) => console.log(res))

        console.log("Resized", itemId, time, edge);
    };

    const onPrevClick = () => {
        if (unit === 'day') {
            const zoom = visibleTimeEnd - visibleTimeStart;
            setVisibleTimeStart(visibleTimeStart - zoom);
            setVisibleTimeEnd(visibleTimeEnd - zoom);
        }
        if (unit === 'week') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(-1, 'week')
                .startOf('week')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(-1, 'week')
                .endOf('week')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }

        if (unit === 'month') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(-1, 'month')
                .startOf('month')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(-1, 'month')
                .endOf('month')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'year') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(-1, 'year')
                .startOf('year')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(-1, 'year')
                .endOf('year')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
    }

    const onNextClick = () => {
        if (unit === 'day') {
            const zoom = visibleTimeEnd - visibleTimeStart;
            setVisibleTimeStart(visibleTimeStart + zoom);
            setVisibleTimeEnd(visibleTimeEnd + zoom);
        }
        if (unit === 'week') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(1, 'week')
                .startOf('week')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(1, 'week')
                .endOf('week')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }

        if (unit === 'month') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(1, 'month')
                .startOf('month')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(1, 'month')
                .endOf('month')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'year') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(1, 'year')
                .startOf('year')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(1, 'year')
                .endOf('year')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
    }

    const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
        setVisibleTimeStart(visibleTimeStart)
        setVisibleTimeEnd(visibleTimeEnd);
        setScrolling(true);
    };
    const handleTimeHeaderChange = unit => {
        setUnit(unit)

        if (unit === 'day') {
            const newVisibleTimeStart = moment()
                .startOf('day')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('day')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'week') {
            const newVisibleTimeStart = moment()
                .startOf('week')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('week')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }

        if (unit === 'month') {
            const newVisibleTimeStart = moment()
                .startOf('month')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('month')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'year') {
            const newVisibleTimeStart = moment()
                .startOf('year')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('year')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => handleTimeHeaderChange("day")}>
                    {"Daily"}
                </button>
                <button onClick={() => handleTimeHeaderChange("week")}>
                    {"Weekly"}
                </button>
                <button onClick={() => handleTimeHeaderChange("month")}>
                    {"Monthly"}
                </button>
                <button onClick={() => handleTimeHeaderChange("year")}>
                    {"Yearly"}
                </button>
            </div>
            <Timeline
                groups={resources}
                items={candidates}
                keys={TimelineKeys}
                fullUpdate
                itemTouchSendsClick={true}
                stackItems
                lineHeight={60}
                itemHeightRatio={1.00}
                showCursorLine
                canMove={true}
                canResize={"both"}
                defaultTimeStart={visibleTimeStart}
                defaultTimeEnd={visibleTimeEnd}
                visibleTimeStart={visibleTimeStart}
                visibleTimeEnd={visibleTimeEnd}
                onTimeChange={handleTimeChange}
                onItemMove={handleItemMove}
                onItemResize={handleItemResize}
            >
                <TimelineHeaders>
                    <DateHeader unit="primaryHeader" />
                    <DateHeader />
                </TimelineHeaders>
            </Timeline>
        </>
    )
}

export default TimelineComponent;