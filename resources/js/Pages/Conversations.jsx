import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { router } from "@inertiajs/react";

export default function Conversations(props) {

    class Conversation {
        constructor(id, lastRead, user, messages, newMessageCount) {
            this.id = id;
            this.lastRead = lastRead;
            this.user = user;
            this.messages = messages;
            this.newMessageCount = newMessageCount;
        }
    }

    class Message {
        constructor(message, user_id, created_at, id) {
            this.message = message;
            this.user_id = user_id;
            this.created_at = created_at;
            this.id = id;
        }
    }

    const conversation = props.conversation ? new Conversation(props.conversation.id, props.conversation.lastRead, props.conversation.user, props.conversation.messages, props.conversation.newMessageCount) : null;
    const [conversations, setConversations] = useState(props.conversations.map((conv) => { return new Conversation(conv.id, conv.lastRead, conv.user, conv.messages, conv.newMessageCount) }));
    const [messageList, setMessageList] = useState(props.conversation ? props.conversation.messages.map((message) => { return new Message(message.message, message.user_id, message.created_at, message.id) }) : []);

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

    function newMessage(message, user_id, created_at) {
        //TODO: get message id
        setMessageList((prev) => [...prev, new Message(message, user_id, created_at, -1)]);
    }

    //TODO: updated_at utile ?
    function newConversation(id, message, user_id, receiver_id, created_at, updated_at) {
        const $id = props.auth.user.id == user_id ? receiver_id : user_id;
        const index = conversations.findIndex(x => x.user.id == $id);
        if (index == -1) {
            console.log("non ok")
            setConversations((prev) => [...prev, new Conversation(id, 0, {
                //TODO: get user data
                id: user_id, name: "Unknown",
                email: "Unknown",
            },new Message(message, user_id, created_at) , props.auth.user.id == receiver_id ? 1 : 0)]);
        } else {
            if (receiver_id == props.auth.user.id) {
                console.log("ok")
                setConversations((prev) => {
                    let newConversations = JSON.parse(JSON.stringify(prev))
                    newConversations[index].newMessageCount = newConversations[index].newMessageCount + 1;
                    return newConversations;
                });
            }
        }
    }

    async function submit(e) {
        e.preventDefault()
        console.log("submit");
        await axios.post("/messages", values).then((response) => {
            newMessage(response.data.message.message, response.data.message.user_id, response.data.message.created_at);
            newConversation(response.data.message.conversation_id, response.data.message.message, response.data.message.user_id, response.data.message.receiver_id, response.data.message.created_at, response.data.message.updated_at);
        });
    }

    useEffect(() => {
        const channel = Echo.channel(`App.Models.User.${props.auth.user.id}`);
        channel.listen('MessageSent', (e) => {
            if (e.message.user_id == props.withUser_id) {
                newMessage(e.message.message, e.message.user_id, e.message.created_at);
                axios.post("/messageSeen", { conversation_id: e.message.conversation_id });
            } else {
                console.log("useeffect")
                newConversation(e.message.conversation_id, e.message.message, e.message.user_id, e.message.receiver_id, e.message.created_at, e.message.updated_at);
            }
        });

    }, []);


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Conversations</h2>}
        >

            <div className='flex w-full'>
                <div className='flex flex-wrap items-center w-full gap-8 justify-evenly'>
                    {conversations.map((conv, index) => (
                        <div key={index} className="flex flex-col items-center p-2 space-x-4 bg-white shadow-lg md:flex-row md:p-3 rounded-xl">
                            <div className="relative py-2 duration-200 w-fit hover:scale-105 md:py-0">
                                {/* <img
                            className="hidden w-20 h-20 duration-300 dark:block rounded-3xl hover:scale-110"
                            src="your-img-path.png"
                            alt="avatar"
                        />
                        <img
                            className="block w-20 h-20 dark:hidden rounded-3xl"
                            src="your-img-path.png"
                            alt="avatar"
                        /> */}
                                <ApplicationLogo className="w-20 h-20 rounded-3xl" />
                                <p className="absolute bottom-2 text-white -right-1 w-5 h-5 flex items-center justify-center p-2 text-xs rounded-2xl bg-[#ff4757]">
                                    {conv.newMessageCount}
                                </p>
                            </div>
                            <div className="flex flex-col py-2 space-y-1 md:py-0">
                                <h5 className="text-sm font-medium text-primary">
                                    {conv.user.name}
                                </h5>
                                <small className="text-xs font-lighttext-primary dark:text-gray-400">
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
                        <div key={index} className="flex flex-col items-center p-2 space-x-4 bg-white shadow-lg md:flex-row md:p-3 rounded-xl">
                            <div className="relative py-2 duration-200 w-fit hover:scale-105 md:py-0">
                                {/* <img
                            className="hidden w-20 h-20 duration-300 dark:block rounded-3xl hover:scale-110"
                            src="your-img-path.png"
                            alt="avatar"
                        />
                        <img
                            className="block w-20 h-20 dark:hidden rounded-3xl"
                            src="your-img-path.png"
                            alt="avatar"
                        /> */}
                                <ApplicationLogo className="w-20 h-20 rounded-3xl" />
                                <p className="absolute bottom-2 text-white -right-1 w-5 h-5 flex items-center justify-center p-2 text-xs rounded-2xl bg-[#ff4757]">
                                    *
                                </p>
                            </div>
                            <div className="flex flex-col py-2 space-y-1 md:py-0">
                                <h5 className="text-sm font-medium text-primary">
                                    {user.name}
                                </h5>
                                <small className="text-xs font-lighttext-primary dark:text-gray-400">
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
                                className="w-full p-3 text-sm border-gray-200 rounded-lg"
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
