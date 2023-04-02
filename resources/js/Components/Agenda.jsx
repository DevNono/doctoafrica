import { isLastDayOfMonth, getDate, addDays } from 'date-fns'

export default function Agenda({ start, end, interval, events, startWeek }) {
    function calculateNbRows() {
        return Math.floor((end - start) / interval);
    }
    function calculateRowStartEnd(event) {
        let rowStart = Math.floor((event.start - start) / interval);
        let rowEnd = Math.floor((event.end - start) / interval);
        return [rowStart, rowEnd];
    }

    function blocks() {
        let blocks = [];
        for (let j = 1; j <= 7; j++) {
            for (let i = 1; i <= calculateNbRows(); i++) {
                blocks.push(
                    <div className="border border-slate-600 border-collapse" style={{ gridRowStart: `${i}`, gridRowEnd: `${i + 1}`, gridColumnStart: `${j + 1}`, gridColumnEnd: `${j + 2}` }}></div>
                )
            }
        }
        return blocks;
    }

    function hours() {
        let hours = [];
        let cpt = start * 60;
        for (let i = 1; i <= calculateNbRows(); i++) {
            hours.push(
                <div className=" text-center text-xs" style={{ gridRowStart: `${i}`, gridRowEnd: `${i + 1}`, gridColumnStart: `1`, gridColumnEnd: `2` }}>{`${Math.floor(cpt / 60).toString().padStart(2, '0')} : ${(cpt % 60).toString().padStart(2, '0')}`}</div>
            )
            cpt += interval * 60;
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
                    <div className="text-center text-lg">{getDate(day)}</div>
                </div>
            );
            day=addDays(day, 1);
        }
        return displayDays;
    }

    return (<>
        <div className="flex flex-col w-full">
            <div className="flex justify-around pl-[60px] pr-[18px]">
                {days()}
            </div>
            <div className=" grid grid-flow-col w-full h-[calc(100vh-70px)] overflow-y-scroll" style={{ gridTemplateRows: ` repeat(${calculateNbRows()}, 50px)`, gridTemplateColumns: ` 60px repeat(${7}, minmax(0, 1fr))` }}>
                {hours()}
                {blocks()}
                {events.map((event, index) => {
                    return <div key={index} className="bg-slate-500" style={{ gridRowStart: `${calculateRowStartEnd(event)[0] + 1}`, gridRowEnd: `${calculateRowStartEnd(event)[1] + 1}`, gridColumnStart: event.day + 1 }}>{event.title}</div>
                })}
            </div>
        </div>
    </>);
}
