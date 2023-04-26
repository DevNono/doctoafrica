import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/react";

export default function UserProfilPopup({ user, onClose }) {

    return (
        <div className="fixed w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="w-full lg:w-3/5 rounded-lg shadow-2xl bg-white mx-6 lg:mx-0 relative">


                <div className="p-4 md:p-12 text-center lg:text-left">
                    <div className='flex lg:flex-row flex-col'>
                        <div className="block rounded-full shadow-xl mx-auto lg:ml-0 lg:mr-12 -mt-16 h-48 w-48 bg-cover bg-center">
                            <img
                                src="https://picsum.photos/200"
                                className="w-full rounded-full"
                            />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user.name}</h1>
                            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-500 opacity-25"></div>
                            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                <svg className="h-4 fill-current text-blue-500 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" /></svg>
                                Médecin
                            </p>
                            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                                <svg className="h-4 fill-current text-blue-500 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                                </svg>
                                France
                            </p>
                        </div>


                    </div>

                    <p className="pt-8 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, reprehenderit minus explicabo ex ipsa delectus cum reiciendis fugiat quos maiores. Eum animi nam similique nesciunt voluptatum vitae, harum odio illum!</p>

                    <div className="pt-12 pb-8">
                        <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full">
                            Contacter
                        </button>
                    </div>
                </div>

                <div className="absolute top-0 right-0 h-12 w-18 p-4">
                    <button onClick={onClose}>X</button>
                </div>

            </div>

        </div>
    );
}
