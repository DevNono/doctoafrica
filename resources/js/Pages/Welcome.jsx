import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, Head } from "@inertiajs/react";

export default function Welcome(props) {
    return (
        <>
            <div className=" w-full overflow-hidden">
                {/* NAVIGATION */}
                <div className="sm:px-16 px-6 flex justify-center items-center ">
                    <div className="xl:max-w-[1280px] w-full">
                        <nav className="w-full flex py-6 justify-between items-center ">
                            <ApplicationLogo className="w-20 h-20" />
                            <ul className="list-none flex justify-end items-center flex-1">
                                {props.auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="text-sm text-gray-700 dark:text-gray-500 underline"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="text-sm text-gray-700 dark:text-gray-500 underline"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route("register")}
                                            className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* HERO */}
                <div className="flex justify-center items-start">
                    <div className="xl:max-w-[1280px] w-full">
                        <section className="flex md:flex-row flex-col sm:py-16 py-6">
                            <h1 className="flex-1 font-semibold ss:text-[72px] text-[52px] ">
                                DoctoAfrica
                            </h1>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
