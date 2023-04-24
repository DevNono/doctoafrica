import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/react";

export default function UserListPopup({ onClose }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUsers(response.data);
            });
    }, []);

    return (
        <div className="fixed w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div
                className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className='flex gap-6'>
                        <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                />
                            </svg>
                        </span>

                        <p className="font-medium sm:text-lg">New message!</p>
                        <button onClick={onClose}>X</button>
                    </div>
                    <hr className="w-full" />
                    <div className="flex items-center justify-center flex-1 w-full lg:drop-shadow-md lg:flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="absolute w-6 h-6 left-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher une conversation"
                            className="w-full px-4 py-4 pl-10 text-gray-600 border-0 outline-none lg:py-2 bg-gray-50 lg:rounded-full lg:bg-white focus:outline-none lg:focus:shadow-outline"
                        />
                    </div>

                    {users.map(user => <div
                        key={user.id}
                        className="flex items-center justify-between w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            router.get(route("conversations"), {
                                withUser_id: user.id,
                            });
                        }}
                    >
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <img
                                    src="https://picsum.photos/200"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex ml-3">
                                    <span className="text-sm font-semibold text-gray-800">
                                        {user.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>)}


                </div>

            </div>

        </div>
    );
}
