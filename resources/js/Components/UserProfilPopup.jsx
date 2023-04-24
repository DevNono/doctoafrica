import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/react";

export default function UserProfilPopup({ user, onClose }) {

    return (
        <div className="fixed w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div
                className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
            >
                <p>{user.name}</p>
                <button onClick={onClose}>X</button>
            </div>

        </div>
    );
}
