import { getDate, addDays, getHours, getDay, getMinutes } from 'date-fns'
import { router } from "@inertiajs/react";

export default function Agenda({ start, end, interval, events, startWeek, now }) {

    const NbRows = Math.floor((end - start) / interval);

    function dateToMinutes(date) {
        return getHours(date)*60 + getMinutes(date);
    }

    function displayEvent(event, index) {
        let rowStart = Math.floor((event.start - start) / interval)+1;
        let rowEnd = Math.floor((event.end - start) / interval)+1;
        return <div key={index} className="bg-slate-500" style={{ gridRowStart: `${rowStart}`, gridRowEnd: `${rowEnd}`, gridColumnStart: event.day + 1 }}>{event.title}</div>
    }

    function blocks() {
        let blocks = [];
        for (let j = 1; j <= 7; j++) {
            for (let i = 1; i <= NbRows; i++) {
                blocks.push(
                    <div className="border border-slate-600 border-collapse" style={{ gridRowStart: `${i}`, gridRowEnd: `${i + 1}`, gridColumnStart: `${j + 1}`, gridColumnEnd: `${j + 2}` }}></div>
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
                <div className=" text-center text-xs" style={{ gridRowStart: `${i}`, gridRowEnd: `${i + 1}`, gridColumnStart: `1`, gridColumnEnd: `2` }}>{`${Math.floor(cpt / 60).toString().padStart(2, '0')} : ${(cpt % 60).toString().padStart(2, '0')}`}</div>
            )
            cpt += interval;
        }
        return hours;
    }

    function days() {
        let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let displayDays = [];
        let day = new Date(startWeek);
        for (let i = 0; i < 7; i++) {
            displayDays.push(
                <div className="flex flex-1 flex-col">
                    <div className="text-center text-xs">{days[i]}</div>
                    <div className="text-center text-lg">{getDate(addDays(day, i))}</div>
                </div>
            );
        }
        return displayDays;
    }

    function displayNow() {
        let date = new Date(now);
        if (date < new Date(startWeek) || date > addDays(new Date(startWeek), 7)) {
            return;
        }
        let rowStart = Math.floor((dateToMinutes(date) - start) / interval);
        let day = (getDay(date) + 6) % 7;
        return <div key={-1} className="h-1 w-20 bg-red-500 absolute " style={{ gridRowStart: `${rowStart + 1}`, gridColumnStart: day + 2, top: `calc(${(getMinutes(date) % (interval)) / (interval)}*50px)` }}></div>
    }

    return (<>
        <div className="flex flex-col w-full">
            <div>
                <button onClick={() => { router.get(route("agenda"), { startWeek: addDays(new Date(startWeek), -7) }) }}
                    class="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                >

                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </button>
                <button onClick={() => { router.get(route("agenda"), { startWeek: addDays(new Date(startWeek), 7) }) }}
                    class="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                >

                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex justify-around pl-[60px] pr-[18px]">
                {days()}
            </div>
            <div className=" grid relative grid-flow-col w-full h-[calc(100vh-70px)] overflow-y-scroll" style={{ gridTemplateRows: ` repeat(${NbRows}, 50px)`, gridTemplateColumns: ` 60px repeat(${7}, minmax(0, 1fr))` }}>
                {hours()}
                {blocks()}
                {displayNow()}
                {events.map((event, index) => { return displayEvent(event, index) })}
            </div>
        </div>
    </>);
}
