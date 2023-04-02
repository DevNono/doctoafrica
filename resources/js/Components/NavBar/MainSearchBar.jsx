import React from 'react';

export default function MainSearchBar() {
    return <>
        <div className="relative flex items-center justify-center flex-1 w-80">
            <input type="text" placeholder="Rechercher" className="w-full px-4 py-2 text-gray-600 bg-gray-100 border-0 rounded-full outline-none focus:outline-none focus:shadow-outline" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-6 h-6 right-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </div>
    </>;
}
