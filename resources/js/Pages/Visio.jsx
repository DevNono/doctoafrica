import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function Dashboard(props) {
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(function(stream) {
            // Store a global reference of the local stream
            window.localStream = stream;
            // Display the local stream on the page
            displayStream('cam-you', stream);
        });


    }, []);

    function displayStream(id, stream) {
        document.getElementById(id).srcObject = stream;
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Visio" />

            <div className="flex items-center justify-between w-full min-h-[calc(100vh-70px)] bg-gray-100">
                <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                    <div className="relative w-full h-2/3">
                        <div className="absolute aspect-video h-32 border-[3px] border-white rounded-xl -top-12 right-2">
                            <video id="cam-you" className="object-cover w-full h-full bg-purple-400 rounded-xl" autoPlay muted></video>
                        </div>
                        <video
                            id="cam-peer"
                            className="object-cover w-full h-full bg-green-400"
                            autoPlay
                        ></video>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full gap-5">
                        <button className="p-3 text-black bg-white rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                                />
                            </svg>
                        </button>
                        <button className="p-3 text-black bg-white rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                />
                            </svg>
                        </button>
                        <button className="p-3 text-white bg-red-500 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3 h-full bg-gray-200 rounded-tl-2xl"></div>
            </div>
        </AuthenticatedLayout>
    );
}
