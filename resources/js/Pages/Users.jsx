import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Dashboard(props) {
    const users = props.users;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            {users.map((user, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center space-x-4 p-2 md:p-3 rounded-xl shadow-lg bg-white">
                    <div className="relative w-fit hover:scale-105 duration-200 py-2 md:py-0">
                        {/* <img
                            className="hidden dark:block w-20 h-20 rounded-3xl hover:scale-110 duration-300"
                            src="your-img-path.png"
                            alt="avatar"
                        />
                        <img
                            className="block dark:hidden w-20 h-20 rounded-3xl"
                            src="your-img-path.png"
                            alt="avatar"
                        /> */}
                        <ApplicationLogo className="w-20 h-20 rounded-3xl"/>
                        <p className="absolute bottom-2 text-white -right-1 w-5 h-5 flex items-center justify-center p-2 text-xs rounded-2xl bg-[#ff4757]">
                            *
                        </p>
                    </div>
                    <div className="flex flex-col space-y-1 py-2 md:py-0">
                        <h5 className="text-primary font-medium text-sm">
                            {user.name}
                        </h5>
                        <small className="text-xs font-lighttext-primary  dark:text-gray-400">
                            Description...
                        </small>
                        <span className="space-x-2">
                            <button className="py-1 px-3 rounded-lg text-white bg-[#ff4757] text-[0.6rem] duration-300 hover:-translate-y-0.5">
                                Open
                            </button>
                            <button className="py-1 px-3 rounded-lg bg-white shadow-xl dark:bg-primary text-[0.6rem] duration-300 hover:-translate-y-1">
                                Nothing
                            </button>
                        </span>
                    </div>
                </div>
            ))}
        </AuthenticatedLayout>
    );
}
