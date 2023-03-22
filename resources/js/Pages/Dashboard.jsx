import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { router } from "@inertiajs/react";

export default function Dashboard(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <button className="py-1 px-3 rounded-lg text-white bg-[#ff4757] text-[1rem] duration-300 hover:-translate-y-0.5"
                onClick={() => { router.get(route("conversations")); }}>
                Conversations
            </button>
        </AuthenticatedLayout>
    );
}
