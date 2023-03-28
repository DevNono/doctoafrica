import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { router } from "@inertiajs/react";

export default function Conversations(props) {
    const [conversations, setConversations] = useState(props.conversations);
    const conversation = props.conversation;
    const [messageList, setMessageList] = useState(conversation ? conversation.messages : []);

    const [values, setValues] = useState({
        message: "",
        conversation: conversation ? conversation.id : null,
        withUser_id: props.withUser_id
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    async function submit(e) {
        e.preventDefault()
        await axios.post("/messages", values).then((response) => {
            setMessageList((prev) => [...prev, {
                message: response.data.message.message,
                user_id: response.data.message.user_id,
                created_at: response.data.message.created_at
            }]);
            const index = conversations.findIndex(x => x.user.id == response.data.message.user_id);
            if (index == -1) {
                setConversations((prev) => [...prev, {
                    id: response.data.message.conversation_id,
                    lastRead: 0,
                    user: {
                        id: response.data.message.user_id,
                        name: "Unknown",
                        email: "Unknown",
                    },
                    messages: [{
                        message: response.data.message.message,
                        id: -1,
                        user_id: response.data.message.user_id,
                        receiver_id: response.data.message.receiver_id,
                        created_at: response.data.message.created_at,
                        updated_at: response.data.message.updated_at,
                    }],
                    newMessageCount: 0
                }]);
            }
        });
    }

    useEffect(() => {
        console.log(props)
        const channel = Echo.channel(`App.Models.User.${props.auth.user.id}`);
        channel.listen('MessageSent', (e) => {
            if (e.message.user_id == props.withUser_id) {
                setMessageList((prev) => [...prev, {
                    message: e.message.message,
                    user_id: e.message.user_id,
                    created_at: e.message.created_at
                }]);
                axios.post("/messageSeen", { conversation_id: e.message.conversation_id });
            } else {
                const index = conversations.findIndex(x => x.user.id == e.message.user_id);
                if (index == -1) {
                    setConversations((prev) => [...prev, {
                        id: e.message.conversation_id,
                        lastRead: 0,
                        user: {
                            id: e.message.user_id,
                            name: "Unknown",
                            email: "Unknown",
                        },
                        messages: [{
                            message: e.message.message,
                            id: -1,
                            user_id: e.message.user_id,
                            receiver_id: e.message.receiver_id,
                            created_at: e.message.created_at,
                            updated_at: e.message.updated_at,
                        }],
                        newMessageCount: 1
                    }]);
                } else {
                    setConversations((prev) => {
                        let newConversations = JSON.parse(JSON.stringify(prev))
                        newConversations[index].newMessageCount = newConversations[index].newMessageCount + 1;
                        return newConversations;
                    });
                }
            }
        });

    }, []);


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Conversations</h2>}
        >

            <div className='flex'>
                <div>
                    {conversations.map((conv, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center space-x-4 p-2 md:p-3 rounded-xl shadow-lg bg-white">
                            <div className="relative w-fit hover:scale-105 duration-200 py-2 md:py-0">
                                {/* <img
                            className="hidden dark:block w-20 h-20 rounded-3xl hover:scale-110 duration-300"
                            src="your-img-path.png"
                            alt="avatar"
                        />
                        <img
                            className="block dark:hidden w-20 h-20 rounded-3xl"
                            src="your-img-path.png"
                            alt="avatar"
                        /> */}
                                <ApplicationLogo className="w-20 h-20 rounded-3xl" />
                                <p className="absolute bottom-2 text-white -right-1 w-5 h-5 flex items-center justify-center p-2 text-xs rounded-2xl bg-[#ff4757]">
                                    {conv.newMessageCount}
                                </p>
                            </div>
                            <div className="flex flex-col space-y-1 py-2 md:py-0">
                                <h5 className="text-primary font-medium text-sm">
                                    {conv.user.name}
                                </h5>
                                <small className="text-xs font-lighttext-primary  dark:text-gray-400">
                                    {/* {conv.messages[0].message} */}
                                </small>
                                <span className="space-x-2">
                                    <button className="py-1 px-3 rounded-lg text-white bg-[#ff4757] text-[0.6rem] duration-300 hover:-translate-y-0.5"
                                        onClick={() => { router.get(route("conversations"), { withUser_id: conv.user.id }); }}>
                                        Open
                                    </button>
                                    <button className="py-1 px-3 rounded-lg bg-white shadow-xl dark:bg-primary text-[0.6rem] duration-300 hover:-translate-y-1">
                                        Nothing
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="h-14"></div>

                    {props.users.map((user, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center space-x-4 p-2 md:p-3 rounded-xl shadow-lg bg-white">
                            <div className="relative w-fit hover:scale-105 duration-200 py-2 md:py-0">
                                {/* <img
                            className="hidden dark:block w-20 h-20 rounded-3xl hover:scale-110 duration-300"
                            src="your-img-path.png"
                            alt="avatar"
                        />
                        <img
                            className="block dark:hidden w-20 h-20 rounded-3xl"
                            src="your-img-path.png"
                            alt="avatar"
                        /> */}
                                <ApplicationLogo className="w-20 h-20 rounded-3xl" />
                                <p className="absolute bottom-2 text-white -right-1 w-5 h-5 flex items-center justify-center p-2 text-xs rounded-2xl bg-[#ff4757]">
                                    *
                                </p>
                            </div>
                            <div className="flex flex-col space-y-1 py-2 md:py-0">
                                <h5 className="text-primary font-medium text-sm">
                                    {user.name}
                                </h5>
                                <small className="text-xs font-lighttext-primary  dark:text-gray-400">
                                    {/* {conv.messages[0].message} */}
                                </small>
                                <span className="space-x-2">
                                    <button className="py-1 px-3 rounded-lg text-white bg-[#ff4757] text-[0.6rem] duration-300 hover:-translate-y-0.5"
                                        onClick={() => { router.get(route("conversations"), { withUser_id: user.id }); }}>
                                        Open
                                    </button>
                                    <button className="py-1 px-3 rounded-lg bg-white shadow-xl dark:bg-primary text-[0.6rem] duration-300 hover:-translate-y-1">
                                        Nothing
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {conversation && <div className="flex flex-col items-center justify-start gap-4 bg-indigo-200 px-4 py-3  ">
                    <h2>{conversation.user.name} / {conversation.id}</h2>
                    {messageList.map((message, index) => (
                        <div key={index}>
                            <p> <i>{message.created_at}</i>    <b> {message.user_id} / {message.id} </b>  : {message.message}</p>
                        </div>
                    ))}
                    <div>
                        <form onSubmit={submit}>
                            <label className="sr-only" >Message</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                type="text"
                                id="message"
                                onChange={(e) => handleChange(e)}
                            />
                            <button type="submit" className="inline-block w-full text-white rounded-lg bg-black px-5 py-3 font-medium  sm:w-auto">
                                Login
                            </button>
                        </form>
                    </div>
                </div>}
            </div>

        </AuthenticatedLayout>
    );
}
