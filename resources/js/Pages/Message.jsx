import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";

export default function Message(props) {
    const [connected, setConnected] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState(null);
    const [formError, setFormError] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        message: "",
    });

    function handleConnection(isConnected) {
        setConnected((prev) => !prev);
    }

    function submit(e) {
        setMessageList((prev) => [...prev, {
            message: "test",
            user_id: 1,
            created_at: "test"
        }]);
        e.preventDefault();
        post(route("messages.store"),
            {
                preserveScroll: true,
                preserveState : true,
            });
    }

    useEffect(() => {
        setMessageList(props.messages)

        const channel = Echo.channel('message');
        channel.listen('MessageSent', (e) => {
            setMessageList((prev) => [...prev, {
                message: e.message.message,
                user_id: e.message.user_id,
                created_at: e.message.created_at
            }]);
        });

    }, []);


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

            <button
                onClick={() => { handleConnection(connected) }}
                className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white  transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            >
                {connected ? "Se Deconnecter" : "Se Connecter"}
            </button>

            {connected && <div className="flex flex-col items-center justify-between gap-4 bg-indigo-200 px-4 py-3  ">
                {messageList.map((message, index) => (
                    <div key={index}>
                        <p> <i>{message.created_at}</i>    <b>{message.user_id} </b>  : {message.message}</p>
                    </div>
                ))}
                <div>
                    <form onSubmit={submit}>
                        <label className="sr-only" >Message</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            type="text"
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                        />
                        {errors.message && <div>{errors.message}</div>}
                        <button type="submit" className="inline-block w-full text-white rounded-lg bg-black px-5 py-3 font-medium  sm:w-auto" disabled={processing}>
                            Login
                        </button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
                {formError && <div
                    className="flex items-center justify-between gap-4 bg-indigo-600 px-4 py-3  "
                >
                    <p className="text-sm font-medium">
                        Error
                    </p>

                    <button
                        onClick={() => { setFormError(false) }}
                        aria-label="Close"
                        className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>}
            </div>}
        </AuthenticatedLayout>
    );
}
