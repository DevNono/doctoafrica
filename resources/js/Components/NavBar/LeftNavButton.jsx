import { Link } from "@inertiajs/react";

export default function LeftNavButton({ children, route, text }) {
    return <>
        <Link href={ route } className="flex w-full gap-2">
            { children }
            <p className="">{ text }</p>
        </Link>
    </>;
}
