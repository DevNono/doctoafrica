import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Guest({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-6 bg-gray-100 sm:pt-0">
            {children}
        </div>
    );
}
