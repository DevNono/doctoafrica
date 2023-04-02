import Agenda from '@/Components/Agenda';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function Dashboard(props) {

    useEffect(() => {
        console.log(props);
    });

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Agenda</h2>}
        >
            <Head title="Agenda" />
            <Agenda start={0} end={24} interval={0.5} startWeek={props.startWeek} events={[{ start: 12, end: 14.5, day: 4, title: "event 1" }, { start: 8, end: 12, day: 1, title: "event 2" }, { start: 15, end: 17, day: 6, title: "event3" }]} />

        </AuthenticatedLayout>
    );
}
