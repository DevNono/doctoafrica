import Agenda from '@/Components/Agenda';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function Dashboard(props) {

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Agenda</h2>}
        >
            <Head title="Agenda" />
            <Agenda start={480} end={1200} interval={20} startWeek={props.startWeek} now={props.now} events={props.events} />

        </AuthenticatedLayout>
    );
}
