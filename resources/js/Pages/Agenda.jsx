import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Agenda</h2>}
        >
            <Head title="Agenda" />


        </AuthenticatedLayout>
    );
}
