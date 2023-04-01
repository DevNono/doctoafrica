import { useState } from "react";

export default function NotificationBell() {
    const [showingNotificationsDropdown, setShowingNotificationsDropdown] =
        useState(false);
    return (
        <>
            <div className="relative flex h-full">
                <button
                    onClick={() => {
                        setShowingNotificationsDropdown(
                            !showingNotificationsDropdown
                        );
                    }}
                    className="relative flex w-6 h-6"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                    </svg>
                    <div className="absolute bottom-[1px] right-[1px] w-[7px] h-[7px] bg-red-500 rounded-full"></div>
                </button>
                {showingNotificationsDropdown && (
                    <div className="absolute z-10 bg-gray-600 rounded-lg -right-1/2 -bottom-60 w-96 h-52"></div>
                )}
            </div>
        </>
    );
}
