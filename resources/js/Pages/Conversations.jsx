import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { router } from "@inertiajs/react";
import Avatar from "@/Components/Avatar";
import UserListPopup from "@/Components/UserListPopup";

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

export default function Conversations(props) {
    const conversation = props.conversation
        ? new Conversation(
            props.conversation.id,
            props.conversation.lastRead,
            props.conversation.user,
            props.conversation.messages,
            props.conversation.newMessageCount
        )
        : null;
    const [conversations, setConversations] = useState(
        props.conversations.map((conv) => {
            return new Conversation(
                conv.id,
                conv.lastRead,
                conv.user,
                conv.messages,
                conv.newMessageCount
            );
        })
    );
    const [messageList, setMessageList] = useState(
        props.conversation
            ? props.conversation.messages.map((message) => {
                return new Message(
                    message.message,
                    message.user_id,
                    message.created_at,
                    message.id
                );
            })
            : []
    );

    const [conversationOpened, setConversationOpened] = useState(
        true
    );

    const [values, setValues] = useState({
        message: "",
        conversation: conversation ? conversation.id : null,
        withUser_id: props.withUser_id,
    });

    const [showUserList, setShowUserList] = useState(false);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function updateMessageList(message, user_id, created_at) {
        //TODO: get message id
        setMessageList((prev) => [
            ...prev,
            new Message(message, user_id, created_at, -1),
        ]);
    }

    //TODO: updated_at utile ?
    function updateConversation(
        id,
        message,
        user_id,
        receiver_id,
        created_at,
        updated_at
    ) {
        const Userid = props.auth.user.id == user_id ? receiver_id : user_id;
        setConversations((prev) => {
            const index = prev.findIndex((conv) => conv.user.id == Userid);
            let newConversations = JSON.parse(JSON.stringify(prev));
            if (index == -1) {
                newConversations.push(
                    new Conversation(
                        id,
                        0,
                        {
                            //TODO: get user data
                            id: Userid,
                            name: "Unknown",
                            email: "Unknown",
                        },
                        new Message(message, user_id, created_at),
                        props.auth.user.id == receiver_id ? 1 : 0
                    )
                );
            } else {
                if (props.auth.user.id == receiver_id) {
                    newConversations[index].newMessageCount =
                        newConversations[index].newMessageCount + 1;
                }
            }
            return newConversations;
        });
    }

    async function submit(e) {
        e.preventDefault();
        await axios.post("/messages", values).then((response) => {
            updateMessageList(
                response.data.message.message,
                response.data.message.user_id,
                response.data.message.created_at
            );
            updateConversation(
                response.data.message.conversation_id,
                response.data.message.message,
                response.data.message.user_id,
                response.data.message.receiver_id,
                response.data.message.created_at,
                response.data.message.updated_at
            );
        });
    }

    useEffect(() => {
        const channel = Echo.channel(`App.Models.User.${props.auth.user.id}`);
        channel.listen("MessageSent", (e) => {
            if (e.message.receiver_id == props.auth.user.id) {
                if (e.message.user_id == props.withUser_id) {
                    updateMessageList(
                        e.message.message,
                        e.message.user_id,
                        e.message.created_at
                    );
                    axios.post("/messageSeen", {
                        conversation_id: e.message.conversation_id,
                    });
                } else {
                    updateConversation(
                        e.message.conversation_id,
                        e.message.message,
                        e.message.user_id,
                        e.message.receiver_id,
                        e.message.created_at,
                        e.message.updated_at
                    );
                }
            }
        });
    }, []);

    function handleUserListClose() {
        setShowUserList(false);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Conversations
                </h2>
            }
        >
            <div className="relative flex w-full h-[calc(100vh-70px)] lg:px-8 lg:py-10 gap-10 bg-white lg:bg-transparent">
                <div className={"flex-col items-center justify-center w-full h-full gap-3 lg:relative lg:w-1/4 lg:flex " + (!conversationOpened ? "flex" : "hidden")} >
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
                        <button
                            className="inline-block rounded-full border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                            onClick={() => {
                                setShowUserList(true);
                            }}

                        >
                        +
                        </button>
                    </div>
                    <div className="flex flex-col w-full h-full gap-1 bg-white lg:rounded-3xl lg:drop-shadow-md">
                        <h3 className="px-4 pt-4 font-bold">
                            Liste des messages
                        </h3>
                        {conversations.map((conv) => {
                            return (
                                <div
                                    key={conv.id}
                                    className="flex items-center justify-between w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setConversationOpened(true);
                                        router.get(route("conversations"), {
                                            withUser_id: conv.user.id,
                                        });
                                    }}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <img
                                                src="https://picsum.photos/200"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex flex-col ml-3">
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {conv.user.name}
                                                </span>
                                                <span className="text-xs text-gray-600">

                                                    {//TODO: newConversation => no "1stmessage" displayed
                                                    conv.messages.length > 0 &&
                                                        conv.messages[
                                                            conv.messages.length - 1
                                                        ].message
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-end">
                                            <span className="text-xs text-right text-gray-600">
                                                2h
                                            </span>
                                            <span className="px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">
                                                {
                                                    conv.newMessageCount
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={"flex-col h-full w-full lg:relative lg:w-3/4 lg:flex " + (conversationOpened ? "flex" : "hidden")}>
                    <div className="flex flex-col w-full h-full gap-4 bg-white rounded-3xl lg:drop-shadow-md">
                        {conversation && (
                            <>
                                <hr className="lg:hidden" />
                                <div className="flex justify-between px-4 lg:pt-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="flex items-center justify-center w-10 h-10 -mr-1.5 -ml-3 rounded-full hover:bg-gray-100"
                                            onClick={() => {
                                                setConversationOpened(false);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                        <Avatar src={'https://picsum.photos/200'} />
                                        <p className="font-bold">
                                            {conversation.user.name}
                                        </p>
                                    </div>
                                    <button className="">
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
                                </div>
                                <hr />
                                <div className="flex flex-col flex-1 gap-4 px-4 py-4 overflow-y-auto">
                                    {messageList.map((message) => {
                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex flex-col justify-center w-full ${message.user_id ==
                                                    props.auth.user.id
                                                    ? "items-end"
                                                    : "items-start"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="">
                                                        {message.user_id ==
                                                            props.auth.user.id
                                                            ? conversation.user.name
                                                            : "You"}
                                                    </span>
                                                    <span className="text-xs ">
                                                        {message.created_at}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`flex items-center justify-center w-3/4 px-4 py-2 rounded-lg ${message.user_id ==
                                                        props.auth.user.id
                                                        ? "bg-blue-400 rounded-tr-none"
                                                        : "bg-gray-200 rounded-tl-none"
                                                        }`}
                                                >
                                                    <span className="text-sm text-white">
                                                        {message.message}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <hr />
                                <form
                                    onSubmit={submit}
                                    className="flex items-center justify-between w-full gap-3 px-4 pb-4"
                                >
                                    <button className="">
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
                                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                            />
                                        </svg>
                                    </button>
                                    <textarea
                                        className="w-full px-4 py-2 text-gray-600 bg-white border-0 rounded-lg outline-none focus:outline-none focus:shadow-outline"
                                        placeholder="Ecrivez votre message"
                                        style={{ resize: "none" }}
                                        rows={1}
                                        id="message"
                                        onChange={(e) => handleChange(e)}
                                    ></textarea>

                                    <button className="">
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
                                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                            />
                                        </svg>
                                    </button>
                                    <button type="submit" className="">
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
                                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {showUserList && (
                    <UserListPopup onClose={handleUserListClose} />
                )}
        </AuthenticatedLayout>
    );
}
