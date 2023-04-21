import { getDate, addDays, getHours, getDay, getMinutes } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function Agenda({ start, end, interval, events, startWeek, now }) {


    const NbRows = Math.floor((end - start) / interval);
    const [display, setdisplay] = useState(`60px repeat(7, minmax(0, 1fr))`);
    const [currentDay, setCurrentDay] = useState(null);
    let daysLabels = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

    useEffect(() => {
        if (window.innerWidth < 768) {
            setCurrentDay(0);
        }
    }, []);

    useEffect(() => {
        if (currentDay !== null) {
            if (currentDay > -1 && currentDay < 7) {
                let newdisplay = `60px`;
                for (let i = 0; i < 7; i++) {
                    if (i === currentDay) {
                        newdisplay += ` minmax(0, 1fr)`;
                    } else {
                        newdisplay += ` 0`;
                    }
                }
                setdisplay(newdisplay);
            } else {
                //TODO : when user on monday and goes to previous day, it goes to monday instead of sunday
                router.get(route('agenda'), { startWeek: addDays(new Date(startWeek), currentDay == -1 ? -7 : 7) })
            }

        }
    }, [currentDay]);

    function dateToMinutes(date) {
        return getHours(date) * 60 + getMinutes(date);
    }

    function displayEvent(event, index) {
        let date = utcToZonedTime(new Date(event.date), 'Europe/Paris');
        let startEvent = dateToMinutes(date);
        let rowStart = Math.floor((startEvent - start) / interval) + 1;
        let rowEnd = Math.floor((startEvent + event.duration - start) / interval) + 1;
        let isDisplayed = currentDay == null || currentDay == ((getDay(date) + 6) % 7) ? 'block' : 'none';
        return <div key={`event-${index}`} className="bg-slate-500" style={{ gridRowStart: `${rowStart}`, gridRowEnd: `${rowEnd}`, gridColumnStart: ((getDay(date) + 6) % 7) + 2, gridColumnEnd: ((getDay(date) + 6) % 7) + 3, display : isDisplayed }}>{event.title}</div>
    }

    function blocks() {
        let blocks = [];
        for (let j = 1; j <= 7; j++) {
            for (let i = 1; i <= NbRows; i++) {
                blocks.push(
                    <div key={`block-${j}-${i}`} className="border border-slate-600 border-collapse" style={{ gridRowStart: `${i}`, gridRowEnd: `${i + 1}`, gridColumnStart: `${j + 1}`, gridColumnEnd: `${j + 2}` }}></div>
                )
            }
        }
        return blocks;
    }

    function hours() {
        let hours = [];
        let cpt = start;
        for (let i = 1; i <= NbRows; i++) {
            hours.push(
                <div key={`hour-${i}`} className=" text-center text-xs" style={{ gridRowStart: `${i}`, gridRowEnd: `${i + 1}`, gridColumnStart: `1`, gridColumnEnd: `2` }}>{`${Math.floor(cpt / 60).toString().padStart(2, '0')} : ${(cpt % 60).toString().padStart(2, '0')}`}</div>
            )
            cpt += interval;
        }
        return hours;
    }

    function Labels() {
        let displayDays = [];
        let day = new Date(startWeek);
        for (let i = 0; i < 7; i++) {
            displayDays.push(
                <div key={`label-${i}`} className="flex flex-1 flex-col">
                    <div className="text-center text-xs">{daysLabels[i]}</div>
                    <div className="text-center text-lg">{getDate(addDays(day, i))}</div>
                </div>
            );
        }
        return displayDays;
    }

    function displayNow() {
        let date = utcToZonedTime(new Date(now), 'Europe/Paris');
        if (date < new Date(startWeek) || date > addDays(new Date(startWeek), 7)) {
            return;
        }
        let rowStart = Math.floor((dateToMinutes(date) - start) / interval);
        let day = (getDay(date) + 6) % 7;
        return <div className="h-1 w-20 bg-red-500 absolute " style={{ gridRowStart: `${rowStart + 1}`, gridColumnStart: day + 2, top: `calc(${(getMinutes(date) % (interval)) / (interval)}*50px)` }}></div>
    }

    return (<>
        <div className="flex flex-col w-full">

            {window.innerWidth < 768 ?
                <div>
                    <button onClick={() => { setCurrentDay((day) => { return day - 1 }) }} >PreviousD</button>
                    <button onClick={() => { setCurrentDay((day) => { return day + 1 }) }} >NextD</button>
                    <div className='flex flex-1 flex-col'>
                        <div className='text-center text-xs'>{daysLabels[currentDay]}</div>
                        <div className='text-center text-lg'>{getDate(addDays(new Date(startWeek), currentDay)).toString()}</div>
                    </div>
                </div>
                :
                <div>
                    <button onClick={() => { router.get(route('agenda'), { startWeek: addDays(new Date(startWeek), -7) }) }}>PreviousW
                    </button>
                    <button onClick={() => { router.get(route('agenda'), { startWeek: addDays(new Date(startWeek), 7) }) }}> NextW
                    </button>
                    <div className='flex justify-around pl-[60px] pr-[18px]'>
                        {Labels()}
                    </div>
                </div>
            }
            <div className=" grid relative grid-flow-col w-full h-[calc(100vh-70px)] overflow-y-scroll" style={{ gridTemplateRows: ` repeat(${NbRows}, 50px)`, gridTemplateColumns: display }}>
                {hours()}
                {events.map((event, index) => { return displayEvent(event, index) })}
                {blocks()}
                {displayNow()}
            </div>
        </div>
    </>);
}
