import { setUser } from '@/Store/redux';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function MainSearchBar({ }) {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUsers(response.data);
            });
    }, []);

    const filteredUsers = searchQuery ? users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];


    return <>
        <div className="relative items-center justify-center flex-1 hidden w-80 lg:flex">
            <input type="text" placeholder="Rechercher" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} className="w-full px-4 py-2 text-gray-600 bg-gray-100 border-0 rounded-full outline-none focus:outline-none focus:shadow-outline" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-6 h-6 right-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <div className='absolute top-12 bg-grey-700 w-full rounded-lg h-24 overflow-y-auto z-10'>
                {filteredUsers.map(user => <div
                    key={user.id}
                    className="flex items-center justify-between w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => { dispatch(setUser(user)); setSearchQuery(''); }}
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
                </div>)
                }
            </div>
        </div>
    </>;
}
