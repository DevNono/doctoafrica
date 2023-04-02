import { Link } from "@inertiajs/react";
import React from "react";

export default function LeftNavButton({ children, route, text, active }) {
    return <>
        <Link href={ route } className={"relative flex w-full gap-2"}>
            {active && (<div className="absolute w-full h-full transition-all duration-150 from-gray-100 to-transparent bg-gradient-to-r">
                <div className="w-1 h-full bg-blue-500 rounded-r-lg"></div>
            </div>)}
            <div className="z-10 flex w-full gap-2 py-4 mx-8">
                { children }
                <p className="">{ text }</p>
            </div>
        </Link>
    </>;
}
